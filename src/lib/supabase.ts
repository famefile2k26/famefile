/**
 * Acesso ao Supabase via REST (PostgREST + Storage), sem SDK: zero dependências.
 * - Leitura pública: chave anon (respeita RLS: só conteúdo publicado).
 * - Escrita/admin/robô: service role — NUNCA exposta ao navegador (sem NEXT_PUBLIC_).
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseEnabled = () => Boolean(url && anonKey);
export const supabaseWritable = () => Boolean(url && serviceKey);

function headers(admin: boolean, extra: Record<string, string> = {}) {
  const key = admin ? serviceKey : anonKey;
  if (!url || !key) throw new Error('Supabase não configurado');
  // Chaves antigas (anon/service_role) são JWT e vão também no Authorization.
  // Chaves novas (sb_publishable_… / sb_secret_…) não são JWT: vão só no header apikey.
  const auth: Record<string, string> = key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {};
  return { apikey: key, ...auth, ...extra };
}

export async function sbSelect<T>(path: string, opts: { admin?: boolean; revalidate?: number } = {}): Promise<T[]> {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: headers(!!opts.admin),
    ...(opts.admin && opts.revalidate === undefined
      ? { cache: 'no-store' as const }
      : { next: { revalidate: opts.revalidate ?? 60, tags: ['content'] } }),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return (await res.json()) as T[];
}

export async function sbUpsert(table: string, rows: object[]): Promise<void> {
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers(true, {
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    }),
    body: JSON.stringify(rows),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
}

export async function sbInsert(table: string, row: object): Promise<void> {
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers(true, { 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify(row),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
}

/** Envia um arquivo para o bucket público "media" e devolve a URL pública. */
export async function sbUpload(path: string, file: Blob): Promise<string> {
  const res = await fetch(`${url}/storage/v1/object/media/${path}`, {
    method: 'POST',
    headers: headers(true, { 'Content-Type': file.type || 'application/octet-stream', 'x-upsert': 'true' }),
    body: file,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Upload ${res.status}: ${await res.text()}`);
  return `${url}/storage/v1/object/public/media/${path}`;
}
