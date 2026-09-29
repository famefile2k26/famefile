# PROJECT_STATE

_Atualizado: 2026-09-28 · Fase 1 completa + admin + arquivo de matérias_

## Arquitetura atual
- **Next.js 15 (App Router) + TypeScript estrito + Tailwind v4.** Monólito modular. Sem outras dependências de runtime.
- **i18n próprio e mínimo** (sem next-intl): `src/lib/i18n/` — `config.ts` (locales pt/en/es), `routes.ts` (slugs localizados + helpers de URL), `dictionaries/*.ts` (UI tipada; en/es são checados contra pt).
- **URLs:** `/{locale}` · `/{locale}/{secao-localizada}` · `/{locale}/{secao}/{slug-localizado}-{id}` · `/{locale}/p/{slug}`.
  Ex.: `/pt/fofocas/...-1002` ↔ `/es/chismes/...-1002`. O id no fim da matéria é a fonte da verdade: slug errado/outro idioma → redirect 308 para o canônico.
- **middleware.ts:** URL sem idioma → redireciona por cookie `NEXT_LOCALE` › `Accept-Language` › `pt`.
- **Marca: FAMEFILE** (slogan "Entertainment lives here"). `src/lib/brand.ts` (env `NEXT_PUBLIC_BRAND_NAME`, fallback FAMEFILE). Logo em HTML/CSS (`components/Logo.tsx`: FAME + pasta FILE em gradiente + ✦), favicon F✦ em `app/icon.svg`.
- **Identidade:** Fame Pink #FF005C → Viral Orange #FF8A00, Deep Night #0B0B0F; Montserrat Black itálico (manchetes `.ff-head`), Inter (texto); pills, selo inclinado `.slant-label`, ✦ como marcador. Tema escuro.
- **Dados:** `src/lib/data/index.ts` (repositório) → `store.ts`: lê a tabela `content` do Supabase (só publicados, cache 60s, tag `content`) ou, sem Supabase, o conteúdo local (`content.ts`, `people*.ts`).
- **Banco (MVP):** `supabase/migrations/0001_content_store.sql` — tabela `content(kind,id,status,data jsonb)` com o mesmo formato dos tipos TS, RLS (público lê só publicado), bucket `media` para fotos, `ingest_runs` para o robô. `supabase/seed.sql` gerado por `npm run seed:sql`. Esquema normalizado guardado em `docs/schema-normalizado-futuro.sql`.
- **Admin (`/admin`):** senha única (`ADMIN_PASSWORD` + cookie com hash), painel, matérias (lista por status + editor PT/EN/ES, status, risco, confiança, breaking, fontes, fact box, foto por upload/URL), famosos (lista com filtro sem foto + editor completo com upload). Server actions gravam no Supabase via REST (`src/lib/supabase.ts`, sem SDK).
- **Deploy:** passo a passo em `docs/DEPLOY.md` (GitHub → Supabase → Vercel → domínio).
- **Design system:** tokens em `src/app/globals.css` (`@theme`), acento por vertical (`sectionAccent`). Componentes: `ui.tsx` (Poster, badges, SectionHeader), `cards.tsx`, `Header`, `LanguageSelector`, `Hero`, `HomeModules`, `KeepExploring`, `EntityText`.

## Produção (no ar desde 28/09/2026)
- Site: https://famefile-two.vercel.app · Vercel: time "Famefile", projeto `famefile` (prj_x4Aa1ZDgrHu81uYboWfCPy5xriSw).
- Código: GitHub `famefile2k26/famefile` (branch main). Supabase: projeto `vqthzxcvtsevaltsdvsz` (São Paulo).
- Variáveis já configuradas: BRAND_NAME, SITE_URL, SUPABASE_URL, SUPABASE_ANON_KEY (publishable), ADMIN_SECRET. Faltam (dono cola na Vercel): SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD.
- Proteção de deploy só nos previews; produção é pública.

## Atualização 28/09 (noite)
- Abas Estilo e Eventos removidas; shows ficam na aba "Shows" de cada perfil.
- Perfis com abas (Visão geral · Premiações · Shows · Notícias). Prêmios em `lib/data/awards.ts` (Wikipedia/grammy.com + resultados do VMA 2026).
- Cobertura VMA 2026: `lib/data/content-vma.ts` (13 matérias com fontes).
- Charts: `lib/data/charts-live.ts` — Spotify (semanal) e Apple Music (diário), Global/Brasil/EUA. Padrão sempre Global; seletor de plataforma e país (CSS, sem JS).
- Store: conteúdo do código é a base; o Supabase sobrepõe o que o admin publica (mesmo id) e esconde o que foi despublicado.
- Home: hero só com o celular (feed estilo TikTok com matérias reais) e plateia erguendo iPhones com flashes. Sem slogan, sem chips. Estrela do A centralizada na barra.

## Atualização 28/09 (madrugada)
- Home: MacBook com o canal de vídeo do FAMEFILE + 3 celulares (feed vertical, feed de posts, Top Global) e flashes ao fundo. Canvas fixo escalado por breakpoint (zoom).
- Capas automáticas: workflow `covers.yml` (GitHub Actions) roda `scripts/covers.ts` (iTunes Search API) a cada mudança de dados e diariamente; grava `src/lib/data/covers.json`, usado em charts, lançamentos, obras dos perfis e matérias sem foto.
- Admin › Matérias: Ocultar/Mostrar e Excluir (lixeira com Restaurar), inclusive para matérias que vieram do código.

## Atualização 29/09 (manhã)
- Brasil: `lib/data/br-news.json` (37 matérias com foto das fontes) e `br-agenda.json` (100 shows/festivais out/2026–jan/2027), carregados por `content-br.ts`. Módulo "Brasil em alta" na home. Shows aparecem na aba Shows de cada perfil.
- Fotos de perfil automáticas (Wikipedia/Commons → Deezer) em covers.json; matéria sem foto usa capa citada ou foto do artista.

## Decisões importantes
- i18n caseiro em vez de next-intl: ~100 linhas, zero dependência, controle total dos slugs localizados. Reavaliar se precisarmos de plurais/ICU.
- Hero v2: celular rolando um feed vertical (5 cenas desenhadas em CSS: show, tapete vermelho, creator, live, chart) + fotógrafos em silhueta com flashes ao fundo. CSS puro; `HeroMotion` só pausa fora da tela. Logo aparece em ~1,2s (LCP); flashes ~1,2/s (WCAG 2.3.1); reduced-motion = estático sem flashes.
- Imagens são placeholders CSS (`Poster`) até existir pipeline de imagens com procedência/direitos.
- Entity linking em render (`lib/entities/link.ts`): aliases, maior nome primeiro, fronteira de palavra Unicode, **1ª menção por matéria**. Na Fase 2 o resultado deve ser persistido em `article_entities`.
- Home configurável pelo array `homeModules` em `HomeModules.tsx`.
- Tema único escuro por enquanto.

## O que já existe
- Home (hero feed + ticker + destaques + em alta + fofocas + lançamentos + chart + Creator Radar + ao vivo).
- Páginas próprias por vertical (`components/SectionViews.tsx`): **Charts** (músicas, Fame Chart, crescimento, maiores perfis), **Música** (lançamentos, top, artistas), **Creators** (formatos, sons em alta, Who's next), **Streamers** (ao vivo, Clip Radar), **Eventos** (agenda hoje/semana/mês). Demais verticais: feed com matéria de destaque.
- Matéria: confiança, entity links, **O que sabemos / não sabemos**, **Receipts** (linha do tempo), JSON-LD, continue acompanhando.
- Pessoa: Fame Score, redes, notícias, JSON-LD. Sitemap multilíngue, hreflang, robots, 404.
- **Conteúdo 100% real (desde 28/09/2026):** `lib/data/content.ts` (12 matérias com texto próprio e fontes, charts Spotify semanais BR/Global/EUA, lançamentos da semana, agenda de shows). Mock fictício removido. Módulos sem fonte real (trends/sons de creators, ao vivo, clips, Fame Score) ficam ocultos ou com aviso “em breve”.
- **Perfis reais** em `lib/data/people.ts` — 10 globais, 10 latinos, 10 Brasil — com infobox (nome completo, nascimento/idade, local, ocupação, ativo desde, estilos), bio, carreira em destaque e trabalhos principais nos 3 idiomas. Métricas (Fame Score, seguidores) ficam vazias até existir fonte. Diretório **Famosos** em `/{locale}/p` (link no header e vitrine na home). Pessoas fictícias do mock continuam só nas notícias/rankings demo.
- **Arquivo de matérias (jan–set/2026)** em `lib/data/content-archive.ts`: 19 matérias com texto próprio e fontes (Rock in Rio 2026, Coachella 2026, Luísa Sonza/“Brutal Paraíso”, Lollapalooza BR, Grammy, Super Bowl LX, Oscar, BBB 26, casamento Taylor Swift e Travis Kelce, BTS “Arirang”, Anitta “EQUILIBRIVM II”). Datadas quando o fato aconteceu, para o site ter histórico. Total: 30 matérias, 106 perfis (30 em `people.ts` + 76 em `people-more.ts`).
- **Home › “Os assuntos que marcaram 2026”** (`yearTopIds`): curadoria editorial, não ranking de cliques. Quando houver analytics, trocar por “Mais lidas” com dados reais.
- **Datas:** até 7 dias mostra “há X dias”; depois, data curta (com ano se for de outro ano).
- **Fotos:** `image?: { url, alt, credit }` em Article/Person/Release; `Poster` mostra a foto quando existe, senão placeholder.

## Preview ao vivo (sem `next dev`)
`.preview/run.sh` renderiza as páginas reais (mesmos componentes e dados, com stubs de `next/link`/`next/navigation`) num único HTML navegável, com Tailwind via CDN. Esse HTML é republicado sempre no mesmo artifact "Portal Pop Preview" a cada mudança.

## Pendências importantes
- Fotos dos 30 perfis: o ambiente de criação não acessa Wikipedia/Commons nem busca de imagens de celebridades; o dono vai vincular as fotos (admin ou enviando os arquivos/links).
- Rodar `npm install && npm run build` localmente (o ambiente de criação não tinha acesso ao npm) e corrigir eventuais erros de tipo.
- Busca (header) ainda não existe.
- Ticker infinito pausa em hover/focus; falta botão de pausa para touch (WCAG 2.2.2).
- Seções charts/events/style sem conteúdo mock (mostram fallback + "continue explorando").

## Requisito do usuário (confirmado)
Painel **admin** onde o dono edita qualquer conteúdo do portal e vincula as fotos que quiser (direitos de imagem são responsabilidade dele).

## Automação (pedido do dono: atualização contínua e automática)
Plano: Supabase (dados) + hospedagem (Vercel) + pipeline próprio em cron: busca fontes → extrai fatos → deduplica por evento → gera matéria PT/EN/ES com fontes → classifica risco (verde publica, amarelo/vermelho vai para revisão no admin). Charts e agenda atualizados pelo mesmo cron. Precisa: projeto Supabase, conta Vercel, repositório GitHub, chave da API da Anthropic.

## Próximo passo recomendado
**Fase 2 — Core Media:** ligar Supabase (client server-side, seed com o mock atual), implementar `lib/data/index.ts` sobre o banco, e um CMS mínimo (lista + editar matéria por idioma + status). Isso destrava conteúdo real, entity linking persistido e a página de pessoa com dados vivos.
