-- Netflixify My Life - Supabase Schema
-- Run this in your Supabase SQL editor

create table if not exists series (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  answers jsonb not null,
  series jsonb not null,
  poster_url text
);

-- Enable Row Level Security
alter table series enable row level security;

-- Allow public read access (for shareable links)
create policy "Public read access"
  on series for select
  using (true);

-- Allow insert from service role / anon (via API)
create policy "Allow insert"
  on series for insert
  with check (true);

-- Index for faster lookups
create index if not exists series_created_at_idx on series (created_at desc);
