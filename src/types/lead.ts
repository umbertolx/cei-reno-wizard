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

// Counter badge colors for lead states
export const counterColors: Record<string, string> = {
  nuovo: "bg-green-500",
  in_contatto: "bg-yellow-500",
  preventivo_inviato: "bg-red-500",
  sopralluogo_fissato: "bg-orange-500",
  lavori_in_corso: "bg-cyan-500",
  lavori_conclusi: "bg-green-500",
  perso: "bg-red-500",
};

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

// ─── Stime (costi calcolati server-side) ───────────────────────────────────
export interface StimeModulo {
  costo: number;
  dettagli: Record<string, number>;
}

export interface StimeTotale {
  min: number;
  media: number;
  max: number;
}

export interface Stime {
  elettrico?: StimeModulo;
  fotovoltaico?: StimeModulo;
  sicurezza?: StimeModulo;
  totale: StimeTotale;
  calcolato_il?: string;
}

// ─── PVGIS (dati irraggiamento solare) ─────────────────────────────────────
export interface Pvgis {
  energia_annua_kwh: number;
  kwh_per_kwp: number;
}

// ─── Indirizzo dettagli ────────────────────────────────────────────────────
export interface IndirizzoDettagli {
  via?: string;
  citta?: string;
  cap?: string;
  regione?: string;
  piano?: string;
  lat?: number;
  lng?: number;
}

// ─── Composizione stanze ───────────────────────────────────────────────────
export interface Composizione {
  soggiorni: number;
  cucine: number;
  camere_doppie: number;
  camere_singole: number;
  bagni: number;
  altro: number;
}

// ─── Frontend Lead interface ───────────────────────────────────────────────
export interface Lead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  tipologiaAbitazione: string;
  tipoProprietà: string;
  superficie: number;
  indirizzo: string;
  citta: string;
  regione: string;
  indirizzoDettagli: IndirizzoDettagli;
  composizione: Composizione;
  numeroPersone: number;
  accettoTermini: boolean;
  // Stime economiche
  stime: Stime | null;
  stimaMin: number;
  stimaMax: number;
  stimaMedia: number;
  pvgis: Pvgis | null;
  // Moduli
  moduliSelezionati: string[];
  moduloElettrico: Record<string, any> | null;
  moduloFotovoltaico: Record<string, any> | null;
  moduloSicurezza: Record<string, any> | null;
  // Timeline & stato
  dataRichiesta: string;
  dataUltimoContatto: string | null;
  stato: LeadState | string;
  // Sopralluogo
  dataSopralluogo: string | null;
  orarioSopralluogo: string | null;
  sopralluogoRichiesto: boolean;
  // Note
  note: string | null;
}

// ─── Database Lead (matches Supabase schema) ───────────────────────────────
export interface DatabaseLead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  tipologia_abitazione: string;
  tipo_proprieta: string | null;
  superficie: number;
  indirizzo: string;
  citta: string;
  regione: string;
  indirizzo_dettagli: any | null;
  composizione: any;
  numero_persone: number | null;
  accetto_termini: boolean | null;
  // Stime & PVGIS
  stime: any | null;
  pvgis: any | null;
  // Moduli
  moduli_selezionati: string[] | null;
  modulo_elettrico: any | null;
  modulo_fotovoltaico: any | null;
  modulo_sicurezza: any | null;
  // Timeline
  data_creazione: string | null;
  data_ultimo_contatto: string | null;
  stato: string | null;
  // Sopralluogo
  data_richiesta_sopralluogo: string | null;
  orario_sopralluogo: string | null;
  // Note
  note: string | null;
}

// ─── Normalizza composizione (snake_case DB → snake_case frontend) ─────────
const normalizeComposizione = (raw: any): Composizione => {
  if (!raw || typeof raw !== 'object') {
    return { soggiorni: 0, cucine: 0, camere_doppie: 0, camere_singole: 0, bagni: 0, altro: 0 };
  }

  return {
    soggiorni: Number(raw.soggiorni ?? raw.soggiorno ?? 0),
    cucine: Number(raw.cucine ?? raw.cucina ?? 0),
    camere_doppie: Number(raw.camere_doppie ?? raw.cameraDoppia ?? 0),
    camere_singole: Number(raw.camere_singole ?? raw.cameraSingola ?? 0),
    bagni: Number(raw.bagni ?? raw.bagno ?? 0),
    altro: Number(raw.altro ?? 0),
  };
};

// ─── Normalizza stime ──────────────────────────────────────────────────────
const normalizeStime = (raw: any): Stime | null => {
  if (!raw || typeof raw !== 'object') return null;
  const totale = raw.totale || {};
  return {
    elettrico: raw.elettrico || undefined,
    fotovoltaico: raw.fotovoltaico || undefined,
    sicurezza: raw.sicurezza || undefined,
    totale: {
      min: typeof totale.min === 'number' ? totale.min : 0,
      media: typeof totale.media === 'number' ? totale.media : 0,
      max: typeof totale.max === 'number' ? totale.max : 0,
    },
    calcolato_il: raw.calcolato_il || undefined,
  };
};

// ─── Convert database lead → frontend Lead ─────────────────────────────────
export const convertDatabaseLeadToLead = (dbLead: DatabaseLead): Lead => {
  const indirizzoDettagli: IndirizzoDettagli = dbLead.indirizzo_dettagli || {};
  const composizione = normalizeComposizione(dbLead.composizione);
  const stime = normalizeStime(dbLead.stime);

  const stimaMin = stime?.totale.min ?? 0;
  const stimaMax = stime?.totale.max ?? 0;
  const stimaMedia = stime?.totale.media ?? (stimaMin && stimaMax ? Math.round((stimaMin + stimaMax) / 2) : 0);

  return {
    id: dbLead.id,
    nome: dbLead.nome,
    cognome: dbLead.cognome,
    email: dbLead.email,
    telefono: dbLead.telefono,
    tipologiaAbitazione: dbLead.tipologia_abitazione,
    tipoProprietà: dbLead.tipo_proprieta || 'prima casa',
    superficie: dbLead.superficie,
    indirizzo: dbLead.indirizzo,
    citta: dbLead.citta,
    regione: dbLead.regione,
    indirizzoDettagli,
    composizione,
    numeroPersone: dbLead.numero_persone ?? 2,
    accettoTermini: dbLead.accetto_termini ?? false,
    // Stime
    stime,
    stimaMin,
    stimaMax,
    stimaMedia,
    pvgis: dbLead.pvgis || null,
    // Moduli
    moduliSelezionati: dbLead.moduli_selezionati || [],
    moduloElettrico: dbLead.modulo_elettrico || null,
    moduloFotovoltaico: dbLead.modulo_fotovoltaico || null,
    moduloSicurezza: dbLead.modulo_sicurezza || null,
    // Timeline
    dataRichiesta: dbLead.data_creazione || new Date().toISOString(),
    dataUltimoContatto: dbLead.data_ultimo_contatto,
    stato: (dbLead.stato as LeadState) || 'nuovo',
    // Sopralluogo
    dataSopralluogo: dbLead.data_richiesta_sopralluogo,
    orarioSopralluogo: dbLead.orario_sopralluogo,
    sopralluogoRichiesto: !!dbLead.data_richiesta_sopralluogo,
    // Note
    note: dbLead.note,
  };
};
