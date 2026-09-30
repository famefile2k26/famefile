/** País do leitor na requisição atual (só em Server Components de páginas dinâmicas). */
import { cookies, headers } from 'next/headers';
import { COUNTRY_COOKIE, COUNTRY_HEADER, defaultCountryFor } from '@/lib/geo';
import type { Locale } from '@/lib/i18n/config';

export async function viewerCountry(locale: Locale): Promise<string> {
  try {
    const c = (await cookies()).get(COUNTRY_COOKIE)?.value;
    if (c && /^[A-Z]{2}$/.test(c)) return c;
    const h = (await headers()).get(COUNTRY_HEADER);
    if (h && /^[A-Z]{2}$/i.test(h)) return h.toUpperCase();
  } catch {
    /* fora de uma requisição (build/preview) */
  }
  return defaultCountryFor(locale);
}
