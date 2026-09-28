import Link from 'next/link';
import { AdminShell, param, type SearchParams } from '@/components/admin/AdminShell';
import { initialsOf, Poster } from '@/components/ui';
import { getAdminStore } from '@/lib/data/store';
import type { Market } from '@/lib/data/types';

export const dynamic = 'force-dynamic';

const filters: { key: string; label: string; test: (p: { data: { image?: unknown; market?: Market } }) => boolean }[] = [
  { key: '', label: 'Todos', test: () => true },
  { key: 'sem-foto', label: 'Sem foto', test: (p) => !p.data.image },
  { key: 'brazil', label: 'Brasil', test: (p) => p.data.market === 'brazil' },
  { key: 'latin', label: 'Latino', test: (p) => p.data.market === 'latin' },
  { key: 'global', label: 'Global', test: (p) => p.data.market === 'global' },
];

export default async function AdminPeople({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const filter = param(sp, 'filtro') ?? '';
  const s = await getAdminStore();
  const active = filters.find((f) => f.key === filter) ?? filters[0]!;
  const items = s.people.filter(active.test).sort((a, b) => a.data.publicName.localeCompare(b.data.publicName));

  return (
    <AdminShell
      active="people"
      title="Famosos"
      writable={s.writable}
      notice={{ ok: param(sp, 'ok'), erro: param(sp, 'erro') }}
      actions={
        <Link href="/admin/famosos/novo" className="ff-btn ff-btn-primary">
          + Novo famoso
        </Link>
      }
    >
      <nav aria-label="Filtros" className="mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key ? `/admin/famosos?filtro=${f.key}` : '/admin/famosos'}
            aria-current={active.key === f.key ? 'page' : undefined}
            className="pill border border-line px-3! py-1.5! text-fg/80 aria-[current=page]:border-transparent aria-[current=page]:bg-fame aria-[current=page]:text-white"
          >
            {f.label} · {s.people.filter(f.test).length}
          </Link>
        ))}
      </nav>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((p) => (
          <li key={p.id}>
            <Link href={`/admin/famosos/${p.id}`} className="group block">
              <div className="relative">
                <Poster
                  hue={p.data.hue}
                  image={p.data.image}
                  initials={initialsOf(p.data.publicName)}
                  className="aspect-square rounded-2xl ring-fame transition group-hover:ring-2"
                />
                {!p.data.image && (
                  <span className="absolute inset-x-2 bottom-2 z-20 rounded-full bg-black/60 py-0.5 text-center text-[10px] font-extrabold uppercase text-white/85">
                    sem foto
                  </span>
                )}
              </div>
              <p className="mt-2 truncate font-bold">{p.data.publicName}</p>
              <p className="truncate text-xs text-muted">{p.data.t.pt.role}</p>
            </Link>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
