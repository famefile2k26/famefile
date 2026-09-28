import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';
import { brand } from '@/lib/brand';
import '../globals.css';

const display = Montserrat({ subsets: ['latin'], style: ['normal', 'italic'], weight: ['700', '800', '900'], variable: '--font-montserrat', display: 'swap' });
const sans = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: { default: `Admin · ${brand.name}`, template: `%s · Admin ${brand.name}` },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#0b0b0f', colorScheme: 'dark' };

/** Layout raiz do painel (separado do site público, sem idioma na URL). */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
