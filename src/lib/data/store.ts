/**
 * Fonte de dados do site.
 *
 * Base = conteúdo versionado no código (matérias, perfis, charts, agenda).
 * Supabase = camada por cima: o que o admin (ou o robô) publica substitui o item de mesmo id;
 * itens despublicados no admin (rascunho/revisão/rejeitado) somem do site mesmo que existam no código.
 * Assim, conteúdo novo que chega pelo código aparece no ar sem precisar reimportar o banco.
 * Só contam linhas com `updated_by` (gravadas pelo admin/robô); as do seed inicial são ignoradas.
 */
import { sectionKeys } from '@/lib/i18n/routes';
import { sbSelect, supabaseEnabled, supabaseWritable } from '@/lib/supabase';
import { awardsBySlug } from './awards';
import { liveCharts } from './charts-live';
import * as local from './content';
import { archive } from './content-archive';
import { vmaArticles } from './content-vma';
import { realPeople } from './people';
import { morePeople } from './people-more';
import type { Article, Chart, EntertainmentEvent, Person, Release } from './types';

export type ContentKind = 'article' | 'person' | 'event' | 'chart' | 'release';
export type ContentStatus = 'draft' | 'review' | 'published' | 'rejected';

export interface Store {
  articles: Article[];
  people: Person[];
  events: EntertainmentEvent[];
  charts: Chart[];
  releases: Release[];
}

const byNewest = (a: Article, b: Article) => b.publishedAt.localeCompare(a.publishedAt);
const withAwards = (p: Person): Person => (p.awards || !awardsBySlug[p.slug] ? p : { ...p, awards: awardsBySlug[p.slug] });

export function localStore(): Store {
  return {
    articles: [...vmaArticles, ...local.articles, ...archive].sort(byNewest),
    people: [...realPeople, ...morePeople].map(withAwards),
    events: local.events,
    // Charts vêm sempre do código/robô (não são editados no admin).
    charts: liveCharts,
    releases: local.releases,
  };
}

interface Row {
  kind: ContentKind;
  id: string;
  status: ContentStatus;
  data: unknown;
  updated_at?: string;
}

/** Publicados do banco substituem os locais de mesmo id; ids ocultos no admin saem do site. */
function merge<T extends { id: string }>(localItems: T[], published: T[], hidden: Set<string>): T[] {
  const pub = new Set(published.map((p) => p.id));
  return [...published, ...localItems.filter((l) => !pub.has(l.id) && !hidden.has(l.id))];
}

export async function getStore(): Promise<Store> {
  const base = localStore();
  if (!supabaseEnabled()) return base;
  try {
    const [rows, statuses] = await Promise.all([
      sbSelect<Row>('content?select=kind,id,status,data&status=eq.published&updated_by=not.is.null'),
      // Com a chave de serviço dá para saber o que foi despublicado (a chave pública só enxerga publicados).
      supabaseWritable()
        ? sbSelect<Pick<Row, 'kind' | 'id' | 'status'>>('content?select=kind,id,status&status=neq.published&updated_by=not.is.null', { admin: true, revalidate: 60 })
        : Promise.resolve([]),
    ]);
    const hidden = (k: ContentKind) => new Set(statuses.filter((r) => r.kind === k).map((r) => r.id));
    const pick = <T,>(k: ContentKind) => rows.filter((r) => r.kind === k).map((r) => r.data as T);
    // Segurança: matéria com seção que não existe mais (ex.: abas removidas) não entra no site.
    const validSection = (a: Article) => (sectionKeys as readonly string[]).includes(a.section);
    return {
      articles: merge(base.articles, pick<Article>('article').filter(validSection), hidden('article')).sort(byNewest),
      people: merge(base.people, pick<Person>('person'), hidden('person')).map(withAwards),
      events: merge(base.events, pick<EntertainmentEvent>('event'), hidden('event')),
      charts: base.charts,
      releases: merge(base.releases, pick<Release>('release'), hidden('release')),
    };
  } catch (err) {
    console.error('[store] Supabase indisponível, usando conteúdo local:', err);
    return base;
  }
}

/** Admin: todos os status, sem cache. */
export interface AdminItem<T> {
  id: string;
  status: ContentStatus;
  updatedAt?: string;
  data: T;
}

export interface AdminStore {
  writable: boolean;
  articles: AdminItem<Article>[];
  people: AdminItem<Person>[];
  events: AdminItem<EntertainmentEvent>[];
}

export async function getAdminStore(): Promise<AdminStore> {
  const s = localStore();
  const wrap = <T extends { id: string }>(items: T[]): AdminItem<T>[] => items.map((d) => ({ id: d.id, status: 'published' as const, data: d }));
  let rows: Row[] = [];
  if (supabaseWritable()) {
    try {
      rows = await sbSelect<Row>('content?select=kind,id,status,data,updated_at&kind=in.(article,person,event)&updated_by=not.is.null', { admin: true });
    } catch (err) {
      console.error('[admin] erro lendo Supabase:', err);
    }
  }
  const combine = <T extends { id: string }>(k: ContentKind, localItems: T[]): AdminItem<T>[] => {
    const db = rows.filter((r) => r.kind === k).map((r) => ({ id: r.id, status: r.status, updatedAt: r.updated_at, data: r.data as T }));
    const ids = new Set(db.map((r) => r.id));
    return [...db, ...wrap(localItems.filter((l) => !ids.has(l.id)))];
  };
  return {
    writable: supabaseWritable(),
    articles: combine('article', s.articles).sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt)),
    people: combine('person', s.people),
    events: combine('event', s.events),
  };
}
