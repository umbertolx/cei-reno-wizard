// Lead states definition for the admin dashboard
export const leadStates = {
  nuovo: { label: "Nuovo", color: "bg-blue-500" },
  in_contatto: { label: "In Contatto", color: "bg-yellow-500" },
  preventivo_inviato: { label: "Preventivo Inviato", color: "bg-purple-500" },
  sopralluogo_fissato: { label: "Sopralluogo Fissato", color: "bg-orange-500" },
  lavori_in_corso: { label: "Lavori in Corso", color: "bg-cyan-500" },
  lavori_conclusi: { label: "Lavori Conclusi", color: "bg-green-500" },
  perso: { label: "Perso", color: "bg-red-500" },
} as const;

export type LeadState = keyof typeof leadStates;

// Available colors for custom columns
export const availableColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-cyan-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-lime-500",
  "bg-amber-500",
];

export interface CustomColumn {
  id: string;
  label: string;
  color: string;
  order?: number;
}

export interface Lead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  tipologiaAbitazione: string;
  superficie: number;
  indirizzo: string;
  citta: string;
  cap: string;
  regione: string;
  piano: string;
  composizione: Record<string, number>;
  stimaMin: number;
  stimaMax: number;
  stimaMedia: number;
  stimaDettagli: any;
  dataRichiesta: string;
  dataUltimoContatto: string | null;
  stato: LeadState | string;
  note: string | null;
  orarioSopralluogo: string | null;
  dataSopralluogo: string | null;
  numeroPersone: number;
  utilizzoAbitazione: string;
  tipoProprietà?: string;
  accettoTermini: boolean;
  sopralluogoRichiesto?: boolean;
  moduliCompletati?: string[];
  // Modular fields
  moduliSelezionati?: string[];
  informazioniGenerali?: any;
  moduloElettrico?: any;
  moduloFotovoltaico?: any;
  moduloSicurezza?: any;
  stimaFinale?: any;
}

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
  regione: string;
  composizione: any;
  data_richiesta_sopralluogo: string | null;
  orario_sopralluogo: string | null;
  note: string | null;
  numero_persone: number | null;
  tipo_proprieta: string | null;
  stato: string | null;
  data_creazione: string | null;
  data_ultimo_contatto: string | null;
  accetto_termini: boolean | null;
  moduli_selezionati: string[] | null;

  // JSON aggiuntivi presenti in tabella (vedi schema Supabase)
  indirizzo_dettagli: any | null;
  stime: any | null;
  pvgis: any | null;

  // JSON dei moduli (nullable in DB)
  modulo_elettrico: any | null;
  modulo_fotovoltaico: any | null;
  modulo_sicurezza: any | null;

  // Campi legacy (se presenti in alcuni record vecchi)
  informazioni_generali?: any;
  stima_finale?: any;
}

// Convert database lead to frontend Lead format
// Normalizza la composizione supportando entrambi i formati (snake_case e camelCase)
const normalizeComposizione = (raw: any): Record<string, number> => {
  if (!raw || typeof raw !== 'object') {
    console.log("⚠️ normalizeComposizione: raw is empty or not object", raw);
    return { cucina: 0, cameraDoppia: 0, cameraSingola: 0, bagno: 0, soggiorno: 0 };
  }
  
  const result = {
    cucina: Number(raw.cucina ?? raw.cucine ?? 0),
    cameraDoppia: Number(raw.cameraDoppia ?? raw.camere_doppie ?? 0),
    cameraSingola: Number(raw.cameraSingola ?? raw.camere_singole ?? 0),
    bagno: Number(raw.bagno ?? raw.bagni ?? 0),
    soggiorno: Number(raw.soggiorno ?? raw.soggiorni ?? 0),
    altro: Number(raw.altro ?? 0),
  };
  
  console.log("🏠 normalizeComposizione:", { raw, result });
  return result;
};

export const convertDatabaseLeadToLead = (dbLead: DatabaseLead): Lead => {
  const indirizzoDettagli = (dbLead.indirizzo_dettagli as any) || {};
  const composizione = normalizeComposizione(dbLead.composizione);

  const stime = (dbLead.stime as any) || {};
  const totale = (stime.totale as any) || {};
  const stimaMin = typeof totale.min === "number" ? totale.min : 0;
  const stimaMax = typeof totale.max === "number" ? totale.max : 0;
  const stimaMedia =
    typeof totale.media === "number"
      ? totale.media
      : stimaMin && stimaMax
        ? Math.round((stimaMin + stimaMax) / 2)
        : 0;

  return {
    id: dbLead.id,
    nome: dbLead.nome,
    cognome: dbLead.cognome,
    email: dbLead.email,
    telefono: dbLead.telefono,
    tipologiaAbitazione: dbLead.tipologia_abitazione,
    superficie: dbLead.superficie,
    indirizzo: dbLead.indirizzo,
    citta: dbLead.citta,
    cap: String(indirizzoDettagli.cap ?? ""),
    regione: dbLead.regione,
    piano: String(indirizzoDettagli.piano ?? ""),
    composizione,
    stimaMin,
    stimaMax,
    stimaMedia,
    stimaDettagli: stime.dettagli ?? stime,
    dataRichiesta: dbLead.data_creazione || new Date().toISOString(),
    dataUltimoContatto: dbLead.data_ultimo_contatto,
    stato: (dbLead.stato as LeadState) || 'nuovo',
    note: dbLead.note,
    orarioSopralluogo: dbLead.orario_sopralluogo,
    dataSopralluogo: dbLead.data_richiesta_sopralluogo,
    numeroPersone: dbLead.numero_persone ?? 2,
    utilizzoAbitazione: dbLead.tipo_proprieta || 'prima casa',
    tipoProprietà: dbLead.tipo_proprieta || 'prima casa',
    accettoTermini: dbLead.accetto_termini ?? false,
    sopralluogoRichiesto: !!dbLead.data_richiesta_sopralluogo,
    moduliSelezionati: dbLead.moduli_selezionati || undefined,
    informazioniGenerali: (dbLead as any).informazioni_generali,
    moduloElettrico: dbLead.modulo_elettrico || undefined,
    moduloFotovoltaico: dbLead.modulo_fotovoltaico || undefined,
    moduloSicurezza: dbLead.modulo_sicurezza || undefined,
    stimaFinale: (dbLead as any).stima_finale,
  };
};
