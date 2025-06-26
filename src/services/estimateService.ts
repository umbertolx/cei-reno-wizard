
import { FormData } from "@/components/Configuratore";
import { EstimateResponse } from "@/types/estimate";

export const calculateEstimate = async (formData: FormData): Promise<EstimateResponse> => {
  console.log("🔢 EstimateService: Starting calculation");
  console.log("📋 EstimateService: Input data:", formData);

  // Validazione dati essenziali
  if (!formData.superficie || formData.superficie <= 0) {
    throw new Error("Superficie non valida");
  }

  if (!formData.tipologiaAbitazione) {
    throw new Error("Tipologia abitazione mancante");
  }

  // Simula un delay realistico per l'API
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    // Calcolo base per metro quadro
    const prezzoBasePerMq = formData.tipologiaAbitazione === 'villa' ? 85 : 
                           formData.tipologiaAbitazione === 'appartamento' ? 70 : 60;

    // Moltiplicatore per tipo di ristrutturazione
    const moltiplicatoreRistrutturazione = formData.tipoRistrutturazione === 'completa' ? 1.3 :
                                          formData.tipoRistrutturazione === 'nuova' ? 1.5 : 1.0;

    // Moltiplicatore per tipo di impianto
    const moltiplicatoreImpianto = formData.tipoImpianto === 'livello3' ? 1.8 :
                                  formData.tipoImpianto === 'livello2' ? 1.4 : 1.0;

    // Calcolo stanza totali per maggiore precisione
    const totaleStanze = Object.values(formData.composizione).reduce((acc, curr) => acc + curr, 0);
    const moltiplicatoreStanze = Math.max(1, totaleStanze * 0.15);

    // Calcoli
    const costoBase = formData.superficie * prezzoBasePerMq;
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
      costoBase: Math.round(costoBase),
      ristrutturazione: Math.round(costoConRistrutturazione - costoBase),
      impianto: Math.round(costoConImpianto - costoConRistrutturazione),
      complessita: Math.round(costoFinale - costoConImpianto)
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
