
import { useState, useCallback } from "react";
import { FormData } from "@/components/Configuratore";

export interface StepConfig {
  id: string;
  component: string;
  requiresEstimate?: boolean;
  skipConditions?: (formData: FormData) => boolean;
}

export const useConfiguratorFlow = (formData: FormData, onStepChange?: () => void) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Definizione step con flusso logico corretto
  const steps: StepConfig[] = [
    { id: 'welcome', component: 'WelcomePage' },
    { id: 'info-generali', component: 'InformazioniGenerali' },
    { 
      id: 'configuratore-elettrico', 
      component: 'ElectricalConfiguration',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico')
    },
    // Se intervento parziale: età impianto → interventi → ambienti
    { 
      id: 'eta-impianto', 
      component: 'ElectricalSystemAge',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoRistrutturazione !== 'parziale'
    },
    { 
      id: 'interventi-elettrici', 
      component: 'ElectricalInterventions',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoRistrutturazione !== 'parziale'
    },
    { 
      id: 'selezione-ambienti', 
      component: 'RoomSelection',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoRistrutturazione !== 'parziale'
    },
    // Se completa/nuova: tipo impianto
    { 
      id: 'tipo-impianto', 
      component: 'ElectricalSystemType',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoRistrutturazione === 'parziale'
    },
    // Se livello 3: domotica → KNX/BTicino
    { 
      id: 'tipo-domotica', 
      component: 'TipoDomotica',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoRistrutturazione === 'parziale' || data.moduloElettrico?.tipoImpianto !== 'livello3'
    },
    { 
      id: 'configurazione-knx', 
      component: 'ConfigurazioneKNX',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoImpianto !== 'livello3' || data.moduloElettrico?.tipoDomotica !== 'knx'
    },
    { 
      id: 'configurazione-bticino', 
      component: 'ConfigurazioneBTicino',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoImpianto !== 'livello3' || data.moduloElettrico?.tipoDomotica !== 'wireless'
    },
    // Se livello 1/2: tapparelle
    { 
      id: 'tapparelle-elettriche', 
      component: 'ElectricShutters',
      skipConditions: (data) => !data.moduliSelezionati?.includes('impianto-elettrico') || data.moduloElettrico?.tipoRistrutturazione === 'parziale' || data.moduloElettrico?.tipoImpianto === 'livello3'
    },
    // Step fotovoltaico
    { 
      id: 'caratteristiche-tetto', 
      component: 'RoofCharacteristics',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico')
    },
    { 
      id: 'tipo-intervento-fotovoltaico', 
      component: 'PhotovoltaicInterventionType',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico')
    },
    { 
      id: 'obiettivi-ampliamento', 
      component: 'ExpansionGoals',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico !== 'ampliamento'
    },
    { 
      id: 'dettagli-impianto-esistente', 
      component: 'DettagliImpiantoEsistente',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico !== 'ampliamento'
    },
    { 
      id: 'potenza-ampliamento', 
      component: 'PotenzaAmpliamento',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico !== 'ampliamento'
    },
    { 
      id: 'obiettivi-consumi', 
      component: 'ConsumptionGoals',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico !== 'nuovo'
    },
    { 
      id: 'consumi-annui', 
      component: 'ConsumiAnnui',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico === 'ampliamento'
    },
    { 
      id: 'definizione-consumi-standard', 
      component: 'DefinizioneConsumiStandard',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico === 'ampliamento' || data.moduloFotovoltaico?.conosceConsumi !== 'no'
    },
    { 
      id: 'nuove-voci-consumo', 
      component: 'NuoveVociConsumo',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico === 'ampliamento' || data.moduloFotovoltaico?.conosceConsumi !== 'si'
    },
    { 
      id: 'batteria-accumulo', 
      component: 'BatteriaAccumulo',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico === 'ampliamento'
    },
    { 
      id: 'disponibilita-superficie-tetto', 
      component: 'DisponibilitaSuperficieTetto',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico') || data.moduloFotovoltaico?.tipoInterventoFotovoltaico === 'ampliamento'
    },
    { 
      id: 'qualita-forniture', 
      component: 'QualitaForniture',
      skipConditions: (data) => !data.moduliSelezionati?.includes('fotovoltaico')
    },
    // Step modulo sicurezza
    { 
      id: 'security-zone-selection', 
      component: 'SecurityZoneSelection',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza')
    },
    { 
      id: 'indoor-environments', 
      component: 'IndoorEnvironments',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza') || !data.moduloSicurezza?.zoneProtette?.includes('interni')
    },
    { 
      id: 'indoor-protection-type', 
      component: 'IndoorProtectionType',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza') || !data.moduloSicurezza?.zoneProtette?.includes('interni')
    },
    { 
      id: 'indoor-windows-selection', 
      component: 'IndoorWindowsSelection',
      skipConditions: (data) => {
        const tipoProtezione = data.moduloSicurezza?.ambientiInterni?.tipoProtezione;
        return !data.moduliSelezionati?.includes('sicurezza') || 
          !data.moduloSicurezza?.zoneProtette?.includes('interni') ||
          !Array.isArray(tipoProtezione) ||
          !tipoProtezione.includes('anche-finestre');
      }
    },
    { 
      id: 'indoor-pets', 
      component: 'IndoorPetsFriendly',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza') || !data.moduloSicurezza?.zoneProtette?.includes('interni')
    },
    { 
      id: 'indoor-cameras', 
      component: 'IndoorCameras',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza') || !data.moduloSicurezza?.zoneProtette?.includes('interni')
    },
    // Outdoor spaces - diviso in 4 step separati
    { 
      id: 'outdoor-space-selection', 
      component: 'OutdoorSpaceSelection',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza') || !data.moduloSicurezza?.zoneProtette?.includes('esterni')
    },
    { 
      id: 'outdoor-balconies', 
      component: 'OutdoorBalconies',
      skipConditions: (data) => 
        !data.moduliSelezionati?.includes('sicurezza') || 
        !data.moduloSicurezza?.zoneProtette?.includes('esterni') ||
        !data.moduloSicurezza?.spaziEsterni?.tipologiaSpazi?.includes('terrazzi')
    },
    { 
      id: 'outdoor-garden', 
      component: 'OutdoorGarden',
      skipConditions: (data) => 
        !data.moduliSelezionati?.includes('sicurezza') || 
        !data.moduloSicurezza?.zoneProtette?.includes('esterni') ||
        !data.moduloSicurezza?.spaziEsterni?.tipologiaSpazi?.includes('giardino')
    },
    { 
      id: 'outdoor-cameras', 
      component: 'OutdoorCameras',
      skipConditions: (data) => 
        !data.moduliSelezionati?.includes('sicurezza') || 
        !data.moduloSicurezza?.zoneProtette?.includes('esterni')
    },
    // Alert management - diviso in 2 step
    { 
      id: 'alert-type', 
      component: 'AlertType',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza')
    },
    { 
      id: 'alert-connection', 
      component: 'AlertConnection',
      skipConditions: (data) => 
        !data.moduliSelezionati?.includes('sicurezza') ||
        !data.moduloSicurezza?.tipoAvviso?.includes('app') ||
        data.moduloSicurezza?.hasDomotica === true
    },
    { 
      id: 'security-level', 
      component: 'SecurityLevel',
      skipConditions: (data) => !data.moduliSelezionati?.includes('sicurezza')
    },
    { id: 'dati-contatto', component: 'DatiContatto' },
    { id: 'stima-finale', component: 'StimaFinale', requiresEstimate: true },
    { id: 'richiesta-inviata', component: 'RequestSent' }
  ];

  const getActiveSteps = useCallback(() => {
    return steps.filter(step => 
      !step.skipConditions || !step.skipConditions(formData)
    );
  }, [formData]);

  const getCurrentStepConfig = useCallback(() => {
    const activeSteps = getActiveSteps();
    return activeSteps[currentStep] || null;
  }, [currentStep, getActiveSteps]);

  const goToNext = useCallback(() => {
    const activeSteps = getActiveSteps();
    console.log(`🔄 Moving to next step. Current: ${currentStep}, Total active steps: ${activeSteps.length}`);
    
    if (currentStep < activeSteps.length - 1) {
      const nextStep = currentStep + 1;
      console.log(`➡️ Moving from step ${currentStep} (${activeSteps[currentStep]?.id}) to step ${nextStep} (${activeSteps[nextStep]?.id})`);
      setCurrentStep(nextStep);
      
      // Call scroll to top after a brief delay to ensure rendering is complete
      setTimeout(() => {
        onStepChange?.();
      }, 50);
      
      return true;
    }
    return false;
  }, [currentStep, getActiveSteps, onStepChange]);

  const goToBack = useCallback(() => {
    console.log(`⬅️ Moving back from step ${currentStep}`);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      
      // Call scroll to top after a brief delay to ensure rendering is complete
      setTimeout(() => {
        onStepChange?.();
      }, 50);
      
      return true;
    }
    return false;
  }, [currentStep, onStepChange]);

  const reset = useCallback(() => {
    console.log("🔄 Resetting configurator flow");
    setCurrentStep(0);
    onStepChange?.();
  }, [onStepChange]);

  const isLastTechnicalStep = useCallback((stepId: string) => {
    const activeSteps = getActiveSteps();
    const currentStepIndex = activeSteps.findIndex(step => step.id === stepId);
    const nextStep = activeSteps[currentStepIndex + 1];
    
    // Return true if the next step is dati-contatto
    return nextStep?.id === 'dati-contatto';
  }, [getActiveSteps]);

  return {
    currentStep,
    getCurrentStepConfig,
    getActiveSteps,
    goToNext,
    goToBack,
    reset,
    totalSteps: getActiveSteps().length,
    isLastTechnicalStep
  };
};
