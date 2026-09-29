/**
 * Perfis adicionados pela pesquisa/robô (JSON), no mesmo formato de semente de people-more.ts.
 * Fotos saem automaticamente do workflow de capas (Wikipedia/Deezer).
 */
import type { Market, Person, PersonKind, Work } from './types';
import seeds from './people-extra.json';

type Lang = [role: string, bio: string, highlights?: string[]];
interface Seed {
  slug: string;
  name: string;
  market: Market;
  kinds: PersonKind[];
  country: string;
  ig?: string | null;
  legalName?: string | null;
  birthDate?: string | null;
  birthPlace?: string | null;
  activeSince?: number | null;
  genres?: string[];
  aliases?: string[];
  works?: Work[];
  pt: Lang;
  en: Lang;
  es: Lang;
}

const L = (s: Seed) => ({
  pt: { role: s.pt[0], bio: s.pt[1], highlights: s.pt[2] },
  en: { role: s.en[0], bio: s.en[1], highlights: s.en[2] },
  es: { role: s.es[0], bio: s.es[1], highlights: s.es[2] },
});

export const extraPeople: Person[] = (seeds as unknown as Seed[]).map((s, i) => ({
  id: s.slug,
  slug: s.slug,
  publicName: s.name,
  aliases: s.aliases ?? [],
  kinds: s.kinds,
  country: s.country,
  market: s.market,
  legalName: s.legalName ?? undefined,
  birthDate: s.birthDate ?? undefined,
  birthPlace: s.birthPlace ?? undefined,
  activeSince: s.activeSince ?? undefined,
  genres: s.genres,
  works: s.works,
  hue: (i * 61 + 25) % 360,
  socials: s.ig ? { instagram: { handle: s.ig } } : {},
  t: L(s),
}));
