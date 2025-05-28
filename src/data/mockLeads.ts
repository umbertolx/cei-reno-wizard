
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
  bonusApplicabili: string[];
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
    bonusApplicabili: ["Superbonus 110%", "Bonus Ristrutturazione"]
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
    stato: "contattato",
    stimaMin: 45000,
    stimaMax: 65000,
    dataUltimoContatto: "2024-01-16T10:00:00Z",
    bonusApplicabili: ["Bonus Ristrutturazione", "Ecobonus"]
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
    stato: "in-lavorazione",
    stimaMin: 18000,
    stimaMax: 28000,
    dataUltimoContatto: "2024-01-17T15:30:00Z",
    note: "Cliente interessato a ristrutturazione completa bagno e cucina",
    bonusApplicabili: ["Superbonus 110%"]
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
    stato: "proposta-inviata",
    stimaMin: 75000,
    stimaMax: 95000,
    dataUltimoContatto: "2024-01-18T09:00:00Z",
    bonusApplicabili: ["Superbonus 110%", "Bonus Ristrutturazione", "Ecobonus"]
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
    stato: "acquisito",
    stimaMin: 35000,
    stimaMax: 45000,
    dataUltimoContatto: "2024-01-19T14:20:00Z",
    note: "Lavori confermati, inizio previsto per marzo 2024",
    bonusApplicabili: ["Bonus Ristrutturazione"]
  }
];

export const leadStates = {
  'nuovo': { label: 'Richiesta ricevuta', color: 'bg-yellow-500', count: 0 },
  'contattato': { label: 'Primo contatto', color: 'bg-blue-500', count: 0 },
  'in-lavorazione': { label: 'Sopralluogo programmato', color: 'bg-orange-500', count: 0 },
  'proposta-inviata': { label: 'Preventivo inviato', color: 'bg-purple-500', count: 0 },
  'acquisito': { label: 'Lead qualificato', color: 'bg-green-500', count: 0 }
};
