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
import { vmaArticles } from '../src/lib/data/content-vma';
import { mainArtist, norm, songKey } from '../src/lib/data/covers';
import { morePeople } from '../src/lib/data/people-more';
import { realPeople } from '../src/lib/data/people';

const FILE = 'src/lib/data/covers.json';
const db = JSON.parse(readFileSync(FILE, 'utf8')) as {
  songs: Record<string, string>;
  albums: Record<string, string>;
  articles: Record<string, { url: string; title: string }>;
  misses: Record<string, string>;
};
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
  if (db[bucket][key] || recentMiss(`${bucket}:${key}`) || calls >= MAX) return;
  let url = await find(title, artist, entity, countries);
  if (!url && entity === 'album') url = await find(title, artist, 'song', countries);
  if (!url && entity === 'song') url = await find(title, artist, 'album', countries);
  if (url) db[bucket][key] = url;
  else db.misses[`${bucket}:${key}`] = new Date().toISOString();
  console.log(url ? '✓' : '·', bucket, title, '—', artist);
}

const people = [...realPeople, ...morePeople];
const nameOf = new Map(people.map((p) => [p.id, p.publicName]));

async function main() {
  // 1) Charts (mais visíveis) e lançamentos
  for (const ch of liveCharts) {
    for (const e of ch.entries) await resolve('songs', e.title, e.artistName, 'song', ch.region === 'BR' ? ['BR', 'US'] : ['US', 'BR']);
  }
  for (const r of releases) await resolve(r.type === 'single' ? 'songs' : 'albums', r.title, r.artistName, r.type === 'single' ? 'song' : 'album');

  // 2) Matérias: título entre aspas + artista principal
  for (const a of [...vmaArticles, ...articles, ...archive]) {
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

  writeFileSync(FILE, JSON.stringify(db, null, 1) + '\n');
  console.log(`feito: ${calls} buscas · ${Object.keys(db.songs).length} músicas · ${Object.keys(db.albums).length} álbuns · ${Object.keys(db.articles).length} matérias`);
}

main();
