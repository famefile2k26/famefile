import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';
import { getArticles, getPeople } from '@/lib/data';
import {
  articlePath,
  homePath,
  pathsForAllLocales,
  personPath,
  sectionKeys,
  sectionPath,
  type Locale,
} from '@/lib/i18n';

/** Sitemap multilíngue: cada URL declara suas alternates hreflang. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, people] = await Promise.all([getArticles({ limit: 1000 }), getPeople()]);

  const entry = (paths: Record<Locale, string>, lastModified?: string): MetadataRoute.Sitemap =>
    (Object.keys(paths) as Locale[]).map((l) => ({
      url: `${brand.siteUrl}${paths[l]}`,
      lastModified,
      alternates: {
        languages: {
          'pt-BR': `${brand.siteUrl}${paths.pt}`,
          en: `${brand.siteUrl}${paths.en}`,
          es: `${brand.siteUrl}${paths.es}`,
        },
      },
    }));

  return [
    ...entry(pathsForAllLocales(homePath)),
    ...entry(pathsForAllLocales((l) => `/${l}/p`)),
    ...sectionKeys.flatMap((k) => entry(pathsForAllLocales((l) => sectionPath(l, k)))),
    ...articles.flatMap((a) =>
      entry(
        pathsForAllLocales((l) => articlePath(l, a.section, a.t[l].slug, a.id)),
        a.updatedAt ?? a.publishedAt,
      ),
    ),
    ...people.flatMap((p) => entry(pathsForAllLocales((l) => personPath(l, p.slug)))),
  ];
}
