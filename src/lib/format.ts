import type { CSSProperties } from 'react';
import { localeMeta, type Locale } from './i18n/config';

export function compactNumber(n: number, locale: Locale): string {
  return new Intl.NumberFormat(localeMeta[locale].htmlLang, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

export function timeAgo(iso: string, locale: Locale, now = Date.now()): string {
  const seconds = (new Date(iso).getTime() - now) / 1000;
  const rtf = new Intl.RelativeTimeFormat(localeMeta[locale].htmlLang, {
    numeric: 'auto',
    style: 'short',
  });
  const abs = Math.abs(seconds);
  if (abs < 3600) return rtf.format(Math.round(seconds / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(seconds / 3600), 'hour');
  if (abs < 7 * 86400) return rtf.format(Math.round(seconds / 86400), 'day');
  // Mais de uma semana: data curta (ex.: "14 de set."), com ano se não for o ano corrente.
  const d = new Date(iso);
  return new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    day: 'numeric',
    month: 'short',
    ...(d.getFullYear() !== new Date(now).getFullYear() ? { year: 'numeric' as const } : {}),
  }).format(d);
}

export function shortDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeMeta[locale].htmlLang, {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso));
}

export const growth = (pct: number) => `${pct >= 0 ? '↑' : '↓'}${Math.abs(pct)}%`;

/** Custom properties tipadas para style={...}. */
export const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;

export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
