import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard } from '@/components/cards';
import { KeepExploring } from '@/components/KeepExploring';
import { sectionViews } from '@/components/SectionViews';
import { SectionHeader } from '@/components/ui';
import { getArticles } from '@/lib/data';
import { viewerCountry } from '@/lib/viewer';
import { cssVars } from '@/lib/format';
import {
  getDictionary,
  isLocale,
  pathsForAllLocales,
  sectionAccent,
  sectionFromSlug,
  sectionKeys,
  sectionPath,
  sectionSlugs,
  type Locale,
} from '@/lib/i18n';
import { localizedAlternates } from '@/lib/seo';

// Ordem das matérias personalizada por país do leitor.
export const dynamic = 'force-dynamic';
export const dynamicParams = false;

type Props = { params: Promise<{ locale: string; section: string }> };

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  return sectionKeys.map((k) => ({ section: sectionSlugs[k][locale] }));
}

async function resolve(params: Props['params']) {
  const { locale, section } = await params;
  if (!isLocale(locale)) return null;
  const key = sectionFromSlug(locale, section);
  return key ? { locale, key } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return {};
  const d = getDictionary(r.locale);
  return {
    title: d.nav[r.key],
    alternates: localizedAlternates(pathsForAllLocales((l) => sectionPath(l, r.key)), r.locale),
  };
}

export default async function SectionPage({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  const { locale, key } = r;
  const d = getDictionary(locale);
  const articles = await getArticles({ section: key, limit: 24, country: await viewerCountry(locale) });
  const accent = sectionAccent[key];
  const View = sectionViews[key];
  const [lead, ...rest] = articles;

  return (
    <div style={cssVars({ '--v': accent })}>
      <header
        className="border-b border-line py-12 sm:py-16"
        style={{ background: `radial-gradient(60% 120% at 0% 0%, color-mix(in oklab, ${accent} 22%, transparent), transparent 70%)` }}
      >
        <div className="container-x">
          <h1 className="ff-head text-6xl sm:text-8xl" style={{ color: accent }}>
            {d.nav[key]}
          </h1>
        </div>
      </header>

      <div className="container-x mt-10 space-y-16">
        {View && <View locale={locale} />}

        {articles.length > 0 && (
          <section aria-labelledby="section-latest">
            {View && <SectionHeader id="section-latest" title={`${d.pages.latestIn} ${d.nav[key]}`} accent={accent} />}
            {!View && lead && (
              <div className="mb-10">
                <ArticleCard article={lead} locale={locale} variant="lead" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {(View ? articles : rest).map((a) => (
                <ArticleCard key={a.id} article={a} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {!View && articles.length === 0 && <p className="text-muted">{d.section.empty}</p>}
        <KeepExploring locale={locale} />
      </div>
    </div>
  );
}
