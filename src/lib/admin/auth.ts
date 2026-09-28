/** Autenticação do admin (MVP de dono único): senha em ADMIN_PASSWORD, cookie assinado por hash. */
export const ADMIN_COOKIE = 'ff_admin';

/** Token derivado da senha (funciona em Node e no Edge/middleware). */
export async function adminToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`${password}:famefile-admin:${process.env.ADMIN_SECRET ?? ''}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Em desenvolvimento sem senha configurada, o admin fica aberto; em produção, nunca. */
export function adminOpenInDev(): boolean {
  return !process.env.ADMIN_PASSWORD && process.env.NODE_ENV !== 'production';
}
