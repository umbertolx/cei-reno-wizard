
-- Rimuovi il constraint esistente
ALTER TABLE public.leads DROP CONSTRAINT leads_stato_check;

-- Aggiorniamo eventuali valori non standard a valori validi
UPDATE public.leads 
SET stato = 'nuovo' 
WHERE stato NOT IN (
  'nuovo',
  'in_contatto', 
  'preventivo_inviato',
  'sopralluogo_fissato',
  'lavori_in_corso',
  'lavori_conclusi',
  'perso'
) OR stato IS NULL;

-- Ora aggiungiamo il nuovo constraint con tutti gli stati corretti
ALTER TABLE public.leads ADD CONSTRAINT leads_stato_check 
CHECK (stato IN (
  'nuovo',
  'in_contatto', 
  'preventivo_inviato',
  'sopralluogo_fissato',
  'lavori_in_corso',
  'lavori_conclusi',
  'perso'
));
