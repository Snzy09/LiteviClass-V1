-- Create class_config table (single row)
create table if not exists class_config (
  id integer primary key default 1,
  school_name text not null,
  class_name text not null,
  homeroom_teacher text not null,
  footer_text text not null,
  teachers jsonb not null default '[]'::jsonb,
  students jsonb not null default '[]'::jsonb,
  duty_roster jsonb not null default '[]'::jsonb,
  subject_schedule jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Ensure single row semantics
insert into class_config (id, school_name, class_name, homeroom_teacher, footer_text)
values (1, 'SMAN 2 SEKAYU', 'XII.C', 'Maam Almi Ayu Anggraini', 'Belajar hari ini, sukses esok hari.')
on conflict (id) do nothing;

-- Create chat_messages
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  text text not null,
  at timestamptz not null default now(),
  cid text
);

-- RLS
alter table class_config enable row level security;
alter table chat_messages enable row level security;
