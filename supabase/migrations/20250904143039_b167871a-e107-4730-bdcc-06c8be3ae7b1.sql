-- Aggiorna la tabella leads per supportare la struttura modular
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS moduli_selezionati TEXT[],
ADD COLUMN IF NOT EXISTS informazioni_generali JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS modulo_elettrico JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS modulo_fotovoltaico JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS stima_finale JSONB DEFAULT NULL;

-- Aggiorna la tabella estimates per supportare la struttura modular
ALTER TABLE public.estimates
ADD COLUMN IF NOT EXISTS modulo_type TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS parent_lead_id UUID REFERENCES public.leads(id);

-- Crea indici per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_leads_moduli_selezionati ON public.leads USING GIN(moduli_selezionati);
CREATE INDEX IF NOT EXISTS idx_estimates_modulo_type ON public.estimates(modulo_type);
CREATE INDEX IF NOT EXISTS idx_estimates_parent_lead_id ON public.estimates(parent_lead_id);

-- Commento per spiegare la struttura
COMMENT ON COLUMN public.leads.moduli_selezionati IS 'Array dei moduli selezionati dall''utente (es: impianto-elettrico, fotovoltaico)';
COMMENT ON COLUMN public.leads.informazioni_generali IS 'Dati comuni a tutti i moduli (superficie, indirizzo, composizione, ecc.)';
COMMENT ON COLUMN public.leads.modulo_elettrico IS 'Dati specifici del modulo elettrico (tipoRistrutturazione, knxConfig, ecc.)';
COMMENT ON COLUMN public.leads.modulo_fotovoltaico IS 'Dati specifici del modulo fotovoltaico (tipoIntervento, ecc.)';
COMMENT ON COLUMN public.leads.stima_finale IS 'Stima cumulativa finale con breakdown per modulo';
COMMENT ON COLUMN public.estimates.modulo_type IS 'Tipo di modulo per questa stima (elettrico, fotovoltaico, ecc.)';
COMMENT ON COLUMN public.estimates.parent_lead_id IS 'ID del lead genitore quando si tratta di stime per moduli specifici';