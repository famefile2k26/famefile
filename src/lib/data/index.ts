/**
 * Repositório: a única porta de entrada para dados do site.
 * Lê do Supabase (tabela `content`) quando configurado, ou do conteúdo local (dev/preview) — ver store.ts.
 *
 * Providers ainda sem fonte real (trends de creators, lives, clips, Fame Score) devolvem listas vazias
 * e os módulos correspondentes ficam ocultos, em vez de exibir dados inventados.
 */
import type { SectionKey } from '@/lib/i18n/routes';
import { getStore } from './store';
import type { Article, Chart, LiveStream, Market, Person, TrendSignal, ViralClip } from './types';

const byNewest = (a: Article, b: Article) => b.publishedAt.localeCompare(a.publishedAt);

/* ─── Matérias ──────────────────────────────────────────────── */

export async function getArticles(
  opts: { section?: SectionKey; personId?: string; excludeId?: string; limit?: number } = {},
): Promise<Article[]> {
  const { articles } = await getStore();
  return articles
    .filter((a) => !opts.section || a.section === opts.section)
    .filter((a) => !opts.personId || a.personIds.includes(opts.personId))
    .filter((a) => a.id !== opts.excludeId)
    .sort(byNewest)
    .slice(0, opts.limit ?? 50);
}

/** Matérias na ordem dos ids pedidos (curadoria editorial). */
export async function getArticlesByIds(ids: readonly string[]): Promise<Article[]> {
  const byId = new Map((await getStore()).articles.map((a) => [a.id, a]));
  return ids.map((id) => byId.get(id)).filter((a): a is Article => !!a);
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  return (await getStore()).articles.find((a) => a.id === id);
}

/* ─── Pessoas ───────────────────────────────────────────────── */

export async function getPeople(opts: { market?: Market } = {}): Promise<Person[]> {
  return (await getStore()).people.filter((p) => !opts.market || p.market === opts.market);
}

export async function getPersonBySlug(slug: string): Promise<Person | undefined> {
  return (await getStore()).people.find((p) => p.slug === slug);
}

export async function getPeopleByIds(ids: string[]): Promise<Person[]> {
  const { people } = await getStore();
  const byId = new Map(people.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is Person => !!p);
}

/** Relacionados: mesmo mercado, priorizando quem tem a mesma função. */
export async function getRelatedPeople(person: Person, limit = 8): Promise<Person[]> {
  const shares = (p: Person) => Number(p.kinds.some((k) => person.kinds.includes(k)));
  return (await getStore()).people
    .filter((p) => p.id !== person.id && p.market && p.market === person.market)
    .sort((a, b) => shares(b) - shares(a))
    .slice(0, limit);
}

/**
 * Quem está em alta. Sem Fame Score real ainda, o sinal usado é o noticiário:
 * pessoas mais citadas nas matérias recentes (peso maior para as mais novas).
 */
export async function getTrendingPeople(limit = 10): Promise<Person[]> {
  const { articles, people } = await getStore();
  const byId = new Map(people.map((p) => [p.id, p]));
  const score = new Map<string, number>();
  [...articles].sort(byNewest).forEach((a, i) => {
    const weight = 1 / (1 + i * 0.25);
    a.personIds.forEach((id) => score.set(id, (score.get(id) ?? 0) + weight));
  });
  return [...score.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => byId.get(id))
    .filter((p): p is Person => !!p)
    .slice(0, limit);
}

/** Rankings de atenção: só quando houver métricas com fonte. */
async function withMetrics() {
  return (await getStore()).people.filter((p) => p.fameScore !== undefined && p.trend7d !== undefined);
}

export async function getFameChart(limit = 10): Promise<Person[]> {
  return (await withMetrics()).sort((a, b) => (b.fameScore ?? 0) - (a.fameScore ?? 0)).slice(0, limit);
}

export async function getBiggestProfiles(limit = 10) {
  return (await withMetrics())
    .map((p) => ({ person: p, total: Object.values(p.socials).reduce((s, acc) => s + (acc?.followers ?? 0), 0) }))
    .filter((x) => x.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

/* ─── Música e charts ───────────────────────────────────────── */

export async function getReleasesOfWeek() {
  return (await getStore()).releases;
}

export async function getCharts(): Promise<Chart[]> {
  return (await getStore()).charts;
}

export async function getChart(id: string): Promise<Chart | undefined> {
  return (await getStore()).charts.find((c) => c.id === id);
}

/** Regra do site: o chart padrão é sempre o GLOBAL (Spotify); o leitor troca plataforma e país. */
export async function getTopSongsChart(): Promise<Chart> {
  const { charts } = await getStore();
  return charts.find((c) => c.platform === 'spotify' && c.region === 'GLOBAL') ?? charts[0]!;
}

/** Ordem de países oferecida no seletor (Global sempre primeiro). */
export const chartRegions = ['GLOBAL', 'BR', 'US', 'MX', 'AR', 'CO', 'ES', 'PT', 'GB'] as const;

/** Todos os charts de músicas agrupados para o seletor Spotify/Apple × país. */
export async function getSongCharts(): Promise<Chart[]> {
  const { charts } = await getStore();
  return charts
    .filter((c) => c.platform)
    .sort((a, b) => chartRegions.indexOf(a.region as (typeof chartRegions)[number]) - chartRegions.indexOf(b.region as (typeof chartRegions)[number]));
}

/* ─── Creators / streamers (aguardando providers) ──────────── */

export async function getTrendSignals(): Promise<TrendSignal[]> {
  return [];
}
export async function getViralSounds(): Promise<TrendSignal[]> {
  return [];
}
export async function getLiveStreams(): Promise<LiveStream[]> {
  return [];
}
export async function getViralClips(): Promise<ViralClip[]> {
  return [];
}

/* ─── Agenda ────────────────────────────────────────────────── */

export async function getEvents(opts: { fromDays?: number; toDays?: number; personId?: string } = {}) {
  const now = Date.now();
  const from = now + (opts.fromDays ?? 0) * 86_400_000 - 12 * 3_600_000;
  const to = now + (opts.toDays ?? 120) * 86_400_000;
  return (await getStore()).events
    .filter((e) => {
      const t = new Date(e.startsAt).getTime();
      return t >= from && t <= to && (!opts.personId || e.personIds.includes(opts.personId));
    })
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
