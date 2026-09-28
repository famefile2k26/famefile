-- 0001_foundation.sql — núcleo de People + Articles, multilíngue e normalizado.
-- Uma entidade = uma linha; textos por idioma ficam em *_translations.
-- Ainda não aplicada: o app lê src/lib/data/mock.ts até a Fase 2.

create extension if not exists pg_trgm;

create type locale_code as enum ('pt', 'en', 'es');
create type confidence_level as enum ('confirmed', 'reported', 'rumor', 'unverified');
create type risk_level as enum ('green', 'yellow', 'red');
create type person_kind as enum ('singer', 'actor', 'creator', 'streamer', 'athlete', 'other');
create type article_status as enum (
  'discovered', 'processing', 'draft', 'ai_review', 'human_review',
  'ready', 'scheduled', 'published', 'updated', 'rejected'
);

-- Imagens com procedência (permite remoção/substituição em massa)
create table images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  source_url text,
  source_name text,
  photographer text,
  agency text,
  credit text,
  rights_status text not null default 'unknown',
  retrieved_at timestamptz,
  created_at timestamptz not null default now()
);

-- ─── People / Entity graph ───────────────────────────────────
create table people (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  public_name text not null,
  legal_name text,
  kinds person_kind[] not null default '{}',
  birth_date date,
  country char(2),
  city text,
  profile_image_id uuid references images on delete set null,
  official_website text,
  external_ids jsonb not null default '{}',   -- { "spotify": "...", "wikidata": "Q..." }
  confidence_score real,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table person_aliases (
  person_id uuid not null references people on delete cascade,
  alias text not null,
  primary key (person_id, alias)
);
create index person_aliases_trgm on person_aliases using gin (lower(alias) gin_trgm_ops);
create index people_name_trgm on people using gin (lower(public_name) gin_trgm_ops);

create table person_translations (
  person_id uuid not null references people on delete cascade,
  locale locale_code not null,
  role text,
  bio text,
  now_summary text,
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now(),
  primary key (person_id, locale)
);

create table social_accounts (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people on delete cascade,
  platform text not null,          -- instagram | tiktok | youtube | x | twitch | kick | spotify ...
  handle text not null,
  url text,
  external_id text,
  unique (platform, handle)
);

-- ─── Categorias (verticais) ──────────────────────────────────
create table categories (
  key text primary key,            -- news | gossip | music | ...
  accent text
);
create table category_translations (
  category_key text not null references categories on delete cascade,
  locale locale_code not null,
  slug text not null,
  name text not null,
  primary key (category_key, locale),
  unique (locale, slug)
);

-- ─── Fontes e matérias ───────────────────────────────────────
create table sources (
  id uuid primary key default gen_random_uuid(),
  url text not null unique,
  publisher text,
  language text,
  published_at timestamptz,
  retrieved_at timestamptz not null default now(),
  confidence real
);

create table articles (
  id bigint generated always as identity primary key,   -- aparece na URL: /{slug}-{id}
  category_key text not null references categories,
  status article_status not null default 'draft',
  confidence confidence_level not null default 'unverified',
  risk risk_level not null default 'yellow',
  is_breaking boolean not null default false,
  hero_image_id uuid references images on delete set null,
  event_id uuid,                                        -- FK para events na Fase 7
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index articles_feed on articles (status, published_at desc);

create table article_translations (
  article_id bigint not null references articles on delete cascade,
  locale locale_code not null,
  slug text not null,
  headline text not null,
  summary text,
  content jsonb not null default '[]',                  -- blocos editoriais
  seo_title text,
  seo_description text,
  translation_status text not null default 'draft',
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (article_id, locale),
  unique (locale, slug)
);

create table article_entities (
  article_id bigint not null references articles on delete cascade,
  person_id uuid not null references people on delete cascade,
  role text not null default 'mentioned',               -- subject | mentioned
  primary key (article_id, person_id)
);
create index article_entities_person on article_entities (person_id);

create table article_sources (
  article_id bigint not null references articles on delete cascade,
  source_id uuid not null references sources on delete cascade,
  primary key (article_id, source_id)
);

create table article_updates (
  id bigint generated always as identity primary key,
  article_id bigint not null references articles on delete cascade,
  locale locale_code,
  note text not null,
  created_at timestamptz not null default now()
);

-- ─── RLS: leitura pública só do que está publicado ───────────
alter table images enable row level security;
alter table people enable row level security;
alter table person_aliases enable row level security;
alter table person_translations enable row level security;
alter table social_accounts enable row level security;
alter table categories enable row level security;
alter table category_translations enable row level security;
alter table sources enable row level security;
alter table articles enable row level security;
alter table article_translations enable row level security;
alter table article_entities enable row level security;
alter table article_sources enable row level security;
alter table article_updates enable row level security;

create policy public_read on images for select using (true);
create policy public_read on people for select using (true);
create policy public_read on person_aliases for select using (true);
create policy public_read on person_translations for select using (true);
create policy public_read on social_accounts for select using (true);
create policy public_read on categories for select using (true);
create policy public_read on category_translations for select using (true);
create policy public_read on articles for select using (status in ('published', 'updated'));
create policy public_read on article_translations for select using (
  exists (select 1 from articles a where a.id = article_id and a.status in ('published', 'updated'))
);
create policy public_read on article_entities for select using (
  exists (select 1 from articles a where a.id = article_id and a.status in ('published', 'updated'))
);
-- sources, article_sources, article_updates: apenas service role / CMS (sem policy pública).
