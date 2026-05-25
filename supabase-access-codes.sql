-- ═══════════════════════════════════════════════════════════
-- COCKPIT CE — Système d'accès par code unique
-- À copier-coller dans le SQL editor de Supabase
-- ═══════════════════════════════════════════════════════════

-- 1. Table access_codes
create table if not exists public.access_codes (
  id                 uuid primary key default gen_random_uuid(),
  code               text unique not null,
  email              text,
  activated_at       timestamptz,
  stripe_session_id  text unique,
  email_sent_at      timestamptz,
  created_at         timestamptz not null default now()
);

-- Migrations idempotentes pour bases existantes
alter table public.access_codes add column if not exists stripe_session_id text unique;
alter table public.access_codes add column if not exists email_sent_at     timestamptz;

-- Index sur les codes disponibles (claim atomique rapide)
create index if not exists access_codes_available_idx
  on public.access_codes (created_at)
  where activated_at is null and email is null;

-- 2. RLS activé, aucune policy → la table n'est PAS lisible depuis le client.
--    L'accès passe uniquement par les RPCs ci-dessous.
alter table public.access_codes enable row level security;

-- 3. RPC sécurisée : vérifie un code, l'active si valide, retourne le statut.
create or replace function public.verify_access_code(input_code text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  found access_codes;
begin
  select * into found from access_codes where code = input_code;
  if not found.id is not null then
    return jsonb_build_object('status', 'invalid');
  end if;
  if found.activated_at is not null then
    -- Code déjà activé : le parent se connecte depuis un autre appareil. OK côté client.
    return jsonb_build_object('status', 'already_used', 'code', found.code);
  end if;
  update access_codes set activated_at = now() where id = found.id;
  return jsonb_build_object('status', 'activated', 'code', found.code);
end;
$$;

-- 4. Autorise l'appel de la RPC depuis le client (rôles anon + authenticated)
grant execute on function public.verify_access_code(text) to anon, authenticated;

-- ═══════════════════════════════════════════════════════════
-- 4bis. RPC réservée au worker Stripe (rôle service_role uniquement)
--       Atomique + idempotente + anti-race
-- ═══════════════════════════════════════════════════════════
create or replace function public.claim_access_code(
  buyer_email text,
  session_id  text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  claimed   access_codes;
  remaining int;
begin
  -- 1. Idempotence : déjà délivré pour ce session_id ?
  select * into claimed from access_codes where stripe_session_id = session_id;
  if claimed.id is not null then
    select count(*) into remaining
      from access_codes where activated_at is null and email is null;
    return jsonb_build_object(
      'status',        'already_issued',
      'code',          claimed.code,
      'email_sent_at', claimed.email_sent_at,
      'remaining',     remaining
    );
  end if;

  -- 2. Claim atomique du prochain code dispo (FOR UPDATE SKIP LOCKED)
  update access_codes
    set email = buyer_email,
        activated_at = now(),
        stripe_session_id = session_id
    where id = (
      select id from access_codes
       where activated_at is null and email is null
       order by created_at
       limit 1
       for update skip locked
    )
    returning * into claimed;

  if claimed.id is null then
    return jsonb_build_object('status', 'no_code_available');
  end if;

  select count(*) into remaining
    from access_codes where activated_at is null and email is null;

  return jsonb_build_object(
    'status',    'issued',
    'code',      claimed.code,
    'remaining', remaining
  );
end;
$$;

create or replace function public.mark_email_sent(session_id text)
returns void
language sql
security definer
set search_path = public
as $$
  update access_codes set email_sent_at = now() where stripe_session_id = session_id;
$$;

-- Ces deux RPCs ne sont accessibles QUE via la service_role key (worker server-side).
revoke execute on function public.claim_access_code(text, text) from anon, authenticated;
revoke execute on function public.mark_email_sent(text)         from anon, authenticated;
grant  execute on function public.claim_access_code(text, text) to service_role;
grant  execute on function public.mark_email_sent(text)         to service_role;

-- ═══════════════════════════════════════════════════════════
-- 6. Sync multi-appareils : données de l'app keyées par code
-- ═══════════════════════════════════════════════════════════
create table if not exists public.app_data (
  code        text primary key references public.access_codes(code) on delete cascade,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);

alter table public.app_data enable row level security;
-- Aucune policy directe : tout passe par les RPCs ci-dessous.

create or replace function public.read_app_data(input_code text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select data from app_data where code = input_code;
$$;

create or replace function public.upsert_app_data(input_code text, input_data jsonb)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Seul un code activé peut écrire des données
  if not exists (select 1 from access_codes where code = input_code and activated_at is not null) then
    raise exception 'access code not activated';
  end if;
  insert into app_data (code, data, updated_at)
    values (input_code, input_data, now())
  on conflict (code) do update
    set data = excluded.data, updated_at = excluded.updated_at;
end;
$$;

grant execute on function public.read_app_data(text)            to anon, authenticated;
grant execute on function public.upsert_app_data(text, jsonb)   to anon, authenticated;

-- ═══════════════════════════════════════════════════════════
-- 5. 50 codes pour le lancement
-- ═══════════════════════════════════════════════════════════
insert into public.access_codes (code) values
  ('CE-CALME-7K2P'),
  ('CE-CALME-3M8Q'),
  ('CE-ANCRE-4P9R'),
  ('CE-ANCRE-2T6L'),
  ('CE-ABRI-9D7W'),
  ('CE-ABRI-1H4M'),
  ('CE-BULLE-6V3K'),
  ('CE-BULLE-8N5J'),
  ('CE-COEUR-2R7B'),
  ('CE-COEUR-5L9F'),
  ('CE-COCON-3X8C'),
  ('CE-COCON-7Q4S'),
  ('CE-AURORE-9G2D'),
  ('CE-ELAN-6Y4N'),
  ('CE-ELAN-1K8T'),
  ('CE-EVEIL-5H7V'),
  ('CE-FORCE-3B6P'),
  ('CE-FORCE-8M2L'),
  ('CE-JOIE-4D9C'),
  ('CE-JOIE-7R3W'),
  ('CE-LUNE-2T5K'),
  ('CE-LUNE-6F8Q'),
  ('CE-NID-9S4M'),
  ('CE-NUAGE-3J7B'),
  ('CE-NUAGE-5P2L'),
  ('CE-OCEAN-8V6N'),
  ('CE-OCEAN-1H4T'),
  ('CE-PAIX-4Q9R'),
  ('CE-PAIX-7K3D'),
  ('CE-PAUSE-2C8M'),
  ('CE-PAUSE-6X5J'),
  ('CE-PHARE-9L7B'),
  ('CE-PHARE-3T4V'),
  ('CE-REPOS-5N8K'),
  ('CE-REPOS-8R2P'),
  ('CE-RESPIRE-1F6Q'),
  ('CE-RIVE-4M9C'),
  ('CE-SOUFFLE-7Y3H'),
  ('CE-SOUFFLE-2B5W'),
  ('CE-ZEN-6P8L'),
  ('CE-FLAMME-9K4N'),
  ('CE-ETOILE-3D7T'),
  ('CE-OASIS-5J2V'),
  ('CE-OASIS-8Q6M'),
  ('CE-BRISE-1R9P'),
  ('CE-ECLAIR-4H3K'),
  ('CE-AILE-7M5C'),
  ('CE-REVE-2L8F'),
  ('CE-CIME-5T4B'),
  ('CE-DOUCE-8W7Q')
on conflict (code) do nothing;
