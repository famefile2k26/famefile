import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { brand } from '@/lib/brand';
import { getDictionary, isLocale, localeMeta, locales } from '@/lib/i18n';
import '../globals.css';

const display = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0b0b0f',
  colorScheme: 'dark',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    metadataBase: new URL(brand.siteUrl),
    title: { default: `${brand.name} — ${d.meta.tagline}`, template: `%s · ${brand.name}` },
    description: d.meta.description,
    applicationName: brand.name,
    openGraph: { siteName: brand.name, locale: localeMeta[locale].ogLocale, type: 'website' },
    twitter: { card: 'summary_large_image', site: brand.xHandle },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <html lang={localeMeta[locale].htmlLang} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {d.common.skip}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
