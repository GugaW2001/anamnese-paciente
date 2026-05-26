DROP POLICY IF EXISTS "anon_insert" ON public.pacientes;
CREATE POLICY "anon_insert" ON public.pacientes
  FOR INSERT TO anon WITH CHECK (true);
