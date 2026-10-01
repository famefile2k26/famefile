import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard, PersonCard, platformName } from '@/components/cards';
import { KeepExploring } from '@/components/KeepExploring';
import { ProfileAwards } from '@/components/ProfileAwards';
import { Tabs } from '@/components/Tabs';
import { Sparkle } from '@/components/Logo';
import { initialsOf, Poster, SectionHeader } from '@/components/ui';
import { brand } from '@/lib/brand';
import { getArticles, getCharts, getEvents, getPeople, getPersonBySlug, getRelatedPeople } from '@/lib/data';
import type { Person, Platform } from '@/lib/data/types';
import { compactNumber, cssVars, growth, jsonLd } from '@/lib/format';
import { getDictionary, isLocale, localeMeta, pathsForAllLocales, personPath, type Locale } from '@/lib/i18n';
import { localizedAlternates } from '@/lib/seo';

export const revalidate = 300;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const people = await getPeople();
  return people.map((p) => ({ slug: p.slug }));
}

async function load(params: Props['params']) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return null;
  const person = await getPersonBySlug(slug);
  return person ? { locale, person } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await load(params);
  if (!r) return {};
  const t = r.person.t[r.locale];
  return {
    title: r.person.publicName,
    description: `${t.role}. ${t.bio}`.slice(0, 160),
    alternates: localizedAlternates(pathsForAllLocales((l) => personPath(l, r.person.slug)), r.locale),
    openGraph: {
      type: 'profile',
      title: r.person.publicName,
      description: t.bio,
      images: r.person.image ? [r.person.image.url] : undefined,
    },
  };
}

const socialBase: Record<Platform, string> = {
  instagram: 'https://www.instagram.com/',
  tiktok: 'https://www.tiktok.com/@',
  youtube: 'https://www.youtube.com/@',
  x: 'https://x.com/',
  twitch: 'https://www.twitch.tv/',
  kick: 'https://kick.com/',
  spotify: 'https://open.spotify.com/search/',
};
const socialUrl = (p: Platform, handle: string) => `${socialBase[p]}${encodeURIComponent(handle)}`;

function ageOn(birth: string, now = new Date()) {
  const b = new Date(`${birth}T12:00:00Z`);
  let age = now.getUTCFullYear() - b.getUTCFullYear();
  const m = now.getUTCMonth() - b.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < b.getUTCDate())) age--;
  return age;
}

/** Infobox estilo enciclopédia. */
function Infobox({ person, locale }: { person: Person; locale: Locale }) {
  const d = getDictionary(locale);
  const f = d.profile;
  const lang = localeMeta[locale].htmlLang;
  const rows: [string, string][] = [];
  if (person.legalName) rows.push([f.fullName, person.legalName]);
  if (person.birthDate) {
    const date = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
      new Date(`${person.birthDate}T12:00:00Z`),
    );
    const until = person.deathDate ? new Date(`${person.deathDate}T12:00:00Z`) : undefined;
    rows.push([f.born, until ? date : `${date} (${f.age.replace('{n}', String(ageOn(person.birthDate)))})`]);
    if (person.deathDate && until) {
      const died = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(until);
      rows.push([f.died, `${died} (${f.age.replace('{n}', String(ageOn(person.birthDate, until)))})`]);
    }
  }
  if (person.birthPlace) rows.push([f.birthPlace, person.birthPlace]);
  rows.push([f.nationality, new Intl.DisplayNames([lang], { type: 'region' }).of(person.country) ?? person.country]);
  rows.push([f.occupation, person.t[locale].role]);
  if (person.activeSince) rows.push([f.activeSince, String(person.activeSince)]);
  if (person.genres?.length) rows.push([f.genres, person.genres.join(', ')]);

  return (
    <section aria-labelledby="facts" className="overflow-hidden rounded-3xl border border-line bg-surface">
      <h2 id="facts" className="bg-fame-gradient px-5 py-3 font-display text-sm font-black uppercase italic tracking-wide text-white">
        {f.facts}
      </h2>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[42%_1fr] gap-3 px-5 py-3 text-sm">
            <dt className="text-muted">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default async function PersonPage({ params }: Props) {
  const r = await load(params);
  if (!r) notFound();
  const { locale, person } = r;
  const d = getDictionary(locale);
  const f = d.profile;
  const t = person.t[locale];
  const [news, related, shows, charts] = await Promise.all([
    getArticles({ personId: person.id, limit: 8 }),
    getRelatedPeople(person, 8),
    getEvents({ personId: person.id, toDays: 400 }),
    getCharts(),
  ]);
  const chartHits = charts.flatMap((c) =>
    c.entries.filter((e) => e.artistId === person.id).map((e) => ({ chart: c, entry: e })),
  );
  const lang = localeMeta[locale].htmlLang;
  const socials = Object.entries(person.socials) as [Platform, { handle: string; followers?: number }][];

  const structured = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.publicName,
    alternateName: [person.legalName, ...person.aliases].filter(Boolean),
    birthDate: person.birthDate,
    birthPlace: person.birthPlace,
    nationality: person.country,
    jobTitle: t.role,
    description: t.bio,
    image: person.image?.url,
    url: `${brand.siteUrl}${personPath(locale, person.slug)}`,
  };

  return (
    <div style={cssVars({ '--v': 'var(--color-fame)' })}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />

      {/* HERO */}
      <header className="relative overflow-hidden border-b border-line">
        <Poster hue={person.hue} image={person.image} className="absolute inset-0 scale-110 opacity-40 blur-2xl" />
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/60 to-transparent" />
        <div className="container-x relative flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:py-14">
          <div className="relative shrink-0">
            <Poster
              hue={person.hue}
              image={person.image}
              eager
              initials={initialsOf(person.publicName)}
              className="aspect-[4/5] w-40 rounded-[2rem] shadow-2xl shadow-black/60 ring-1 ring-white/15 sm:w-56"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {person.market && <span className="pill bg-fame-gradient text-white">{f.markets[person.market]}</span>}
              <span className="text-sm font-semibold text-fg/75">{t.role}</span>
            </div>
            <h1 className="ff-head mt-2 text-5xl sm:text-8xl">{person.publicName}</h1>
            {(person.fameScore !== undefined || person.trend7d !== undefined) && (
              <div className="mt-3 flex flex-wrap gap-2 text-sm font-bold">
                {person.fameScore !== undefined && (
                  <span className="rounded-full bg-black/40 px-3 py-1 backdrop-blur">
                    🔥 {d.common.fameScore} {person.fameScore}
                  </span>
                )}
                {person.trend7d !== undefined && (
                  <span className="bg-fame-gradient rounded-full px-3 py-1 text-white">
                    {growth(person.trend7d)} {d.person.last7d}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container-x mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0">
          <Tabs
            uid="pf"
            label={f.tabs.label}
            tabs={[
              {
                id: 'overview',
                label: f.tabs.overview,
                content: (
                  <div className="space-y-12">
          {t.now && (
            <section aria-labelledby="now" className="rounded-3xl border border-fame/30 bg-fame/[0.07] p-5">
              <h2 id="now" className="text-xs font-extrabold uppercase tracking-wider text-fame">
                {d.person.now}
              </h2>
              <p className="mt-2 text-lg font-semibold">{t.now}</p>
            </section>
          )}

          <section aria-labelledby="about">
            <SectionHeader id="about" title={d.person.about} accent="var(--color-fame)" />
            <p className="max-w-2xl text-lg leading-relaxed text-fg/85">{t.bio}</p>
          </section>

          {t.highlights && t.highlights.length > 0 && (
            <section aria-labelledby="highlights">
              <SectionHeader id="highlights" title={f.highlights} accent="var(--color-viral)" />
              <ul className="grid gap-3">
                {t.highlights.map((h) => (
                  <li key={h} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
                    <Sparkle className="mt-1 h-4 w-4 shrink-0 fill-viral" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {person.works && person.works.length > 0 && (
            <section aria-labelledby="works">
              <SectionHeader id="works" title={f.works} accent="var(--color-music)" />
              <ol className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {person.works.map((w, i) => (
                  <li key={`${w.title}-${w.year}`}>
                    <Poster
                      hue={(person.hue + i * 38) % 360}
                      image={w.cover ? { url: w.cover, alt: `${w.title} — ${person.publicName}` } : undefined}
                      className="grid aspect-square place-items-center rounded-2xl"
                    />
                    <p className="mt-2 line-clamp-2 font-display font-black uppercase italic leading-tight tracking-tight">{w.title}</p>
                    <p className="text-xs text-muted">
                      {f.workKinds[w.kind]} · {w.year}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {chartHits.length > 0 && (
            <section aria-labelledby="in-charts">
              <SectionHeader id="in-charts" title={f.inCharts} accent="var(--color-charts)" />
              <ul className="grid gap-3 sm:grid-cols-2">
                {chartHits.map(({ chart, entry }) => (
                  <li key={`${chart.id}-${entry.position}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
                    <span className="text-fame-gradient w-10 pr-1 text-center font-display text-3xl font-black italic">#{entry.position}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-bold">{entry.title}</span>
                      <span className="block text-xs text-muted">{chart.title[locale]} · {chart.region === 'GLOBAL' ? d.pages.charts.global : chart.region}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

                  </div>
                ),
              },
              { id: 'awards', label: f.tabs.awards, content: <ProfileAwards awards={person.awards} locale={locale} /> },
              {
                id: 'shows',
                label: `${f.tabs.shows}${shows.length ? ` (${shows.length})` : ''}`,
                content: shows.length ? (
                  <ul className="divide-y divide-line rounded-3xl border border-line bg-surface">
                {shows.map((ev) => {
                  const date = new Date(ev.startsAt);
                  return (
                    <li key={ev.id} className="flex items-center gap-4 px-4 py-3">
                      <span className="w-14 shrink-0 text-center">
                        <span className="block font-display text-2xl font-black italic leading-none">{date.getUTCDate()}</span>
                        <span className="text-[11px] font-bold uppercase text-muted">
                          {new Intl.DateTimeFormat(lang, { month: 'short', timeZone: 'UTC' }).format(date)}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold">{ev.t[locale].title}</span>
                        <span className="block truncate text-sm text-muted">{ev.t[locale].place}</span>
                      </span>
                      {ev.sourceUrl && (
                        <a href={ev.sourceUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs text-muted hover:text-fg">
                          {d.common.source} ↗
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
                ) : (
                  <p className="text-sm text-muted">{f.noShows}</p>
                ),
              },
              {
                id: 'news',
                label: f.tabs.news,
                content: news.length ? (
                  <div className="space-y-5">
                {news.map((a) => (
                  <ArticleCard key={a.id} article={a} locale={locale} variant="compact" />
                ))}
              </div>
                ) : (
                  <p className="text-sm text-muted">{f.noNews}</p>
                ),
              },
            ]}
          />
        </div>

        <aside className="space-y-8">
          <Infobox person={person} locale={locale} />
          {socials.length > 0 && (
            <section aria-labelledby="socials">
              <h2 id="socials" className="ff-head text-xl">{d.person.socials}</h2>
              <ul className="mt-3 divide-y divide-line rounded-3xl border border-line bg-surface">
                {socials.map(([platform, acc]) => (
                  <li key={platform} className="flex items-center justify-between px-4 py-3 text-sm">
                    <a
                      href={socialUrl(platform, acc.handle)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-fame"
                    >
                      <span className="font-bold">{platformName[platform]}</span>{' '}
                      <span className="text-muted">@{acc.handle}</span> ↗
                    </a>
                    {acc.followers !== undefined && (
                      <span className="font-bold">
                        {compactNumber(acc.followers, locale)} <span className="font-normal text-muted">{d.common.followers}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="container-x mt-16">
          <SectionHeader id="related" title={f.related} accent="var(--color-fame)" />
          <div className="rail">
            {related.map((p) => (
              <PersonCard key={p.id} person={p} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <div className="container-x mt-16">
        <KeepExploring locale={locale} />
      </div>
    </div>
  );
}
