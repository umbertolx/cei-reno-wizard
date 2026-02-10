-- Create lead_notes table for admin note timeline
CREATE TABLE IF NOT EXISTS public.lead_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookups by lead
CREATE INDEX idx_lead_notes_lead_id ON public.lead_notes(lead_id);

-- Order notes chronologically
CREATE INDEX idx_lead_notes_created_at ON public.lead_notes(lead_id, created_at DESC);

-- Enable RLS
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;

-- Only authenticated admin users can read notes
CREATE POLICY "Admins can read lead notes"
  ON public.lead_notes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- Only authenticated admin users can insert notes
CREATE POLICY "Admins can insert lead notes"
  ON public.lead_notes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
  );

-- Only the author can delete their own notes
CREATE POLICY "Authors can delete own notes"
  ON public.lead_notes FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid()
  );
