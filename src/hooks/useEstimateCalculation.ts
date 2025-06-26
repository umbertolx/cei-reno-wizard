
import { useState, useCallback } from "react";
import { FormData } from "@/components/Configuratore";
import { EstimateResponse } from "@/types/estimate";
import { calculateEstimate } from "@/services/estimateService";
import { toast } from "@/hooks/use-toast";

export const useEstimateCalculation = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateWithRetry = useCallback(async (formData: FormData, maxRetries = 3): Promise<EstimateResponse | null> => {
    console.log("🔢 Starting estimate calculation with retry logic...");
    console.log("📊 Form data for estimate:", formData);
    
    setIsCalculating(true);
    setError(null);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔄 Estimate calculation attempt ${attempt}/${maxRetries}`);
        
        const calculatedEstimate = await calculateEstimate(formData);
        
        if (calculatedEstimate && calculatedEstimate.min && calculatedEstimate.max) {
          console.log("✅ Estimate calculated successfully:", calculatedEstimate);
          setEstimate(calculatedEstimate);
          setIsCalculating(false);
          
          toast({
            title: "Stima calcolata",
            description: "La tua stima personalizzata è pronta!",
          });
          
          return calculatedEstimate;
        } else {
          throw new Error("Stima non valida ricevuta dal servizio");
        }
      } catch (error) {
        console.error(`❌ Estimate calculation attempt ${attempt} failed:`, error);
        
        if (attempt === maxRetries) {
          const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
          setError(errorMessage);
          setIsCalculating(false);
          
          toast({
            title: "Errore nel calcolo",
            description: `Impossibile calcolare la stima dopo ${maxRetries} tentativi: ${errorMessage}`,
            variant: "destructive",
          });
          
          return null;
        } else {
          // Attendi prima del prossimo tentativo
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    return null;
  }, []);

  const clearEstimate = useCallback(() => {
    console.log("🧹 Clearing estimate data");
    setEstimate(null);
    setError(null);
  }, []);

  return {
    estimate,
    isCalculating,
    error,
    calculateWithRetry,
    clearEstimate
  };
};
