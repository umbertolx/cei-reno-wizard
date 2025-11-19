export interface Lead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  citta: string;
  cap: string;
  indirizzo: string;
  regione: string;
  piano: string;
  superficie: number;
  tipologiaAbitazione: string;
  tipoProprietà: string;
  composizione: {
    cucina: number;
    cameraDoppia: number;
    cameraSingola: number;
    bagno: number;
    soggiorno: number;
    altro?: number;
  };
  stimaMin: number;
  stimaMax: number;
  stato: keyof typeof leadStates;
  dataUltimoContatto: string;
  dataRichiesta: string;
  note?: string;
  configurazioneTecnica?: any;
  moduliCompletati?: string[];
  sopralluogoRichiesto?: boolean;
  moduloElettrico?: any;
  moduloFotovoltaico?: any;
}

export const leadStates = {
  nuovo: { label: "Nuovo", color: "bg-gray-500" },
  in_contatto: { label: "In Contatto", color: "bg-blue-500" },
  preventivo_inviato: { label: "Preventivo Inviato", color: "bg-yellow-500" },
  sopralluogo_fissato: { label: "Sopralluogo Fissato", color: "bg-green-500" },
  lavori_in_corso: { label: "Lavori in Corso", color: "bg-purple-500" },
  lavori_conclusi: { label: "Lavori Conclusi", color: "bg-teal-500" },
  perso: { label: "Perso", color: "bg-red-500" },
};

export const availableColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-gray-500",
  "bg-indigo-500",
];

export const convertDatabaseLeadToLead = (dbLead: any): Lead => ({
  id: dbLead.id,
  nome: dbLead.nome,
  cognome: dbLead.cognome,
  email: dbLead.email,
  telefono: dbLead.telefono,
  citta: dbLead.citta,
  cap: dbLead.cap,
  indirizzo: dbLead.indirizzo,
  regione: dbLead.regione,
  piano: dbLead.piano,
  superficie: dbLead.superficie,
  tipologiaAbitazione: dbLead.tipologia_abitazione,
  tipoProprietà: dbLead.tipo_proprieta || 'prima casa',
  composizione: dbLead.composizione || {
    cucina: 0,
    cameraDoppia: 0,
    cameraSingola: 0,
    bagno: 0,
    soggiorno: 0,
  },
  stimaMin: dbLead.stima_min || 0,
  stimaMax: dbLead.stima_max || 0,
  stato: dbLead.stato || 'nuovo',
  dataUltimoContatto: dbLead.data_ultimo_contatto || new Date().toISOString(),
  dataRichiesta: dbLead.data_creazione || new Date().toISOString(),
  note: dbLead.note,
  configurazioneTecnica: dbLead.configurazione_tecnica,
  moduliCompletati: [],
  sopralluogoRichiesto: !!dbLead.data_richiesta_sopralluogo,
  moduloElettrico: dbLead.modulo_elettrico,
  moduloFotovoltaico: dbLead.modulo_fotovoltaico,
});

export interface CustomColumn {
  id: string;
  label: string;
  color: string;
  order: number;
}

export interface DatabaseCustomColumn {
  id: string;
  label: string;
  color: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const convertDatabaseCustomColumnToCustomColumn = (dbColumn: DatabaseCustomColumn): CustomColumn => {
  return {
    id: dbColumn.id,
    label: dbColumn.label,
    color: dbColumn.color,
    order: dbColumn.display_order,
  };
};
