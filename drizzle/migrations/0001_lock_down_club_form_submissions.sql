DROP POLICY IF EXISTS "Visitors can submit forms" ON public.club_form_submissions;
REVOKE ALL ON public.club_form_submissions FROM anon;
REVOKE ALL ON public.club_form_submissions FROM authenticated;
GRANT ALL ON public.club_form_submissions TO service_role;