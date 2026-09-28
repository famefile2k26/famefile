import type { CSSProperties } from 'react';
import { brand } from '@/lib/brand';
import { cssVars } from '@/lib/format';

/** Estrela de 4 pontas da identidade FAMEFILE. */
export function Sparkle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 0c.9 6.4 4.6 10.3 12 12-7.4 1.7-11.1 5.6-12 12-.9-6.4-4.6-10.3-12-12C7.4 10.3 11.1 6.4 12 0z" />
    </svg>
  );
}

/**
 * Logo FAMEFILE em HTML/CSS (escala por --logo-size, nítido em qualquer tamanho).
 * "FAME" com a estrela vazada no A + "FILE" dentro da pasta em gradiente com ✦.
 */
export function Logo({
  size,
  tagline = false,
  className = '',
}: {
  size?: string;
  tagline?: boolean;
  className?: string;
}) {
  const [first, second] = brand.logoParts;
  const [a, b, ...rest] = first.split('');
  return (
    <span className={`ff-logo ${className}`} style={size ? cssVars({ '--logo-size': size }) : undefined} aria-hidden>
      <span className="ff-mark">
        <span className="ff-fame">
          {a}
          <span className="ff-fame-a">
            {b}
            <Sparkle />
          </span>
          {rest.join('')}
        </span>
        <span className="ff-file">
          <span>{second}</span>
          <Sparkle className="ff-spark" />
        </span>
      </span>
      {tagline && <span className="ff-tagline">{brand.slogan}</span>}
    </span>
  );
}
