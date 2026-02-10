-- Add rate limiting to anonymous lead creation to prevent spam/abuse

-- 1. Create rate limiting function
CREATE OR REPLACE FUNCTION public.check_lead_rate_limit(p_email text, p_telefono text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  email_count integer;
  phone_count integer;
  global_count integer;
BEGIN
  -- Per-email limit: max 5 submissions per hour
  SELECT COUNT(*) INTO email_count
  FROM public.leads
  WHERE email = p_email
    AND data_creazione > NOW() - INTERVAL '1 hour';

  IF email_count >= 5 THEN
    RETURN false;
  END IF;

  -- Per-phone limit: max 5 submissions per hour
  SELECT COUNT(*) INTO phone_count
  FROM public.leads
  WHERE telefono = p_telefono
    AND data_creazione > NOW() - INTERVAL '1 hour';

  IF phone_count >= 5 THEN
    RETURN false;
  END IF;

  -- Global limit: max 30 new leads per minute (protects against distributed attacks)
  SELECT COUNT(*) INTO global_count
  FROM public.leads
  WHERE data_creazione > NOW() - INTERVAL '1 minute';

  IF global_count >= 30 THEN
    RETURN false;
  END IF;

  RETURN true;
END;
$$;

-- 2. Add index on telefono for rate limit query performance
CREATE INDEX IF NOT EXISTS idx_leads_telefono ON public.leads(telefono);

-- 3. Replace the anonymous insert policy with rate-limited version
DROP POLICY IF EXISTS "Allow anonymous lead creation" ON public.leads;

CREATE POLICY "Allow anonymous lead creation"
ON public.leads FOR INSERT
WITH CHECK (
  stato = 'nuovo' AND
  auth.uid() IS NULL AND
  public.check_lead_rate_limit(email, telefono)
);
