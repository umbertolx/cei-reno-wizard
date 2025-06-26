
-- Tabella principale per i lead generati dal configuratore
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Dati anagrafici
  nome TEXT NOT NULL,
  cognome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  
  -- Dati abitazione
  tipologia_abitazione TEXT NOT NULL,
  superficie INTEGER NOT NULL,
  indirizzo TEXT NOT NULL,
  citta TEXT NOT NULL,
  cap TEXT NOT NULL,
  regione TEXT NOT NULL,
  piano TEXT NOT NULL,
  
  -- Composizione stanze (JSON)
  composizione JSONB NOT NULL DEFAULT '{}',
  
  -- Configurazione tecnica (JSON per flessibilità)
  configurazione_tecnica JSONB DEFAULT '{}',
  
  -- Stima ricevuta
  stima_min INTEGER,
  stima_max INTEGER,
  stima_media INTEGER,
  stima_dettagli JSONB,
  
  -- Richiesta sopralluogo
  data_richiesta_sopralluogo DATE,
  orario_sopralluogo TIME,
  note TEXT,
  
  -- Tipo proprietà
  tipo_proprieta TEXT DEFAULT 'prima casa',
  
  -- Stato del lead
  stato TEXT DEFAULT 'nuovo' CHECK (stato IN ('nuovo', 'contattato', 'sopralluogo', 'preventivo', 'chiuso', 'perso')),
  
  -- Metadati
  data_creazione TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_ultimo_contatto TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Accettazione termini
  accetto_termini BOOLEAN DEFAULT false
);

-- Indici per migliorare le performance
CREATE INDEX idx_leads_stato ON public.leads(stato);
CREATE INDEX idx_leads_data_creazione ON public.leads(data_creazione DESC);
CREATE INDEX idx_leads_email ON public.leads(email);
CREATE INDEX idx_leads_citta ON public.leads(citta);

-- Tabella per le stime dettagliate (storico)
CREATE TABLE public.estimates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  
  -- Dati della stima
  min_price INTEGER NOT NULL,
  max_price INTEGER NOT NULL,
  average_price INTEGER NOT NULL,
  
  -- Breakdown dettagliato
  breakdown JSONB NOT NULL DEFAULT '{}',
  
  -- Detrazioni
  deductions JSONB DEFAULT '{}',
  
  -- Metadati
  calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Dati di configurazione usati per il calcolo
  configuration_snapshot JSONB NOT NULL DEFAULT '{}'
);

-- Indice per collegare le stime ai lead
CREATE INDEX idx_estimates_lead_id ON public.estimates(lead_id);

-- RLS: Per ora facciamo tutto pubblico per semplicità, 
-- in seguito implementeremo l'autenticazione admin
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimates ENABLE ROW LEVEL SECURITY;

-- Policy temporanea per permettere tutte le operazioni (da modificare quando implementeremo l'auth)
CREATE POLICY "Allow all operations on leads" ON public.leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on estimates" ON public.estimates FOR ALL USING (true) WITH CHECK (true);
