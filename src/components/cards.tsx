import Link from 'next/link';
import type { Article, ChartEntry, LiveStream, Person, Release, TrendSignal } from '@/lib/data/types';
import { compactNumber, cssVars, growth, timeAgo } from '@/lib/format';
import {
  articlePath,
  getDictionary,
  personPath,
  sectionAccent,
  type Locale,
} from '@/lib/i18n';
import { ConfidenceBadge, initialsOf, LiveBadge, Poster, SectionLabel } from './ui';

/* ─── Matérias ──────────────────────────────────────────────── */

export function ArticleCard({
  article,
  locale,
  variant = 'default',
}: {
  article: Article;
  locale: Locale;
  variant?: 'lead' | 'default' | 'compact';
}) {
  const d = getDictionary(locale);
  const t = article.t[locale];
  const accent = sectionAccent[article.section];
  const href = articlePath(locale, article.section, t.slug, article.id);
  const meta = (
    <div className="flex flex-wrap items-center gap-2">
      <SectionLabel accent={accent}>{d.nav[article.section]}</SectionLabel>
      <ConfidenceBadge value={article.confidence} d={d} />
      <time dateTime={article.publishedAt} className="text-[11px] text-muted">
        {timeAgo(article.publishedAt, locale)}
      </time>
    </div>
  );

  if (variant === 'lead') {
    return (
      <article className="group relative overflow-hidden rounded-3xl" style={cssVars({ '--v': accent })}>
        <Link href={href} className="block">
          <Poster hue={article.hue} image={article.image} eager className="aspect-[4/5] transition duration-500 group-hover:scale-[1.03] sm:aspect-[16/11]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            {meta}
            <h3 className="ff-head mt-3 text-[1.7rem] sm:text-5xl">
              {t.headline}
            </h3>
            <p className="mt-2 line-clamp-2 max-w-xl text-sm text-fg/80 sm:text-base">{t.summary}</p>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group" style={cssVars({ '--v': accent })}>
        <Link href={href} className="flex gap-3">
          <Poster hue={article.hue} image={article.image} className="aspect-square w-20 shrink-0 rounded-2xl sm:w-24" />
          <div className="min-w-0">
            {meta}
            <h3 className="mt-1 line-clamp-3 font-display text-[15px] font-bold leading-snug transition group-hover:text-(--v)">
              {t.headline}
            </h3>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group card-lift" style={cssVars({ '--v': accent })}>
      <Link href={href} className="block">
        <Poster hue={article.hue} image={article.image} className="aspect-[4/5] rounded-2xl" />
        <div className="mt-3">{meta}</div>
        <h3 className="mt-1 line-clamp-3 font-display text-base font-bold leading-snug transition group-hover:text-(--v)">
          {t.headline}
        </h3>
      </Link>
    </article>
  );
}

/* ─── Pessoas ───────────────────────────────────────────────── */

export function PersonCard({ person, locale, rank }: { person: Person; locale: Locale; rank?: number }) {
  const d = getDictionary(locale);
  return (
    <Link href={personPath(locale, person.slug)} className="group card-lift block">
      <div className="relative">
        <Poster hue={person.hue} image={person.image} initials={initialsOf(person.publicName)} className="aspect-square rounded-3xl" />
        {rank && (
          <span className="absolute left-2 top-2 z-20 rounded-full bg-black/60 px-2 py-0.5 text-xs font-extrabold backdrop-blur">
            #{rank}
          </span>
        )}
        {person.trend7d !== undefined && (
          <span className="bg-fame-gradient absolute bottom-2 right-2 z-20 rounded-full px-2 py-0.5 text-xs font-extrabold text-white">
            {growth(person.trend7d)}
          </span>
        )}
      </div>
      <p className="mt-2 truncate font-display font-black italic uppercase tracking-tight group-hover:text-fame">{person.publicName}</p>
      <p className="flex items-center justify-between text-xs text-muted">
        <span className="truncate">{person.t[locale].role}</span>
        {person.fameScore !== undefined && (
          <span title={d.common.fameScore} className="font-bold text-fg/80">🔥 {person.fameScore}</span>
        )}
      </p>
    </Link>
  );
}

/* ─── Música ────────────────────────────────────────────────── */

export function ReleaseCard({ release, locale }: { release: Release; locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <div className="card-lift">
      <div className="relative">
        <Poster hue={release.hue} image={release.image} className="aspect-square rounded-2xl shadow-lg shadow-black/40" />
        <span className="absolute left-2 top-2 z-20 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur">
          {d.releaseTypes[release.type]}
        </span>
      </div>
      <p className="mt-2 truncate font-display font-bold">{release.title}</p>
      <p className="truncate text-xs text-muted">{release.artistName}</p>
    </div>
  );
}

export function ChartRow({ entry, locale }: { entry: ChartEntry; locale: Locale }) {
  const d = getDictionary(locale);
  const move =
    entry.lastPosition === null
      ? { label: d.common.isNew, cls: 'text-creators' }
      : entry.lastPosition > entry.position
        ? { label: `▲ ${entry.lastPosition - entry.position}`, cls: 'text-charts' }
        : entry.lastPosition < entry.position
          ? { label: `▼ ${entry.position - entry.lastPosition}`, cls: 'text-movies' }
          : { label: '—', cls: 'text-muted' };
  return (
    <li className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/[0.04]">
      <span className="text-fame-gradient w-10 pr-1 text-center font-display text-3xl font-black italic tabular-nums">
        {String(entry.position).padStart(2, '0')}
      </span>
      <Poster hue={entry.hue} className="h-12 w-12 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold">{entry.title}</p>
        <p className="truncate text-xs text-muted">{entry.artistName}</p>
      </div>
      <span className={`w-12 text-right text-[11px] font-extrabold ${move.cls}`}>{move.label}</span>
    </li>
  );
}

/* ─── Creators / Streamers ─────────────────────────────────── */

const platformName: Record<string, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  youtube: 'YouTube',
  twitch: 'Twitch',
  kick: 'Kick',
  x: 'X',
  spotify: 'Spotify',
};

export function TrendSignalCard({ signal, locale }: { signal: TrendSignal; locale: Locale }) {
  const d = getDictionary(locale);
  const t = signal.t[locale];
  return (
    <div className="rounded-3xl border border-line bg-surface p-4">
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted">
        <span>
          {d.trendKinds[signal.kind]} · {platformName[signal.platform]}
        </span>
        <span className="text-creators">{growth(signal.growthPct)}</span>
      </div>
      <p className="mt-3 font-display text-lg font-bold leading-tight">{t.name}</p>
      <p className="mt-1 text-sm text-muted">{t.note}</p>
      {signal.videos && (
        <p className="mt-3 text-xs font-semibold text-fg/70">
          {compactNumber(signal.videos, locale)} {d.common.videos}
        </p>
      )}
    </div>
  );
}

export function LiveCard({ stream, locale }: { stream: LiveStream; locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <div className="card-lift">
      <div className="relative">
        <Poster hue={stream.hue} className="aspect-video rounded-2xl" />
        <div className="absolute left-2 top-2 z-20">
          <LiveBadge label={d.common.live} />
        </div>
        <span className="absolute bottom-2 left-2 z-20 rounded-md bg-black/60 px-1.5 py-0.5 text-[11px] font-bold backdrop-blur">
          {compactNumber(stream.viewers, locale)} {d.common.viewers}
        </span>
      </div>
      <p className="mt-2 truncate font-display font-bold">{stream.channel}</p>
      <p className="truncate text-xs text-muted">
        {platformName[stream.platform]} · {stream.t[locale].title}
      </p>
    </div>
  );
}

export { platformName };
