import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArticleCard } from '@/components/cards';
import { EntityText } from '@/components/EntityText';
import { KeepExploring } from '@/components/KeepExploring';
import { StoryExtras } from '@/components/StoryExtras';
import { ConfidenceBadge, Poster, SectionHeader, SectionLabel } from '@/components/ui';
import { brand } from '@/lib/brand';
import { getArticleById, getArticles, getPeople, getPeopleByIds } from '@/lib/data';
import type { Article } from '@/lib/data/types';
import { cssVars, jsonLd, timeAgo } from '@/lib/format';
import {
  articlePath,
  getDictionary,
  isLocale,
  localeMeta,
  parseArticleParam,
  pathsForAllLocales,
  personPath,
  sectionAccent,
  sectionSlugs,
  sectionPath,
  type Locale,
} from '@/lib/i18n';
import { localizedAlternates } from '@/lib/seo';

export const revalidate = 60;

type Props = { params: Promise<{ locale: string; section: string; slug: string }> };

const pathOf = (a: Article, l: Locale) => articlePath(l, a.section, a.t[l].slug, a.id);

/** Pré-gera todas as matérias do idioma (section + slug), o resto sai via ISR. */
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale as Locale;
  const articles = await getArticles({ limit: 1000 });
  return articles.map((a) => ({
    section: sectionSlugs[a.section][locale],
    slug: `${a.t[locale].slug}-${a.id}`,
  }));
}

async function load(params: Props['params']) {
  const { locale, section, slug } = await params;
  if (!isLocale(locale)) return null;
  const id = parseArticleParam(slug);
  const article = id ? await getArticleById(id) : undefined;
  if (!article) return null;
  return { locale, article, requested: `/${locale}/${section}/${slug}` };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await load(params);
  if (!r) return {};
  const t = r.article.t[r.locale];
  return {
    title: t.headline,
    description: t.summary,
    alternates: localizedAlternates(pathsForAllLocales((l) => pathOf(r.article, l)), r.locale),
    openGraph: {
      type: 'article',
      title: t.headline,
      description: t.summary,
      locale: localeMeta[r.locale].ogLocale,
      publishedTime: r.article.publishedAt,
      modifiedTime: r.article.updatedAt,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const r = await load(params);
  if (!r) notFound();
  const { locale, article } = r;

  // Slug antigo/outro idioma → URL canônica (o id é a fonte da verdade)
  const canonical = pathOf(article, locale);
  if (r.requested !== canonical) permanentRedirect(canonical);

  const d = getDictionary(locale);
  const t = article.t[locale];
  const accent = sectionAccent[article.section];
  const [allPeople, subjects, more] = await Promise.all([
    getPeople(),
    getPeopleByIds(article.personIds),
    getArticles({ section: article.section, excludeId: article.id, limit: 4 }),
  ]);
  const seen = new Set<string>();

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: t.headline,
    description: t.summary,
    inLanguage: localeMeta[locale].htmlLang,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: `${brand.siteUrl}${canonical}`,
    publisher: { '@type': 'Organization', name: brand.name },
    about: subjects.map((p) => ({ '@type': 'Person', name: p.publicName, url: `${brand.siteUrl}${personPath(locale, p.slug)}` })),
  };

  return (
    <div style={cssVars({ '--v': accent })}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <article className="container-x max-w-3xl! pt-8 sm:pt-12">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={sectionPath(locale, article.section)}>
            <SectionLabel accent={accent}>{d.nav[article.section]}</SectionLabel>
          </Link>
          <ConfidenceBadge value={article.confidence} d={d} showConfirmed />
          <time dateTime={article.publishedAt} className="text-xs text-muted">
            {timeAgo(article.publishedAt, locale)}
          </time>
        </div>
        <h1 className="ff-head mt-4 text-4xl sm:text-6xl">
          {t.headline}
        </h1>
        <p className="mt-4 text-lg text-fg/80">
          <EntityText text={t.summary} people={allPeople} locale={locale} seen={seen} />
        </p>
        <Poster hue={article.hue} image={article.image} eager className="mt-8 aspect-[16/10] rounded-3xl" />
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-fg/90">
          {t.body.map((paragraph, i) => (
            <p key={i}>
              <EntityText text={paragraph} people={allPeople} locale={locale} seen={seen} />
            </p>
          ))}
        </div>

        <StoryExtras article={article} locale={locale} />

        {subjects.length > 0 && (
          <aside className="mt-10 rounded-3xl border border-line bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">{d.article.keepFollowing}</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {subjects.map((p) => (
                <li key={p.id}>
                  <Link href={personPath(locale, p.slug)} className="flex items-center gap-2.5 rounded-full border border-line py-1 pl-1 pr-4 transition hover:border-white/30">
                    <Poster hue={p.hue} className="h-9 w-9 rounded-full" />
                    <span className="font-bold">{p.publicName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>

      <div className="container-x mt-16 space-y-14">
        {more.length > 0 && (
          <section aria-labelledby="more-in">
            <SectionHeader
              id="more-in"
              title={`${d.article.moreIn} ${d.nav[article.section]}`}
              accent={accent}
              href={sectionPath(locale, article.section)}
              linkLabel={d.common.seeAll}
            />
            <div className="rail">
              {more.map((a) => (
                <ArticleCard key={a.id} article={a} locale={locale} />
              ))}
            </div>
          </section>
        )}
        <KeepExploring locale={locale} excludeArticleId={article.id} />
      </div>
    </div>
  );
}
