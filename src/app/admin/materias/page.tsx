import Link from 'next/link';
import { AdminShell, RiskDot, StatusPill, param, type SearchParams } from '@/components/admin/AdminShell';
import { Poster } from '@/components/ui';
import { getAdminStore, type ContentStatus } from '@/lib/data/store';
import { timeAgo } from '@/lib/format';
import { getDictionary, locales } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const filters: { key: string; label: string }[] = [
  { key: '', label: 'Todas' },
  { key: 'review', label: 'Em revisão' },
  { key: 'draft', label: 'Rascunhos' },
  { key: 'published', label: 'Publicadas' },
  { key: 'rejected', label: 'Rejeitadas' },
];

export default async function AdminArticles({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const status = param(sp, 'status') ?? '';
  const s = await getAdminStore();
  const d = getDictionary('pt');
  const items = s.articles
    .filter((a) => !status || a.status === (status as ContentStatus))
    .sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt));

  return (
    <AdminShell
      active="articles"
      title="Matérias"
      writable={s.writable}
      notice={{ ok: param(sp, 'ok'), erro: param(sp, 'erro') }}
      actions={
        <Link href="/admin/materias/nova" className="ff-btn ff-btn-primary">
          + Nova matéria
        </Link>
      }
    >
      <nav aria-label="Filtrar por status" className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key ? `/admin/materias?status=${f.key}` : '/admin/materias'}
            aria-current={status === f.key ? 'page' : undefined}
            className="pill border border-line px-3! py-1.5! text-fg/80 aria-[current=page]:border-transparent aria-[current=page]:bg-fame aria-[current=page]:text-white"
          >
            {f.label} · {f.key ? s.articles.filter((a) => a.status === f.key).length : s.articles.length}
          </Link>
        ))}
      </nav>

      <ul className="grid gap-2">
        {items.map((a) => {
          const missing = locales.filter((l) => !a.data.t[l]?.headline || !a.data.t[l]?.body?.length);
          return (
            <li key={a.id}>
              <Link href={`/admin/materias/${a.id}`} className="ff-card flex items-center gap-4 p-3! transition hover:border-white/25">
                <Poster hue={a.data.hue} image={a.data.image} className="h-16 w-16 shrink-0 rounded-xl" />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted">{d.nav[a.data.section]}</span>
                    <StatusPill status={a.status} />
                    <RiskDot risk={a.data.risk} />
                    {a.data.breaking && <span className="pill bg-fame text-white">Breaking</span>}
                  </span>
                  <span className="mt-1 block truncate font-bold">{a.data.t.pt.headline}</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {timeAgo(a.data.publishedAt, 'pt')} · {a.data.sources?.length ?? 0} fontes ·{' '}
                    {missing.length ? <span className="text-viral">falta {missing.map((l) => l.toUpperCase()).join(', ')}</span> : 'PT · EN · ES'}
                  </span>
                </span>
                <span className="hidden text-sm font-bold text-muted sm:block">Editar →</span>
              </Link>
            </li>
          );
        })}
        {!items.length && <li className="ff-card text-sm text-muted">Nenhuma matéria com esse status.</li>}
      </ul>
    </AdminShell>
  );
}
