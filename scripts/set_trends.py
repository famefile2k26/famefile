#!/usr/bin/env python3
"""
Atualiza o radar de trends da aba Internet & Creators.
  python3 scripts/set_trends.py lote-trends.json

Cada item: {"kind":"sound|format|topic|video", "platform":"tiktok|instagram|youtube|x|twitch|kick|spotify",
 "region":"BR|US|AR|MX|GLOBAL", "rank":1, "videos": 123000 (opcional, só se a fonte mostrar),
 "growthPct": 35 (opcional, só se a fonte mostrar), "sourceUrl":"https://...",
 "image":{"url":"https://...","credit":"..."} (opcional),
 "t":{"pt":{"name":"...","note":"1 frase: o que é / por que está em alta"},"en":{...},"es":{...}}}
Itens sem fonte ou sem os 3 idiomas são descartados. Os itens entram como "curated" no topo do radar
(ficam 36h; substituem a curadoria anterior) e a coleta automática continua abaixo.
"""
import json, sys, pathlib, datetime, re

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / 'src/lib/data/trends-live.json'
KINDS = {'sound', 'format', 'topic', 'video'}
PLATFORMS = {'tiktok', 'instagram', 'youtube', 'x', 'twitch', 'kick', 'spotify'}
BLOCK = re.compile(r'\b(bets?|apostas|apuestas|blaze|tigrinho|felipe neto|ana paula renault)\b', re.I)

items = json.loads(pathlib.Path(sys.argv[1]).read_text())
now = datetime.datetime.utcnow().isoformat(timespec='seconds') + 'Z'
out = []
for i, x in enumerate(items):
    try:
        t = x['t']
        assert all(t[l]['name'] and t[l]['note'] for l in ('pt', 'en', 'es'))
        assert str(x.get('sourceUrl', '')).startswith('http')
    except Exception:
        print('descartado:', x.get('t', {}).get('pt', {}).get('name')); continue
    if BLOCK.search(json.dumps(t, ensure_ascii=False)):
        print('bloqueado:', t['pt']['name']); continue
    item = {
        'id': f"tr{len(out)+1}",
        'kind': x.get('kind') if x.get('kind') in KINDS else 'topic',
        'platform': x.get('platform') if x.get('platform') in PLATFORMS else 'tiktok',
        'region': x.get('region') or 'GLOBAL',
        'sourceUrl': x['sourceUrl'],
        'collectedAt': now,
        'hue': (len(out) * 37 + 300) % 360,
        'curated': True,
        't': t,
    }
    for k in ('rank', 'videos', 'growthPct'):
        if isinstance(x.get(k), (int, float)): item[k] = x[k]
    img = x.get('image') or {}
    if str(img.get('url', '')).startswith('https://'): item['image'] = {'url': img['url'], 'credit': img.get('credit') or ''}
    out.append(item)
# Mantém a coleta automática (TikTok/Google) abaixo dos virais com curadoria
try:
    auto = [x for x in json.loads(OUT.read_text()) if not x.get('curated')]
except Exception:
    auto = []
merged = out + auto
for i, x in enumerate(merged):
    x['id'] = f'tr{i+1}'
    x['hue'] = (i * 37 + 300) % 360
OUT.write_text(json.dumps(merged, ensure_ascii=False, indent=1) + '\n')
print(f'{len(out)} virais com curadoria + {len(auto)} automáticos no radar')
