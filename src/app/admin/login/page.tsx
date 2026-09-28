import { login } from '@/lib/admin/actions';
import { Logo } from '@/components/Logo';
import { param, type SearchParams } from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const configured = Boolean(process.env.ADMIN_PASSWORD);
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form action={login} className="ff-card w-full max-w-sm space-y-5 p-6">
        <div className="text-center">
          <Logo size="2rem" tagline />
          <p className="mt-4 text-sm text-muted">Painel administrativo</p>
        </div>
        {param(sp, 'erro') && <p className="rounded-xl bg-movies/15 px-3 py-2 text-sm font-semibold text-movies">Senha incorreta.</p>}
        {!configured && (
          <p className="rounded-xl bg-viral/15 px-3 py-2 text-sm text-viral">
            Defina ADMIN_PASSWORD nas variáveis de ambiente para ativar o acesso.
          </p>
        )}
        <label className="block">
          <span className="ff-label">Senha</span>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="ff-input" />
        </label>
        <button type="submit" className="ff-btn ff-btn-primary w-full">
          Entrar
        </button>
      </form>
    </main>
  );
}
