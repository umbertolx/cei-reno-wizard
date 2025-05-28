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
  tipologiaAbitazione: 'appartamento' | 'casa_indipendente';
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
  bonusApplicabili: string[];
  stimaMin: number;
  stimaMax: number;
  dataRichiesta: string;
  dataUltimoContatto?: string;
  stato: keyof typeof leadStates;
  note?: string;
}

export const leadStates = {
  nuovo: { 
    label: "Richiesta ricevuta", 
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500"
  },
  contattato: { 
    label: "Primo contatto", 
    color: "bg-blue-500",
    gradient: "from-blue-500 to-indigo-500"
  },
  sopralluogo: { 
    label: "Sopralluogo programmato", 
    color: "bg-purple-500",
    gradient: "from-purple-500 to-violet-500"
  },
  preventivo: { 
    label: "Preventivo inviato", 
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-blue-600"
  },
  acquisito: { 
    label: "Lead qualificato", 
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500"
  }
};

export const mockLeads: Lead[] = [
  {
    id: "1",
    nome: "Marco",
    cognome: "Rossi",
    email: "marco.rossi@email.com",
    telefono: "+39 333 123 4567",
    indirizzo: "Via Roma 123",
    citta: "Milano",
    cap: "20121",
    regione: "Lombardia",
    tipologiaAbitazione: "appartamento",
    superficie: 85,
    piano: "3°",
    composizione: {
      cucina: 1,
      cameraDoppia: 2,
      cameraSingola: 0,
      bagno: 2,
      soggiorno: 1,
      altro: 0
    },
    tipoProprietà: "Prima casa",
    bonusApplicabili: ["Bonus 110%", "Ecobonus", "Sismabonus"],
    stimaMin: 25000,
    stimaMax: 35000,
    dataRichiesta: "2024-05-27T09:30:00Z",
    stato: "nuovo",
    note: "Cliente interessato a interventi di efficientamento energetico"
  },
  {
    id: "2",
    nome: "Giulia",
    cognome: "Bianchi",
    email: "giulia.bianchi@email.com",
    telefono: "+39 346 987 6543",
    indirizzo: "Via Garibaldi 45",
    citta: "Roma",
    cap: "00185",
    regione: "Lazio",
    tipologiaAbitazione: "casa_indipendente",
    superficie: 120,
    piano: "Piano terra",
    composizione: {
      cucina: 1,
      cameraDoppia: 3,
      cameraSingola: 1,
      bagno: 2,
      soggiorno: 1,
      altro: 1
    },
    tipoProprietà: "Seconda casa",
    bonusApplicabili: ["Bonus 110%", "Bonus facciate"],
    stimaMin: 45000,
    stimaMax: 60000,
    dataRichiesta: "2024-05-26T14:15:00Z",
    dataUltimoContatto: "2024-05-27T10:00:00Z",
    stato: "contattato"
  },
  {
    id: "3",
    nome: "Andrea",
    cognome: "Verdi",
    email: "andrea.verdi@email.com",
    telefono: "+39 339 456 7890",
    indirizzo: "Corso Italia 78",
    citta: "Napoli",
    cap: "80138",
    regione: "Campania",
    tipologiaAbitazione: "appartamento",
    superficie: 95,
    piano: "2°",
    composizione: {
      cucina: 1,
      cameraDoppia: 2,
      cameraSingola: 1,
      bagno: 1,
      soggiorno: 1,
      altro: 0
    },
    tipoProprietà: "Prima casa",
    bonusApplicabili: ["Bonus 110%", "Ecobonus"],
    stimaMin: 30000,
    stimaMax: 42000,
    dataRichiesta: "2024-05-25T16:45:00Z",
    dataUltimoContatto: "2024-05-27T11:30:00Z",
    stato: "sopralluogo"
  },
  {
    id: "4",
    nome: "Francesca",
    cognome: "Neri",
    email: "francesca.neri@email.com",
    telefono: "+39 347 234 5678",
    indirizzo: "Via Dante 12",
    citta: "Firenze",
    cap: "50123",
    regione: "Toscana",
    tipologiaAbitazione: "appartamento",
    superficie: 70,
    piano: "1°",
    composizione: {
      cucina: 1,
      cameraDoppia: 1,
      cameraSingola: 1,
      bagno: 1,
      soggiorno: 1,
      altro: 0
    },
    tipoProprietà: "Prima casa",
    bonusApplicabili: ["Bonus 110%", "Sismabonus", "Ecobonus"],
    stimaMin: 22000,
    stimaMax: 28000,
    dataRichiesta: "2024-05-24T11:20:00Z",
    dataUltimoContatto: "2024-05-26T15:45:00Z",
    stato: "preventivo"
  },
  {
    id: "5",
    nome: "Roberto",
    cognome: "Gialli",
    email: "roberto.gialli@email.com",
    telefono: "+39 335 876 5432",
    indirizzo: "Via Manzoni 67",
    citta: "Torino",
    cap: "10121",
    regione: "Piemonte",
    tipologiaAbitazione: "casa_indipendente",
    superficie: 140,
    piano: "Su due livelli",
    composizione: {
      cucina: 1,
      cameraDoppia: 3,
      cameraSingola: 2,
      bagno: 3,
      soggiorno: 2,
      altro: 1
    },
    tipoProprietà: "Prima casa",
    bonusApplicabili: ["Bonus 110%", "Ecobonus", "Bonus facciate"],
    stimaMin: 55000,
    stimaMax: 75000,
    dataRichiesta: "2024-05-23T13:10:00Z",
    dataUltimoContatto: "2024-05-25T09:15:00Z",
    stato: "acquisito"
  },
  {
    id: "6",
    nome: "Elena",
    cognome: "Blu",
    email: "elena.blu@email.com",
    telefono: "+39 342 567 8901",
    indirizzo: "Via Verdi 89",
    citta: "Bologna",
    cap: "40121",
    regione: "Emilia-Romagna",
    tipologiaAbitazione: "appartamento",
    superficie: 78,
    piano: "4°",
    composizione: {
      cucina: 1,
      cameraDoppia: 1,
      cameraSingola: 1,
      bagno: 1,
      soggiorno: 1,
      altro: 0
    },
    tipoProprietà: "Seconda casa",
    bonusApplicabili: ["Bonus 110%"],
    stimaMin: 20000,
    stimaMax: 28000,
    dataRichiesta: "2024-05-28T08:00:00Z",
    stato: "nuovo"
  },
  {
    id: "7",
    nome: "Paolo",
    cognome: "Viola",
    email: "paolo.viola@email.com",
    telefono: "+39 338 123 9876",
    indirizzo: "Piazza del Duomo 5",
    citta: "Palermo",
    cap: "90133",
    regione: "Sicilia",
    tipologiaAbitazione: "casa_indipendente",
    superficie: 110,
    piano: "Piano unico",
    composizione: {
      cucina: 1,
      cameraDoppia: 2,
      cameraSingola: 1,
      bagno: 2,
      soggiorno: 1,
      altro: 0
    },
    tipoProprietà: "Prima casa",
    bonusApplicabili: ["Bonus 110%", "Sismabonus"],
    stimaMin: 38000,
    stimaMax: 52000,
    dataRichiesta: "2024-05-27T17:30:00Z",
    dataUltimoContatto: "2024-05-28T09:00:00Z",
    stato: "contattato"
  },
  {
    id: "8",
    nome: "Chiara",
    cognome: "Rosa",
    email: "chiara.rosa@email.com",
    telefono: "+39 349 876 5432",
    indirizzo: "Via Nazionale 156",
    citta: "Bari",
    cap: "70121",
    regione: "Puglia",
    tipologiaAbitazione: "appartamento",
    superficie: 88,
    piano: "5°",
    composizione: {
      cucina: 1,
      cameraDoppia: 2,
      cameraSingola: 0,
      bagno: 1,
      soggiorno: 1,
      altro: 1
    },
    tipoProprietà: "Prima casa",
    bonusApplicabili: ["Bonus 110%", "Ecobonus"],
    stimaMin: 28000,
    stimaMax: 38000,
    dataRichiesta: "2024-05-26T12:45:00Z",
    dataUltimoContatto: "2024-05-27T14:20:00Z",
    stato: "sopralluogo"
  }
];
