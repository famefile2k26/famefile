import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/Hero';
import { HomeModules } from '@/components/HomeModules';
import { homePath, isLocale, pathsForAllLocales } from '@/lib/i18n';
import { localizedAlternates } from '@/lib/seo';
import { viewerCountry } from '@/lib/viewer';

// Página personalizada por país do leitor (x-vercel-ip-country): renderizada a cada acesso.
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { alternates: localizedAlternates(pathsForAllLocales(homePath), locale) };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const country = await viewerCountry(locale);

  return (
    <>
      <Hero locale={locale} country={country} />
      <HomeModules locale={locale} country={country} />
    </>
  );
}
