import Link from 'next/link';
import { AdminShell, RiskDot, StatusPill, param, type SearchParams } from '@/components/admin/AdminShell';
import { Poster } from '@/components/ui';
import { setArticleVisibility } from '@/lib/admin/actions';
import { getAdminStore, type ContentStatus } from '@/lib/data/store';
import { timeAgo } from '@/lib/format';
import { getDictionary, locales } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

const filters: { key: string; label: string }[] = [
  { key: '', label: 'Todas' },
  { key: 'review', label: 'Em revisão' },
  { key: 'draft', label: 'Ocultas / rascunhos' },
  { key: 'published', label: 'Publicadas' },
  { key: 'rejected', label: 'Rejeitadas' },
  { key: 'trash', label: 'Lixeira' },
];

export default async function AdminArticles({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const status = param(sp, 'status') ?? '';
  const s = await getAdminStore();
  const d = getDictionary('pt');
  const live = s.articles.filter((a) => !a.data.deleted);
  const trash = s.articles.filter((a) => a.data.deleted);
  const count = (k: string) => (k === 'trash' ? trash.length : k ? live.filter((a) => a.status === k).length : live.length);
  const back = status ? `/admin/materias?status=${status}` : '/admin/materias';
  const items = (status === 'trash' ? trash : live)
    .filter((a) => !status || status === 'trash' || a.status === (status as ContentStatus))
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
            {f.label} · {count(f.key)}
          </Link>
        ))}
      </nav>

      <ul className="grid gap-2">
        {items.map((a) => {
          const missing = locales.filter((l) => !a.data.t[l]?.headline || !a.data.t[l]?.body?.length);
          return (
            <li key={a.id} className="ff-card flex flex-wrap items-center gap-3 p-3! transition hover:border-white/25 sm:flex-nowrap">
              <Link href={`/admin/materias/${a.id}`} className="flex min-w-0 flex-1 items-center gap-4">
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
              <form action={setArticleVisibility} className="flex shrink-0 items-center gap-2">
                <input type="hidden" name="id" value={a.id} />
                <input type="hidden" name="back" value={back} />
                {a.data.deleted ? (
                  <button type="submit" name="mode" value="restore" className="ff-btn">
                    Restaurar
                  </button>
                ) : (
                  <>
                    {a.status === 'published' ? (
                      <button type="submit" name="mode" value="hide" className="ff-btn" title="Tira a matéria do site sem apagar">
                        Ocultar
                      </button>
                    ) : (
                      <button type="submit" name="mode" value="show" className="ff-btn" title="Publica a matéria de novo">
                        Mostrar
                      </button>
                    )}
                    <details className="relative">
                      <summary className="ff-btn cursor-pointer list-none text-movies">Excluir</summary>
                      <div className="absolute right-0 z-10 mt-2 w-56 rounded-2xl border border-line bg-surface p-3 text-xs shadow-xl">
                        <p className="mb-2 text-fg/80">A matéria sai do site e vai para a lixeira.</p>
                        <button type="submit" name="mode" value="delete" className="ff-btn w-full bg-movies! text-white!">
                          Confirmar exclusão
                        </button>
                      </div>
                    </details>
                  </>
                )}
              </form>
            </li>
          );
        })}
        {!items.length && <li className="ff-card text-sm text-muted">Nenhuma matéria com esse status.</li>}
      </ul>
    </AdminShell>
  );
}
