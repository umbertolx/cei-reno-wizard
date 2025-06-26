
import { DatabaseLead } from "@/services/leadService";

// Lead interface updated to match what the UI components expect
export interface Lead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  citta: string;
  cap: string;
  regione: string;
  indirizzo: string;
  piano: string;
  tipologiaAbitazione: string;
  superficie: number;
  stimaMin: number;
  stimaMax: number;
  stato: keyof typeof leadStates;
  dataRichiesta: string;
  dataUltimoContatto: string;
  note?: string;
  composizione: {
    cucina: number;
    cameraDoppia: number;
    cameraSingola: number;
    bagno: number;
    soggiorno: number;
    altro: number;
  };
  moduliCompletati: string[];
  tipoProprietà: string;
}

// Funzione per convertire DatabaseLead in Lead (per compatibilità con l'UI esistente)
export const convertDatabaseLeadToLead = (dbLead: DatabaseLead): Lead => {
  return {
    id: dbLead.id,
    nome: dbLead.nome,
    cognome: dbLead.cognome,
    email: dbLead.email,
    telefono: dbLead.telefono,
    citta: dbLead.citta,
    cap: dbLead.cap,
    regione: dbLead.regione,
    indirizzo: dbLead.indirizzo,
    piano: dbLead.piano,
    tipologiaAbitazione: dbLead.tipologia_abitazione,
    superficie: dbLead.superficie,
    stimaMin: dbLead.stima_min || 0,
    stimaMax: dbLead.stima_max || 0,
    stato: dbLead.stato as keyof typeof leadStates,
    dataRichiesta: dbLead.data_creazione,
    dataUltimoContatto: dbLead.data_ultimo_contatto,
    note: dbLead.note || undefined,
    composizione: dbLead.composizione as Lead['composizione'] || {
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      bagno: 0,
      soggiorno: 0,
      altro: 0
    },
    moduliCompletati: ['configurazione-base', 'stima-ricevuta'],
    tipoProprietà: dbLead.tipo_proprieta || 'prima casa',
  };
};

export const leadStates = {
  nuovo: {
    label: "Nuovo",
    color: "bg-gray-100 text-gray-700"
  },
  in_contatto: {
    label: "In Contatto",
    color: "bg-blue-100 text-blue-700"
  },
  preventivo_inviato: {
    label: "Preventivo Inviato",
    color: "bg-yellow-100 text-yellow-700"
  },
  sopralluogo_programmato: {
    label: "Sopralluogo Programmato",
    color: "bg-purple-100 text-purple-700"
  },
  in_trattativa: {
    label: "In Trattativa",
    color: "bg-orange-100 text-orange-700"
  },
  chiuso: {
    label: "Chiuso",
    color: "bg-green-100 text-green-700"
  },
  perso: {
    label: "Perso",
    color: "bg-red-100 text-red-700"
  }
};

export interface CustomColumn {
  id: string;
  label: string;
  color: string;
  order: number;
}

export const availableColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-gray-500"
];

export const moduliDisponibili = {
  'configurazione-base': {
    label: 'Configurazione Base',
    color: 'bg-blue-100 text-blue-800'
  },
  'stima-ricevuta': {
    label: 'Stima Ricevuta',
    color: 'bg-green-100 text-green-800'
  },
  'sopralluogo-richiesto': {
    label: 'Sopralluogo Richiesto',
    color: 'bg-orange-100 text-orange-800'
  },
  'preventivo-personalizzato': {
    label: 'Preventivo Personalizzato',
    color: 'bg-purple-100 text-purple-800'
  }
};

export interface CustomColumn {
  id: string;
  label: string;
  color: string;
}

export const mockLeads = [
  {
    id: "1",
    nome: "Mario",
    cognome: "Rossi",
    email: "mario.rossi@example.com",
    telefono: "3331234567",
    citta: "Roma",
    indirizzo: "Via Roma, 1",
    tipologiaAbitazione: "Appartamento",
    superficie: 100,
    stimaMin: 10000,
    stimaMax: 15000,
    stato: "nuovo",
    dataRichiesta: "2024-01-20T10:00:00.000Z",
    dataUltimoContatto: "2024-01-20T10:00:00.000Z",
    note: "Richiede sopralluogo urgente"
  },
  {
    id: "2",
    nome: "Giuseppe",
    cognome: "Verdi",
    email: "giuseppe.verdi@example.com",
    telefono: "3337654321",
    citta: "Milano",
    indirizzo: "Via Milano, 2",
    tipologiaAbitazione: "Villa",
    superficie: 200,
    stimaMin: 20000,
    stimaMax: 25000,
    stato: "in_contatto",
    dataRichiesta: "2024-01-15T14:30:00.000Z",
    dataUltimoContatto: "2024-01-22T09:00:00.000Z",
    note: "Interessato a domotica"
  },
  {
    id: "3",
    nome: "Anna",
    cognome: "Bianchi",
    email: "anna.bianchi@example.com",
    telefono: "3331122334",
    citta: "Napoli",
    indirizzo: "Via Napoli, 3",
    tipologiaAbitazione: "Appartamento",
    superficie: 80,
    stimaMin: 8000,
    stimaMax: 12000,
    stato: "preventivo_inviato",
    dataRichiesta: "2024-01-10T09:15:00.000Z",
    dataUltimoContatto: "2024-01-25T16:45:00.000Z",
    note: "In attesa di feedback sul preventivo"
  },
  {
    id: "4",
    nome: "Luigi",
    cognome: "Neri",
    email: "luigi.neri@example.com",
    telefono: "3334455667",
    citta: "Torino",
    indirizzo: "Via Torino, 4",
    tipologiaAbitazione: "Casa indipendente",
    superficie: 150,
    stimaMin: 15000,
    stimaMax: 20000,
    stato: "sopralluogo_programmato",
    dataRichiesta: "2024-01-05T16:00:00.000Z",
    dataUltimoContatto: "2024-01-28T11:30:00.000Z",
    note: "Sopralluogo confermato per il 30/01"
  },
  {
    id: "5",
    nome: "Francesca",
    cognome: "Gialli",
    email: "francesca.gialli@example.com",
    telefono: "3339988776",
    citta: "Palermo",
    indirizzo: "Via Palermo, 5",
    tipologiaAbitazione: "Appartamento",
    superficie: 90,
    stimaMin: 9000,
    stimaMax: 14000,
    stato: "in_trattativa",
    dataRichiesta: "2023-12-28T11:45:00.000Z",
    dataUltimoContatto: "2024-02-01T14:00:00.000Z",
    note: "Offerta in corso"
  },
  {
    id: "6",
    nome: "Giovanni",
    cognome: "Moretti",
    email: "giovanni.moretti@example.com",
    telefono: "3332233445",
    citta: "Bologna",
    indirizzo: "Via Bologna, 6",
    tipologiaAbitazione: "Villa a schiera",
    superficie: 180,
    stimaMin: 18000,
    stimaMax: 23000,
    stato: "chiuso",
    dataRichiesta: "2023-12-20T18:30:00.000Z",
    dataUltimoContatto: "2024-02-05T10:15:00.000Z",
    note: "Contratto firmato"
  },
  {
    id: "7",
    nome: "Elena",
    cognome: "Marino",
    email: "elena.marino@example.com",
    telefono: "3335566778",
    citta: "Catania",
    indirizzo: "Via Catania, 7",
    tipologiaAbitazione: "Appartamento",
    superficie: 70,
    stimaMin: 7000,
    stimaMax: 11000,
    stato: "perso",
    dataRichiesta: "2023-12-15T13:00:00.000Z",
    dataUltimoContatto: "2024-02-10T17:45:00.000Z",
    note: "Cliente non interessato"
  },
  {
    id: "8",
    nome: "Riccardo",
    cognome: "Greco",
    email: "riccardo.greco@example.com",
    telefono: "3338899001",
    citta: "Genova",
    indirizzo: "Via Genova, 8",
    tipologiaAbitazione: "Attico",
    superficie: 120,
    stimaMin: 12000,
    stimaMax: 17000,
    stato: "nuovo",
    dataRichiesta: "2023-12-10T08:45:00.000Z",
    dataUltimoContatto: "2024-02-15T08:45:00.000Z",
    note: "Da ricontattare"
  },
  {
    id: "9",
    nome: "Alessia",
    cognome: "Bruno",
    email: "alessia.bruno@example.com",
    telefono: "3336677889",
    citta: "Firenze",
    indirizzo: "Via Firenze, 9",
    tipologiaAbitazione: "Loft",
    superficie: 60,
    stimaMin: 6000,
    stimaMax: 10000,
    stato: "in_contatto",
    dataRichiesta: "2023-12-05T15:30:00.000Z",
    dataUltimoContatto: "2024-02-20T12:30:00.000Z",
    note: "Ha richiesto maggiori informazioni"
  },
  {
    id: "10",
    nome: "Simone",
    cognome: "Russo",
    email: "simone.russo@example.com",
    telefono: "3333344556",
    citta: "Bari",
    indirizzo: "Via Bari, 10",
    tipologiaAbitazione: "Casa a corte",
    superficie: 220,
    stimaMin: 22000,
    stimaMax: 27000,
    stato: "preventivo_inviato",
    dataRichiesta: "2023-11-30T20:00:00.000Z",
    dataUltimoContatto: "2024-02-25T19:00:00.000Z",
    note: "In attesa di approvazione preventivo"
  }
];
