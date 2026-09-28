'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { localeMeta, locales, type Locale } from '@/lib/i18n/config';
import { switchLocalePath } from '@/lib/i18n/routes';

export function LanguageSelector({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() || `/${current}`;
  const ref = useRef<HTMLDetailsElement>(null);
  const meta = localeMeta[current];

  return (
    <details ref={ref} className="group relative">
      <summary
        aria-label={`${label}: ${meta.label}`}
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-bold transition hover:border-white/30 [&::-webkit-details-marker]:hidden"
      >
        <span aria-hidden>{meta.flag}</span>
        {meta.short}
        <span aria-hidden className="text-[9px] opacity-60 transition group-open:rotate-180">▼</span>
      </summary>
      <ul className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-surface p-1 shadow-2xl">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={localeMeta[l].htmlLang}
              lang={localeMeta[l].htmlLang}
              aria-current={l === current ? 'true' : undefined}
              onClick={() => {
                document.cookie = `NEXT_LOCALE=${l}; path=/; max-age=31536000; samesite=lax`;
                ref.current?.removeAttribute('open');
              }}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition hover:bg-white/5 aria-[current=true]:bg-white/10 aria-[current=true]:font-bold"
            >
              <span aria-hidden className="text-base">{localeMeta[l].flag}</span>
              {localeMeta[l].label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
