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
  tipologiaAbitazione: string;
  superficie: number;
  indirizzo: string;
  citta: string;
  cap: string;
  regione: string;
  piano: string;
  composizione: {
    cucina: number;
    cameraDoppia: number;
    cameraSingola: number;
    bagno: number;
    soggiorno: number;
    altro: number;
  };
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  accettoTermini: boolean;
  tipoProprietà: string;
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
    tipologiaAbitazione: "",
    superficie: 0,
    indirizzo: "",
    citta: "",
    cap: "",
    regione: "",
    piano: "",
    composizione: {
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      bagno: 0,
      soggiorno: 0,
      altro: 0,
    },
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    accettoTermini: false,
    tipoProprietà: "prima casa"
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
      tipologiaAbitazione: "",
      superficie: 0,
      indirizzo: "",
      citta: "",
      cap: "",
      regione: "",
      piano: "",
      composizione: {
        cucina: 0,
        cameraDoppia: 0,
        cameraSingola: 0,
        bagno: 0,
        soggiorno: 0,
        altro: 0,
      },
      nome: "",
      cognome: "",
      email: "",
      telefono: "",
      accettoTermini: false,
      tipoProprietà: "prima casa"
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

  const handleWelcomeStart = () => {
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
    <Card className="w-full max-w-4xl rounded-[20px] shadow-lg overflow-hidden">
      <CardContent className="p-2 sm:p-4 md:p-6">
        <div className="flex flex-col">
          {renderCurrentStep()}
        </div>
      </CardContent>
    </Card>
  );
};
