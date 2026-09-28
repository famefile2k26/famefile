import Link from 'next/link';

// Sem acesso a params aqui: mensagem curta nos três idiomas + saída para a home.
export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="font-display text-7xl font-extrabold tracking-tight">404</p>
      <p className="mt-4 text-muted">Página não encontrada · Page not found · Página no encontrada</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-fg px-5 py-3 text-sm font-bold text-bg">
        Home
      </Link>
    </div>
  );
}
