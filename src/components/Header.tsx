import Link from 'next/link';
import { brand } from '@/lib/brand';
import { cssVars } from '@/lib/format';
import { getDictionary, homePath, sectionAccent, sectionKeys, sectionPath, type Locale } from '@/lib/i18n';
import { LanguageSelector } from './LanguageSelector';
import { Logo } from './Logo';

const navOrder = sectionKeys;

export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const peopleLink = (
    <Link
      key="people"
      href={`/${locale}/p`}
      className="whitespace-nowrap rounded-full border border-fame/60 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-fg transition hover:bg-fame"
    >
      ✦ {d.nav.people}
    </Link>
  );
  const sectionLinks = navOrder.map((key) => (
    <Link
      key={key}
      href={sectionPath(locale, key)}
      style={cssVars({ '--v': sectionAccent[key] })}
      className="whitespace-nowrap rounded-full border border-transparent px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-fg/80 transition hover:border-(--v) hover:text-fg"
    >
      {d.nav[key]}
    </Link>
  ));
  const links = [peopleLink, ...sectionLinks];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl">
      <div className="container-x flex h-15 items-center gap-5">
        <Link href={homePath(locale)} aria-label={brand.name} className="shrink-0 py-2">
          <Logo size="1.55rem" />
        </Link>
        <nav aria-label={d.nav.label} className="hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto no-scrollbar xl:flex">
          {links}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LanguageSelector current={locale} label={d.language} />
        </div>
      </div>
      <nav aria-label={d.nav.label} className="flex gap-1 overflow-x-auto px-2 pb-2 no-scrollbar xl:hidden">
        {links}
      </nav>
    </header>
  );
}
