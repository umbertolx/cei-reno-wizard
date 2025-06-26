export const leadStates = {
  nuovo: { label: "Nuovo", color: "bg-blue-500" },
  contattato: { label: "Contattato", color: "bg-yellow-500" },
  sopralluogo_richiesto: { label: "Sopralluogo Richiesto", color: "bg-orange-500" },
  sopralluogo_programmato: { label: "Sopralluogo Programmato", color: "bg-purple-500" },
  preventivo_inviato: { label: "Preventivo Inviato", color: "bg-indigo-500" },
  chiuso: { label: "Chiuso", color: "bg-green-500" },
  perso: { label: "Perso", color: "bg-red-500" },
};

export const moduliDisponibili = {
  informazioni_generali: { label: "Informazioni Generali", color: "bg-blue-100 text-blue-800" },
  configuratore_elettrico: { label: "Configuratore Elettrico", color: "bg-green-100 text-green-800" },
  eta_impianto: { label: "Età Impianto", color: "bg-yellow-100 text-yellow-800" },
  tipo_impianto: { label: "Tipo Impianto", color: "bg-purple-100 text-purple-800" },
  interventi_elettrici: { label: "Interventi Elettrici", color: "bg-red-100 text-red-800" },
  selezione_ambienti: { label: "Selezione Ambienti", color: "bg-indigo-100 text-indigo-800" },
  tipo_domotica: { label: "Tipo Domotica", color: "bg-pink-100 text-pink-800" },
  configurazione_bticino: { label: "Configurazione BTicino", color: "bg-orange-100 text-orange-800" },
  configurazione_knx: { label: "Configurazione KNX", color: "bg-teal-100 text-teal-800" },
  tapparelle_elettriche: { label: "Tapparelle Elettriche", color: "bg-gray-100 text-gray-800" },
  dati_contatto: { label: "Dati Contatto", color: "bg-emerald-100 text-emerald-800" },
  stima_finale: { label: "Stima Finale", color: "bg-cyan-100 text-cyan-800" },
};

export const availableColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-emerald-500"
];

export interface Lead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  indirizzo: string;
  citta: string;
  cap: string;
  regione: string;
  tipologiaAbitazione: string;
  superficie: number;
  piano: string;
  composizione: {
    cucina: number;
    cameraDoppia: number;
    cameraSingola: number;
    bagno: number;
    soggiorno: number;
    altro: number;
  };
  tipoProprietà: string;
  stato: keyof typeof leadStates;
  dataRichiesta: string;
  dataUltimoContatto?: string;
  stimaMin: number;
  stimaMax: number;
  moduliCompletati: string[];
  note?: string;
  sopralluogoRichiesto?: boolean;
  configurazioneTecnica?: any;
  stimaDettagli?: any;
}

export interface CustomColumn {
  id: string;
  label: string;
  color: string;
  order: number;
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
  tipo_proprieta: string;
  stato: string;
  data_creazione: string;
  data_ultimo_contatto: string;
  accetto_termini: boolean;
}

export const convertDatabaseLeadToLead = (dbLead: DatabaseLead): Lead => {
  return {
    id: dbLead.id,
    nome: dbLead.nome,
    cognome: dbLead.cognome,
    email: dbLead.email,
    telefono: dbLead.telefono,
    indirizzo: dbLead.indirizzo,
    citta: dbLead.citta,
    cap: dbLead.cap,
    regione: dbLead.regione,
    tipologiaAbitazione: dbLead.tipologia_abitazione,
    superficie: dbLead.superficie,
    piano: dbLead.piano,
    composizione: {
      cucina: dbLead.composizione?.cucina || 0,
      cameraDoppia: dbLead.composizione?.cameraDoppia || 0,
      cameraSingola: dbLead.composizione?.cameraSingola || 0,
      bagno: dbLead.composizione?.bagno || 0,
      soggiorno: dbLead.composizione?.soggiorno || 0,
      altro: dbLead.composizione?.altro || 0,
    },
    tipoProprietà: dbLead.tipo_proprieta,
    stato: dbLead.stato as keyof typeof leadStates,
    dataRichiesta: dbLead.data_creazione,
    dataUltimoContatto: dbLead.data_ultimo_contatto,
    stimaMin: dbLead.stima_min || 0,
    stimaMax: dbLead.stima_max || 0,
    moduliCompletati: [], // We don't have this field in the database yet
    note: dbLead.note,
    sopralluogoRichiesto: dbLead.data_richiesta_sopralluogo ? true : false,
    configurazioneTecnica: dbLead.configurazione_tecnica,
    stimaDettagli: dbLead.stima_dettagli,
  };
};
