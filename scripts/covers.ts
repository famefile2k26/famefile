/**
 * Busca capas no iTunes Search API para: músicas dos charts, lançamentos, obras dos perfis
 * (álbuns/singles/EPs) e matérias que citam um título entre aspas.
 * Roda no GitHub Actions (tem internet); respeita ~20 req/min e só busca o que ainda não tem.
 *   npx tsx scripts/covers.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { liveCharts } from '../src/lib/data/charts-live';
import { articles, releases } from '../src/lib/data/content';
import { archive } from '../src/lib/data/content-archive';
import { brArticles } from '../src/lib/data/content-br';
import { vmaArticles } from '../src/lib/data/content-vma';
import { mainArtist, norm, songKey } from '../src/lib/data/covers';
import { morePeople } from '../src/lib/data/people-more';
import { realPeople } from '../src/lib/data/people';

const FILE = 'src/lib/data/covers.json';
const db = JSON.parse(readFileSync(FILE, 'utf8')) as {
  songs: Record<string, string>;
  albums: Record<string, string>;
  articles: Record<string, { url: string; title: string }>;
  people: Record<string, { url: string; credit: string; source: string }>;
  misses: Record<string, string>;
};
db.people ??= {};
const UA = { 'User-Agent': 'FAMEFILE-bot/1.0 (https://famefile-two.vercel.app)' };

async function getJson<T>(url: string, wait = 400): Promise<T | undefined> {
  await sleep(wait);
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.status === 429 || r.status >= 500) {
        await sleep(5000);
        continue;
      }
      if (!r.ok) return undefined;
      return (await r.json()) as T;
    } catch {
      await sleep(3000);
    }
  }
  return undefined;
}

/* ─── Deezer (plano B para capas; foto de artista como último recurso) ─── */
type DzTrack = { title: string; artist: { name: string; picture_xl?: string }; album: { title: string; cover_xl?: string } };
type DzArtist = { name: string; picture_xl?: string; nb_fan?: number };
const validDz = (u?: string) => (u && !/\/(artist|cover)\/\/|\/images\/(artist|cover)\/\//.test(u) ? u : undefined);

async function deezerCover(title: string, artist: string, kind: 'track' | 'album') {
  const q = kind === 'track' ? `artist:"${mainArtist(artist)}" track:"${title}"` : `artist:"${mainArtist(artist)}" album:"${title}"`;
  const res = await getJson<{ data?: DzTrack[] }>(`https://api.deezer.com/search?q=${encodeURIComponent(q)}`);
  const hit = res?.data?.find((t) => artistOk(t.artist.name, artist));
  if (hit) return validDz(hit.album.cover_xl);
  const loose = await getJson<{ data?: DzTrack[] }>(`https://api.deezer.com/search?q=${encodeURIComponent(`${title} ${mainArtist(artist)}`)}`);
  const h2 = loose?.data?.find((t) => artistOk(t.artist.name, artist) && (titleOk(t.title, title) || titleOk(t.album.title, title)));
  return validDz(h2?.album.cover_xl);
}

async function deezerArtistPhoto(name: string) {
  const res = await getJson<{ data?: DzArtist[] }>(`https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}`);
  const hit = res?.data?.find((a) => norm(a.name) === norm(name)) ?? res?.data?.find((a) => artistOk(a.name, name));
  return validDz(hit?.picture_xl);
}
const MAX = Number(process.env.COVERS_MAX ?? 900);
const WEEK = 7 * 864e5;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let calls = 0;

type Hit = { artistName: string; trackName?: string; collectionName?: string; artworkUrl100?: string };

async function search(term: string, entity: 'song' | 'album', country: string): Promise<Hit[]> {
  if (calls >= MAX) return [];
  calls++;
  await sleep(3200);
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=8&country=${country}`;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(url);
      if (r.status === 403 || r.status === 429) {
        await sleep(20000);
        continue;
      }
      if (!r.ok) return [];
      return ((await r.json()) as { results: Hit[] }).results ?? [];
    } catch {
      await sleep(5000);
    }
  }
  return [];
}

const big = (u?: string) => u?.replace(/\/\d+x\d+bb\./, '/600x600bb.');
const artistOk = (hit: string, artist: string) => {
  const a = norm(mainArtist(artist));
  const h = norm(hit);
  return !!a && (h.includes(a) || a.includes(h) || h.split(' ')[0] === a.split(' ')[0]);
};
const titleOk = (hit: string | undefined, title: string) => {
  if (!hit) return false;
  const a = norm(title);
  const h = norm(hit);
  return !!a && (h === a || h.startsWith(a) || a.startsWith(h));
};

async function find(title: string, artist: string, entity: 'song' | 'album', countries = ['US', 'BR']) {
  for (const c of countries) {
    const hits = await search(`${title} ${mainArtist(artist)}`, entity, c);
    const hit =
      hits.find((h) => artistOk(h.artistName, artist) && titleOk(entity === 'song' ? h.trackName : h.collectionName, title)) ??
      hits.find((h) => artistOk(h.artistName, artist) && titleOk(h.trackName ?? h.collectionName, title));
    if (hit?.artworkUrl100) return big(hit.artworkUrl100);
  }
  return undefined;
}

function recentMiss(key: string) {
  const t = db.misses[key];
  return t && Date.now() - Date.parse(t) < WEEK;
}

async function resolve(bucket: 'songs' | 'albums', title: string, artist: string, entity: 'song' | 'album', countries?: string[]) {
  const key = songKey(title, artist);
  if (db[bucket][key] || recentMiss(`${bucket}:${key}`)) return;
  let url = await find(title, artist, entity, countries);
  if (!url && entity === 'album') url = await find(title, artist, 'song', countries);
  if (!url && entity === 'song') url = await find(title, artist, 'album', countries);
  if (!url) url = await deezerCover(title, artist, entity === 'song' ? 'track' : 'album');
  if (!url) url = await deezerCover(title, artist, entity === 'song' ? 'album' : 'track');
  // Último recurso (charts/obras): foto do artista, para nenhum item ficar sem imagem.
  if (!url) url = await deezerArtistPhoto(mainArtist(artist));
  if (url) db[bucket][key] = url;
  else db.misses[`${bucket}:${key}`] = new Date().toISOString();
  console.log(url ? '✓' : '·', bucket, title, '—', artist);
}

const people = [...realPeople, ...morePeople];

const hint: Record<string, Record<string, string>> = {
  en: { singer: 'singer', actor: 'actor', creator: 'influencer', streamer: 'streamer', athlete: 'footballer' },
  pt: { singer: 'cantor', actor: 'ator', creator: 'influenciador', streamer: 'streamer', athlete: 'futebolista' },
  es: { singer: 'cantante', actor: 'actor', creator: 'influencer', streamer: 'streamer', athlete: 'futbolista' },
};
type WikiPages = { query?: { pages?: Record<string, { title: string; index?: number; thumbnail?: { source: string }; pageimage?: string }> } };

const BAD_PAGE = /discograph|videograph|filmograph|tour|album|controvers|rivalry|band$|list of|awards|song|\(disambiguation\)/i;

async function wikiExact(lang: string, title: string) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&redirects=1&titles=${encodeURIComponent(title)}` +
    `&prop=pageimages|pageprops&piprop=thumbnail|name&pithumbsize=800&pilicense=free`;
  const res = await getJson<{ query?: { pages?: Record<string, { title: string; missing?: string; thumbnail?: { source: string }; pageprops?: Record<string, string> }> } }>(url, 300);
  const page = Object.values(res?.query?.pages ?? {})[0];
  if (!page || page.missing !== undefined || page.pageprops?.disambiguation !== undefined || !page.thumbnail || BAD_PAGE.test(page.title)) return undefined;
  return { url: page.thumbnail.source, credit: 'Foto: Wikimedia Commons', source: `${lang}.wikipedia.org/wiki/${page.title.replace(/ /g, '_')}` };
}

async function wikiPhoto(lang: string, name: string, legal: string | undefined, kind: string) {
  for (const t of [name, legal].filter(Boolean) as string[]) {
    const exact = await wikiExact(lang, t);
    if (exact) return exact;
  }
  const term = `${name} ${hint[lang]?.[kind] ?? ''}`.trim();
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=5&gsrsearch=${encodeURIComponent(term)}` +
    `&prop=pageimages&piprop=thumbnail|name&pithumbsize=800&pilicense=free`;
  const res = await getJson<WikiPages>(url, 300);
  const pages = Object.values(res?.query?.pages ?? {}).sort((a, b) => (a.index ?? 9) - (b.index ?? 9));
  const first = norm(name).split(' ')[0] ?? '';
  const page = pages.find((p) => p.thumbnail && !BAD_PAGE.test(p.title) && norm(p.title).startsWith(first));
  if (!page?.thumbnail) return undefined;
  return { url: page.thumbnail.source, credit: 'Foto: Wikimedia Commons', source: `${lang}.wikipedia.org/wiki/${page.title.replace(/ /g, '_')}` };
}

async function personPhoto(name: string, legal: string | undefined, kinds: string[], market?: string) {
  const kind = kinds[0] ?? 'singer';
  const langs = market === 'brazil' ? ['pt', 'en'] : market === 'latin' ? ['en', 'es'] : ['en', 'pt'];
  for (const l of langs) {
    const w = await wikiPhoto(l, name, legal, kind);
    if (w) return w;
  }
  if (kinds.includes('singer')) {
    const dz = await deezerArtistPhoto(name);
    if (dz) return { url: dz, credit: 'Foto: Deezer', source: 'deezer.com' };
  }
  return undefined;
}
const nameOf = new Map(people.map((p) => [p.id, p.publicName]));

async function main() {
  // 1) Charts (mais visíveis) e lançamentos
  for (const ch of liveCharts) {
    for (const e of ch.entries) await resolve('songs', e.title, e.artistName, 'song', ch.region === 'BR' ? ['BR', 'US'] : ['US', 'BR']);
  }
  for (const r of releases) await resolve(r.type === 'single' ? 'songs' : 'albums', r.title, r.artistName, r.type === 'single' ? 'song' : 'album');

  // 2) Matérias: título entre aspas + artista principal
  for (const a of [...brArticles, ...vmaArticles, ...articles, ...archive]) {
    if (db.articles[a.id] || a.image) continue;
    const quoted = [...a.t.pt.headline.matchAll(/[“"]([^”"]{2,60})[”"]/g), ...a.t.pt.summary.matchAll(/[“"]([^”"]{2,60})[”"]/g)].map((m) => m[1]!);
    const artist = a.personIds.map((id) => nameOf.get(id)).find(Boolean);
    if (!quoted.length || !artist) continue;
    for (const q of quoted.slice(0, 2)) {
      const key = songKey(q, artist);
      await resolve('albums', q, artist, 'album');
      const url = db.albums[key] ?? db.songs[key];
      if (url) {
        db.articles[a.id] = { url, title: q };
        break;
      }
    }
  }

  // 3) Obras dos perfis (álbuns, singles, EPs)
  for (const p of people) {
    for (const w of p.works ?? []) {
      if (!['album', 'single', 'ep'].includes(w.kind)) continue;
      const title = w.title.replace(/\s*\((com|with|con) [^)]*\)/i, '');
      await resolve(w.kind === 'single' ? 'songs' : 'albums', title, p.publicName, w.kind === 'single' ? 'song' : 'album', p.market === 'brazil' ? ['BR', 'US'] : ['US', 'BR']);
    }
  }

  // 4) Fotos de perfil: Wikipedia/Wikimedia Commons (pt primeiro para o Brasil) → Deezer (artistas)
  for (const p of people) {
    if (p.image || db.people[p.id]) continue;
    const photo = await personPhoto(p.publicName, p.legalName, p.kinds, p.market);
    if (photo) db.people[p.id] = photo;
    console.log(photo ? '✓' : '·', 'foto', p.publicName, photo?.source ?? '');
  }

  writeFileSync(FILE, JSON.stringify(db, null, 1) + '\n');
  console.log(`feito: ${calls} buscas · ${Object.keys(db.songs).length} músicas · ${Object.keys(db.albums).length} álbuns · ${Object.keys(db.articles).length} matérias`);
}

main();
