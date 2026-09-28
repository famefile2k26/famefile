import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ContentStatus } from '@/lib/data/store';
import { logout } from '@/lib/admin/actions';
import { Logo } from '../Logo';

const nav: { href: string; label: string; key: string; soon?: boolean }[] = [
  { href: '/admin', label: 'Painel', key: 'home' },
  { href: '/admin/materias', label: 'Matérias', key: 'articles' },
  { href: '/admin/famosos', label: 'Famosos', key: 'people' },
  { href: '/admin/agenda', label: 'Agenda', key: 'events', soon: true },
  { href: '/admin/charts', label: 'Charts', key: 'charts', soon: true },
  { href: '/admin/home', label: 'Home', key: 'layout', soon: true },
  { href: '/admin/robo', label: 'Robô editor', key: 'robot', soon: true },
];

export function AdminShell({
  active,
  title,
  actions,
  writable,
  notice,
  children,
}: {
  active: string;
  title: string;
  actions?: ReactNode;
  writable: boolean;
  notice?: { ok?: string; erro?: string };
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-b border-line bg-surface lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-4 py-4 lg:block">
          <Link href="/admin" className="flex items-center gap-2">
            <Logo size="1.3rem" />
            <span className="pill bg-white/10 text-fg/80">Admin</span>
          </Link>
          <Link href="/pt" className="text-xs font-bold text-muted hover:text-fg lg:mt-3 lg:inline-block">
            Ver site ↗
          </Link>
        </div>
        <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 no-scrollbar lg:flex-col lg:overflow-visible">
          {nav.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              aria-current={n.key === active ? 'page' : undefined}
              className="flex items-center justify-between gap-3 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-bold text-fg/75 transition hover:bg-white/5 hover:text-fg aria-[current=page]:bg-fame/15 aria-[current=page]:text-fg"
            >
              {n.label}
              {n.soon && <span className="text-[10px] font-extrabold uppercase text-muted">em breve</span>}
            </Link>
          ))}
          <form action={logout} className="lg:mt-4">
            <button type="submit" className="w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-muted hover:text-fg">
              Sair
            </button>
          </form>
        </nav>
      </aside>

      <div className="min-w-0">
        {!writable && (
          <div className="border-b border-viral/30 bg-viral/10 px-4 py-2.5 text-sm lg:px-8">
            <b className="text-viral">Modo leitura.</b> Você está vendo o conteúdo atual. Para salvar edições e subir fotos, conecte o
            Supabase (passo 2 do <code className="text-xs">docs/DEPLOY.md</code>).
          </div>
        )}
        {notice?.ok && (
          <div className="border-b border-charts/30 bg-charts/10 px-4 py-2.5 text-sm font-semibold text-charts lg:px-8">
            Salvo. Status: {statusLabel[notice.ok as ContentStatus] ?? notice.ok}.
          </div>
        )}
        {notice?.erro && (
          <div className="border-b border-movies/30 bg-movies/10 px-4 py-2.5 text-sm font-semibold text-movies lg:px-8">
            {notice.erro === 'banco'
              ? 'Não foi possível salvar: o Supabase ainda não está conectado.'
              : `Não foi possível salvar: ${notice.erro}`}
          </div>
        )}
        <header className="flex flex-wrap items-end justify-between gap-4 px-4 pb-4 pt-6 lg:px-8">
          <h1 className="ff-head text-3xl sm:text-4xl">{title}</h1>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </header>
        <main className="px-4 pb-16 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

export const statusLabel: Record<ContentStatus, string> = {
  draft: 'Rascunho',
  review: 'Em revisão',
  published: 'Publicado',
  rejected: 'Rejeitado',
};

const statusTone: Record<ContentStatus, string> = {
  draft: 'bg-white/10 text-fg/80',
  review: 'bg-viral/20 text-viral',
  published: 'bg-charts/20 text-charts',
  rejected: 'bg-movies/20 text-movies',
};

export function StatusPill({ status }: { status: ContentStatus }) {
  return <span className={`pill ${statusTone[status]}`}>{statusLabel[status]}</span>;
}

const riskTone = { green: 'bg-charts', yellow: 'bg-creators', red: 'bg-movies' } as const;
const riskLabel = { green: 'Risco baixo', yellow: 'Risco médio', red: 'Risco alto' } as const;

export function RiskDot({ risk }: { risk: keyof typeof riskTone }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span className={`h-2 w-2 rounded-full ${riskTone[risk]}`} aria-hidden />
      {riskLabel[risk]}
    </span>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="ff-label">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Stat({ label, value, tone = 'text-fg', href }: { label: string; value: number | string; tone?: string; href?: string }) {
  const body = (
    <>
      <span className="ff-label">{label}</span>
      <span className={`font-display text-4xl font-black italic tabular-nums ${tone}`}>{value}</span>
    </>
  );
  return href ? (
    <Link href={href} className="ff-card block transition hover:border-white/25">
      {body}
    </Link>
  ) : (
    <div className="ff-card">{body}</div>
  );
}

export type SearchParams = Promise<Record<string, string | string[] | undefined>>;
export const param = (sp: Record<string, string | string[] | undefined>, k: string) => {
  const v = sp[k];
  return Array.isArray(v) ? v[0] : v;
};
