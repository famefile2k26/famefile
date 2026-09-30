/**
 * Fonte de dados do site.
 *
 * Base = conteúdo versionado no código (matérias, perfis, charts, agenda).
 * Supabase = camada por cima: o que o admin (ou o robô) publica substitui o item de mesmo id;
 * itens despublicados no admin (rascunho/revisão/rejeitado) somem do site mesmo que existam no código.
 * Assim, conteúdo novo que chega pelo código aparece no ar sem precisar reimportar o banco.
 * Só contam linhas com `updated_by` (gravadas pelo admin/robô); as do seed inicial são ignoradas.
 */
import { isBlockedArticle, isBlockedPerson } from '@/lib/editorial';
import { normalizeSection } from '@/lib/i18n/routes';
import { sbSelect, supabaseEnabled, supabaseWritable } from '@/lib/supabase';
import { awardsBySlug } from './awards';
import { liveCharts } from './charts-live';
import { albumCover, articleCover, coverImage, personPhoto, songCover } from './covers';
import * as local from './content';
import { archive } from './content-archive';
import { brArticles, brEvents } from './content-br';
import { vmaArticles } from './content-vma';
import { realPeople } from './people';
import { morePeople } from './people-more';
import { extraPeople } from './people-extra';
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

/* Capas automáticas (covers.json): só entram onde não há imagem definida pelo admin. */
const nameById = new Map([...realPeople, ...morePeople, ...extraPeople].map((p) => [p.id, p.publicName]));
/** Sem foto própria: capa do álbum/música citado → foto do artista principal da matéria. */
const withArticleCover = (raw: Article): Article => {
  const section = normalizeSection(raw.section);
  const a = section === raw.section ? raw : { ...raw, section };
  if (a.image) return a;
  const image =
    articleCover(a.id, a.t.pt.headline) ??
    a.personIds.map((id) => personPhoto(id, nameById.get(id) ?? id)).find(Boolean);
  return image ? { ...a, image } : a;
};
/** Evita shows duplicados (mesmo artista no mesmo dia). */
const dedupeEvents = (list: EntertainmentEvent[]) => {
  const seen = new Set<string>();
  return list.filter((e) => {
    const k = `${e.personIds.slice().sort().join(',')}|${e.startsAt.slice(0, 10)}`;
    if (e.personIds.length && seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};
const withPhoto = (p: Person): Person => (p.image ? p : { ...p, image: personPhoto(p.id, p.publicName) });
const withWorkCovers = (p: Person): Person =>
  p.works?.length
    ? {
        ...p,
        works: p.works.map((w) =>
          w.cover ? w : { ...w, cover: w.kind === 'single' ? songCover(w.title, p.publicName) : w.kind === 'album' || w.kind === 'ep' ? albumCover(w.title, p.publicName) : undefined },
        ),
      }
    : p;
const chartsWithCovers = liveCharts.map((c) => ({
  ...c,
  entries: c.entries.map((e) => (e.cover ? e : { ...e, cover: songCover(e.title, e.artistName) })),
}));
const withReleaseCover = (r: Release): Release =>
  r.image ? r : { ...r, image: coverImage(r.type === 'single' ? songCover(r.title, r.artistName) : albumCover(r.title, r.artistName) ?? songCover(r.title, r.artistName), `${r.title} — ${r.artistName}`) };

export function localStore(): Store {
  return {
    articles: [...brArticles, ...vmaArticles, ...local.articles, ...archive].filter((a) => !isBlockedArticle(a)).map(withArticleCover).sort(byNewest),
    people: [...realPeople, ...morePeople, ...extraPeople].filter((p) => !isBlockedPerson(p)).map(withAwards).map(withWorkCovers).map(withPhoto),
    events: dedupeEvents([...local.events, ...brEvents]).sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    // Charts vêm sempre do código/robô (não são editados no admin).
    charts: chartsWithCovers,
    releases: local.releases.map(withReleaseCover),
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
    return {
      articles: merge(base.articles, pick<Article>('article').filter((a) => !isBlockedArticle(a)).map(withArticleCover), hidden('article')).sort(byNewest),
      people: merge(base.people, pick<Person>('person').filter((p) => !isBlockedPerson(p)).map(withWorkCovers).map(withPhoto), hidden('person')).map(withAwards),
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
