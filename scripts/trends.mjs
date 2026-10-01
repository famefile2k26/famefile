/**
 * Radar de trends da aba Internet & Creators — roda no GitHub Actions (workflow trends.yml).
 * Fontes públicas (nada estimado):
 *  - TikTok Creative Center: hashtags, músicas e criadores em alta por país (captura as respostas da própria página).
 *  - Google Trends (RSS "em alta agora") por país, com a notícia relacionada e a foto.
 * Saída: src/lib/data/trends-live.json (+ trends-meta.json com o diagnóstico da coleta).
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const OUT = 'src/lib/data/trends-live.json';
const META = 'src/lib/data/trends-meta.json';
const COUNTRIES = ['BR', 'US', 'AR', 'MX'];
const BLOCK = /\b(bets?|apostas|apuestas|blaze|tigrinho|cassino|casino|felipe neto|ana paula renault)\b/i;
const meta = { collectedAt: new Date().toISOString(), sources: {} };
const out = [];
// Filtro de cultura pop para o Google Trends (que mistura clima, processos, futebol de várzea…)
const POP = /\b(show|turn[eê]|álbum|album|disco|single|clipe|music|música|canci[oó]n|cantor|cantora|cantante|rapper|singer|filme|film|movie|pel[ií]cula|s[ée]rie|series|temporada|season|trailer|netflix|disney|hbo|hbo max|prime video|globoplay|novela|reality|bbb|fazenda|masterchef|youtube|youtuber|tiktok|instagram|influencer|streamer|twitch|kick|game|jogo|juego|playstation|xbox|nintendo|gta|fortnite|minecraft|esports|cs2|valorant|free fire|lol|oscar|grammy|emmy|vma|globo de ouro|golden globe|festival|rock in rio|lollapalooza|coachella|ator|atriz|actor|actress|celebridade|famos[oa]|met gala|k-?pop|bts|blackpink|taylor swift|anitta|beyonc[eé]|shakira|bad bunny|karol g|marvel|pixar|anime|meme|viral|trend)\b/i;
const names = (() => {
  const set = new Set();
  for (const f of ['src/lib/data/people.ts', 'src/lib/data/people-more.ts']) {
    if (!existsSync(f)) continue;
    for (const m of readFileSync(f, 'utf8').matchAll(/\bname:\s*['"]([^'"]{4,60})['"]/g)) set.add(m[1].toLowerCase());
  }
  try {
    for (const p of JSON.parse(readFileSync('src/lib/data/people-extra.json', 'utf8'))) if (p?.name) set.add(String(p.name).toLowerCase());
  } catch {}
  return [...set];
})();
const isPop = (...txt) => {
  const s = txt.filter(Boolean).join(' ');
  if (POP.test(s)) return true;
  const low = s.toLowerCase();
  return names.some((n) => low.includes(n));
};
const nf = (n, l) => new Intl.NumberFormat(l, { notation: 'compact', maximumFractionDigits: 1 }).format(n);
const cname = { BR: ['Brasil', 'Brazil', 'Brasil'], US: ['EUA', 'US', 'EE. UU.'], AR: ['Argentina', 'Argentina', 'Argentina'], MX: ['México', 'Mexico', 'México'] };

/* ─── TikTok Creative Center (via navegador headless) ─── */
async function tiktok() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    meta.sources.tiktok = 'playwright indisponível';
    return;
  }
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ locale: 'en-US', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36' });
  const kinds = [
    ['hashtag', 'topic'],
    ['music', 'sound'],
    ['creator', 'format'],
  ];
  for (const cc of COUNTRIES) {
    for (const [path, kind] of kinds) {
      const page = await ctx.newPage();
      const captured = [];
      const seenApis = [];
      page.on('response', async (res) => {
        const u = res.url();
        if (/creative_radar_api|popular_trend|creativecenter.*api/i.test(u)) {
          seenApis.push(`${res.status()} ${u.split('?')[0]}`);
          try {
            captured.push(await res.json());
          } catch {}
        }
      });
      const url = `https://ads.tiktok.com/business/creativecenter/inspiration/popular/${path}/pc/en?countryCode=${cc}&period=7`;
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
      } catch (e) {
        meta.sources[`tiktok-${path}-${cc}`] = `erro: ${String(e).slice(0, 120)}`;
      }
      const lists = captured.flatMap((j) => Object.values(j?.data ?? {}).filter(Array.isArray));
      let rows = lists.flat().slice(0, 5);
      // Plano B: ler o texto renderizado da página (hashtags começam com #)
      if (!rows.length && path === 'hashtag') {
        const tags = await page.$$eval('*', (els) =>
          [...new Set(els.map((e) => (e.childElementCount === 0 ? e.textContent?.trim() : '')).filter((t) => t && /^#\S{2,40}$/.test(t)))].slice(0, 5),
        ).catch(() => []);
        rows = tags.map((t, i) => ({ hashtag_name: t.slice(1), rank: i + 1 }));
      }
      meta.sources[`tiktok-${path}-${cc}`] = rows.length ? rows.length : { apis: seenApis.slice(0, 6), codes: captured.map((j) => j?.code ?? j?.msg).slice(0, 3), title: await page.title().catch(() => '') };
      for (const [i, r] of rows.entries()) {
        const rank = r.rank ?? i + 1;
        if (path === 'hashtag') {
          const name = `#${r.hashtag_name ?? r.hashtag ?? ''}`;
          if (name === '#' || BLOCK.test(name)) continue;
          const posts = r.publish_cnt ?? r.video_cnt;
          out.push({
            kind, platform: 'tiktok', region: cc, rank, videos: posts || undefined,
            sourceUrl: url,
            t: {
              pt: { name, note: `Hashtag em alta no TikTok (${cname[cc][0]}) — #${rank} na semana${posts ? `, ${nf(posts, 'pt-BR')} publicações` : ''}.` },
              en: { name, note: `Trending TikTok hashtag (${cname[cc][1]}) — #${rank} this week${posts ? `, ${nf(posts, 'en-US')} posts` : ''}.` },
              es: { name, note: `Hashtag en tendencia en TikTok (${cname[cc][2]}) — #${rank} de la semana${posts ? `, ${nf(posts, 'es')} publicaciones` : ''}.` },
            },
          });
        } else if (path === 'music') {
          const title = r.title ?? r.song_name;
          const author = r.author ?? r.artist ?? '';
          if (!title || BLOCK.test(title)) continue;
          const name = author ? `${title} — ${author}` : title;
          out.push({
            kind, platform: 'tiktok', region: cc, rank,
            sourceUrl: r.link || url,
            image: r.cover ? { url: r.cover, credit: 'TikTok' } : undefined,
            t: {
              pt: { name, note: `Som em alta no TikTok (${cname[cc][0]}) — #${rank} na semana.` },
              en: { name, note: `Trending TikTok sound (${cname[cc][1]}) — #${rank} this week.` },
              es: { name, note: `Sonido en tendencia en TikTok (${cname[cc][2]}) — #${rank} de la semana.` },
            },
          });
        } else {
          const name = r.nick_name ?? r.nickname ?? r.user_name;
          if (!name || BLOCK.test(name)) continue;
          const fol = r.follower_cnt;
          out.push({
            kind, platform: 'tiktok', region: cc, rank,
            sourceUrl: r.tt_link || url,
            image: r.avatar_url ? { url: r.avatar_url, credit: 'TikTok' } : undefined,
            t: {
              pt: { name: `@${name}`, note: `Criador em alta no TikTok (${cname[cc][0]})${fol ? ` — ${nf(fol, 'pt-BR')} seguidores` : ''}.` },
              en: { name: `@${name}`, note: `Trending TikTok creator (${cname[cc][1]})${fol ? ` — ${nf(fol, 'en-US')} followers` : ''}.` },
              es: { name: `@${name}`, note: `Creador en tendencia en TikTok (${cname[cc][2]})${fol ? ` — ${nf(fol, 'es')} seguidores` : ''}.` },
            },
          });
        }
      }
      await page.close();
    }
  }
  await browser.close();
}

/* ─── Google Trends RSS ─── */
const tag = (xml, t) => (xml.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)) ?? [])[1]?.replace(/<!\[CDATA\[|\]\]>/g, '').trim();
async function google() {
  for (const cc of COUNTRIES) {
    try {
      const xml = await (await fetch(`https://trends.google.com/trending/rss?geo=${cc}`, { headers: { 'User-Agent': 'Mozilla/5.0 FAMEFILE' } })).text();
      const items = xml.split('<item>').slice(1, 31);
      let n = 0;
      for (const it of items) {
        if (n >= 8) break;
        const title = tag(it, 'title');
        const traffic = tag(it, 'ht:approx_traffic');
        const news = it.split('<ht:news_item>')[1] ?? '';
        const url = tag(news, 'ht:news_item_url');
        const pic = tag(it, 'ht:picture') || tag(news, 'ht:news_item_picture');
        const src = tag(news, 'ht:news_item_source') || tag(it, 'ht:picture_source');
        const newsTitle = tag(news, 'ht:news_item_title');
        if (!title || !url || BLOCK.test(`${title} ${newsTitle ?? ''}`)) continue;
        if (!isPop(title, newsTitle)) continue;
        n++;
        out.push({
          kind: 'topic', platform: 'youtube', region: cc, rank: n,
          sourceUrl: url,
          image: pic ? { url: pic, credit: src || 'Google Trends' } : undefined,
          t: {
            pt: { name: title, note: `Busca em alta no Google (${cname[cc][0]})${traffic ? ` — ${traffic} buscas` : ''}${src ? ` · via ${src}` : ''}.` },
            en: { name: title, note: `Trending Google search (${cname[cc][1]})${traffic ? ` — ${traffic} searches` : ''}${src ? ` · via ${src}` : ''}.` },
            es: { name: title, note: `Búsqueda en tendencia en Google (${cname[cc][2]})${traffic ? ` — ${traffic} búsquedas` : ''}${src ? ` · vía ${src}` : ''}.` },
          },
        });
      }
      meta.sources[`google-${cc}`] = n;
    } catch (e) {
      meta.sources[`google-${cc}`] = `erro: ${String(e).slice(0, 120)}`;
    }
  }
}

await tiktok();
await google();
// TikTok: sem login a página devolve o mesmo ranking global para todos os países → deduplicar como GLOBAL
const seenTT = new Set();
const deduped = [];
for (const x of out) {
  if (x.platform === 'tiktok') {
    const key = `${x.kind}|${x.t.pt.name}`;
    if (seenTT.has(key)) continue;
    seenTT.add(key);
    if (!x.videos) {
      x.region = 'GLOBAL';
      x.t.pt.note = x.t.pt.note.replace(/\(([^)]+)\)/, '(global)');
      x.t.en.note = x.t.en.note.replace(/\(([^)]+)\)/, '(global)');
      x.t.es.note = x.t.es.note.replace(/\(([^)]+)\)/, '(global)');
    }
  }
  deduped.push(x);
}
// Virais com curadoria do robô (set_trends.py) ficam no topo por até 36h
let curated = [];
try {
  const prev = JSON.parse(readFileSync(OUT, 'utf8'));
  const cut = Date.now() - 36 * 3600e3;
  curated = prev.filter((x) => x.curated && Date.parse(x.collectedAt) > cut);
} catch {}
meta.curated = curated.length;
const fresh = deduped.map((x) => ({ collectedAt: meta.collectedAt, ...x }));
const items = [...curated, ...fresh].map((x, i) => ({ ...x, id: `tr${i + 1}`, hue: (i * 37 + 300) % 360 }));
meta.total = items.length;
if (items.length) writeFileSync(OUT, JSON.stringify(items, null, 1) + '\n');
writeFileSync(META, JSON.stringify(meta, null, 1) + '\n');
console.log(JSON.stringify(meta, null, 1));
