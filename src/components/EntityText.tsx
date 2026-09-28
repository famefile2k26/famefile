import Link from 'next/link';
import { Fragment } from 'react';
import type { Person } from '@/lib/data/types';
import { linkEntities } from '@/lib/entities/link';
import { personPath, type Locale } from '@/lib/i18n';

/** Texto com pessoas do banco automaticamente linkadas para /p/{slug}. */
export function EntityText({
  text,
  people,
  locale,
  seen,
}: {
  text: string;
  people: Person[];
  locale: Locale;
  seen?: Set<string>;
}) {
  return (
    <>
      {linkEntities(text, people, seen).map((seg, i) =>
        seg.person ? (
          <Link key={i} href={personPath(locale, seg.person.slug)} className="entity-link">
            {seg.text}
          </Link>
        ) : (
          <Fragment key={i}>{seg.text}</Fragment>
        ),
      )}
    </>
  );
}
