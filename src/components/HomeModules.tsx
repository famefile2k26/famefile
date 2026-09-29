import type { ReactNode } from 'react';
import {
  getArticles,
  getArticlesByIds,
  getLiveStreams,
  getPeople,
  getReleasesOfWeek,
  getTrendingPeople,
  getTrendSignals,
} from '@/lib/data';
import { cssVars, timeAgo } from '@/lib/format';
import { yearTopIds } from '@/lib/data/content-archive';
import { articlePath, getDictionary, sectionPath, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import {
  ArticleCard,
  ChartRow,
  LiveCard,
  PersonCard,
  ReleaseCard,
  TrendSignalCard,
} from './cards';
import { Sparkle } from './Logo';
import { ChartSwitcher } from './SectionViews';
import { SectionHeader } from './ui';

/**
 * Ordem e presença dos módulos da home. Editar este array reordena a página.
 * (Na Fase 2 isto vira configuração do CMS.)
 */
export const homeModules = [
  'breaking',
  'topStories',
  'brazil',
  'trendingPeople',
  'celebs',
  'latest',
  'yearTop',
  'musicAndCharts',
  'creatorRadar',
  'liveNow',
] as const;
export type HomeModule = (typeof homeModules)[number];

type Loader = (locale: Locale) => Promise<ReactNode>;

const Section = ({ children, id }: { children: ReactNode; id: string }) => (
  <section aria-labelledby={id} className="container-x">
    {children}
  </section>
);

const modules: Record<HomeModule, Loader> = {
  async breaking(locale) {
    const d = getDictionary(locale);
    const items = await getArticles({ limit: 6 });
    const list = items.map((a) => (
      <Link
        key={a.id}
        href={articlePath(locale, a.section, a.t[locale].slug, a.id)}
        className="flex shrink-0 items-center gap-2 pr-10 text-sm font-semibold hover:text-fame"
      >
        <span className="text-xs text-muted">{timeAgo(a.publishedAt, locale)}</span>
        {a.t[locale].headline}
      </Link>
    ));
    return (
      <div className="border-y border-line bg-surface/60">
        <div className="container-x flex items-center gap-4 py-3">
          <span className="slant-label shrink-0">
            {d.home.breaking} <Sparkle className="h-3 w-3 fill-white" />
          </span>
          <div className="ticker min-w-0 flex-1">
            <div className="ticker-track">
              {list}
              <div aria-hidden className="flex" inert>
                {list}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  async topStories(locale) {
    const d = getDictionary(locale);
    const [lead, ...rest] = await getArticles({ limit: 5 });
    if (!lead) return null;
    return (
      <Section id="h-top">
        <h2 id="h-top" className="sr-only">{d.home.topStories}</h2>
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ArticleCard article={lead} locale={locale} variant="lead" />
          </div>
          <div className="flex flex-col justify-between gap-5 lg:col-span-5">
            {rest.map((a) => (
              <ArticleCard key={a.id} article={a} locale={locale} variant="compact" />
            ))}
          </div>
        </div>
      </Section>
    );
  },

  async brazil(locale) {
    const d = getDictionary(locale);
    const [all, br] = await Promise.all([getArticles({ limit: 80 }), getPeople({ market: 'brazil' })]);
    const ids = new Set(br.map((p) => p.id));
    const items = all.filter((a) => a.personIds.some((id) => ids.has(id))).slice(0, 8);
    if (!items.length) return null;
    return (
      <Section id="h-brazil">
        <SectionHeader id="h-brazil" title={d.home.brazil} subtitle={d.home.brazilSub} accent="var(--color-charts)" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {items.map((a) => (
            <ArticleCard key={a.id} article={a} locale={locale} />
          ))}
        </div>
      </Section>
    );
  },

  async yearTop(locale) {
    const d = getDictionary(locale);
    const items = await getArticlesByIds(yearTopIds);
    if (!items.length) return null;
    return (
      <Section id="h-year">
        <SectionHeader id="h-year" title={d.home.yearTop} subtitle={d.home.yearTopSub} accent="var(--color-fame)" />
        <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {items.map((a, i) => (
            <li key={a.id} className="flex items-start gap-3">
              <span aria-hidden className="ff-head w-9 shrink-0 text-right text-3xl text-fame/80">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <ArticleCard article={a} locale={locale} variant="compact" />
              </div>
            </li>
          ))}
        </ol>
      </Section>
    );
  },

  async trendingPeople(locale) {
    const d = getDictionary(locale);
    const people = await getTrendingPeople(8);
    return (
      <Section id="h-trending">
        <SectionHeader id="h-trending" title={d.home.trendingPeople} subtitle={d.home.trendingPeopleSub} accent="var(--color-trending)" />
        <div className="rail">
          {people.map((p, i) => (
            <PersonCard key={p.id} person={p} locale={locale} rank={i + 1} />
          ))}
        </div>
      </Section>
    );
  },

  async celebs(locale) {
    const d = getDictionary(locale);
    const [br, latin, global] = await Promise.all([
      getPeople({ market: 'brazil' }),
      getPeople({ market: 'latin' }),
      getPeople({ market: 'global' }),
    ]);
    // intercala os mercados para a vitrine não ficar só de um lado
    const mixed = br.flatMap((p, i) => [p, latin[i], global[i]]).filter((p): p is NonNullable<typeof p> => !!p);
    return (
      <Section id="h-celebs">
        <SectionHeader
          id="h-celebs"
          title={d.profile.directory}
          subtitle={d.profile.directorySub}
          accent="var(--color-fame)"
          href={`/${locale}/p`}
          linkLabel={d.common.seeAll}
        />
        <div className="rail">
          {mixed.slice(0, 15).map((p) => (
            <PersonCard key={p.id} person={p} locale={locale} />
          ))}
        </div>
      </Section>
    );
  },

  async latest(locale) {
    const d = getDictionary(locale);
    const items = (await getArticles({ limit: 14 })).slice(5, 14);
    if (!items.length) return null;
    return (
      <Section id="h-latest">
        <SectionHeader
          id="h-latest"
          title={d.home.latest}
          subtitle={d.home.latestSub}
          accent="var(--color-news)"
          href={sectionPath(locale, 'news')}
          linkLabel={d.common.seeAll}
        />
        <div className="rail">
          {items.map((a) => (
            <ArticleCard key={a.id} article={a} locale={locale} />
          ))}
        </div>
      </Section>
    );
  },

  async musicAndCharts(locale) {
    const d = getDictionary(locale);
    const releases = await getReleasesOfWeek();
    return (
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <section aria-labelledby="h-releases" className="min-w-0">
          <SectionHeader
            id="h-releases"
            title={d.home.releases}
            subtitle={d.home.releasesSub}
            accent="var(--color-music)"
            href={sectionPath(locale, 'music')}
            linkLabel={d.common.seeAll}
          />
          <div className="rail lg:grid-flow-row! lg:grid-cols-3">
            {releases.map((r) => (
              <ReleaseCard key={r.id} release={r} locale={locale} />
            ))}
          </div>
        </section>
        <section aria-labelledby="h-charts" className="min-w-0">
          <SectionHeader
            id="h-charts"
            title={d.home.charts}
            subtitle={d.pages.charts.songsSub}
            accent="var(--color-charts)"
            href={sectionPath(locale, 'charts')}
            linkLabel={d.common.seeAll}
          />
          <ChartSwitcher locale={locale} limit={10} uid="hm" />
        </section>
      </div>
    );
  },

  async creatorRadar(locale) {
    const d = getDictionary(locale);
    const signals = await getTrendSignals();
    if (!signals.length) return null;
    return (
      <Section id="h-creators">
        <div
          className="rounded-[2rem] border border-creators/25 p-5 sm:p-8"
          style={{ background: 'radial-gradient(80% 120% at 100% 0%, rgb(255 214 10 / 0.12), transparent 60%), var(--color-surface)' }}
        >
          <SectionHeader
            id="h-creators"
            title={d.home.creatorRadar}
            subtitle={d.home.creatorRadarSub}
            accent="var(--color-creators)"
            href={sectionPath(locale, 'creators')}
            linkLabel={d.common.seeAll}
          />
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {signals.map((s) => (
                <TrendSignalCard key={s.id} signal={s} locale={locale} />
              ))}
            </div>
            <div className="rounded-3xl bg-black/30 p-5">
              <h3 className="font-display text-lg font-bold">{d.home.whatsWorking}</h3>
              <ul className="mt-3 space-y-2.5">
                {signals.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="truncate">{s.t[locale].name}</span>
                    <span className="shrink-0 font-bold text-creators">↑</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted">{d.home.whatsWorkingNote}</p>
            </div>
          </div>
        </div>
      </Section>
    );
  },

  async liveNow(locale) {
    const d = getDictionary(locale);
    const streams = await getLiveStreams();
    if (!streams.length) return null;
    return (
      <Section id="h-live">
        <SectionHeader
          id="h-live"
          title={d.home.liveNow}
          subtitle={d.home.liveNowSub}
          accent="var(--color-streamers)"
          href={sectionPath(locale, 'streamers')}
          linkLabel={d.common.seeAll}
        />
        <div className="rail md:grid-cols-3!" style={cssVars({ '--v': 'var(--color-streamers)' })}>
          {streams.map((s) => (
            <LiveCard key={s.id} stream={s} locale={locale} />
          ))}
        </div>
      </Section>
    );
  },
};

export async function HomeModules({ locale, order = homeModules }: { locale: Locale; order?: readonly HomeModule[] }) {
  const rendered = await Promise.all(order.map((m) => modules[m](locale)));
  return (
    <div id="feed" className="scroll-mt-28 space-y-14 pb-10 sm:space-y-20">
      {rendered.map((node, i) => (
        <div key={order[i]}>{node}</div>
      ))}
    </div>
  );
}
