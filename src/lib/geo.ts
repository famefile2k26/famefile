/**
 * Geolocalização do leitor (sem banco, sem cookies de rastreio):
 * a Vercel envia o país em `x-vercel-ip-country`. Usamos para escolher o idioma
 * na primeira visita e para priorizar as notícias mais relevantes para o país.
 */
import type { Locale } from '@/lib/i18n/config';

export const PT_COUNTRIES = new Set(['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL']);
export const ES_COUNTRIES = new Set([
  'AR', 'MX', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'ES', 'GQ',
]);
export const ANGLO = new Set(['US', 'CA', 'GB', 'IE', 'AU', 'NZ']);

export function localeForCountry(cc: string | null | undefined): Locale | undefined {
  if (!cc) return undefined;
  const c = cc.toUpperCase();
  if (PT_COUNTRIES.has(c)) return 'pt';
  if (ES_COUNTRIES.has(c)) return 'es';
  return 'en';
}

/** País padrão quando não há geolocalização (ex.: desenvolvimento local). */
export const defaultCountryFor = (locale: Locale) => (locale === 'pt' ? 'BR' : locale === 'es' ? 'AR' : 'US');

export type Region = 'BR' | 'LATAM' | 'ANGLO' | 'OTHER';
export function regionOf(cc: string): Region {
  const c = cc.toUpperCase();
  if (c === 'BR') return 'BR';
  if (ES_COUNTRIES.has(c)) return 'LATAM';
  if (ANGLO.has(c)) return 'ANGLO';
  return 'OTHER';
}

export const COUNTRY_COOKIE = 'ff_cc';
export const COUNTRY_HEADER = 'x-vercel-ip-country';
