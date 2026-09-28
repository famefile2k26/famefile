import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  getBiggestProfiles,
  getEvents,
  getFameChart,
  getCharts,
  getLiveStreams,
  getPeople,
  getReleasesOfWeek,
  getTopSongsChart,
  getTrendingPeople,
  getTrendSignals,
  getViralSounds,
} from '@/lib/data';
import type { Chart, EntertainmentEvent, Person } from '@/lib/data/types';
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
  return `${d.pages.charts.weekTo.replace('{d}', end)} · ${d.common.source}: ${chart.provenance.provider}`;
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
  const [charts, fame, biggest] = await Promise.all([getCharts(), getFameChart(10), getBiggestProfiles(10)]);
  const accents = ['var(--color-charts)', 'var(--color-fame)', 'var(--color-streamers)'];
  return (
    <div className="space-y-12">
      <p className="max-w-xl text-lg text-fg/80">{c.intro}</p>
      <JumpNav locale={locale} items={charts.map((ch) => ({ id: ch.id, label: ch.title[locale] }))} />
      <div className="grid gap-12 lg:grid-cols-2">
        {charts.map((ch, i) => (
          <Block key={ch.id} id={ch.id}>
            <SectionHeader id={`${ch.id}-h`} title={ch.title[locale]} subtitle={c.weekly} accent={accents[i % accents.length]!} />
            <ChartPanel chart={ch} locale={locale} />
          </Block>
        ))}
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
  const [releases, songs, trending, everyone] = await Promise.all([getReleasesOfWeek(), getTopSongsChart(), getTrendingPeople(30), getPeople()]);
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
          <SectionHeader id="top-h" title={`${m.topSongs} · ${songs.title[locale]}`} accent="var(--color-charts)" />
          <ChartPanel chart={songs} locale={locale} />
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

/* ─── Eventos / agenda ────────────────────────────────────── */

function EventRow({ event, locale }: { event: EntertainmentEvent; locale: Locale }) {
  const d = getDictionary(locale);
  const lang = localeMeta[locale].htmlLang;
  const date = new Date(event.startsAt);
  const t = event.t[locale];
  return (
    <li className="flex gap-4 rounded-3xl border border-line bg-surface p-4">
      <div className="grid w-16 shrink-0 place-items-center rounded-2xl py-2 text-center" style={cssVars({ background: `hsl(${event.hue} 80% 50% / 0.18)` })}>
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-fg/70">
          {new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(date)}
        </span>
        <span className="font-display text-3xl font-black italic leading-none">{date.getDate()}</span>
        <span className="text-[11px] font-bold uppercase text-fg/70">{new Intl.DateTimeFormat(lang, { month: 'short' }).format(date)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="pill bg-white/10 text-fg/80">{d.pages.events.kinds[event.kind]}</span>
        <p className="mt-1.5 font-display text-lg font-black uppercase italic leading-tight tracking-tight">{t.title}</p>
        <p className="text-sm text-muted">{t.place}</p>
        {event.sourceUrl && (
          <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted underline-offset-2 hover:underline">
            {d.common.source} ↗
          </a>
        )}
      </div>
    </li>
  );
}

async function EventsView({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const e = d.pages.events;
  const all = await getEvents({ toDays: 120 });
  const dayMs = 86_400_000;
  const now = Date.now();
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const groups = [
    { id: 'today', label: e.today, items: all.filter((x) => new Date(x.startsAt) <= endOfToday) },
    { id: 'week', label: e.week, items: all.filter((x) => new Date(x.startsAt) > endOfToday && new Date(x.startsAt).getTime() <= now + 7 * dayMs) },
    { id: 'month', label: e.month, items: all.filter((x) => new Date(x.startsAt).getTime() > now + 7 * dayMs) },
  ];
  return (
    <div className="space-y-12">
      <p className="max-w-xl text-lg text-fg/80">{e.intro}</p>
      <JumpNav locale={locale} items={groups.map((g) => ({ id: g.id, label: g.label }))} />
      <div className="grid gap-12 lg:grid-cols-3">
        {groups.map((g) => (
          <Block key={g.id} id={g.id}>
            <SectionHeader id={`${g.id}-h`} title={g.label} accent="var(--color-events)" />
            {g.items.length ? (
              <ul className="grid gap-3">
                {g.items.map((ev) => (
                  <EventRow key={ev.id} event={ev} locale={locale} />
                ))}
              </ul>
            ) : (
              <p className="flex items-center gap-2 text-sm text-muted">
                <Sparkle className="h-3 w-3 fill-muted" /> {e.nothing}
              </p>
            )}
          </Block>
        ))}
      </div>
    </div>
  );
}

/** Verticais com página própria. As demais usam o feed padrão de matérias. */
export const sectionViews: Partial<Record<SectionKey, (p: { locale: Locale }) => Promise<ReactNode>>> = {
  charts: ChartsView,
  music: MusicView,
  creators: CreatorsView,
  streamers: StreamersView,
  events: EventsView,
};
