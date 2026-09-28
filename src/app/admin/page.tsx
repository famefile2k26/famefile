import Link from 'next/link';
import { AdminShell, RiskDot, Stat, StatusPill, param, type SearchParams } from '@/components/admin/AdminShell';
import { initialsOf, Poster } from '@/components/ui';
import { getAdminStore } from '@/lib/data/store';

export const dynamic = 'force-dynamic';

export default async function AdminHome({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const s = await getAdminStore();
  const published = s.articles.filter((a) => a.status === 'published');
  const review = s.articles.filter((a) => a.status === 'review' || a.data.risk === 'red');
  const noPhoto = s.people.filter((p) => !p.data.image);
  const upcoming = s.events.filter((e) => new Date(e.data.startsAt).getTime() > Date.now());
  const recent = [...s.articles].sort((a, b) => b.data.publishedAt.localeCompare(a.data.publishedAt)).slice(0, 6);

  return (
    <AdminShell
      active="home"
      title="Painel"
      writable={s.writable}
      notice={{ ok: param(sp, 'ok'), erro: param(sp, 'erro') }}
      actions={
        <>
          <Link href="/admin/materias/nova" className="ff-btn ff-btn-primary">
            + Nova matéria
          </Link>
          <Link href="/admin/famosos/novo" className="ff-btn">
            + Novo famoso
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Matérias publicadas" value={published.length} href="/admin/materias?status=published" />
        <Stat label="Aguardando revisão" value={review.length} tone={review.length ? 'text-viral' : 'text-fg'} href="/admin/materias?status=review" />
        <Stat label="Famosos" value={s.people.length} href="/admin/famosos" />
        <Stat label="Perfis sem foto" value={noPhoto.length} tone={noPhoto.length ? 'text-fame' : 'text-fg'} href="/admin/famosos?filtro=sem-foto" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="ff-card" aria-labelledby="recent-h">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="recent-h" className="ff-head text-xl">Últimas matérias</h2>
            <Link href="/admin/materias" className="text-xs font-bold text-muted hover:text-fg">
              Ver todas →
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {recent.map((a) => (
              <li key={a.id}>
                <Link href={`/admin/materias/${a.id}`} className="flex items-center gap-3 py-2.5 hover:text-fame">
                  <Poster hue={a.data.hue} image={a.data.image} className="h-11 w-11 shrink-0 rounded-xl" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{a.data.t.pt.headline}</span>
                    <span className="mt-0.5 flex items-center gap-3">
                      <StatusPill status={a.status} />
                      <RiskDot risk={a.data.risk} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-6">
          <section className="ff-card" aria-labelledby="photo-h">
            <div className="mb-3 flex items-center justify-between">
              <h2 id="photo-h" className="ff-head text-xl">Precisam de foto</h2>
              <Link href="/admin/famosos?filtro=sem-foto" className="text-xs font-bold text-muted hover:text-fg">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 xl:grid-cols-4">
              {noPhoto.slice(0, 8).map((p) => (
                <Link key={p.id} href={`/admin/famosos/${p.id}`} className="group text-center">
                  <Poster hue={p.data.hue} initials={initialsOf(p.data.publicName)} className="aspect-square rounded-2xl text-[0.5rem] ring-fame group-hover:ring-2" />
                  <span className="mt-1 block truncate text-[11px] font-bold">{p.data.publicName}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="ff-card" aria-labelledby="robot-h">
            <h2 id="robot-h" className="ff-head text-xl">Robô editor</h2>
            <p className="mt-2 text-sm text-muted">
              Desligado. Depois do deploy, ele vai buscar notícias a cada 2 horas, escrever em PT/EN/ES e publicar sozinho o que for de risco
              baixo. O que for sensível cai aqui em “Aguardando revisão”.
            </p>
            <p className="mt-3 text-xs text-muted">{upcoming.length} eventos na agenda · charts atualizados semanalmente</p>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
