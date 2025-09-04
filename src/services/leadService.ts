
import { supabase } from "@/integrations/supabase/client";
import { FormData } from "@/components/Configuratore";
import { EstimateResponse } from "@/types/estimate";

export interface DatabaseLead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  tipologia_abitazione: string;
  superficie: number;
  indirizzo: string;
  citta: string;
  cap: string;
  regione: string;
  piano: string;
  composizione: any;
  configurazione_tecnica: any;
  stima_min: number | null;
  stima_max: number | null;
  stima_media: number | null;
  stima_dettagli: any;
  data_richiesta_sopralluogo: string | null;
  orario_sopralluogo: string | null;
  note: string | null;
  tipo_proprieta: string;
  stato: string;
  data_creazione: string;
  data_ultimo_contatto: string | null;
  accetto_termini: boolean | null;
  // Nuovi campi modular
  moduli_selezionati?: string[];
  informazioni_generali?: any;
  modulo_elettrico?: any;
  modulo_fotovoltaico?: any;
  stima_finale?: any;
}

export const saveLeadToDatabase = async (
  formData: FormData,
  estimate: EstimateResponse
): Promise<string> => {
  console.log("🔄 Starting saveLeadToDatabase function");
  console.log("📋 Input formData:", JSON.stringify(formData, null, 2));
  console.log("📊 Input estimate:", JSON.stringify(estimate, null, 2));

  // Get data from new modular structure with fallback to old structure for backward compatibility
  const contatti = formData.contatti || {
    nome: formData.nome || '',
    cognome: formData.cognome || '',
    email: formData.email || '',
    telefono: formData.telefono || '',
    accettoTermini: formData.accettoTermini || false,
    tipoProprietà: formData.tipoProprietà || 'prima casa'
  };

  const info = formData.informazioniGenerali || {
    tipologiaAbitazione: formData.tipologiaAbitazione || '',
    superficie: formData.superficie || 0,
    indirizzo: formData.indirizzo || '',
    citta: formData.citta || '',
    cap: formData.cap || '',
    regione: formData.regione || '',
    piano: formData.piano || '',
    composizione: formData.composizione || {}
  };

  // Validation checks
  if (!contatti.nome || !contatti.cognome || !contatti.email || !contatti.telefono) {
    const missingFields = [];
    if (!contatti.nome) missingFields.push('nome');
    if (!contatti.cognome) missingFields.push('cognome');
    if (!contatti.email) missingFields.push('email');
    if (!contatti.telefono) missingFields.push('telefono');
    
    const error = `Campi obbligatori mancanti: ${missingFields.join(', ')}`;
    console.error("❌ Validation error:", error);
    throw new Error(error);
  }

  if (!estimate.min || !estimate.max) {
    const error = "Stima non valida: valori min/max mancanti";
    console.error("❌ Estimate validation error:", error);
    throw new Error(error);
  }

  // Prepara i dati per il database (rimuovi estimates dai moduli per evitare conflitti di tipo)
  const moduloElettricoForDB = formData.moduloElettrico ? {
    ...formData.moduloElettrico,
    estimate: undefined // Remove estimate from module data
  } : null;

  const moduloFotovoltaicoForDB = formData.moduloFotovoltaico ? {
    ...formData.moduloFotovoltaico,
    estimate: undefined // Remove estimate from module data
  } : null;

  const leadData = {
    nome: contatti.nome,
    cognome: contatti.cognome,
    email: contatti.email,
    telefono: contatti.telefono,
    tipologia_abitazione: info.tipologiaAbitazione,
    superficie: info.superficie,
    indirizzo: info.indirizzo,
    citta: info.citta,
    cap: info.cap,
    regione: info.regione,
    piano: info.piano,
    composizione: info.composizione,
    // Nuovi campi modular
    moduli_selezionati: formData.moduliSelezionati || [],
    informazioni_generali: info,
    modulo_elettrico: moduloElettricoForDB,
    modulo_fotovoltaico: moduloFotovoltaicoForDB,
    stima_finale: formData.stimaFinale ? JSON.parse(JSON.stringify(formData.stimaFinale)) : null,
    // Configurazione tecnica per retrocompatibilità
    configurazione_tecnica: {
      tipoRistrutturazione: formData.tipoRistrutturazione || formData.moduloElettrico?.tipoRistrutturazione,
      impiantoVecchio: formData.impiantoVecchio || formData.moduloElettrico?.impiantoVecchio,
      interventiElettrici: formData.interventiElettrici || formData.moduloElettrico?.interventiElettrici,
      ambientiSelezionati: formData.ambientiSelezionati || formData.moduloElettrico?.ambientiSelezionati,
      tipoImpianto: formData.tipoImpianto || formData.moduloElettrico?.tipoImpianto,
      tipoDomotica: formData.tipoDomotica || formData.moduloElettrico?.tipoDomotica,
      knxConfig: formData.knxConfig || formData.moduloElettrico?.knxConfig,
      bTicinoConfig: formData.bTicinoConfig || formData.moduloElettrico?.bTicinoConfig,
      elettrificareTapparelle: formData.elettrificareTapparelle || formData.moduloElettrico?.elettrificareTapparelle,
      numeroTapparelle: formData.numeroTapparelle || formData.moduloElettrico?.numeroTapparelle
    },
    stima_min: estimate.min,
    stima_max: estimate.max,
    stima_media: estimate.average,
    stima_dettagli: {
      breakdown: estimate.breakdown,
      deductions: estimate.deductions,
      calculatedAt: estimate.calculatedAt
    },
    data_richiesta_sopralluogo: contatti.dataRichiestaSopralluogo || null,
    orario_sopralluogo: contatti.orarioSopralluogo || null,
    note: contatti.note || null,
    tipo_proprieta: contatti.tipoProprietà,
    accetto_termini: contatti.accettoTermini,
    stato: "nuovo"
  };

  console.log("📦 Prepared lead data for database:", JSON.stringify(leadData, null, 2));

  try {
    console.log("🔄 Attempting to insert lead into database...");
    
    // Inserisci il lead nel database
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select('id')
      .single();

    if (error) {
      console.error("❌ Supabase error during lead insertion:", error);
      console.error("🔍 Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Errore nel salvare il lead: ${error.message}`);
    }

    if (!data || !data.id) {
      console.error("❌ No data returned from lead insertion");
      throw new Error("Nessun ID restituito dal database dopo l'inserimento");
    }

    console.log("✅ Lead inserted successfully with ID:", data.id);

    // Salva anche la stima nella tabella estimates
    const estimateData = {
      lead_id: data.id,
      min_price: estimate.min,
      max_price: estimate.max,
      average_price: estimate.average,
      breakdown: estimate.breakdown,
      deductions: estimate.deductions,
      configuration_snapshot: leadData.configurazione_tecnica,
    };

    console.log("📊 Preparing to save estimate data:", JSON.stringify(estimateData, null, 2));

    const { error: estimateError } = await supabase
      .from('estimates')
      .insert(estimateData);

    if (estimateError) {
      console.error("⚠️ Error saving estimate (non-blocking):", estimateError);
      // Non blocchiamo se c'è un errore nella stima, il lead è già salvato
    } else {
      console.log("✅ Estimate data saved successfully");
    }

    console.log("🎉 Complete save operation successful, returning lead ID:", data.id);
    return data.id;

  } catch (error) {
    console.error("💥 Critical error in saveLeadToDatabase:", error);
    
    if (error instanceof Error) {
      console.error("🔍 Error message:", error.message);
      console.error("🔍 Error stack:", error.stack);
    }
    
    throw error;
  }
};

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
        tipo_proprieta,
        stato,
        data_creazione,
        data_ultimo_contatto,
        accetto_termini
      `)
      .order('data_creazione', { ascending: false });

    if (error) {
      console.error("❌ Error fetching leads:", error);
      throw new Error(`Errore nel recuperare i lead: ${error.message}`);
    }

    console.log(`✅ Fetched ${data?.length || 0} leads from database`);
    console.log("📊 Leads data:", data);
    
    return data || [];
  } catch (error) {
    console.error("💥 Critical error in fetchLeads:", error);
    throw error;
  }
};

export const updateLeadStatus = async (leadId: string, newStatus: string): Promise<void> => {
  console.log("🔄 Updating lead status:", { leadId, newStatus });

  // Validate the status before sending to database
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
