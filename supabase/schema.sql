create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  nombre text not null,
  empresa text not null,
  email text not null,
  telefono text,
  sector text,
  preocupacion text not null,
  mensaje text,

  source text default 'dinerodormido.com',
  status text default 'nuevo',
  user_agent text,
  ip_address text
);

alter table public.leads enable row level security;
