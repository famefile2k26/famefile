import Link from 'next/link';
import { brand } from '@/lib/brand';
import { getDictionary, sectionKeys, sectionPath, type Locale } from '@/lib/i18n';
import { Logo } from './Logo';

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
    <footer className="mt-10 border-t border-line py-10">
      <div className="container-x grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <Logo size="2.2rem" />
          <p className="mt-4 text-sm text-muted">{d.footer.tagline}</p>
        </div>
        <nav aria-label={d.nav.label} className="flex flex-wrap content-start gap-x-5 gap-y-2 text-xs font-extrabold uppercase tracking-[0.08em] text-fg/70">
          {sectionKeys.map((k) => (
            <Link key={k} href={sectionPath(locale, k)} className="hover:text-fg">
              {d.nav[k]}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container-x mt-8 space-y-1 text-xs text-muted">
        <p>{d.footer.demoNotice}</p>
        <p>
          © {new Date().getFullYear()} {brand.name}. {d.footer.rights}
        </p>
      </div>
    </footer>
  );
}
