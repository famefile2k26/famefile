import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/Hero';
import { HomeModules } from '@/components/HomeModules';
import { homePath, isLocale, pathsForAllLocales } from '@/lib/i18n';
import { localizedAlternates } from '@/lib/seo';

export const revalidate = 300;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { alternates: localizedAlternates(pathsForAllLocales(homePath), locale) };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale} />
      <HomeModules locale={locale} />
    </>
  );
}
