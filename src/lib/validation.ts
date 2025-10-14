import { z } from 'zod';

export const leadContactSchema = z.object({
  nome: z.string()
    .trim()
    .min(1, "Il nome è obbligatorio")
    .max(100, "Il nome non può superare 100 caratteri")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Il nome contiene caratteri non validi"),
  
  cognome: z.string()
    .trim()
    .min(1, "Il cognome è obbligatorio")
    .max(100, "Il cognome non può superare 100 caratteri")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Il cognome contiene caratteri non validi"),
  
  email: z.string()
    .trim()
    .email("Formato email non valido")
    .max(255, "L'email non può superare 255 caratteri")
    .toLowerCase(),
  
  telefono: z.string()
    .trim()
    .regex(/^\+?[0-9]{8,15}$/, "Il numero di telefono deve contenere 8-15 cifre"),
  
  indirizzo: z.string()
    .trim()
    .min(1, "L'indirizzo è obbligatorio")
    .max(500, "L'indirizzo non può superare 500 caratteri"),
  
  citta: z.string()
    .trim()
    .min(1, "La città è obbligatoria")
    .max(100, "La città non può superare 100 caratteri"),
  
  cap: z.string()
    .trim()
    .regex(/^[0-9]{5}$/, "Il CAP deve essere di 5 cifre"),
  
  regione: z.string()
    .trim()
    .min(1, "La regione è obbligatoria")
    .max(100, "La regione non può superare 100 caratteri"),
  
  piano: z.string()
    .trim()
    .max(50, "Il piano non può superare 50 caratteri")
    .optional(),
  
  note: z.string()
    .trim()
    .max(1000, "Le note non possono superare 1000 caratteri")
    .optional(),
});

export const sanitizeUserInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 5000); // Hard limit on any string input
};

export const validateAndSanitizeLeadData = (data: any) => {
  // Validate contact information
  const validatedContact = leadContactSchema.parse({
    nome: sanitizeUserInput(data.nome || ''),
    cognome: sanitizeUserInput(data.cognome || ''),
    email: sanitizeUserInput(data.email || ''),
    telefono: sanitizeUserInput(data.telefono || ''),
    indirizzo: sanitizeUserInput(data.indirizzo || ''),
    citta: sanitizeUserInput(data.citta || ''),
    cap: sanitizeUserInput(data.cap || ''),
    regione: sanitizeUserInput(data.regione || ''),
    piano: data.piano ? sanitizeUserInput(data.piano) : undefined,
    note: data.note ? sanitizeUserInput(data.note) : undefined,
  });

  return validatedContact;
};
