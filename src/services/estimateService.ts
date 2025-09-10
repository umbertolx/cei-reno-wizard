
import { FormData } from "@/components/Configuratore";
import { EstimateResponse } from "@/types/estimate";

export const calculateEstimate = async (formData: FormData): Promise<EstimateResponse> => {
  console.log("🔢 EstimateService: Starting calculation");
  console.log("📋 EstimateService: Input data:", formData);

  // Estrai superficie dalla struttura corretta
  const superficie = formData.informazioniGenerali?.superficie || formData.superficie || 85;
  const tipologiaAbitazione = formData.informazioniGenerali?.tipologiaAbitazione || formData.tipologiaAbitazione || 'appartamento';
  const composizione = formData.informazioniGenerali?.composizione || formData.composizione || {
    cucina: 1,
    cameraDoppia: 1,
    cameraSingola: 1,
    soggiorno: 1,
    bagno: 2,
    altro: 0
  };

  // Validazione con i dati estratti
  if (!superficie || superficie <= 0) {
    throw new Error("Superficie non valida");
  }

  if (!tipologiaAbitazione) {
    throw new Error("Tipologia abitazione mancante");
  }

  // Simula un delay realistico per l'API
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // Calcolo base per metro quadro
    const prezzoBasePerMq = tipologiaAbitazione === 'villa' ? 85 : 
                           tipologiaAbitazione === 'appartamento' ? 70 : 60;

    // Moltiplicatore per tipo di ristrutturazione (dal modulo elettrico)
    const tipoRistrutturazione = formData.moduloElettrico?.tipoRistrutturazione || 'parziale';
    const moltiplicatoreRistrutturazione = tipoRistrutturazione === 'completa' ? 1.3 :
                                          tipoRistrutturazione === 'nuova' ? 1.5 : 1.0;

    // Moltiplicatore per interventi elettrici
    let moltiplicatoreImpianto = 1.0;
    if (formData.moduliSelezionati?.includes('impianto-elettrico')) {
      moltiplicatoreImpianto = 1.6;
    }
    if (formData.moduliSelezionati?.includes('fotovoltaico')) {
      moltiplicatoreImpianto += 0.4;
    }
    if (formData.moduliSelezionati?.includes('sicurezza')) {
      moltiplicatoreImpianto += 0.2;
    }
    if (formData.moduliSelezionati?.includes('termotecnico')) {
      moltiplicatoreImpianto += 0.3;
    }

    // Calcolo stanze totali per maggiore precisione
    const totaleStanze = Object.values(composizione).reduce((acc: number, curr) => {
      const numericValue = typeof curr === 'number' ? curr : parseInt(curr as string) || 0;
      return acc + numericValue;
    }, 0);
    const moltiplicatoreStanze = Math.max(1, totaleStanze * 0.15);

    // Calcoli
    const costoBase = superficie * prezzoBasePerMq;
    const costoConRistrutturazione = costoBase * moltiplicatoreRistrutturazione;
    const costoConImpianto = costoConRistrutturazione * moltiplicatoreImpianto;
    const costoFinale = costoConImpianto * (1 + moltiplicatoreStanze);

    // Range di variabilità (±15%)
    const variazione = costoFinale * 0.15;
    const min = Math.round(costoFinale - variazione);
    const max = Math.round(costoFinale + variazione);
    const average = Math.round((min + max) / 2);

    // Breakdown dettagliato
    const breakdown = {
      basePrice: Math.round(costoBase),
      roomsCost: Math.round(costoConImpianto - costoConRistrutturazione),
      surfaceCost: Math.round(costoConRistrutturazione - costoBase),
      specialFeaturesCost: Math.round(costoFinale - costoConImpianto)
    };

    const estimate: EstimateResponse = {
      min,
      max,
      average,
      breakdown,
      deductions: {},
      calculatedAt: new Date().toISOString()
    };

    console.log("✅ EstimateService: Calculation completed successfully");
    console.log("📊 EstimateService: Result:", estimate);

    return estimate;

  } catch (error) {
    console.error("❌ EstimateService: Calculation failed:", error);
    throw new Error("Errore nel calcolo della stima: " + (error instanceof Error ? error.message : 'Errore sconosciuto'));
  }
};
