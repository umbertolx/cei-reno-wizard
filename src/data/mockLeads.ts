export interface Lead {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  citta: string;
  stimaMax: number;
  stato: keyof typeof leadStates;
  dataUltimoContatto: string;
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
  stimaMax: dbLead.stima_max,
  stato: dbLead.stato,
  dataUltimoContatto: dbLead.data_ultimo_contatto,
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
