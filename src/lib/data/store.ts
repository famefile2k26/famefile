/**
 * Fonte de dados do site.
 * - Supabase configurado → lê a tabela `content` (só publicados, cache de 60s + tag "content").
 * - Sem Supabase (dev/preview) → usa o conteúdo local versionado (content.ts + perfis).
 */
import { sbSelect, supabaseEnabled, supabaseWritable } from '@/lib/supabase';
import * as local from './content';
import { archive } from './content-archive';
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

export function localStore(): Store {
  return {
    articles: [...local.articles, ...archive].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    people: [...realPeople, ...morePeople],
    events: local.events,
    charts: local.charts,
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

function fromRows(rows: Row[]): Store {
  const pick = <T,>(k: ContentKind) => rows.filter((r) => r.kind === k).map((r) => r.data as T);
  return {
    articles: pick<Article>('article'),
    people: pick<Person>('person'),
    events: pick<EntertainmentEvent>('event'),
    charts: pick<Chart>('chart'),
    releases: pick<Release>('release'),
  };
}

export async function getStore(): Promise<Store> {
  if (!supabaseEnabled()) return localStore();
  try {
    const rows = await sbSelect<Row>('content?select=kind,id,status,data&status=eq.published');
    return rows.length ? fromRows(rows) : localStore();
  } catch (err) {
    console.error('[store] Supabase indisponível, usando conteúdo local:', err);
    return localStore();
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
  if (supabaseWritable()) {
    try {
      const rows = await sbSelect<Row>('content?select=kind,id,status,data,updated_at&kind=in.(article,person,event)', { admin: true });
      if (rows.length) {
        const pick = <T,>(k: ContentKind) =>
          rows.filter((r) => r.kind === k).map((r) => ({ id: r.id, status: r.status, updatedAt: r.updated_at, data: r.data as T }));
        return { writable: true, articles: pick<Article>('article'), people: pick<Person>('person'), events: pick<EntertainmentEvent>('event') };
      }
    } catch (err) {
      console.error('[admin] erro lendo Supabase:', err);
    }
  }
  const s = localStore();
  const wrap = <T extends { id: string }>(items: T[]) => items.map((d) => ({ id: d.id, status: 'published' as const, data: d }));
  return { writable: supabaseWritable(), articles: wrap(s.articles), people: wrap(s.people), events: wrap(s.events) };
}
