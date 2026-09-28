import type { Metadata } from 'next';
import { defaultLocale, type Locale } from './i18n/config';

/** canonical + hreflang (incl. x-default) a partir do caminho em cada idioma. */
export function localizedAlternates(paths: Record<Locale, string>, current: Locale): Metadata['alternates'] {
  return {
    canonical: paths[current],
    languages: {
      'pt-BR': paths.pt,
      en: paths.en,
      es: paths.es,
      'x-default': paths[defaultLocale],
    },
  };
}
