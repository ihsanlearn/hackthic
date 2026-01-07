create table platforms (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique
)

create table targets (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
)

create table target_platforms (
  target_id uuid references targets(id) on delete cascade,
  platform_id uuid references platforms(id),
  primary key (target_id, platform_id)
);

create table domains (
  id uuid primary key default gen_random_uuid(),
  target_id uuid references targets(id) on delete cascade,
  url text not null,
  title text,
  status_code integer,
  webserver text,
  technologies text[],
  ip text,
  cname text[],
  cdn text,
  priority_score integer default 0,
  in_scope boolean default true
);

create table endpoints (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid references domains(id) on delete cascade,

  path text not null,
  method text default 'GET',

  status_code integer,
  source text,              -- link, script, xhr, form, robots
  tag text,                 -- a, script, form, fetch

  has_query boolean default false,
  query_param_count integer default 0,

  is_api boolean default false,
  is_xhr boolean default false,
  is_form boolean default false,

  discovered_from text,     -- halaman asal
  depth integer default 0,

  confidence text, -- low | medium | high | null
  needs_manual boolean default false,

  created_at timestamp default now(),
  unique(domain_id, path, method)
);

create table payload_types (
  id uuid primary key default gen_random_uuid(),
  name text not null unique -- xss, sqli, etc.
);

create table payload_contexts (
  id uuid primary key default gen_random_uuid(),
  payload_type_id uuid references payload_types(id) on delete cascade,
  name text not null           -- html, attribute, js, url
);

create table payloads (
  id uuid primary key default gen_random_uuid(),
  payload_type_id uuid references payload_types(id),
  context_id uuid references payload_contexts(id),
  purpose text,
  payload text not null,
  encoding text,
  created_at timestamptz default now()
);

create table dork_engines (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  base_url text not null
);

create table dork_contexts (
  id uuid primary key default gen_random_uuid(),
  engine_id uuid references dork_engines(id) on delete cascade,
  name text not null
);

create table dorks (
  id uuid primary key default gen_random_uuid(),
  engine_id uuid references dork_engines(id),
  context_id uuid references dork_contexts(id),
  dork text not null,
  purpose text,
  created_at timestamptz default now()
);

alter table platforms enable row level security;
alter table targets enable row level security;
alter table target_platforms enable row level security;
alter table domains enable row level security;
alter table endpoints enable row level security;
alter table payload_types enable row level security;
alter table payload_contexts enable row level security;
alter table payloads enable row level security;
alter table dork_engines enable row level security;
alter table dork_contexts enable row level security;
alter table dorks enable row level security;

-- platforms
create policy "authenticated full access"
on platforms
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- targets
create policy "authenticated full access"
on targets
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- target_platforms
create policy "authenticated full access"
on target_platforms
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- domains
create policy "authenticated full access"
on domains
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- endpoints
create policy "authenticated full access"
on endpoints
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- payload_types
create policy "authenticated full access"
on payload_types
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- payload_contexts
create policy "authenticated full access"
on payload_contexts
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- payloads
create policy "authenticated full access"
on payloads
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- dork_engines
create policy "authenticated full access"
on dork_engines
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- dork_contexts
create policy "authenticated full access"
on dork_contexts
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- dorks
create policy "authenticated full access"
on dorks
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);



create index idx_domains_target_id on domains(target_id);
create index idx_endpoints_domain_id on endpoints(domain_id);
create index idx_payloads_type on payloads(payload_type_id);
create index idx_dorks_engine on dorks(engine_id);

create table tool_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table tools (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references tool_categories(id) on delete cascade,
  name text not null unique,
  description text,
  status text,
  version text,
  command text,
  created_at timestamptz default now()
);

alter table tool_categories enable row level security;
alter table tools enable row level security;

-- tool_categories
create policy "authenticated full access"
on tool_categories
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- tools
create policy "authenticated full access"
on tools
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

create index idx_tools_category on tools(category_id);

create table wordlist_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text
);

create table wordlists (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references wordlist_categories(id) on delete cascade,
  name text not null,
  path text not null,
  description text,
  line_count integer,
  size text,
  created_at timestamptz default now()
);

alter table wordlist_categories enable row level security;
alter table wordlists enable row level security;

-- wordlist_categories
create policy "authenticated full access"
on wordlist_categories
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

-- wordlists
create policy "authenticated full access"
on wordlists
for all
using (auth.uid() is not null)
with check (auth.uid() is not null);

create index idx_wordlists_category on wordlists(category_id);
