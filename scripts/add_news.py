#!/usr/bin/env python3
"""
Robô editor do FAMEFILE — incorpora um lote de notícias (e perfis novos) ao site.

  python3 scripts/add_news.py lote-noticias.json [lote-perfis.json]

- Valida cada matéria (pt/en/es completos, seção válida, foto obrigatória, fontes).
- Aplica a regra editorial (pessoas bloqueadas: src/lib/editorial.ts).
- Descarta duplicadas (mesma fonte ou manchete muito parecida com algo já publicado).
- Gera ids numéricos únicos (AAMMDDHH + contador) e grava em src/lib/data/news-live.json (mais novas primeiro).
- Perfis novos vão para src/lib/data/people-extra.json (fotos saem sozinhas pelo workflow de capas).
"""
import json, re, sys, unicodedata, datetime, difflib, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / 'src/lib/data'
LIVE = DATA / 'news-live.json'
EXTRA = DATA / 'people-extra.json'
SECTIONS = {'news', 'music', 'charts', 'creators', 'streamers', 'movies-tv'}
SECTION_ALIAS = {'gossip': 'news', 'fofocas': 'news', 'events': 'music', 'style': 'news', 'movies': 'movies-tv', 'tv': 'movies-tv'}

def norm(s):
    s = unicodedata.normalize('NFD', s or '').encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()

def blocked():
    src = (ROOT / 'src/lib/editorial.ts').read_text()
    ids = re.findall(r"id: '([a-z0-9-]+)'", src)
    names = re.findall(r"names: \[([^\]]*)\]", src)
    names = [n.strip().strip("'\"") for group in names for n in group.split(',') if n.strip()]
    return set(ids), [n for n in names if n]

def known_slugs():
    slugs = set()
    for f in ['people.ts', 'people-more.ts']:
        slugs |= set(re.findall(r"slug: '([a-z0-9-]+)'", (DATA / f).read_text()))
    slugs |= {p['slug'] for p in json.loads(EXTRA.read_text())}
    return slugs

def all_existing():
    out = []
    for f in DATA.glob('*.json'):
        if f.name in ('covers.json', 'people-extra.json', 'br-agenda.json'):
            continue
        try:
            d = json.loads(f.read_text())
        except Exception:
            continue
        if isinstance(d, list):
            out += [x for x in d if isinstance(x, dict) and 't' in x]
    for f in DATA.glob('content*.ts'):
        out += [{'t': {'pt': {'headline': h}}, 'sources': []} for h in re.findall(r"headline: '([^']+)'", f.read_text())]
    return out

def main():
    batch = json.loads(pathlib.Path(sys.argv[1]).read_text())
    people_batch = json.loads(pathlib.Path(sys.argv[2]).read_text()) if len(sys.argv) > 2 else []
    bl_ids, bl_names = blocked()
    bl_re = re.compile('|'.join(map(re.escape, bl_names)), re.I) if bl_names else None

    # Perfis novos primeiro (para os personIds das matérias valerem)
    extra = json.loads(EXTRA.read_text())
    slugs = known_slugs()
    added_people = []
    for p in people_batch:
        s = p.get('slug', '')
        if not s or s in slugs or s in bl_ids or (bl_re and bl_re.search(p.get('name', ''))):
            continue
        if not all(isinstance(p.get(l), list) and len(p[l]) >= 2 for l in ('pt', 'en', 'es')):
            print('perfil ignorado (idiomas incompletos):', s); continue
        extra.append(p); slugs.add(s); added_people.append(s)
    EXTRA.write_text(json.dumps(extra, ensure_ascii=False, indent=1) + '\n')

    live = json.loads(LIVE.read_text())
    existing = all_existing()
    seen_urls = {src.get('url') for x in existing for src in x.get('sources', []) if src.get('url')}
    seen_heads = [norm(x['t']['pt']['headline']) for x in existing]
    now = datetime.datetime.utcnow()
    base = now.strftime('%y%m%d%H')
    used_ids = {x['id'] for x in live}
    n = 0; added = []; skipped = []
    for x in batch:
        try:
            t = x['t']
            assert all(t[l]['headline'] and t[l]['summary'] and t[l]['body'] and t[l]['slug'] for l in ('pt', 'en', 'es'))
        except Exception:
            skipped.append(('incompleta', x.get('t', {}).get('pt', {}).get('headline'))); continue
        head = t['pt']['headline']
        text = json.dumps(t, ensure_ascii=False)
        if (bl_re and bl_re.search(text)) or set(x.get('personIds', [])) & bl_ids:
            skipped.append(('bloqueada', head)); continue
        img = x.get('image') or {}
        if not (isinstance(img.get('url'), str) and img['url'].startswith('https://')):
            skipped.append(('sem foto', head)); continue
        srcs = [s for s in x.get('sources', []) if str(s.get('url', '')).startswith('http')]
        if not srcs:
            skipped.append(('sem fonte', head)); continue
        if any(s['url'] in seen_urls for s in srcs) or any(difflib.SequenceMatcher(None, norm(head), h).ratio() > 0.82 for h in seen_heads):
            skipped.append(('duplicada', head)); continue
        sec = SECTION_ALIAS.get(x.get('section'), x.get('section'))
        while True:
            n += 1
            nid = f'{base}{n:02d}'
            if nid not in used_ids: break
        item = {
            'id': nid,
            'section': sec if sec in SECTIONS else 'news',
            'publishedAt': x.get('publishedAt') or now.isoformat(timespec='seconds') + 'Z',
            'personIds': [p for p in x.get('personIds', []) if p in slugs],
            'confidence': x.get('confidence') if x.get('confidence') in ('confirmed', 'reported', 'rumor') else 'confirmed',
            'risk': x.get('risk') if x.get('risk') in ('green', 'yellow', 'red') else 'green',
            'image': {'url': img['url'], 'credit': img.get('credit') or 'Foto: reprodução'},
            'sources': [{'name': s.get('name') or s['url'], 'url': s['url']} for s in srcs[:3]],
            'hue': int(nid) * 47 % 360,
            't': t,
        }
        if x.get('breaking'): item['breaking'] = True
        live.insert(0, item); used_ids.add(nid); seen_heads.append(norm(head)); seen_urls |= {s['url'] for s in srcs}
        added.append(head)
    live.sort(key=lambda a: a['publishedAt'], reverse=True)
    LIVE.write_text(json.dumps(live, ensure_ascii=False, indent=1) + '\n')
    print(f'+{len(added)} matérias, +{len(added_people)} perfis, {len(skipped)} descartadas')
    for r, h in skipped: print(f'  descartada ({r}): {h}')

if __name__ == '__main__':
    main()
