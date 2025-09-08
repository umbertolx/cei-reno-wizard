import { useState } from "react";
import { WelcomePage } from "./steps/WelcomePage";
import { InformazioniGenerali } from "./steps/InformazioniGenerali";
import { ConfiguratoreElettrico } from "./steps/ConfiguratoreElettrico";
import { EtaImpiantoElettrico } from "./steps/EtaImpiantoElettrico";
import { InterventiElettrici } from "./steps/InterventiElettrici";
import { SelezioneAmbienti } from "./steps/SelezioneAmbienti";
import { TipoImpiantoElettrico } from "./steps/TipoImpiantoElettrico";
import { TipoDomotica } from "./steps/TipoDomotica";
import { ConfigurazioneKNX } from "./steps/ConfigurazioneKNX";
import { ConfigurazioneBTicino } from "./steps/ConfigurazioneBTicino";
import { TapparelleElettriche } from "./steps/TapparelleElettriche";
import { TipoInterventoFotovoltaico } from "./steps/TipoInterventoFotovoltaico";
import { CaratteristicheTetto } from "./steps/CaratteristicheTetto";
import { ObiettiviConsumi } from "./steps/ObiettiviConsumi";
import { ConsumiAnnui } from "./steps/ConsumiAnnui";
import NuoveVociConsumo from "./steps/NuoveVociConsumo";
import { DefinizioneConsumiStandard } from "./steps/DefinizioneConsumiStandard";
import { DisponibilitaSuperficieTetto } from "./steps/DisponibilitaSuperficieTetto";
import { BatteriaAccumulo } from "./steps/BatteriaAccumulo";
import { RichiestaInviata } from "./steps/RichiestaInviata";
import { DatiContatto } from "./steps/DatiContatto";
import { StimaFinale } from "./steps/StimaFinale";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { saveLeadToDatabase } from "@/services/leadService";
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
    tipoProprieta: string;
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
    orientamentoTetto?: string | string[]; // "sud" | "sud-est" | "sud-ovest" | "est" | "ovest" | "est-ovest" | "non-so" o array per falde multiple
    zoneOmbra?: string; // "nessuna" | "leggera" | "importante"
    obiettivoPrincipale?: string; // "risparmio-bolletta" | "indipendenza-energetica"
    consumoEnergetico?: number[]; // percentuale consumo giorno/sera [0-100]
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
      tipoProprieta: "prima casa",
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

    // Se stiamo per andare alla stima finale, calcola la stima E salva il lead
    if (currentStepConfig?.id === 'dati-contatto') {
      console.log("🔢 About to move to estimate, calculating...");
      
      const calculatedEstimate = await calculateWithRetry(formData);
      if (calculatedEstimate) {
        updateFormData({ estimate: calculatedEstimate });
        console.log("✅ Estimate calculated, now saving lead...");
        
        // Salva il lead con la stima
        setIsSavingLead(true);
        try {
          const leadId = await saveLeadToDatabase(formData, calculatedEstimate);
          setSavedLeadId(leadId);
          console.log("✅ Lead saved successfully with ID:", leadId);
          
          toast({
            title: "Dati salvati con successo!",
            description: "La tua richiesta è stata registrata. Puoi ora visualizzare la stima.",
            duration: 3000,
          });
          
          flow.goToNext();
        } catch (error) {
          console.error("❌ Error saving lead:", error);
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
        tipoProprieta: "prima casa",
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
    
    if (!savedLeadId) {
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
        .eq('id', savedLeadId);

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
      
      case 'ConfiguratoreElettrico':
        return <ConfiguratoreElettrico {...commonProps} />;
      
      case 'EtaImpiantoElettrico':
        return <EtaImpiantoElettrico {...commonProps} />;
      
      case 'InterventiElettrici':
        return <InterventiElettrici {...commonProps} />;
      
      case 'SelezioneAmbienti':
        return <SelezioneAmbienti {...commonProps} />;
      
      case 'TipoImpiantoElettrico':
        return <TipoImpiantoElettrico {...commonProps} />;
      
      case 'TipoDomotica':
        return <TipoDomotica {...commonProps} />;
      
      case 'ConfigurazioneKNX':
        return <ConfigurazioneKNX {...commonProps} />;
      
      case 'ConfigurazioneBTicino':
        return <ConfigurazioneBTicino {...commonProps} />;
      
      case 'TapparelleElettriche':
        return <TapparelleElettriche {...commonProps} />;
      
      case 'TipoInterventoFotovoltaico':
        return <TipoInterventoFotovoltaico {...commonProps} />;
      
      case 'CaratteristicheTetto':
        return <CaratteristicheTetto {...commonProps} />;
      
      case 'ObiettiviConsumi':
        return <ObiettiviConsumi {...commonProps} />;
      
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
      
      case 'RichiestaInviata':
        return <RichiestaInviata onReset={handleReset} />;
      
      default:
        return <div>Componente non trovato: {currentStepConfig.component}</div>;
    }
  };

  return (
    <Card className="w-full max-w-4xl rounded-[20px] shadow-lg overflow-hidden min-h-0">
      <CardContent className="p-3 sm:p-4 md:p-5">
        <div className="flex flex-col min-h-0 space-y-2">
          {renderCurrentStep()}
        </div>
      </CardContent>
    </Card>
  );
};
