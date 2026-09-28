import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, adminOpenInDev, adminToken } from '@/lib/admin/auth';
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

  /* Site: toda URL sem prefixo de idioma vai para /{locale}/... */
  if (isLocale(pathname.split('/')[1])) return;
  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  const locale = isLocale(cookie) ? cookie : matchLocale(request.headers.get('accept-language'));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
