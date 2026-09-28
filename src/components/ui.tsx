import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Confidence, ImageRef } from '@/lib/data/types';
import { cssVars } from '@/lib/format';
import type { Dictionary } from '@/lib/i18n';
import { Sparkle } from './Logo';

/** Placeholder de imagem gerado por CSS (zero bytes de download). */
/**
 * Imagem com fallback: mostra a foto vinculada no admin quando existe;
 * senão, um placeholder em CSS (zero bytes). <img> simples de propósito:
 * as URLs vêm do admin/CDN e não dependem de domínios pré-configurados.
 */
export function Poster({
  hue,
  className = '',
  initials,
  image,
  eager = false,
}: {
  hue: number;
  className?: string;
  initials?: string;
  image?: ImageRef;
  eager?: boolean;
}) {
  if (image) {
    return (
      <div className={`poster ${className}`} style={cssVars({ '--h': hue })}>
        <img
          src={image.url}
          alt={image.alt ?? ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        />
        {image.credit && (
          <span className="absolute bottom-1 right-2 z-[2] text-[9px] text-white/70 [text-shadow:0_1px_2px_#000]">
            {image.credit}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className={`poster ${className}`} style={cssVars({ '--h': hue })} aria-hidden>
      {initials && (
        <span className="absolute inset-0 z-10 grid place-items-center font-display text-4xl font-extrabold tracking-tight text-white/90">
          {initials}
        </span>
      )}
    </div>
  );
}

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/** Selo de confiança editorial. `confirmed` só aparece quando pedido (páginas de matéria). */
export function ConfidenceBadge({
  value,
  d,
  showConfirmed = false,
}: {
  value: Confidence;
  d: Dictionary;
  showConfirmed?: boolean;
}) {
  if (value === 'reported' || (value === 'confirmed' && !showConfirmed)) return null;
  const tone: Record<Confidence, string> = {
    confirmed: 'bg-charts/15 text-charts ring-charts/30',
    reported: 'bg-news/15 text-news ring-news/30',
    rumor: 'bg-events/15 text-events ring-events/30',
    unverified: 'bg-white/10 text-muted ring-white/15',
  };
  const icon = value === 'confirmed' ? '✓' : '?';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${tone[value]}`}
    >
      <span aria-hidden>{icon}</span>
      {d.confidence[value]}
    </span>
  );
}

export function SectionLabel({ children, accent }: { children: ReactNode; accent: string }) {
  return (
    <span className="pill text-black" style={{ background: accent }}>
      {children}
    </span>
  );
}

export function SectionHeader({
  title,
  subtitle,
  accent,
  href,
  linkLabel,
  id,
}: {
  title: string;
  subtitle?: string;
  accent: string;
  href?: string;
  linkLabel?: string;
  id?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 id={id} className="ff-head flex items-center gap-2 text-2xl sm:text-4xl">
          {title}
          <Sparkle className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" style={{ fill: accent }} />
        </h2>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="shrink-0 rounded-full border border-line px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-fg/80 transition hover:border-(--v) hover:text-fg"
          style={cssVars({ '--v': accent })}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}

export function LiveBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-movies px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
      {label}
    </span>
  );
}
