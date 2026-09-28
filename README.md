# BRAND_NAME (nome provisório)

Plataforma de cultura pop, entretenimento, creators e internet culture — PT / EN / ES.

## Rodar

```bash
cp .env.example .env.local   # ajuste NEXT_PUBLIC_BRAND_NAME quando a marca existir
npm install
npm run dev                  # http://localhost:3000 → redireciona para /pt, /en ou /es
```

`npm run build` gera tudo estático/ISR. `npm run typecheck` roda o TypeScript.

## Onde mexer

| Quero… | Arquivo |
|---|---|
| Trocar o nome da marca | `.env.local` → `NEXT_PUBLIC_BRAND_NAME` |
| Textos da interface | `src/lib/i18n/dictionaries/{pt,en,es}.ts` |
| Slugs das seções por idioma | `src/lib/i18n/routes.ts` |
| Ordem/módulos da home | `homeModules` em `src/components/HomeModules.tsx` |
| Cores / tokens | `src/app/globals.css` (`@theme`) |
| Dados (hoje mock) | `src/lib/data/mock.ts` → trocar a implementação em `src/lib/data/index.ts` |
| Banco | `supabase/migrations/` |

Estado do projeto e próximos passos: [`docs/PROJECT_STATE.md`](docs/PROJECT_STATE.md).

> Todo o conteúdo atual é fictício (pessoas, matérias e números).
