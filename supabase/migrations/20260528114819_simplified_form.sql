DO $$
BEGIN
  ALTER TABLE public.pacientes ALTER COLUMN telefone DROP NOT NULL;
  ALTER TABLE public.pacientes ALTER COLUMN idade DROP NOT NULL;
END $$;

DROP POLICY IF EXISTS "anon_insert" ON public.pacientes;
CREATE POLICY "anon_insert" ON public.pacientes
  FOR INSERT TO anon WITH CHECK (true);
