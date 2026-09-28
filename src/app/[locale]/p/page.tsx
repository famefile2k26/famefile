import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PersonCard } from '@/components/cards';
import { SectionHeader } from '@/components/ui';
import { getPeople } from '@/lib/data';
import type { Market } from '@/lib/data/types';
import { getDictionary, isLocale, pathsForAllLocales } from '@/lib/i18n';
import { localizedAlternates } from '@/lib/seo';

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

const markets: Market[] = ['brazil', 'latin', 'global'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    title: d.profile.directory,
    description: d.profile.directorySub,
    alternates: localizedAlternates(pathsForAllLocales((l) => `/${l}/p`), locale),
  };
}

/** Diretório de perfis ("Famosos"), agrupado por mercado. */
export default async function PeopleDirectory({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);
  const groups = await Promise.all(markets.map(async (m) => ({ market: m, people: await getPeople({ market: m }) })));
  const total = groups.reduce((n, g) => n + g.people.length, 0);

  return (
    <div>
      <header
        className="border-b border-line py-12 sm:py-16"
        style={{ background: 'radial-gradient(60% 120% at 0% 0%, rgb(255 0 92 / 0.22), transparent 70%)' }}
      >
        <div className="container-x">
          <h1 className="ff-head text-6xl sm:text-8xl">
            <span className="text-fame-gradient pr-2">{d.profile.directory}</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-fg/80">{d.profile.directorySub}</p>
          <nav aria-label={d.pages.jump} className="mt-6 flex flex-wrap items-center gap-2">
            {groups.map((g, i) => (
              <a
                key={g.market}
                href={`#m-${g.market}`}
                className={`pill px-4! py-2! text-[11px]! ${i === 0 ? 'bg-fame-gradient text-white' : 'border border-line text-fg/80 hover:border-fame'}`}
              >
                {d.profile.markets[g.market]} · {g.people.length}
              </a>
            ))}
            <span className="ml-1 text-xs text-muted">{d.profile.count.replace('{n}', String(total))}</span>
          </nav>
        </div>
      </header>

      <div className="container-x mt-10 space-y-16">
        {groups.map((g) => (
          <section key={g.market} id={`m-${g.market}`} aria-labelledby={`h-${g.market}`} className="scroll-mt-32">
            <SectionHeader id={`h-${g.market}`} title={d.profile.markets[g.market]} accent="var(--color-fame)" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
              {g.people.map((p) => (
                <PersonCard key={p.id} person={p} locale={locale} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
