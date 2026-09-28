import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  chartRegions,
  getBiggestProfiles,
  getFameChart,
  getLiveStreams,
  getPeople,
  getReleasesOfWeek,
  getSongCharts,
  getTrendingPeople,
  getTrendSignals,
  getViralSounds,
} from '@/lib/data';
import type { Chart, Person } from '@/lib/data/types';
import { compactNumber, cssVars, growth } from '@/lib/format';
import { getDictionary, localeMeta, personPath, type Locale, type SectionKey } from '@/lib/i18n';
import { ChartRow, LiveCard, PersonCard, platformName, ReleaseCard, TrendSignalCard } from './cards';
import { Sparkle } from './Logo';
import { initialsOf, Poster, SectionHeader } from './ui';

/* ─── Blocos reutilizáveis ─────────────────────────────────── */

function JumpNav({ locale, items }: { locale: Locale; items: { id: string; label: string }[] }) {
  const d = getDictionary(locale);
  return (
    <nav aria-label={d.pages.jump} className="flex gap-2 overflow-x-auto no-scrollbar">
      {items.map((it, i) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={`pill px-4! py-2! text-[11px]! ${i === 0 ? 'bg-fame-gradient text-white' : 'border border-line text-fg/80 hover:border-fame'}`}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}

function Block({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-32">
      {children}
    </section>
  );
}

/** Linha de ranking de pessoas (Fame Chart, crescimento, perfis). */
function PersonRankRow({ person, position, locale, value }: { person: Person; position: number; locale: Locale; value: ReactNode }) {
  return (
    <li>
      <Link href={personPath(locale, person.slug)} className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/[0.04]">
        <span className="text-fame-gradient w-10 pr-1 text-center font-display text-3xl font-black italic tabular-nums">
          {String(position).padStart(2, '0')}
        </span>
        <Poster hue={person.hue} image={person.image} initials={initialsOf(person.publicName)} className="h-12 w-12 shrink-0 rounded-full text-[0.35rem]" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display font-black uppercase italic tracking-tight">{person.publicName}</p>
          <p className="truncate text-xs text-muted">{person.t[locale].role}</p>
        </div>
        <span className="shrink-0 text-right text-sm font-extrabold tabular-nums">{value}</span>
      </Link>
    </li>
  );
}

const Panel = ({ children }: { children: ReactNode }) => (
  <ol className="rounded-3xl border border-line bg-surface p-2">{children}</ol>
);

/* ─── Charts ──────────────────────────────────────────────── */

function periodLabel(chart: Chart, locale: Locale) {
  const d = getDictionary(locale);
  const end = chart.periodEnd
    ? new Intl.DateTimeFormat(localeMeta[locale].htmlLang, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${chart.periodEnd}T12:00:00Z`))
    : '';
  const when = (chart.kind === 'daily' ? d.pages.charts.dayOf : d.pages.charts.weekTo).replace('{d}', end);
  return `${when} · ${d.common.source}: ${chart.provenance.provider}`;
}

const platformLabel = { spotify: 'Spotify', apple: 'Apple Music' } as const;

/**
 * Seletor de charts Spotify/Apple Music × país — só HTML + CSS (radios + :has), sem JavaScript.
 * Regra do site: abre sempre no GLOBAL do Spotify.
 */
export async function ChartSwitcher({ locale, limit = 10, uid }: { locale: Locale; limit?: number; uid: string }) {
  const d = getDictionary(locale);
  const c = d.pages.charts;
  const charts = await getSongCharts();
  if (!charts.length) return null;
  const platforms = (['spotify', 'apple'] as const).filter((p) => charts.some((ch) => ch.platform === p));
  const regions = chartRegions.filter((r) => charts.some((ch) => ch.region === r));
  const regionNames = new Intl.DisplayNames([localeMeta[locale].htmlLang], { type: 'region' });
  const regionLabel = (r: string) => (r === 'GLOBAL' ? c.global : regionNames.of(r) ?? r);
  const root = `.cs-${uid}`;
  const pid = (p: string) => `${uid}-p-${p}`;
  const rid = (r: string) => `${uid}-r-${r}`;
  const css = [
    `${root} .cs-panel{display:none}`,
    ...platforms.flatMap((p) =>
      regions.map((r) => `${root}:has(#${pid(p)}:checked):has(#${rid(r)}:checked) .cs-panel[data-k="${p}-${r}"]{display:block}`),
    ),
    ...[...platforms.map(pid), ...regions.map(rid)].flatMap((id) => [
      `${root}:has(#${id}:checked) label[for="${id}"]{background:var(--fame-gradient);border-color:transparent;color:#fff}`,
      `${root}:has(#${id}:focus-visible) label[for="${id}"]{outline:2px solid var(--color-fame);outline-offset:2px}`,
    ]),
  ].join('\n');
  const pill = 'cursor-pointer select-none whitespace-nowrap rounded-full border border-line px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-fg/80 transition hover:border-fame';
  return (
    <div className={`cs-${uid} space-y-3`}>
      <style>{css}</style>
      {platforms.map((p, i) => (
        <input key={p} type="radio" name={`${uid}-p`} id={pid(p)} defaultChecked={i === 0} className="sr-only" />
      ))}
      {regions.map((r, i) => (
        <input key={r} type="radio" name={`${uid}-r`} id={rid(r)} defaultChecked={i === 0} className="sr-only" />
      ))}
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label={c.platform}>
        {platforms.map((p) => (
          <label key={p} htmlFor={pid(p)} className={pill}>
            {platformLabel[p]}
          </label>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label={c.country}>
        {regions.map((r) => (
          <label key={r} htmlFor={rid(r)} className={pill}>
            {regionLabel(r)}
          </label>
        ))}
      </div>
      {charts.map((ch) => (
        <div key={ch.id} className="cs-panel" data-k={`${ch.platform}-${ch.region}`}>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
            {platformLabel[ch.platform!]} · {regionLabel(ch.region)}
          </p>
          <ChartPanel chart={{ ...ch, entries: ch.entries.slice(0, limit) }} locale={locale} />
        </div>
      ))}
    </div>
  );
}

export function ChartPanel({ chart, locale }: { chart: Chart; locale: Locale }) {
  return (
    <>
      <Panel>
        {chart.entries.map((e) => (
          <ChartRow key={e.position} entry={e} locale={locale} />
        ))}
      </Panel>
      {chart.provenance.sourceUrl && (
        <a href={chart.provenance.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-muted underline-offset-2 hover:underline">
          {periodLabel(chart, locale)} ↗
        </a>
      )}
    </>
  );
}

async function ChartsView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const c = d.pages.charts;
  const [fame, biggest] = await Promise.all([getFameChart(10), getBiggestProfiles(10)]);
  return (
    <div className="space-y-12">
      <p className="max-w-xl text-lg text-fg/80">{c.intro}</p>
      <div className="grid gap-12 lg:grid-cols-2">
        <Block id="songs">
          <SectionHeader id="songs-h" title={d.home.charts} subtitle={c.songsSub} accent="var(--color-charts)" />
          <ChartSwitcher locale={locale} limit={20} uid="cp" />
        </Block>
        {fame.length > 0 && (
          <Block id="fame">
            <SectionHeader id="fame-h" title={c.fame} subtitle={c.fameSub} accent="var(--color-fame)" />
            <Panel>
              {fame.map((p, i) => (
                <PersonRankRow key={p.id} person={p} position={i + 1} locale={locale} value={<>🔥 {p.fameScore}</>} />
              ))}
            </Panel>
          </Block>
        )}
        {biggest.length > 0 && (
          <Block id="social">
            <SectionHeader id="social-h" title={c.social} subtitle={c.socialSub} accent="var(--color-streamers)" />
            <Panel>
              {biggest.map(({ person, total }, i) => (
                <PersonRankRow key={person.id} person={person} position={i + 1} locale={locale} value={compactNumber(total, locale)} />
              ))}
            </Panel>
          </Block>
        )}
      </div>
    </div>
  );
}

/* ─── Música ──────────────────────────────────────────────── */

async function MusicView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const m = d.pages.music;
  const [releases, trending, everyone] = await Promise.all([getReleasesOfWeek(), getTrendingPeople(30), getPeople()]);
  const singers = [...trending, ...everyone].filter((p, i, arr) => p.kinds.includes('singer') && arr.findIndex((x) => x.id === p.id) === i).slice(0, 12);
  return (
    <div className="space-y-14">
      <Block id="releases">
        <SectionHeader id="releases-h" title={m.releases} subtitle={m.releasesSub} accent="var(--color-music)" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {releases.map((r) => (
            <ReleaseCard key={r.id} release={r} locale={locale} />
          ))}
        </div>
      </Block>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Block id="top">
          <SectionHeader id="top-h" title={m.topSongs} accent="var(--color-charts)" />
          <ChartSwitcher locale={locale} limit={10} uid="mu" />
        </Block>
        <Block id="artists">
          <SectionHeader id="artists-h" title={m.artists} accent="var(--color-fame)" />
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
            {singers.map((p) => (
              <PersonCard key={p.id} person={p} locale={locale} />
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
}

/* ─── Creators ────────────────────────────────────────────── */

function ComingSoon({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 rounded-3xl border border-dashed border-line p-5 text-sm text-muted">
      <Sparkle className="mt-0.5 h-4 w-4 shrink-0 fill-creators" /> {text}
    </p>
  );
}

async function CreatorsView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const c = d.pages.creators;
  const [sounds, signals, everyone] = await Promise.all([getViralSounds(), getTrendSignals(), getPeople()]);
  const creators = everyone.filter((p) => p.kinds.includes('creator') || p.kinds.includes('streamer'));
  return (
    <div className="space-y-14">
      <p className="max-w-xl text-lg text-fg/80">{c.intro}</p>
      <Block id="profiles">
        <SectionHeader id="profiles-h" title={c.profiles} accent="var(--color-creators)" />
        <div className="rail">
          {creators.map((p) => (
            <PersonCard key={p.id} person={p} locale={locale} />
          ))}
        </div>
      </Block>
      <div className="grid gap-12 lg:grid-cols-2">
        <Block id="formats">
          <SectionHeader id="formats-h" title={c.formats} subtitle={c.formatsSub} accent="var(--color-creators)" />
          {signals.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {signals.map((s) => (
                <TrendSignalCard key={s.id} signal={s} locale={locale} />
              ))}
            </div>
          ) : (
            <ComingSoon text={c.radarSoon} />
          )}
        </Block>
        <Block id="sounds">
          <SectionHeader id="sounds-h" title={c.sounds} subtitle={c.soundsSub} accent="var(--color-fame)" />
          {sounds.length ? (
            <Panel>
              {sounds.map((s, i) => (
                <li key={s.id} className="flex items-center gap-3 rounded-2xl px-2 py-2.5">
                  <span className="text-fame-gradient w-10 pr-1 text-center font-display text-3xl font-black italic tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold">♫ {s.t[locale].name}</p>
                    <p className="truncate text-xs text-muted">{platformName[s.platform]} · {s.t[locale].note}</p>
                  </div>
                  <span className="shrink-0 text-sm font-extrabold text-fame">{growth(s.growthPct)}</span>
                </li>
              ))}
            </Panel>
          ) : (
            <ComingSoon text={c.radarSoon} />
          )}
        </Block>
      </div>
    </div>
  );
}

/* ─── Streamers ───────────────────────────────────────────── */

async function StreamersView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const s = d.pages.streamers;
  const [streams, everyone] = await Promise.all([getLiveStreams(), getPeople()]);
  const streamers = everyone.filter((p) => p.kinds.includes('streamer') || p.kinds.includes('creator'));
  return (
    <div className="space-y-14">
      <Block id="live">
        <SectionHeader id="live-h" title={d.home.liveNow} subtitle={d.home.liveNowSub} accent="var(--color-streamers)" />
        {streams.length ? (
          <div className="rail md:grid-cols-3!">
            {streams.map((st) => (
              <LiveCard key={st.id} stream={st} locale={locale} />
            ))}
          </div>
        ) : (
          <ComingSoon text={s.liveSoon} />
        )}
      </Block>
      <Block id="streamers">
        <SectionHeader id="streamers-h" title={d.pages.creators.profiles} accent="var(--color-streamers)" />
        <div className="rail">
          {streamers.map((p) => (
            <PersonCard key={p.id} person={p} locale={locale} />
          ))}
        </div>
      </Block>
    </div>
  );
}

/** Verticais com página própria. As demais usam o feed padrão de matérias. */
export const sectionViews: Partial<Record<SectionKey, (p: { locale: Locale }) => Promise<ReactNode>>> = {
  charts: ChartsView,
  music: MusicView,
  creators: CreatorsView,
  streamers: StreamersView,
};
