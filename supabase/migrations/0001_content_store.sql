-- 0001_content_store.sql — banco do FAMEFILE (MVP).
-- Cada entidade é um documento JSON com o MESMO formato dos tipos em src/lib/data/types.ts.
-- Simples de editar no admin e de gravar pelo robô editor. Quando o volume pedir,
-- migramos para o esquema normalizado em docs/schema-normalizado-futuro.sql.

create table if not exists content (
  kind text not null check (kind in ('article', 'person', 'event', 'chart', 'release', 'setting')),
  id text not null,
  status text not null default 'published' check (status in ('draft', 'review', 'published', 'rejected')),
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by text,
  primary key (kind, id)
);

create index if not exists content_kind_status on content (kind, status);
create index if not exists content_article_published on content ((data ->> 'publishedAt') desc) where kind = 'article';

-- Registro das execuções do robô editor
create table if not exists ingest_runs (
  id bigint generated always as identity primary key,
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  status text not null default 'running',
  summary jsonb not null default '{}'
);

-- Segurança: o público só lê o que está publicado; escrita apenas com a service role (servidor/admin/robô).
alter table content enable row level security;
alter table ingest_runs enable row level security;

drop policy if exists content_public_read on content;
create policy content_public_read on content for select using (status = 'published');

-- Fotos: bucket público "media" (upload só pelo servidor).
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;
