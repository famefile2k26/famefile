import { getArticles, getTrendingPeople } from '@/lib/data';
import { getDictionary, type Locale } from '@/lib/i18n';
import { ArticleCard, PersonCard } from './cards';
import { SectionHeader } from './ui';

/** Bloco "NO DEAD ENDS": fecha qualquer página com pessoas em alta + últimas matérias. */
export async function KeepExploring({ locale, excludeArticleId }: { locale: Locale; excludeArticleId?: string }) {
  const d = getDictionary(locale);
  const [people, latest] = await Promise.all([
    getTrendingPeople(8),
    getArticles({ limit: 4, excludeId: excludeArticleId }),
  ]);
  return (
    <div className="space-y-14">
      <section aria-labelledby="ke-people">
        <SectionHeader id="ke-people" title={d.home.trendingPeople} accent="var(--color-trending)" />
        <div className="rail">
          {people.map((p, i) => (
            <PersonCard key={p.id} person={p} locale={locale} rank={i + 1} />
          ))}
        </div>
      </section>
      <section aria-labelledby="ke-latest">
        <SectionHeader id="ke-latest" title={d.article.trending} accent="var(--color-gossip)" />
        <div className="rail">
          {latest.map((a) => (
            <ArticleCard key={a.id} article={a} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
