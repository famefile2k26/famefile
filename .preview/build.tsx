/**
 * Preview renderer: renderiza as páginas REAIS do app (mesmos componentes/dados)
 * para um único HTML navegável, publicado como artifact enquanto não há `next dev`.
 * Uso: tsx --tsconfig .preview/tsconfig.json .preview/build.tsx
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { cloneElement, isValidElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ArticlePage from '@/app/[locale]/[section]/[slug]/page';
import SectionPage from '@/app/[locale]/[section]/page';
import HomePage from '@/app/[locale]/page';
import PersonPage from '@/app/[locale]/p/[slug]/page';
import PeopleDirectory from '@/app/[locale]/p/page';
import AdminPeople from '@/app/admin/famosos/page';
import PersonEditor from '@/app/admin/famosos/[slug]/page';
import LoginPage from '@/app/admin/login/page';
import AdminArticles from '@/app/admin/materias/page';
import ArticleEditor from '@/app/admin/materias/[id]/page';
import AdminHome from '@/app/admin/page';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { brand } from '@/lib/brand';
import { getArticles, getPeople } from '@/lib/data';
import { articlePath, localeMeta, locales, personPath, sectionKeys, sectionPath, sectionSlugs, type Locale } from '@/lib/i18n';

const root = path.resolve(__dirname, '../..');

/** Mini-RSC: executa componentes async e resolve a árvore antes do render estático. */
async function resolve(node: unknown): Promise<unknown> {
  if (node == null || typeof node !== 'object') return node;
  if (Array.isArray(node)) return Promise.all(node.map(resolve));
  if (!isValidElement(node)) return node;
  const { type, props } = node as { type: unknown; props: Record<string, unknown> };
  if (typeof type === 'function' && type.constructor.name === 'AsyncFunction') {
    return resolve(await (type as (p: unknown) => Promise<unknown>)(props));
  }
  if (props && 'children' in props) {
    const children = await resolve(props.children);
    return cloneElement(node, undefined, ...(Array.isArray(children) ? children : [children]));
  }
  return node;
}

async function renderPage(locale: Locale, pagePath: string, page: Promise<ReactNode>) {
  (globalThis as { __PREVIEW_PATH__?: string }).__PREVIEW_PATH__ = pagePath;
  const tree = (await resolve(
    <>
      <Header locale={locale} />
      <main id="main">{await page}</main>
      <Footer locale={locale} />
    </>,
  )) as ReactNode;
  return renderToStaticMarkup(tree);
}

async function main() {
  const [articles, people] = await Promise.all([getArticles({ limit: 1000 }), getPeople()]);
  const pages: Record<string, string> = {};

  for (const locale of locales) {
    const p = <T,>(v: T) => Promise.resolve(v);
    pages[`/${locale}`] = await renderPage(locale, `/${locale}`, HomePage({ params: p({ locale }) }));
    for (const k of sectionKeys) {
      const url = sectionPath(locale, k);
      pages[url] = await renderPage(locale, url, SectionPage({ params: p({ locale, section: sectionSlugs[k][locale] }) }));
    }
    for (const a of articles) {
      const url = articlePath(locale, a.section, a.t[locale].slug, a.id);
      const [, , section, slug] = url.split('/') as [string, string, string, string];
      pages[url] = await renderPage(locale, url, ArticlePage({ params: p({ locale, section, slug }) }));
    }
    pages[`/${locale}/p`] = await renderPage(locale, `/${locale}/p`, PeopleDirectory({ params: p({ locale }) }));
    for (const person of people) {
      const url = personPath(locale, person.slug);
      pages[url] = await renderPage(locale, url, PersonPage({ params: p({ locale, slug: person.slug }) }));
    }
  }

  /* Painel admin (sem o cabeçalho do site) */
  const p = <T,>(v: T) => Promise.resolve(v);
  const sp = (o: Record<string, string> = {}) => Promise.resolve(o);
  const admin = async (url: string, el: Promise<ReactNode>) => {
    pages[url] = renderToStaticMarkup((await resolve(await el)) as ReactNode);
  };
  await admin('/admin', AdminHome({ searchParams: sp() }));
  await admin('/admin/login', LoginPage({ searchParams: sp() }));
  await admin('/admin/materias', AdminArticles({ searchParams: sp() }));
  for (const st of ['review', 'draft', 'published', 'rejected']) {
    await admin(`/admin/materias?status=${st}`, AdminArticles({ searchParams: sp({ status: st }) }));
  }
  await admin('/admin/materias/nova', ArticleEditor({ params: p({ id: 'nova' }), searchParams: sp() }));
  for (const a of articles) await admin(`/admin/materias/${a.id}`, ArticleEditor({ params: p({ id: a.id }), searchParams: sp() }));
  await admin('/admin/famosos', AdminPeople({ searchParams: sp() }));
  for (const f of ['sem-foto', 'brazil', 'latin', 'global']) {
    await admin(`/admin/famosos?filtro=${f}`, AdminPeople({ searchParams: sp({ filtro: f }) }));
  }
  await admin('/admin/famosos/novo', PersonEditor({ params: p({ slug: 'novo' }), searchParams: sp() }));
  for (const person of people) await admin(`/admin/famosos/${person.slug}`, PersonEditor({ params: p({ slug: person.slug }), searchParams: sp() }));

  const css = fs
    .readFileSync(path.join(root, 'src/app/globals.css'), 'utf8')
    .replace(/@import ['"]tailwindcss['"];?/, '');

  // Páginas comprimidas (gzip+base64) fora do DOM: o Tailwind do CDN só vê a página aberta.
  const packed = zlib.gzipSync(Buffer.from(JSON.stringify(pages)), { level: 9 }).toString('base64');

  const langs = JSON.stringify(Object.fromEntries(locales.map((l) => [l, localeMeta[l].htmlLang])));

  const out = `<title>FAMEFILE Preview</title>
<meta name="description" content="Preview ao vivo de ${brand.name}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700..900;1,700..900&family=Inter:wght@400..800&display=swap">
<style>
  :root { color-scheme: dark; --font-montserrat: 'Montserrat'; --font-inter: 'Inter'; }
  html, body { background: #0b0b0f; color: #fff; }
  #pv-bar { position: fixed; z-index: 90; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    font: 600 11px/1 ui-sans-serif, system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase;
    background: linear-gradient(100deg,#ff005c,#ff8a00); color: #fff; padding: 7px 10px; border-radius: 999px; box-shadow: 0 8px 24px -8px #000; }
</style>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.11"></script>
<style type="text/tailwindcss">${css}</style>
<div id="app"></div>
<a id="pv-bar" href="/admin">Preview · Admin →</a>
<script type="application/octet-stream" id="pv-data">${packed}</script>
<script>
(() => {
  const langs = ${langs};
  const app = document.getElementById('app');
  let pages = {};
  let current = '/pt';
  const has = (p) => Object.prototype.hasOwnProperty.call(pages, p);

  async function load() {
    const b64 = document.getElementById('pv-data').textContent.trim();
    const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const stream = new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'));
    pages = JSON.parse(await new Response(stream).text());
  }

  function resolvePath(p) {
    p = p.replace(/\\/$/, '') || '/pt';
    if (has(p)) return p;
    const parts = p.split('/').filter(Boolean);
    const locale = langs[parts[0]] ? parts[0] : 'pt';
    const id = (p.match(/-(\\d+)$/) || [])[1];
    if (id) {
      const hit = Object.keys(pages).find((k) => k.startsWith('/' + locale + '/') && k.endsWith('-' + id));
      if (hit) return hit;
    }
    return '/' + locale;
  }

  function show(p, keepScroll) {
    current = resolvePath(p);
    app.innerHTML = pages[current] || '';
    document.documentElement.lang = langs[current.split('/')[1]] || 'pt-BR';
    if (!keepScroll) window.scrollTo(0, 0);
    try { localStorage.setItem('pv-path', current); } catch (e) {}
  }

  function toast(msg) {
    let t = document.getElementById('pv-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'pv-toast';
      t.setAttribute('role', 'status');
      t.style.cssText = 'position:fixed;z-index:95;left:50%;bottom:64px;transform:translateX(-50%);max-width:min(92vw,460px);padding:12px 16px;border-radius:14px;background:#1f1c27;color:#fff;font:600 13px/1.4 system-ui;box-shadow:0 12px 30px -10px #000;border:1px solid rgba(255,255,255,.12)';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(t._h);
    t._h = setTimeout(() => { t.hidden = true; }, 4200);
  }
  document.addEventListener('submit', (e) => {
    e.preventDefault();
    toast('Isto é o preview: salvar e enviar fotos funciona no site publicado, depois de conectar o Supabase (docs/DEPLOY.md).');
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (href.startsWith('/')) {
      e.preventDefault();
      if (/^\\/(pt|en|es)(\\/|$)/.test(href) && a.hasAttribute('hreflang')) {
        try { document.cookie = 'NEXT_LOCALE=' + href.split('/')[1] + '; path=/'; } catch (err) {}
      }
      document.querySelectorAll('details[open]').forEach((d) => d.removeAttribute('open'));
      show(href);
    }
  });

  function start(data) {
    let saved = null;
    try { saved = localStorage.getItem('pv-path'); } catch (e) {}
    app.innerHTML = '<p style="padding:40vh 16px;text-align:center;font:600 14px system-ui;color:#a8a4b6">Carregando FAMEFILE…</p>';
    load()
      .then(() => show((data && data.path) || saved || '/pt', true))
      .catch((err) => {
        app.innerHTML = '<p style="padding:40vh 16px;text-align:center;font:600 14px system-ui;color:#ff005c">Não foi possível carregar o preview neste navegador (' + String(err && err.message || err) + ').</p>';
      });
  }
  try { window.claude && window.claude.hot && window.claude.hot.snapshot && window.claude.hot.snapshot(() => ({ path: current })); } catch (e) {}
  const hot = window.claude && window.claude.hot;
  hot && hot.ready ? hot.ready(start) : start((hot && hot.data) || {});
})();
</script>
`;
  fs.mkdirSync(path.join(root, '.preview/out'), { recursive: true });
  const file = path.join(root, '.preview/out/portal-pop-preview.html');
  fs.writeFileSync(file, out);
  console.log(`${Object.keys(pages).length} páginas · ${(out.length / 1024).toFixed(0)} KB → ${file}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
