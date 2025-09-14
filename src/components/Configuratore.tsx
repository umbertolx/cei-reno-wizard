import { useState } from "react";
import { WelcomePage } from "./steps/1-welcome/WelcomePage";
import { InformazioniGenerali } from "./steps/2-general/InformazioniGenerali";
import { ElectricalConfiguration } from "./steps/3-electrical/01-intervention-type/ElectricalConfiguration";
import { ElectricalSystemAge } from "./steps/3-electrical/01-intervention-type/ElectricalSystemAge";
import { ElectricalInterventions } from "./steps/3-electrical/02-system-planning/ElectricalInterventions";
import { RoomSelection } from "./steps/3-electrical/02-system-planning/RoomSelection";
import { ElectricalSystemType } from "./steps/3-electrical/03-system-type/ElectricalSystemType";
import { TipoDomotica } from "./steps/3-electrical/04-automation/TipoDomotica";
import { ConfigurazioneKNX } from "./steps/3-electrical/04-automation/ConfigurazioneKNX";
import { ConfigurazioneBTicino } from "./steps/3-electrical/04-automation/ConfigurazioneBTicino";
import { ElectricShutters } from "./steps/3-electrical/05-accessories/ElectricShutters";
import { PhotovoltaicInterventionType } from "./steps/4-photovoltaic/PhotovoltaicInterventionType";
import { RoofCharacteristics } from "./steps/4-photovoltaic/RoofCharacteristics";
import { ConsumptionGoals } from "./steps/4-photovoltaic/ConsumptionGoals";
import { ExpansionGoals } from "./steps/4-photovoltaic/ExpansionGoals";
import { DettagliImpiantoEsistente } from "./steps/4-photovoltaic/DettagliImpiantoEsistente";
import { ConsumiAnnui } from "./steps/4-photovoltaic/ConsumiAnnui";
import NuoveVociConsumo from "./steps/4-photovoltaic/NuoveVociConsumo";
import { DefinizioneConsumiStandard } from "./steps/4-photovoltaic/DefinizioneConsumiStandard";
import { DisponibilitaSuperficieTetto } from "./steps/4-photovoltaic/DisponibilitaSuperficieTetto";
import { BatteriaAccumulo } from "./steps/4-photovoltaic/BatteriaAccumulo";
import { RequestSent } from "./steps/5-final/RequestSent";
import { DatiContatto } from "./steps/5-final/DatiContatto";
import { StimaFinale } from "./steps/5-final/StimaFinale";
import { PreSelectedFeatureSelector } from "@/components/templates/PreSelectedFeatureSelector";
import { toast } from "@/hooks/use-toast";
import { saveLeadToDatabase, savePartialLead, updateLeadWithEstimate } from "@/services/leadService";
import { supabase } from "@/integrations/supabase/client";
import { EstimateResponse } from "@/types/estimate";
import { useConfiguratorFlow } from "@/hooks/useConfiguratorFlow";
import { useEstimateCalculation } from "@/hooks/useEstimateCalculation";

export type FormData = {
  // Dati comuni a tutti i moduli
  informazioniGenerali: {
    tipologiaAbitazione: string;
    superficie: number;
    indirizzo: string;
    citta: string;
    cap: string;
    regione: string;
    piano: string;
    utilizzoAbitazione: string;
    numeroPersone: number;
    composizione: {
      cucina: number;
      cameraDoppia: number;
      cameraSingola: number;
      bagno: number;
      soggiorno: number;
      altro: number;
    };
  };
  
  // Contatti (comune)
  contatti: {
    nome: string;
    cognome: string;
    email: string;
    telefono: string;
    accettoTermini: boolean;
    tipoProprietà: string;
    dataRichiestaSopralluogo?: string;
    orarioSopralluogo?: string;
    note?: string;
  };
  
  // Moduli selezionati
  moduliSelezionati: string[];
  
  // Modulo Elettrico (compartimento stagno)
  moduloElettrico?: {
    tipoRistrutturazione: string;
    impiantoVecchio?: string;
    interventiElettrici?: Record<string, any>;
    ambientiSelezionati?: string[];
    tipoImpianto?: string;
    tipoDomotica?: string;
    knxConfig?: Record<string, any>;
    bTicinoConfig?: Record<string, any>;
    elettrificareTapparelle?: string;
    numeroTapparelle?: number;
    estimate?: EstimateResponse;
  };
  
  // Modulo Fotovoltaico (compartimento stagno)
  moduloFotovoltaico?: {
    tipoInterventoFotovoltaico: string; // "nuovo" o "ampliamento"
    tipoFalda?: string; // "piano" | "singola" | "multiple"
    orientamentoTetto?: string | string[]; // "sud" | "sud-est" | "sud-ovest" | "est" | "ovest" | "nord-est" | "nord-ovest" | "nord" | "non-lo-so" o array per falde multiple
    zoneOmbra?: string; // "nessuna" | "leggera" | "importante"
    obiettivoPrincipale?: string; // "risparmio-bolletta" | "indipendenza-energetica"
    consumoEnergetico?: number[]; // percentuale consumo giorno/sera [0-100]
    // Campi per ampliamento
    obiettivoAmpliamento?: string; // "risparmio-bolletta" | "indipendenza-energetica"
    percentualeCopertura?: number[]; // percentuale attuale di copertura dell'impianto esistente
    potenzaImpianto?: string; // potenza in kWp dell'impianto esistente
    annoInstallazione?: string; // "prima-2015" | "2015-2020" | "dopo-2020"
    hasBatteria?: string; // "si" | "no"
    conosceConsumi?: string; // "si" | "no"
    consumiKWh?: number; // kWh annui da bolletta
    spesaMensile?: number; // spesa media mensile in €
    definizioneConsumiStandard?: Record<string, any>; // configurazioni per consumi standard quando non conosce i consumi
    nuoveVociConsumo?: Record<string, any>; // configurazioni delle nuove voci di consumo pianificate
    batteriaAccumulo?: string; // "si" | "no"
    superficieDisponibile?: string; // "si" | "no" | "non-lo-so"
    superficieEffettiva?: string; // superficie in mq inserita dall'utente se ha selezionato "no"
    estimate?: EstimateResponse;
  };
  
  // Stima finale cumulativa
  stimaFinale?: {
    totale: EstimateResponse;
    breakdown: Record<string, EstimateResponse>; // stima per ogni modulo
  };

  // DEPRECATED: Manteniamo temporaneamente per retrocompatibilità
  tipologiaAbitazione?: string;
  superficie?: number;
  indirizzo?: string;
  citta?: string;
  cap?: string;
  regione?: string;
  piano?: string;
  composizione?: {
    cucina: number;
    cameraDoppia: number;
    cameraSingola: number;
    bagno: number;
    soggiorno: number;
    altro: number;
  };
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  accettoTermini?: boolean;
  tipoProprietà?: string;
  tipoRistrutturazione?: string;
  impiantoVecchio?: string;
  interventiElettrici?: Record<string, any>;
  ambientiSelezionati?: string[];
  tipoImpianto?: string;
  tipoDomotica?: string;
  knxConfig?: Record<string, any>;
  bTicinoConfig?: Record<string, any>;
  elettrificareTapparelle?: string;
  numeroTapparelle?: number;
  dataRichiestaSopralluogo?: string;
  orarioSopralluogo?: string;
  note?: string;
  estimate?: EstimateResponse;
};

export const Configuratore = () => {
  const [isSavingLead, setIsSavingLead] = useState(false);
  const [savedLeadId, setSavedLeadId] = useState<string | null>(null);
  const [partialLeadId, setPartialLeadId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    moduliSelezionati: [],
    informazioniGenerali: {
      tipologiaAbitazione: "",
      superficie: 0,
      indirizzo: "",
      citta: "",
      cap: "",
      regione: "",
      piano: "",
      utilizzoAbitazione: "prima casa",
      numeroPersone: 2,
      composizione: {
        cucina: 0,
        cameraDoppia: 0,
        cameraSingola: 0,
        bagno: 0,
        soggiorno: 0,
        altro: 0,
      },
    },
    contatti: {
      nome: "",
      cognome: "",
      email: "",
      telefono: "",
      accettoTermini: false,
      tipoProprietà: "prima casa"
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const flow = useConfiguratorFlow(formData, scrollToTop);
  const { estimate, isCalculating, calculateWithRetry } = useEstimateCalculation();
  
  const updateFormData = (data: Partial<FormData>) => {
    console.log("📝 Updating form data:", data);
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    const currentStepConfig = flow.getCurrentStepConfig();
    console.log("🔄 Handle next called for step:", currentStepConfig?.id);

    // Save partial data before going to DatiContatto
    if (currentStepConfig && flow.isLastTechnicalStep(currentStepConfig.id)) {
      console.log("💾 Saving partial lead data before DatiContatto...");
      
      try {
        const leadId = await savePartialLead(formData);
        setPartialLeadId(leadId);
        console.log("✅ Partial lead saved with ID:", leadId);
        
        toast({
          title: "Configurazione salvata",
          description: "I tuoi dati tecnici sono stati salvati.",
          duration: 2000,
        });
      } catch (error) {
        console.error("❌ Error saving partial lead:", error);
        // Don't block navigation if partial save fails
      }
    }

    // Se stiamo per andare alla stima finale, calcola la stima E aggiorna il lead
    if (currentStepConfig?.id === 'dati-contatto') {
      console.log("🔢 About to move to estimate, calculating...");
      
      const calculatedEstimate = await calculateWithRetry(formData);
      if (calculatedEstimate) {
        updateFormData({ estimate: calculatedEstimate });
        console.log("✅ Estimate calculated, now updating lead...");
        
        setIsSavingLead(true);
        try {
          if (partialLeadId) {
            // Update existing partial lead
            await updateLeadWithEstimate(partialLeadId, formData, calculatedEstimate);
            setSavedLeadId(partialLeadId);
            console.log("✅ Lead updated successfully with ID:", partialLeadId);
          } else {
            // Fallback: create new lead (shouldn't happen normally)
            const leadId = await saveLeadToDatabase(formData, calculatedEstimate);
            setSavedLeadId(leadId);
            console.log("✅ New lead saved successfully with ID:", leadId);
          }
          
          toast({
            title: "Dati salvati con successo!",
            description: "La tua richiesta è stata registrata. Puoi ora visualizzare la stima.",
            duration: 3000,
          });
          
          flow.goToNext();
        } catch (error) {
          console.error("❌ Error saving/updating lead:", error);
          toast({
            title: "Errore nel salvare i dati",
            description: "Si è verificato un errore. Riprova.",
            variant: "destructive",
          });
        } finally {
          setIsSavingLead(false);
        }
      } else {
        console.error("❌ Failed to calculate estimate, cannot proceed");
        toast({
          title: "Errore",
          description: "Non è stato possibile calcolare la stima. Riprova.",
          variant: "destructive",
        });
      }
    } else {
      // Per tutti gli altri step, procedi normalmente
      flow.goToNext();
    }
  };

  const handleBack = () => {
    flow.goToBack();
  };

  const handleReset = () => {
    console.log("🔄 Resetting configurator");
    flow.reset();
    setSavedLeadId(null);
    setFormData({
      moduliSelezionati: [],
      informazioniGenerali: {
        tipologiaAbitazione: "",
        superficie: 0,
        indirizzo: "",
        citta: "",
        cap: "",
        regione: "",
        piano: "",
        utilizzoAbitazione: "prima casa",
        numeroPersone: 2,
        composizione: {
          cucina: 0,
          cameraDoppia: 0,
          cameraSingola: 0,
          bagno: 0,
          soggiorno: 0,
          altro: 0,
        },
      },
      contatti: {
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        accettoTermini: false,
        tipoProprietà: "prima casa"
      }
    });
  };

  const handleRequestSurvey = async () => {
    console.log("🏠 Handling survey request for lead:", savedLeadId);
    
    const leadIdToUpdate = savedLeadId || partialLeadId;
    if (!leadIdToUpdate) {
      console.error("❌ No saved lead ID available");
      toast({
        title: "Errore",
        description: "Impossibile trovare la richiesta. Riprova.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingLead(true);
    try {
      // Aggiorna il lead esistente con la richiesta di sopralluogo
      const { error } = await supabase
        .from('leads')
        .update({ 
          stato: 'sopralluogo_richiesto',
          data_richiesta_sopralluogo: formData.dataRichiestaSopralluogo || new Date().toISOString().split('T')[0],
          orario_sopralluogo: formData.orarioSopralluogo || null,
          note: formData.note || null,
          data_ultimo_contatto: new Date().toISOString()
        })
        .eq('id', leadIdToUpdate);

      if (error) {
        throw new Error(`Errore nell'aggiornare la richiesta: ${error.message}`);
      }

      console.log("✅ Lead updated with survey request");
      
      toast({
        title: "Richiesta sopralluogo inviata!",
        description: "Ti contatteremo al più presto per il sopralluogo.",
        duration: 5000,
      });
      
      flow.goToNext();
    } catch (error) {
      console.error("❌ Error updating lead for survey:", error);
      toast({
        title: "Errore",
        description: `Non è stato possibile inviare la richiesta: ${error instanceof Error ? error.message : 'Errore sconosciuto'}`,
        variant: "destructive",
      });
    } finally {
      setIsSavingLead(false);
    }
  };

  const handleWelcomeStart = (selectedModules: string[]) => {
    console.log("🎯 Starting configurator with modules:", selectedModules);
    updateFormData({ moduliSelezionati: selectedModules });
    scrollToTop();
    handleNext();
  };

  const renderCurrentStep = () => {
    const currentStepConfig = flow.getCurrentStepConfig();
    
    if (!currentStepConfig) {
      console.error("❌ No valid step configuration found");
      return <div>Errore: Step non valido</div>;
    }

    console.log(`🎯 Rendering step: ${currentStepConfig.id} (${currentStepConfig.component})`);
    
    const commonProps = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack
    };

    switch (currentStepConfig.component) {
      case 'WelcomePage':
        return <WelcomePage onStart={handleWelcomeStart} />;
      
      case 'InformazioniGenerali':
        return <InformazioniGenerali {...commonProps} />;
      
      case 'ElectricalConfiguration':
        return <ElectricalConfiguration {...commonProps} />;
      
      case 'ElectricalSystemAge':
        return <ElectricalSystemAge {...commonProps} />;
      
      case 'ElectricalInterventions':
        return <ElectricalInterventions {...commonProps} />;
      
      case 'RoomSelection':
        return <RoomSelection {...commonProps} />;
      
      case 'ElectricalSystemType':
        return <ElectricalSystemType {...commonProps} />;
      
      case 'TipoDomotica':
        return <TipoDomotica {...commonProps} />;
      
      case 'ConfigurazioneKNX':
        return <ConfigurazioneKNX {...commonProps} />;
      
      case 'ConfigurazioneBTicino':
        return <ConfigurazioneBTicino {...commonProps} />;
      
      case 'ElectricShutters':
        return <ElectricShutters {...commonProps} />;
      
      case 'PhotovoltaicInterventionType':
        return <PhotovoltaicInterventionType {...commonProps} />;
      
      case 'RoofCharacteristics':
        return <RoofCharacteristics {...commonProps} />;
      
      case 'ConsumptionGoals':
        return <ConsumptionGoals {...commonProps} />;
      
      case 'ExpansionGoals':
        return <ExpansionGoals {...commonProps} />;
      
      case 'DettagliImpiantoEsistente':
        return <DettagliImpiantoEsistente {...commonProps} />;
      
      case 'ConsumiAnnui':
        return <ConsumiAnnui {...commonProps} />;
      
      case 'DefinizioneConsumiStandard':
        return <DefinizioneConsumiStandard {...commonProps} />;
      
      case 'NuoveVociConsumo':
        return <NuoveVociConsumo {...commonProps} />;
      
      case 'BatteriaAccumulo':
        return <BatteriaAccumulo {...commonProps} />;
      
      case 'DisponibilitaSuperficieTetto':
        return <DisponibilitaSuperficieTetto {...commonProps} />;
      
      case 'DatiContatto':
        return (
          <DatiContatto
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onNext={handleNext}
            isCalculatingEstimate={isCalculating || isSavingLead}
          />
        );
      
      case 'StimaFinale':
        return (
          <StimaFinale
            formData={formData}
            updateFormData={updateFormData}
            estimate={estimate || formData.estimate}
            onBack={handleBack}
            onSubmit={handleRequestSurvey}
            isSubmitting={isSavingLead}
          />
        );
      
      case 'RequestSent':
        return <RequestSent onReset={handleReset} />;
      
      default:
        return <div>Componente non trovato: {currentStepConfig.component}</div>;
    }
  };

  return renderCurrentStep();
};
