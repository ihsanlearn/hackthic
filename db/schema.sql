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
  name text not null,
  priority_score integer default 0,
  in_scope boolean default true
);

create table endpoints (
  id uuid primary key default gen_random_uuid(),
  domain_id uuid references domains(id) on delete cascade,
  path text not null
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