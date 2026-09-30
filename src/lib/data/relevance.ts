/**
 * Relevância por país: ordena matérias misturando "mais recente" com "mais perto do leitor".
 * Sinais: país dos famosos citados, mercado (brasil/latino/global) e domínio das fontes (.br, .ar, .mx...).
 */
import { ANGLO, ES_COUNTRIES, regionOf } from '@/lib/geo';
import type { Article, Person } from './types';

const TLD: Record<string, string> = {
  br: 'BR', ar: 'AR', mx: 'MX', co: 'CO', cl: 'CL', pe: 'PE', es: 'ES', uy: 'UY', ve: 'VE', ec: 'EC',
  uk: 'GB', ie: 'IE', au: 'AU', ca: 'CA', pt: 'PT', kr: 'KR', jp: 'JP', fr: 'FR', de: 'DE', it: 'IT',
};
const US_OUTLETS = /(billboard\.com|variety\.com|deadline\.com|hollywoodreporter\.com|people\.com|rollingstone\.com|justjared\.com|tmz\.com|eonline\.com|cnn\.com|nbc|cbs|abcnews|nytimes|usatoday|forbes\.com|npr\.org|pbs\.org|vulture\.com|ew\.com)/;

export function articleCountries(a: Article, byId: Map<string, Person>): Set<string> {
  const out = new Set<string>();
  for (const id of a.personIds) {
    const p = byId.get(id);
    if (p?.country) out.add(p.country.toUpperCase());
  }
  for (const s of a.sources ?? []) {
    try {
      const host = new URL(s.url).hostname;
      const tld = host.split('.').pop() ?? '';
      if (TLD[tld]) out.add(TLD[tld]);
      else if (US_OUTLETS.test(host)) out.add('US');
    } catch {
      /* url inválida */
    }
  }
  return out;
}

/** Pontos extras de relevância (em "dias" de vantagem sobre a ordem cronológica). */
export function relevanceBoost(a: Article, cc: string, byId: Map<string, Person>): number {
  const countries = articleCountries(a, byId);
  const region = regionOf(cc);
  const markets = new Set(a.personIds.map((id) => byId.get(id)?.market).filter(Boolean));
  let boost = 0;
  if (countries.has(cc)) boost += 2;
  if (region === 'BR' && markets.has('brazil')) boost += 1;
  if (region === 'LATAM' && ([...countries].some((c) => ES_COUNTRIES.has(c)) || markets.has('latin'))) boost += 1;
  if (region === 'ANGLO' && ([...countries].some((c) => ANGLO.has(c)) || markets.has('global'))) boost += 1;
  if (region === 'OTHER' && markets.has('global')) boost += 0.5;
  // Notícias locais de outro país pesam menos para quem está longe (ex.: fofoca de reality BR para um leitor dos EUA).
  if (region !== 'BR' && countries.size && [...countries].every((c) => c === 'BR')) boost -= 1;
  return boost;
}

export function rankForCountry(list: Article[], cc: string, byId: Map<string, Person>): Article[] {
  const DAY = 864e5;
  return list
    .map((a) => ({ a, k: Date.parse(a.publishedAt) + relevanceBoost(a, cc, byId) * 0.75 * DAY }))
    .sort((x, y) => y.k - x.k)
    .map((x) => x.a);
}
