import { isLocale, locales, type Locale } from './config';

/** Chaves internas das verticais — estáveis, independentes de idioma. */
export const sectionKeys = [
  'news',
  'music',
  'charts',
  'creators',
  'streamers',
  'movies-tv',
] as const;
export type SectionKey = (typeof sectionKeys)[number];

/** Slug público de cada vertical, por idioma. */
export const sectionSlugs: Record<SectionKey, Record<Locale, string>> = {
  news: { pt: 'noticias', en: 'news', es: 'noticias' },
  music: { pt: 'musica', en: 'music', es: 'musica' },
  charts: { pt: 'charts', en: 'charts', es: 'charts' },
  creators: { pt: 'creators', en: 'creators', es: 'creators' },
  streamers: { pt: 'streamers', en: 'streamers', es: 'streamers' },
  'movies-tv': { pt: 'filmes-e-series', en: 'movies-tv', es: 'cine-y-series' },
};

/** Cor de acento de cada vertical (tokens em globals.css). */
export const sectionAccent: Record<SectionKey, string> = {
  news: 'var(--color-news)',
  music: 'var(--color-music)',
  charts: 'var(--color-charts)',
  creators: 'var(--color-creators)',
  streamers: 'var(--color-streamers)',
  'movies-tv': 'var(--color-movies)',
};

/** Abas antigas que foram unidas a Notícias — links velhos continuam funcionando (redirecionam). */
const legacySlugs = new Set(['fofocas', 'gossip', 'chismes', 'eventos', 'events', 'estilo', 'style']);

export function sectionFromSlug(locale: Locale, slug: string): SectionKey | undefined {
  return sectionKeys.find((k) => sectionSlugs[k][locale] === slug) ?? (legacySlugs.has(slug) ? 'news' : undefined);
}

/** Qualquer seção que não existe mais vira Notícias. */
export function normalizeSection(section: string): SectionKey {
  return (sectionKeys as readonly string[]).includes(section) ? (section as SectionKey) : 'news';
}

export const homePath = (locale: Locale) => `/${locale}`;
export const sectionPath = (locale: Locale, key: SectionKey) => `/${locale}/${sectionSlugs[key][locale]}`;
export const personPath = (locale: Locale, slug: string) => `/${locale}/p/${slug}`;

/**
 * Matérias: /{locale}/{secao}/{slug-localizado}-{id}.
 * O id no fim garante que trocar de idioma nunca quebra o link:
 * a página resolve pelo id e redireciona para o slug canônico.
 */
export const articlePath = (locale: Locale, section: SectionKey, slug: string, id: string) =>
  `${sectionPath(locale, section)}/${slug}-${id}`;

export function parseArticleParam(param: string): string | undefined {
  return /-(\d+)$/.exec(param)?.[1];
}

/** Equivalente da URL atual em outro idioma (usado no seletor e no hreflang). */
export function switchLocalePath(pathname: string, target: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  const current = parts[0];
  if (!isLocale(current)) return `/${target}`;
  parts[0] = target;
  const second = parts[1];
  if (second && second !== 'p') {
    const key = sectionFromSlug(current, second);
    if (key) parts[1] = sectionSlugs[key][target];
  }
  return `/${parts.join('/')}`;
}

export function pathsForAllLocales(build: (l: Locale) => string): Record<Locale, string> {
  return Object.fromEntries(locales.map((l) => [l, build(l)])) as Record<Locale, string>;
}
