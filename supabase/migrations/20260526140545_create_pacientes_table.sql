CREATE TABLE IF NOT EXISTS public.pacientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registro_id TEXT UNIQUE NOT NULL,
  nome_completo TEXT NOT NULL,
  telefone TEXT NOT NULL,
  data_atendimento TEXT NOT NULL,
  idade INTEGER NOT NULL,
  motivo_exame TEXT NOT NULL,
  dados_triagem JSONB NOT NULL DEFAULT '{}'::jsonb,
  dados_exame TEXT,
  nome_tecnica TEXT,
  status TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.pacientes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select" ON public.pacientes;
CREATE POLICY "authenticated_select" ON public.pacientes FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert" ON public.pacientes;
CREATE POLICY "authenticated_insert" ON public.pacientes FOR INSERT TO authenticated WITH CHECK (true);

DO $$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'gustavomedimagem@gmail.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'gustavomedimagem@gmail.com',
      crypt('Skip@Pass', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Gustavo"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );
  END IF;
END $$;
