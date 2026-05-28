-- Ensure the anon role has INSERT permissions on the pacientes table
-- This allows submissions without a logged-in session securely
DROP POLICY IF EXISTS "anon_insert_pacientes" ON public.pacientes;
CREATE POLICY "anon_insert_pacientes" ON public.pacientes
  FOR INSERT TO anon WITH CHECK (true);
