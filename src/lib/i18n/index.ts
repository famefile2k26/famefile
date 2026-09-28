import type { Locale } from './config';
import { en } from './dictionaries/en';
import { es } from './dictionaries/es';
import { pt, type Dictionary } from './dictionaries/pt';

const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export * from './config';
export * from './routes';
