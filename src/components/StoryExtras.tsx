import type { Article } from '@/lib/data/types';
import { localeMeta, getDictionary, type Locale } from '@/lib/i18n';
import { Sparkle } from './Logo';

/** "O que sabemos / o que ainda não sabemos" + linha do tempo "Receipts". */
export function StoryExtras({ article, locale }: { article: Article; locale: Locale }) {
  const d = getDictionary(locale).pages.story;
  const box = article.factBox?.[locale];
  const receipts = article.receipts;
  const sources = article.sources ?? [];
  if (!box && !receipts?.length && !sources.length) return null;
  const time = new Intl.DateTimeFormat(localeMeta[locale].htmlLang, { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="mt-10 space-y-8">
      {box && (
        <section aria-label={d.known} className={`grid gap-3 ${box.unknown.length ? 'sm:grid-cols-2' : ''}`}>
          <div className="rounded-3xl border border-charts/30 bg-charts/[0.07] p-5">
            <h2 className="ff-head text-lg text-charts">{d.known}</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              {box.known.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="font-black text-charts">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {box.unknown.length > 0 && (
          <div className="rounded-3xl border border-viral/30 bg-viral/[0.07] p-5">
            <h2 className="ff-head text-lg text-viral">{d.unknown}</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              {box.unknown.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden className="font-black text-viral">?</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          )}
        </section>
      )}

      {receipts && receipts.length > 0 && (
        <section aria-labelledby="receipts-h" className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
          <h2 id="receipts-h" className="ff-head flex items-center gap-2 text-2xl">
            {d.receipts} <Sparkle className="h-4 w-4 fill-fame" />
          </h2>
          <p className="text-sm text-muted">{d.receiptsSub}</p>
          <ol className="relative mt-5 space-y-5 border-l-2 border-fame/40 pl-5">
            {receipts.map((r) => (
              <li key={r.at} className="relative">
                <span aria-hidden className="bg-fame-gradient absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-surface" />
                <time dateTime={r.at} className="font-display text-sm font-black italic text-fame">
                  {time.format(new Date(r.at))}
                </time>
                <p className="mt-0.5">{r.t[locale]}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
      {sources.length > 0 && (
        <section aria-labelledby="sources-h" className="border-t border-line pt-5">
          <h2 id="sources-h" className="text-xs font-extrabold uppercase tracking-wider text-muted">{d.sources}</h2>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-fame/60 underline-offset-2 hover:text-fame">
                  {s.name} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
