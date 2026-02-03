import { supabase } from "@/integrations/supabase/client";
import { DatabaseLead } from "@/types/lead";

export const fetchLeads = async (): Promise<DatabaseLead[]> => {
  console.log("📥 Fetching leads from database");

  try {
    const { data, error } = await supabase
      .from('leads')
      .select(`
        id,
        nome,
        cognome,
        email,
        telefono,
        tipologia_abitazione,
        superficie,
        indirizzo,
        citta,
        cap,
        regione,
        piano,
        composizione,
        configurazione_tecnica,
        stima_min,
        stima_max,
        stima_media,
        stima_dettagli,
        data_richiesta_sopralluogo,
        orario_sopralluogo,
        note,
        numero_persone,
        tipo_proprieta,
        stato,
        data_creazione,
        data_ultimo_contatto,
        accetto_termini,
        moduli_selezionati,
        informazioni_generali,
        modulo_elettrico,
        modulo_fotovoltaico,
        modulo_sicurezza,
        stima_finale
      `)
      .order('data_creazione', { ascending: false });

    if (error) {
      console.error("❌ Error fetching leads:", error);
      throw new Error(`Errore nel recuperare i lead: ${error.message}`);
    }

    console.log(`✅ Fetched ${data?.length || 0} leads from database`);
    
    return (data || []) as DatabaseLead[];
  } catch (error) {
    console.error("💥 Critical error in fetchLeads:", error);
    throw error;
  }
};

export const updateLeadStatus = async (leadId: string, newStatus: string): Promise<void> => {
  console.log("🔄 Updating lead status:", { leadId, newStatus });

  const validStatuses = [
    'nuovo',
    'in_contatto', 
    'preventivo_inviato',
    'sopralluogo_fissato',
    'lavori_in_corso',
    'lavori_conclusi',
    'perso'
  ];

  if (!validStatuses.includes(newStatus)) {
    console.error("❌ Invalid status:", newStatus);
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
      console.error("❌ Error updating lead status:", error);
      throw new Error(`Errore nell'aggiornare lo stato del lead: ${error.message}`);
    }

    console.log("✅ Lead status updated successfully");
  } catch (error) {
    console.error("💥 Critical error in updateLeadStatus:", error);
    throw error;
  }
};
