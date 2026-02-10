import { supabase } from "@/integrations/supabase/client";
import { DatabaseLead, leadStates } from "@/types/lead";

export const fetchLeads = async (): Promise<DatabaseLead[]> => {
  try {
    const { data, error } = await supabase
      .from('leads')
      // NOTE: usare '*' evita errori quando cambiano i campi/JSON (es. cap/piano non sono colonne ma dentro indirizzo_dettagli)
      .select('*')
      .order('data_creazione', { ascending: false });

    if (error) {
      throw new Error(`Errore nel recuperare i lead: ${error.message}`);
    }
    
    return (data || []) as DatabaseLead[];
  } catch (error) {
    throw error;
  }
};

export const updateLeadStatus = async (leadId: string, newStatus: string): Promise<void> => {
  const validStatuses = Object.keys(leadStates);

  if (!validStatuses.includes(newStatus)) {
    throw new Error(`Stato non valido: ${newStatus}. Stati validi: ${validStatuses.join(', ')}`);
  }

  try {
    const { error } = await supabase
      .from('leads')
      .update({ 
        stato: newStatus,
        data_ultimo_contatto: new Date().toISOString()
      })
      .eq('id', leadId);

    if (error) {
      throw new Error(`Errore nell'aggiornare lo stato del lead: ${error.message}`);
    }
  } catch (error) {
    throw error;
  }
};
