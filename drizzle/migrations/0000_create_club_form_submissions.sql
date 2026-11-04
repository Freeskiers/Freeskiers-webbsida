CREATE TABLE public.club_form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_name text NOT NULL,
  recipient text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.club_form_submissions TO anon;
GRANT ALL ON public.club_form_submissions TO service_role;

ALTER TABLE public.club_form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visitors can submit forms"
  ON public.club_form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);