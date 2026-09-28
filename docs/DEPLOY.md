# Colocando o FAMEFILE no ar

Tempo estimado: 40–60 minutos. Custos: GitHub, Supabase e Vercel têm plano gratuito suficiente para começar. Domínio próprio custa ~R$ 40/ano (.com.br) ou ~US$ 12/ano (.com).

> Regra de ouro: as chaves marcadas como **secretas** nunca vão para o GitHub, para o chat ou para print. Elas só são coladas no painel da Vercel.

---

## 1. GitHub — guardar o código

1. Crie uma conta em https://github.com (se ainda não tiver).
2. Clique em **New repository** → nome `famefile` → **Private** → *Create repository*.
3. Na página do repositório, clique em **uploading an existing file**.
4. Descompacte o `famefile.zip` no seu computador e arraste **o conteúdo da pasta** (não a pasta em si) para a página. Não envie a pasta `node_modules` nem arquivos `.env`.
5. Clique em **Commit changes**.

## 2. Supabase — banco de dados e fotos

1. Crie uma conta em https://supabase.com → **New project**.
   - Nome: `famefile` · Região: **South America (São Paulo)** · Guarde a senha do banco.
2. Quando o projeto terminar de criar, abra **SQL Editor → New query**:
   1. Cole todo o conteúdo de `supabase/migrations/0001_content_store.sql` → **Run**.
   2. Nova query: cole todo o conteúdo de `supabase/seed.sql` → **Run**. Isso carrega as matérias, os 106 famosos, a agenda e os charts atuais.
3. Vá em **Project Settings → API** e anote:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (secreta) → `SUPABASE_SERVICE_ROLE_KEY`
4. Confira em **Storage** se existe o bucket **media** (público). Se não existir, crie com esse nome e marque *Public bucket*.

## 3. Vercel — colocar o site no ar

1. Crie uma conta em https://vercel.com usando **Continue with GitHub**.
2. **Add New → Project** → escolha o repositório `famefile` → **Import**.
3. Em **Environment Variables**, adicione (valores do passo 2 e os seus):

   | Nome | Valor |
   |---|---|
   | `NEXT_PUBLIC_BRAND_NAME` | `FAMEFILE` |
   | `NEXT_PUBLIC_SITE_URL` | por enquanto `https://famefile.vercel.app` (troca depois do domínio) |
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role (secreta) |
   | `ADMIN_PASSWORD` | uma senha forte para o painel (secreta) |
   | `ADMIN_SECRET` | um texto aleatório longo (secreto) |

4. **Deploy**. Em ~2 minutos o site abre em `https://<nome>.vercel.app`.
5. Teste:
   - `/` → deve abrir `/pt` com o hero e as notícias.
   - `/admin` → pede a senha → painel. Edite uma matéria, clique **Publicar** e veja a mudança no site em até 1 minuto.
   - Em **Famosos → Sem foto**, envie a foto de um perfil e confira na página dele.

Se o deploy falhar, copie a mensagem de erro do log da Vercel (aba **Deployments → Build Logs**) e mande no chat.

## 4. Domínio próprio

1. Compre o domínio (Registro.br para `.com.br`; Cloudflare, Namecheap ou a própria Vercel para `.com`).
2. Na Vercel: **Project → Settings → Domains → Add** → digite o domínio → siga as instruções de DNS que ela mostrar.
3. Atualize `NEXT_PUBLIC_SITE_URL` para `https://seudominio.com` e faça **Redeploy**.

## 5. Depois do ar (próximas etapas)

- **Robô editor automático:** criar chave em https://console.anthropic.com (API Keys) e adicionar `ANTHROPIC_API_KEY` e `CRON_SECRET` na Vercel. O cron roda a cada 2 horas, pesquisa notícias, escreve PT/EN/ES com fontes e publica sozinho o que for de risco baixo; o resto vai para revisão no admin.
- **Google Search Console:** cadastrar o domínio e enviar `https://seudominio.com/sitemap.xml`.
- **Analytics:** ativar Vercel Analytics (1 clique) ou Google Analytics.

## Rodar no seu computador (opcional)

Precisa do Node.js 20+ (https://nodejs.org).

```bash
cp .env.example .env.local     # preencha as variáveis
npm install
npm run dev                    # http://localhost:3000  ·  admin em /admin
npm run seed:sql               # regenera supabase/seed.sql a partir do conteúdo local
```
