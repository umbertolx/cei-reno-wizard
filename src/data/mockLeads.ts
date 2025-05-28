
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
  composizione: {
    cucina: number;
    cameraDoppia: number;
    cameraSingola: number;
    bagno: number;
    soggiorno: number;
    altro: number;
  };
  tipoProprietà: string;
  dataRichiesta: string;
  stato: 'nuovo' | 'contattato' | 'in-lavorazione' | 'proposta-inviata' | 'acquisito';
  stimaMin: number;
  stimaMax: number;
  note?: string;
  dataUltimoContatto?: string;
  moduliCompletati: string[];
}

export const mockLeads: Lead[] = [
  {
    id: "1",
    nome: "Marco",
    cognome: "Rossi",
    email: "marco.rossi@email.com",
    telefono: "3331234567",
    tipologiaAbitazione: "appartamento",
    superficie: 85,
    indirizzo: "Via Roma 123",
    citta: "Milano",
    cap: "20121",
    regione: "Lombardia",
    piano: "secondo piano",
    composizione: {
      cucina: 1,
      cameraDoppia: 2,
      cameraSingola: 1,
      bagno: 2,
      soggiorno: 1,
      altro: 0,
    },
    tipoProprietà: "prima casa",
    dataRichiesta: "2024-01-15T09:30:00Z",
    stato: "nuovo",
    stimaMin: 25000,
    stimaMax: 35000,
    moduliCompletati: ["impianto-elettrico", "fotovoltaico"]
  },
  {
    id: "2",
    nome: "Giulia",
    cognome: "Verdi",
    email: "giulia.verdi@gmail.com",
    telefono: "3339876543",
    tipologiaAbitazione: "casa indipendente",
    superficie: 150,
    indirizzo: "Via Garibaldi 45",
    citta: "Roma",
    cap: "00184",
    regione: "Lazio",
    piano: "piano terra",
    composizione: {
      cucina: 1,
      cameraDoppia: 3,
      cameraSingola: 1,
      bagno: 3,
      soggiorno: 2,
      altro: 1,
    },
    tipoProprietà: "seconda casa",
    dataRichiesta: "2024-01-14T14:20:00Z",
    stato: "nuovo",
    stimaMin: 45000,
    stimaMax: 65000,
    dataUltimoContatto: "2024-01-16T10:00:00Z",
    moduliCompletati: ["impianto-elettrico", "sicurezza", "termotecnico"]
  },
  {
    id: "3",
    nome: "Andrea",
    cognome: "Bianchi",
    email: "a.bianchi@hotmail.com",
    telefono: "3345678901",
    tipologiaAbitazione: "appartamento",
    superficie: 65,
    indirizzo: "Corso Venezia 78",
    citta: "Torino",
    cap: "10121",
    regione: "Piemonte",
    piano: "quarto piano",
    composizione: {
      cucina: 1,
      cameraDoppia: 1,
      cameraSingola: 1,
      bagno: 1,
      soggiorno: 1,
      altro: 0,
    },
    tipoProprietà: "prima casa",
    dataRichiesta: "2024-01-13T16:45:00Z",
    stato: "contattato",
    stimaMin: 18000,
    stimaMax: 28000,
    dataUltimoContatto: "2024-01-17T15:30:00Z",
    note: "Cliente interessato a ristrutturazione completa bagno e cucina",
    moduliCompletati: ["fotovoltaico"]
  },
  {
    id: "4",
    nome: "Francesca",
    cognome: "Neri",
    email: "francesca.neri@libero.it",
    telefono: "3387654321",
    tipologiaAbitazione: "casa indipendente",
    superficie: 200,
    indirizzo: "Via del Corso 156",
    citta: "Firenze",
    cap: "50122",
    regione: "Toscana",
    piano: "su due livelli",
    composizione: {
      cucina: 1,
      cameraDoppia: 4,
      cameraSingola: 2,
      bagno: 4,
      soggiorno: 2,
      altro: 2,
    },
    tipoProprietà: "prima casa",
    dataRichiesta: "2024-01-12T11:15:00Z",
    stato: "contattato",
    stimaMin: 75000,
    stimaMax: 95000,
    dataUltimoContatto: "2024-01-18T09:00:00Z",
    moduliCompletati: ["impianto-elettrico", "fotovoltaico", "sicurezza", "termotecnico"]
  },
  {
    id: "5",
    nome: "Luigi",
    cognome: "Gialli",
    email: "l.gialli@yahoo.it",
    telefono: "3312345678",
    tipologiaAbitazione: "appartamento",
    superficie: 110,
    indirizzo: "Piazza San Marco 12",
    citta: "Venezia",
    cap: "30124",
    regione: "Veneto",
    piano: "primo piano",
    composizione: {
      cucina: 1,
      cameraDoppia: 2,
      cameraSingola: 1,
      bagno: 2,
      soggiorno: 1,
      altro: 1,
    },
    tipoProprietà: "seconda casa",
    dataRichiesta: "2024-01-11T08:30:00Z",
    stato: "in-lavorazione",
    stimaMin: 35000,
    stimaMax: 45000,
    dataUltimoContatto: "2024-01-19T14:20:00Z",
    note: "Lavori confermati, inizio previsto per marzo 2024",
    moduliCompletati: ["impianto-elettrico", "termotecnico"]
  },
  {
    id: "6",
    nome: "Elena",
    cognome: "Blu",
    email: "elena.blu@gmail.com",
    telefono: "3355555555",
    tipologiaAbitazione: "villa",
    superficie: 300,
    indirizzo: "Via delle Rose 22",
    citta: "Napoli",
    cap: "80100",
    regione: "Campania",
    piano: "su tre livelli",
    composizione: {
      cucina: 2,
      cameraDoppia: 5,
      cameraSingola: 2,
      bagno: 5,
      soggiorno: 3,
      altro: 3,
    },
    tipoProprietà: "prima casa",
    dataRichiesta: "2024-01-10T12:00:00Z",
    stato: "in-lavorazione",
    stimaMin: 120000,
    stimaMax: 150000,
    moduliCompletati: ["fotovoltaico", "sicurezza"]
  },
  {
    id: "7",
    nome: "Paolo",
    cognome: "Viola",
    email: "paolo.viola@libero.it",
    telefono: "3366666666",
    tipologiaAbitazione: "appartamento",
    superficie: 75,
    indirizzo: "Corso Italia 88",
    citta: "Genova",
    cap: "16100",
    regione: "Liguria",
    piano: "terzo piano",
    composizione: {
      cucina: 1,
      cameraDoppia: 1,
      cameraSingola: 2,
      bagno: 1,
      soggiorno: 1,
      altro: 0,
    },
    tipoProprietà: "prima casa",
    dataRichiesta: "2024-01-09T15:30:00Z",
    stato: "proposta-inviata",
    stimaMin: 22000,
    stimaMax: 32000,
    moduliCompletati: ["impianto-elettrico"]
  },
  {
    id: "8",
    nome: "Anna",
    cognome: "Rosa",
    email: "anna.rosa@yahoo.it",
    telefono: "3377777777",
    tipologiaAbitazione: "casa indipendente",
    superficie: 180,
    indirizzo: "Via dei Girasoli 15",
    citta: "Bologna",
    cap: "40100",
    regione: "Emilia-Romagna",
    piano: "su due livelli",
    composizione: {
      cucina: 1,
      cameraDoppia: 3,
      cameraSingola: 1,
      bagno: 3,
      soggiorno: 2,
      altro: 2,
    },
    tipoProprietà: "seconda casa",
    dataRichiesta: "2024-01-08T10:15:00Z",
    stato: "proposta-inviata",
    stimaMin: 55000,
    stimaMax: 75000,
    moduliCompletati: ["sicurezza", "termotecnico"]
  },
  {
    id: "9",
    nome: "Roberto",
    cognome: "Arancione",
    email: "roberto.arancione@gmail.com",
    telefono: "3388888888",
    tipologiaAbitazione: "appartamento",
    superficie: 95,
    indirizzo: "Piazza della Libertà 7",
    citta: "Palermo",
    cap: "90100",
    regione: "Sicilia",
    piano: "primo piano",
    composizione: {
      cucina: 1,
      cameraDoppia: 2,
      cameraSingola: 1,
      bagno: 2,
      soggiorno: 1,
      altro: 1,
    },
    tipoProprietà: "prima casa",
    dataRichiesta: "2024-01-07T14:45:00Z",
    stato: "acquisito",
    stimaMin: 30000,
    stimaMax: 40000,
    note: "Progetto avviato con successo",
    moduliCompletati: ["impianto-elettrico", "fotovoltaico", "termotecnico"]
  }
];

export const leadStates = {
  'nuovo': { label: 'Richiesta ricevuta', color: 'bg-yellow-500', count: 0 },
  'contattato': { label: 'Primo contatto', color: 'bg-blue-500', count: 0 },
  'in-lavorazione': { label: 'Sopralluogo programmato', color: 'bg-orange-500', count: 0 },
  'proposta-inviata': { label: 'Preventivo inviato', color: 'bg-purple-500', count: 0 },
  'acquisito': { label: 'Lead qualificato', color: 'bg-green-500', count: 0 }
};

export const moduliDisponibili = {
  'impianto-elettrico': { label: 'Impianto Elettrico', color: 'bg-blue-100 text-blue-800' },
  'fotovoltaico': { label: 'Fotovoltaico', color: 'bg-green-100 text-green-800' },
  'sicurezza': { label: 'Sicurezza', color: 'bg-red-100 text-red-800' },
  'termotecnico': { label: 'Termotecnico', color: 'bg-orange-100 text-orange-800' }
};
