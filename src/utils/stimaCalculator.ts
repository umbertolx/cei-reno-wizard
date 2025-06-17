
import { FormData } from "@/types/FormData";

export const calcolaStima = (formData: FormData): { min: number; max: number } => {
  // Algoritmo semplificato per la stima dei costi
  const costoBase = {
    "appartamento": 400,
    "casa indipendente": 550
  };
  
  // Costo base per metro quadro
  const costoBaseMetroQuadro = formData.tipologiaAbitazione.toLowerCase() === "appartamento" 
    ? costoBase.appartamento 
    : costoBase["casa indipendente"];
  
  // Calcolo stanza per stanza
  const { cucina, cameraDoppia, cameraSingola, bagno, soggiorno, altro } = formData.composizione;
  const costoStanze = (cucina * 5000) + (cameraDoppia * 3000) + (cameraSingola * 2500) + (bagno * 5500) + (soggiorno * 3500) + (altro * 2000);
  
  // Calcolo totale con superficie
  const costoTotale = (costoBaseMetroQuadro * formData.superficie) + costoStanze;
  
  // Range di stima con +/- 20%
  return {
    min: Math.round(costoTotale * 0.8),
    max: Math.round(costoTotale * 1.2)
  };
};
