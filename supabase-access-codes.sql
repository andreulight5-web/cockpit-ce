-- ═══════════════════════════════════════════════════════════
-- COCKPIT CE — Système d'accès par code unique
-- À copier-coller dans le SQL editor de Supabase
-- ═══════════════════════════════════════════════════════════

-- 1. Table access_codes
create table if not exists public.access_codes (
  id           uuid primary key default gen_random_uuid(),
  code         text unique not null,
  email        text,
  activated_at timestamptz,
  created_at   timestamptz not null default now()
);

-- 2. RLS activé, aucune policy → la table n'est PAS lisible depuis le client.
--    L'accès passe uniquement par la RPC verify_access_code() ci-dessous.
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
    return jsonb_build_object('status', 'already_used');
  end if;
  update access_codes set activated_at = now() where id = found.id;
  return jsonb_build_object('status', 'activated', 'code', found.code);
end;
$$;

-- 4. Autorise l'appel de la RPC depuis le client (rôles anon + authenticated)
grant execute on function public.verify_access_code(text) to anon, authenticated;

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
