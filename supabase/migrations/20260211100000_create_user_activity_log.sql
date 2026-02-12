-- Tabella per tracciare l'attività degli utenti admin
CREATE TABLE IF NOT EXISTS public.user_activity_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    event_type text NOT NULL CHECK (event_type IN ('login', 'page_view', 'logout')),
    page text,
    metadata jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now()
);

-- Indici
CREATE INDEX IF NOT EXISTS idx_ual_user_id ON public.user_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_ual_created_at ON public.user_activity_log(created_at DESC);

-- RLS
ALTER TABLE public.user_activity_log ENABLE ROW LEVEL SECURITY;

-- Admin possono leggere tutto
CREATE POLICY "Admins can view all activity logs"
ON public.user_activity_log FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Utenti autenticati possono inserire solo i propri log
CREATE POLICY "Users can insert own activity"
ON public.user_activity_log FOR INSERT
WITH CHECK (auth.uid() = user_id);
