import type { AwardItem, Awards } from '@/lib/data/types';
import { getDictionary, type Locale } from '@/lib/i18n';
import { Sparkle } from './Logo';
import { SectionHeader } from './ui';

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ItemRow({ item, locale }: { item: AwardItem; locale: Locale }) {
  const f = getDictionary(locale).profile.awards;
  const won = item.result === 'won';
  return (
    <li className="flex gap-3 px-4 py-3">
      <span
        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm ${won ? 'bg-fame-gradient text-white' : 'border border-line text-muted'}`}
        aria-hidden
      >
        {won ? '★' : '☆'}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold leading-snug">{item.category}</span>
        <span className="block text-sm text-muted">
          {item.award}
          {item.year ? ` · ${item.year}` : ''}
          {item.work ? ` · “${item.work}”` : ''}
        </span>
      </span>
      <span className={`shrink-0 self-center text-[11px] font-extrabold uppercase tracking-wider ${won ? 'text-fame' : 'text-muted'}`}>
        {won ? f.won : f.nominated}
      </span>
    </li>
  );
}

export function ProfileAwards({ awards, locale }: { awards?: Awards; locale: Locale }) {
  const f = getDictionary(locale).profile.awards;
  if (!awards || (!awards.items.length && !awards.totals.length)) {
    return (
      <p className="flex items-start gap-2 rounded-3xl border border-dashed border-line p-5 text-sm text-muted">
        <Sparkle className="mt-0.5 h-4 w-4 shrink-0 fill-muted" /> {f.empty}
      </p>
    );
  }
  const wins = awards.items.filter((i) => i.result === 'won');
  const noms = awards.items.filter((i) => i.result === 'nominated');
  return (
    <div className="space-y-12">
      {awards.totals.length > 0 && (
        <section aria-labelledby="aw-totals">
          <SectionHeader id="aw-totals" title={f.totals} subtitle={f.totalsSub} accent="var(--color-fame)" />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {awards.totals.map((t) => (
              <li key={t.award} className="rounded-3xl border border-line bg-surface p-4">
                <p className="line-clamp-2 min-h-[2.5em] text-xs font-bold uppercase tracking-wide text-muted">{t.award}</p>
                <p className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-fame-gradient pr-1 font-display text-4xl font-black italic leading-none">{t.wins ?? '—'}</span>
                  <span className="text-xs font-bold text-fg/70">{f.winsLabel}</span>
                </p>
                {t.nominations !== null && (
                  <p className="mt-1 text-xs text-muted">
                    {t.nominations} {f.nominationsLabel}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      {wins.length > 0 && (
        <section aria-labelledby="aw-wins">
          <SectionHeader id="aw-wins" title={f.wins} accent="var(--color-viral)" />
          <ul className="divide-y divide-line rounded-3xl border border-line bg-surface">
            {wins.map((i) => (
              <ItemRow key={`${i.award}-${i.year}-${i.category}-${i.work}`} item={i} locale={locale} />
            ))}
          </ul>
        </section>
      )}
      {noms.length > 0 && (
        <section aria-labelledby="aw-noms">
          <SectionHeader id="aw-noms" title={f.nominations} accent="var(--color-music)" />
          <ul className="divide-y divide-line rounded-3xl border border-line bg-surface">
            {noms.map((i) => (
              <ItemRow key={`${i.award}-${i.year}-${i.category}-${i.work}`} item={i} locale={locale} />
            ))}
          </ul>
        </section>
      )}
      {awards.sources.length > 0 && (
        <p className="text-xs text-muted">
          {f.note}{' '}
          {awards.sources.map((s, i) => (
            <span key={s}>
              {i > 0 && ' · '}
              <a href={s} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                {hostOf(s)} ↗
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
