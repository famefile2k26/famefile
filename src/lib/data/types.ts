import type { Locale } from '@/lib/i18n/config';
import type { SectionKey } from '@/lib/i18n/routes';

/**
 * Modelo de domínio (espelha supabase/migrations/0001_foundation.sql).
 * Uma entidade = um id; textos por idioma ficam em `t`.
 */
export type Localized<T> = Record<Locale, T>;

export type Confidence = 'confirmed' | 'reported' | 'rumor' | 'unverified';
export type Risk = 'green' | 'yellow' | 'red';
export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'x' | 'twitch' | 'kick' | 'spotify';
export type PersonKind = 'singer' | 'actor' | 'creator' | 'streamer' | 'athlete';

/** Foto vinculada pelo admin (tabela images). Sem foto, a UI usa o placeholder visual. */
export interface ImageRef {
  url: string;
  alt?: string;
  credit?: string;
}

/** Proveniência obrigatória para qualquer dado externo. */
export interface Provenance {
  provider: string; // 'demo' | 'spotify' | 'youtube' | ...
  sourceUrl?: string;
  retrievedAt: string;
}

export type Market = 'global' | 'latin' | 'brazil';
export type WorkKind = 'album' | 'single' | 'ep' | 'film' | 'series' | 'tour' | 'project' | 'club';

export interface Work {
  title: string;
  year: number;
  kind: WorkKind;
  /** Capa (álbum/single), preenchida automaticamente. */
  cover?: string;
}

export interface Person {
  id: string;
  slug: string;
  publicName: string;
  aliases: string[];
  kinds: PersonKind[];
  country: string; // ISO-3166 alpha-2 (nacionalidade)
  market?: Market;
  /** Dados enciclopédicos (infobox) */
  legalName?: string;
  birthDate?: string; // YYYY-MM-DD
  deathDate?: string;
  birthPlace?: string; // cidade/estado, como escrito localmente
  activeSince?: number;
  genres?: string[];
  works?: Work[];
  /** Métricas de atenção — só existem quando há fonte (providers). */
  fameScore?: number; // 0–100
  trend7d?: number; // variação %
  hue: number; // placeholder visual quando não há foto
  image?: ImageRef;
  socials: Partial<Record<Platform, { handle: string; followers?: number }>>;
  /** Prêmios e indicações (com fontes). */
  awards?: Awards;
  t: Localized<{ role: string; bio: string; now?: string; highlights?: string[] }>;
}

/* ─── Premiações ───────────────────────────────────────────── */

export interface AwardTotal {
  award: string;
  wins: number | null;
  nominations: number | null;
}

export interface AwardItem {
  award: string;
  year: number | null;
  category: string;
  work?: string | null;
  result: 'won' | 'nominated';
}

export interface Awards {
  totals: AwardTotal[];
  items: AwardItem[];
  sources: string[];
}

export interface ArticleTranslation {
  slug: string;
  headline: string;
  summary: string;
  body: string[];
}

export interface Article {
  id: string;
  section: SectionKey;
  confidence: Confidence;
  risk: Risk;
  breaking?: boolean;
  publishedAt: string;
  updatedAt?: string;
  personIds: string[]; // article_entities
  hue: number;
  image?: ImageRef;
  /** "O que sabemos / o que ainda não sabemos" — histórias em evolução */
  factBox?: Localized<{ known: string[]; unknown: string[] }>;
  /** Excluída pelo admin (lixeira). */
  deleted?: boolean;
  /** Formato editorial: análise, especial (ex.: "conheça a mansão…"), lista, explicador. */
  format?: 'review' | 'feature' | 'list' | 'explainer';
  /** Linha do tempo "Receipts" */
  receipts?: { at: string; t: Localized<string> }[];
  /** Fontes consultadas (a matéria é texto próprio; as fontes ficam creditadas). */
  sources?: { name: string; url: string }[];
  t: Localized<ArticleTranslation>;
}

export interface Release {
  id: string;
  title: string;
  artistName: string;
  artistId?: string;
  type: 'single' | 'album' | 'ep';
  genre: string;
  releaseDate: string;
  hue: number;
  image?: ImageRef;
}

export interface ChartEntry {
  position: number;
  lastPosition: number | null;
  title: string;
  artistName: string;
  artistId?: string;
  hue: number;
  /** Capa da música, preenchida automaticamente. */
  cover?: string;
}

export interface Chart {
  id: string;
  platform?: 'spotify' | 'apple';
  kind?: 'weekly' | 'daily';
  title: Localized<string>;
  region: string;
  periodEnd?: string;
  provenance: Provenance;
  entries: ChartEntry[];
}

export interface TrendSignal {
  id: string;
  kind: 'sound' | 'format' | 'topic' | 'video';
  platform: Platform;
  /** Variação informada pela fonte (nunca estimada). */
  growthPct?: number;
  /** Posição no ranking da fonte (ex.: TikTok Creative Center). */
  rank?: number;
  videos?: number;
  /** País do ranking (ISO2) ou GLOBAL. */
  region?: string;
  sourceUrl?: string;
  image?: ImageRef;
  /** Data da coleta (ISO). */
  collectedAt?: string;
  hue: number;
  t: Localized<{ name: string; note: string }>;
}

export interface ViralClip {
  id: string;
  channel: string;
  personId?: string;
  platform: Platform;
  views: number;
  windowHours: number; // views ganhas nesse intervalo
  hue: number;
  t: Localized<{ title: string }>;
}

export type EventKind = 'release' | 'show' | 'award' | 'premiere' | 'reality';

export interface EntertainmentEvent {
  id: string;
  kind: EventKind;
  startsAt: string;
  hue: number;
  personIds: string[];
  sourceUrl?: string;
  t: Localized<{ title: string; place: string }>;
}

export interface LiveStream {
  id: string;
  channel: string;
  personId?: string;
  platform: Platform;
  viewers: number;
  hue: number;
  t: Localized<{ title: string }>;
}
