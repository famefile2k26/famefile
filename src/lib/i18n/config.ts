export const locales = ['pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

export const localeMeta: Record<
  Locale,
  { htmlLang: string; ogLocale: string; label: string; short: string; flag: string }
> = {
  pt: { htmlLang: 'pt-BR', ogLocale: 'pt_BR', label: 'Português', short: 'PT', flag: '🇧🇷' },
  en: { htmlLang: 'en', ogLocale: 'en_US', label: 'English', short: 'EN', flag: '🇺🇸' },
  es: { htmlLang: 'es', ogLocale: 'es_ES', label: 'Español', short: 'ES', flag: '🇪🇸' },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Escolhe o idioma a partir do header Accept-Language. */
export function matchLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;
  const tags = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag = '', q] = part.trim().split(';q=');
      return { base: tag.toLowerCase().split('-')[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return tags.find((t) => isLocale(t.base))?.base as Locale | undefined ?? defaultLocale;
}
