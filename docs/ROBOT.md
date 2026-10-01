# Robô editor do FAMEFILE — roteiro de cada rodada

Este é o roteiro que a tarefa agendada segue (3x por dia). Também serve para qualquer atualização manual.

## 0. Preparar
1. Conectar o repositório `famefile2k26/famefile` com acesso de escrita e clonar.
2. `git pull` antes de tudo (o bot de capas também faz commits).
3. Ler `src/lib/data/news-live.json` (últimas matérias publicadas) para não repetir pautas.

## 1. Pesquisar (últimas ~12 horas, desde a rodada anterior)
Use WebSearch + WebFetch em veículos confiáveis (g1, gshow, UOL/Splash, CNN Brasil, Metrópoles, Quem, Terra, Billboard / Billboard Brasil, Variety, Deadline, THR, People, Rolling Stone, E! News, Infobae, Clarín, La Nación, El País, Omelete, IGN, Dexerto, ge…).
Pautas (linha editorial definida pelo dono em 01/10/2026 — o site tem que ser **irresistível**):
- **Artistas e música**: Brasil (queridinhos, sertanejo, funk, pop, rap), latinos (Tini, Lali, Arjona, Karol G, Shakira, Bad Bunny, Emilia, María Becerra, Duki…), internacionais e K-pop. Lançamentos, shows, tretas, romances, bastidores.
- **Games e gamers**: lançamentos, trailers, esports com times brasileiros, streamers (LOUD/Coringa, Casimiro, Gaules, Alanzoka, Cellbit…).
- **YouTubers, TikTokers e trends**: o que viralizou, desafios, polêmicas, números, memes do dia.
- **Cinema, séries e TV**: estreias, trailers, bilheteria, renovações, elenco e rumores; programas de TV, realities (A Fazenda, BBB), novelas e **apresentadores**.
- **Política**: só quando cruza com cultura pop/famosos/internet (celebridade que entrou na política, lei que afeta artistas e creators, eleição comentada por famosos). Tom neutro, fatos dos dois lados.
- **Engajamento**: priorizar o que gera conversa e clique — viradas, revelações, números impressionantes, "antes e depois", curiosidades.

Formatos que cada rodada deve trazer, além das notícias quentes (campo `"format"` no lote):
- **Especiais** (`"format":"feature"`), 2–4 por rodada: "Conheça a mansão onde fulano mora", "Quanto custa o carro de…", "Por dentro da festa de…", "A história de…", "Os bastidores de…". Sempre com fatos de fontes (imobiliárias, reportagens, posts oficiais) e foto.
- **Análises** (`"format":"review"`), 1–3 por rodada: crítica de filme/série/álbum/clipe que estreou — opinião própria, fundamentada, com nota de 0 a 10 no fim do texto. Deixe claro que é análise.
- **Listas** (`"format":"list"`): "10 looks mais comentados…", "As 5 maiores tretas da semana…".
- **Explicadores** (`"format":"explainer"`): "Entenda a polêmica entre…".
Meta por rodada: **15–30 matérias**, sendo 2–4 especiais e 1–3 análises. Nunca inventar nada; cada matéria com 1–3 fontes realmente abertas. Texto **próprio** (nunca copiar frases).
Boato/não confirmado: `confidence: "reported"`, `risk: "yellow"` e dizer no texto que é rumor.

### Regras permanentes
- **Bloqueados (nunca publicar notícia nem perfil):** Felipe Neto, Ana Paula Renault. Lista oficial em `src/lib/editorial.ts`.
- **Tema proibido: apostas/bets** (casas de apostas, "fim das bets", Blaze, tigrinho etc.). Não cobrir, nem como pauta secundária.
- **Toda matéria com foto**: a foto principal da matéria original (og:image / imagem de destaque), URL https direta. Sem foto = a matéria é descartada pelo script.
- Não existe mais a seção "fofocas": tudo de celebridade é `news`.

### Perfis (obrigatório — vamos construir um grande banco de famosos)
- **Todo famoso citado como protagonista de uma matéria precisa ter perfil no site.** Antes de publicar, confira os slugs existentes (`people.ts`, `people-more.ts`, `people-extra.json`); para quem não tiver, crie o perfil no lote de perfis (formato de `people-extra.json`: nome, mercado, tipo, país, Instagram oficial só se tiver certeza, nascimento, cidade, desde, estilos, trabalhos e bio/destaques em pt/en/es — só fatos verificáveis) e coloque o slug em `personIds`.
- A foto do perfil sai sozinha (workflow de capas: Wikipedia/Commons → Deezer). O script avisa matérias sem perfil vinculado.
- **Mutirão de perfis**: a cada rodada, crie também até 10 perfis de famosos que já aparecem em matérias publicadas sem perfil (procure nomes nas manchetes de `news-live.json`/`news-0929.json`).

### Trends e virais
- O **radar de trends** da aba Internet & Creators é automático: o workflow `.github/workflows/trends.yml` coleta a cada 3 horas o TikTok Creative Center (hashtags, sons e criadores em alta no BR/EUA/AR/MX) e o Google Trends, e grava `src/lib/data/trends-live.json`. O robô não precisa mexer nele (diagnóstico em `trends-meta.json`).
- O robô usa esse radar como **pauta**: os virais mais fortes do momento viram matéria (seção `creators`, formato `explainer` ou `list`), com foto e fontes.
- Se o radar estiver vazio ou com erro no `trends-meta.json`, monte um manualmente com `python3 scripts/set_trends.py /caminho/trends.json` (formato no cabeçalho do script).

## 2. Escrever o lote
Arquivo JSON (lista) — formato de cada item:
```json
{"section":"news|music|creators|streamers|movies-tv|charts", "format":"feature|review|list|explainer (opcional)",
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
