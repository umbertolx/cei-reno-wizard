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
  numero_persone?: number;
  tipo_proprieta?: string;
  stato: string;
  data_creazione: string;
  data_ultimo_contatto: string | null;
  accetto_termini: boolean | null;
  moduli_selezionati?: string[];
  informazioni_generali?: any;
  modulo_elettrico?: any;
  modulo_fotovoltaico?: any;
  modulo_sicurezza?: any;
  stima_finale?: any;
}

// Convert database lead to frontend Lead format
export const convertDatabaseLeadToLead = (dbLead: DatabaseLead): Lead => {
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
    cap: dbLead.cap,
    regione: dbLead.regione,
    piano: dbLead.piano,
    composizione: dbLead.composizione || {},
    stimaMin: dbLead.stima_min || 0,
    stimaMax: dbLead.stima_max || 0,
    stimaMedia: dbLead.stima_media || 0,
    stimaDettagli: dbLead.stima_dettagli,
    dataRichiesta: dbLead.data_creazione,
    dataUltimoContatto: dbLead.data_ultimo_contatto,
    stato: (dbLead.stato as LeadState) || 'nuovo',
    note: dbLead.note,
    orarioSopralluogo: dbLead.orario_sopralluogo,
    dataSopralluogo: dbLead.data_richiesta_sopralluogo,
    numeroPersone: dbLead.numero_persone || 2,
    utilizzoAbitazione: dbLead.tipo_proprieta || 'prima casa',
    tipoProprietà: dbLead.tipo_proprieta || 'prima casa',
    accettoTermini: dbLead.accetto_termini || false,
    sopralluogoRichiesto: !!dbLead.data_richiesta_sopralluogo,
    moduliSelezionati: dbLead.moduli_selezionati,
    informazioniGenerali: dbLead.informazioni_generali,
    moduloElettrico: dbLead.modulo_elettrico,
    moduloFotovoltaico: dbLead.modulo_fotovoltaico,
    moduloSicurezza: dbLead.modulo_sicurezza,
    stimaFinale: dbLead.stima_finale,
  };
};
