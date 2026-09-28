'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Article, ImageRef, Market, Person, PersonKind, Platform, Work, WorkKind } from '@/lib/data/types';
import { locales } from '@/lib/i18n/config';
import type { SectionKey } from '@/lib/i18n/routes';
import { sbUpload, sbUpsert, supabaseWritable } from '@/lib/supabase';
import { ADMIN_COOKIE, adminOpenInDev, adminToken } from './auth';

/* ─── Acesso ─────────────────────────────────────────────────── */

async function assertAdmin() {
  if (adminOpenInDev()) return;
  const pass = process.env.ADMIN_PASSWORD;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!pass || cookie !== (await adminToken(pass))) redirect('/admin/login');
}

export async function login(formData: FormData) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass || String(formData.get('password') ?? '') !== pass) redirect('/admin/login?erro=1');
  (await cookies()).set(ADMIN_COOKIE, await adminToken(pass), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect('/admin');
}

export async function logout() {
  (await cookies()).delete(ADMIN_COOKIE);
  redirect('/admin/login');
}

/* ─── Helpers de formulário ─────────────────────────────────── */

const str = (f: FormData, k: string) => String(f.get(k) ?? '').trim();
const lines = (v: string) =>
  v
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
const paragraphs = (v: string) =>
  v
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function imageFrom(f: FormData, prefix: string): Promise<ImageRef | undefined> {
  const file = f.get('imageFile');
  let url = str(f, 'imageUrl');
  if (file instanceof File && file.size > 0) {
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
    url = await sbUpload(`${prefix}/${Date.now()}.${ext}`, file);
  }
  if (!url) return undefined;
  return { url, alt: str(f, 'imageAlt') || undefined, credit: str(f, 'imageCredit') || undefined };
}

function statusFrom(f: FormData) {
  const intent = str(f, 'intent');
  if (intent === 'publish') return 'published';
  if (intent === 'review') return 'review';
  if (intent === 'reject') return 'rejected';
  return str(f, 'status') || 'draft';
}

async function persist(kind: 'article' | 'person', id: string, status: string, data: object, back: string) {
  try {
    await sbUpsert('content', [{ kind, id, status, data, updated_at: new Date().toISOString(), updated_by: 'admin' }]);
  } catch (err) {
    redirect(`${back}?erro=${encodeURIComponent(String(err).slice(0, 160))}`);
  }
  revalidateTag('content');
  revalidatePath('/', 'layout');
  redirect(`${back}?ok=${status}`);
}

/* ─── Matérias ──────────────────────────────────────────────── */

export async function saveArticle(formData: FormData) {
  await assertAdmin();
  const id = str(formData, 'id') || String(Date.now()).slice(-8);
  const back = `/admin/materias/${id}`;
  if (!supabaseWritable()) redirect(`${back}?erro=banco`);

  const extra = JSON.parse(str(formData, 'extraJson') || '{}') as Partial<Article>;
  const t = {} as Article['t'];
  const factBox = {} as NonNullable<Article['factBox']>;
  let hasFacts = false;
  for (const l of locales) {
    const headline = str(formData, `${l}.headline`);
    t[l] = {
      headline,
      slug: slugify(str(formData, `${l}.slug`) || headline) || id,
      summary: str(formData, `${l}.summary`),
      body: paragraphs(str(formData, `${l}.body`)),
    };
    const known = lines(str(formData, `${l}.known`));
    const unknown = lines(str(formData, `${l}.unknown`));
    if (known.length || unknown.length) hasFacts = true;
    factBox[l] = { known, unknown };
  }

  const sources = lines(str(formData, 'sources'))
    .map((row) => {
      const [name = '', url = ''] = row.split('|').map((s) => s.trim());
      return { name: name || url, url };
    })
    .filter((s) => /^https?:\/\//.test(s.url));

  const article: Article = {
    ...extra,
    id,
    section: (str(formData, 'section') || 'news') as SectionKey,
    confidence: (str(formData, 'confidence') || 'confirmed') as Article['confidence'],
    risk: (str(formData, 'risk') || 'green') as Article['risk'],
    breaking: formData.get('breaking') === 'on',
    publishedAt: str(formData, 'publishedAt') || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personIds: str(formData, 'personIds')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    hue: Number(str(formData, 'hue')) || 330,
    image: (await imageFrom(formData, `articles/${id}`)) ?? undefined,
    factBox: hasFacts ? factBox : undefined,
    sources,
    t,
  };
  await persist('article', id, statusFrom(formData), article, back);
}

/* ─── Famosos ───────────────────────────────────────────────── */

const platforms: Platform[] = ['instagram', 'tiktok', 'youtube', 'x', 'twitch', 'kick', 'spotify'];

export async function savePerson(formData: FormData) {
  await assertAdmin();
  const name = str(formData, 'publicName');
  const slug = str(formData, 'slug') || slugify(name);
  const back = `/admin/famosos/${slug}`;
  if (!supabaseWritable()) redirect(`${back}?erro=banco`);

  const extra = JSON.parse(str(formData, 'extraJson') || '{}') as Partial<Person>;
  const socials: Person['socials'] = {};
  for (const p of platforms) {
    const handle = str(formData, `social.${p}`).replace(/^@/, '');
    if (handle) socials[p] = { handle };
  }
  const works: Work[] = lines(str(formData, 'works'))
    .map((row) => {
      const [title = '', year = '', kind = 'album'] = row.split('|').map((s) => s.trim());
      return { title, year: Number(year), kind: kind as WorkKind };
    })
    .filter((w) => w.title && w.year);

  const t = {} as Person['t'];
  for (const l of locales) {
    t[l] = {
      role: str(formData, `${l}.role`),
      bio: str(formData, `${l}.bio`),
      now: str(formData, `${l}.now`) || undefined,
      highlights: lines(str(formData, `${l}.highlights`)),
    };
  }

  const person: Person = {
    ...extra,
    id: slug,
    slug,
    publicName: name,
    aliases: str(formData, 'aliases')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    kinds: formData.getAll('kinds').map(String) as PersonKind[],
    country: str(formData, 'country').toUpperCase() || 'BR',
    market: (str(formData, 'market') || undefined) as Market | undefined,
    legalName: str(formData, 'legalName') || undefined,
    birthDate: str(formData, 'birthDate') || undefined,
    deathDate: str(formData, 'deathDate') || undefined,
    birthPlace: str(formData, 'birthPlace') || undefined,
    activeSince: Number(str(formData, 'activeSince')) || undefined,
    genres: str(formData, 'genres')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    works,
    hue: Number(str(formData, 'hue')) || extra.hue || 330,
    image: (await imageFrom(formData, `people/${slug}`)) ?? undefined,
    socials,
    t,
  };
  await persist('person', slug, statusFrom(formData), person, back);
}
