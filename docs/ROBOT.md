# Robô editor do FAMEFILE — roteiro de cada rodada

Este é o roteiro que a tarefa agendada segue (3x por dia). Também serve para qualquer atualização manual.

## 0. Preparar
1. Conectar o repositório `famefile2k26/famefile` com acesso de escrita e clonar.
2. `git pull` antes de tudo (o bot de capas também faz commits).
3. Ler `src/lib/data/news-live.json` (últimas matérias publicadas) para não repetir pautas.

## 1. Pesquisar (últimas ~12 horas, desde a rodada anterior)
Use WebSearch + WebFetch em veículos confiáveis (g1, gshow, UOL/Splash, CNN Brasil, Metrópoles, Quem, Terra, Billboard / Billboard Brasil, Variety, Deadline, THR, People, Rolling Stone, E! News, Infobae, Clarín, La Nación, El País, Omelete, IGN, Dexerto, ge…).
Pautas, em proporção parecida com a audiência:
- **Brasil** (famosos queridinhos, sertanejo, funk, pop, realities como A Fazenda/BBB, novelas, creators, bets e o que influenciadores falaram);
- **Latinos** (Tini, Lali, Ricardo Arjona, Karol G, Shakira, Bad Bunny, Emilia, María Becerra, Duki, Bizarrap, Peso Pluma…);
- **Internacional** (celebridades, música pop, K-pop);
- **Filmes e séries** (estreias, trailers, bilheteria, renovações, elenco, rumores);
- **Streamers e games** (LOUD/Coringa, Casimiro/CazéTV, Gaules, Alanzoka, Cellbit, esports).
Meta por rodada: **15–30 matérias**. Nunca inventar nada; cada matéria com 1–3 fontes realmente abertas. Texto **próprio** (nunca copiar frases).
Boato/não confirmado: `confidence: "reported"`, `risk: "yellow"` e dizer no texto que é rumor.

### Regras permanentes
- **Bloqueados (nunca publicar notícia nem perfil):** Felipe Neto, Ana Paula Renault. Lista oficial em `src/lib/editorial.ts`.
- **Toda matéria com foto**: a foto principal da matéria original (og:image / imagem de destaque), URL https direta. Sem foto = a matéria é descartada pelo script.
- Não existe mais a seção "fofocas": tudo de celebridade é `news`.

## 2. Escrever o lote
Arquivo JSON (lista) — formato de cada item:
```json
{"section":"news|music|creators|streamers|movies-tv|charts",
 "publishedAt":"ISO UTC", "breaking": false,
 "personIds":["slugs existentes ou novos"],
 "confidence":"confirmed|reported", "risk":"green|yellow",
 "image":{"url":"https://...","credit":"Foto: ..."},
 "sources":[{"name":"g1","url":"https://..."}],
 "t":{"pt":{"slug":"seo-kebab","headline":"...","summary":"1 frase","body":["p1","p2","p3"]},
      "en":{...tradução fiel, slug localizado...},
      "es":{...}}}
```
Corpo: 3 parágrafos curtos, jornalísticos. Manchetes fortes, mas factuais.
Perfis novos (opcional, só fatos verificáveis), em outro arquivo JSON (lista) no formato de `src/lib/data/people-extra.json`.

## 3. Publicar
```bash
python3 scripts/add_news.py /caminho/lote.json [/caminho/perfis.json]
git add -A && git commit -m "Robô: N notícias (data/hora)" && git push
```
O script valida, aplica as regras, descarta duplicadas/sem foto e grava em `src/lib/data/news-live.json`.
O push publica sozinho na Vercel; o workflow `covers.yml` busca capas e fotos de perfil novos.

## 4. Charts (sextas e segundas)
Atualizar `src/lib/data/charts-live.ts` (Spotify semanal Global/BR/EUA e Apple Music diário Global/BR/EUA via kworb.net), mantendo o formato.

## 5. Conferir
Depois do deploy, abrir https://famefile-two.vercel.app/pt e confirmar que as novas matérias aparecem com foto.
