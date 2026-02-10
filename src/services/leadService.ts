import { supabase } from "@/integrations/supabase/client";
import { DatabaseLead, leadStates } from "@/types/lead";

// ─── Lead Note type ─────────────────────────────────────────────────────────
export interface LeadNote {
  id: string;
  lead_id: string;
  user_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

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

// ─── Fetch notes for a lead ──────────────────────────────────────────────────
export const fetchLeadNotes = async (leadId: string): Promise<LeadNote[]> => {
  try {
    const { data, error } = await supabase
      .from('lead_notes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Errore nel recuperare le note: ${error.message}`);
    }

    return (data || []) as LeadNote[];
  } catch (error) {
    throw error;
  }
};

// ─── Add a note to a lead ────────────────────────────────────────────────────
export const addLeadNote = async (
  leadId: string,
  content: string
): Promise<LeadNote> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Utente non autenticato');

    const meta = user.user_metadata;
    const fullName = meta?.full_name || meta?.fullName;
    const firstName = meta?.first_name || meta?.firstName || '';
    const lastName = meta?.last_name || meta?.lastName || '';
    const authorName = fullName || (firstName && lastName ? `${firstName} ${lastName}` : firstName || user.email || 'Utente');

    const { data, error } = await supabase
      .from('lead_notes')
      .insert({
        lead_id: leadId,
        user_id: user.id,
        author_name: authorName,
        content: content.trim(),
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Errore nell'aggiungere la nota: ${error.message}`);
    }

    return data as LeadNote;
  } catch (error) {
    throw error;
  }
};

// ─── Delete a note ───────────────────────────────────────────────────────────
export const deleteLeadNote = async (noteId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('lead_notes')
      .delete()
      .eq('id', noteId);

    if (error) {
      throw new Error(`Errore nell'eliminare la nota: ${error.message}`);
    }
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
