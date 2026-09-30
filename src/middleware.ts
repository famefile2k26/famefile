import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, adminOpenInDev, adminToken } from '@/lib/admin/auth';
import { COUNTRY_COOKIE, COUNTRY_HEADER, localeForCountry } from '@/lib/geo';
import { isLocale, matchLocale } from '@/lib/i18n/config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Admin: protegido por senha (ADMIN_PASSWORD); login fica aberto. */
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (pathname.startsWith('/admin/login') || adminOpenInDev()) return;
    const pass = process.env.ADMIN_PASSWORD;
    const ok = pass && request.cookies.get(ADMIN_COOKIE)?.value === (await adminToken(pass));
    if (!ok) return NextResponse.redirect(new URL('/admin/login', request.url));
    return;
  }

  /* País do leitor: ?cc=AR força (útil para testar); senão a Vercel informa pelo IP. */
  const forced = request.nextUrl.searchParams.get('cc')?.toUpperCase();
  const country = (forced && /^[A-Z]{2}$/.test(forced) ? forced : request.headers.get(COUNTRY_HEADER)?.toUpperCase()) || undefined;
  const remember = (res: NextResponse) => {
    if (forced && /^[A-Z]{2}$/.test(forced)) res.cookies.set(COUNTRY_COOKIE, forced, { path: '/', maxAge: 60 * 60 * 24 * 30, sameSite: 'lax' });
    return res;
  };

  /* Site: toda URL sem prefixo de idioma vai para /{locale}/...
     Idioma: escolha do leitor (cookie) › país (BR→pt, AR/MX/ES…→es, EUA e demais→en) › navegador. */
  if (isLocale(pathname.split('/')[1])) return remember(NextResponse.next());
  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  const locale = isLocale(cookie) ? cookie : (localeForCountry(forced ?? country) ?? matchLocale(request.headers.get('accept-language')));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return remember(NextResponse.redirect(url));
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
