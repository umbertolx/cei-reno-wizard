
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

  const flow = useConfiguratorFlow(formData);
  const { estimate, isCalculating, calculateWithRetry } = useEstimateCalculation();
  
  const updateFormData = (data: Partial<FormData>) => {
    console.log("📝 Updating form data:", data);
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = async () => {
    const currentStepConfig = flow.getCurrentStepConfig();
    console.log("🔄 Handle next called for step:", currentStepConfig?.id);

    // Se stiamo per andare alla stima finale, calcola la stima
    if (currentStepConfig?.id === 'dati-contatto') {
      console.log("🔢 About to move to estimate, calculating...");
      
      const calculatedEstimate = await calculateWithRetry(formData);
      if (calculatedEstimate) {
        updateFormData({ estimate: calculatedEstimate });
        console.log("✅ Estimate calculated and saved to form data");
        flow.goToNext();
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

  const handleSubmitLead = async () => {
    console.log("🚀 Starting lead submission process...");
    console.log("📋 Complete form data:", formData);
    
    const finalEstimate = estimate || formData.estimate;
    
    if (!finalEstimate) {
      console.error("❌ No estimate available for submission");
      toast({
        title: "Errore",
        description: "Stima non disponibile. Riprova il calcolo.",
        variant: "destructive",
      });
      return;
    }

    console.log("📊 Using estimate for submission:", finalEstimate);
    setIsSavingLead(true);
    
    try {
      console.log("💾 Attempting to save lead to database...");
      
      const leadId = await saveLeadToDatabase(formData, finalEstimate);
      
      console.log("✅ Lead saved successfully with ID:", leadId);
      
      toast({
        title: "Richiesta inviata con successo!",
        description: `Lead salvato con ID: ${leadId}. Ti contatteremo al più presto per il sopralluogo.`,
        duration: 5000,
      });
      
      console.log("➡️ Moving to success page");
      flow.goToNext();
      
    } catch (error) {
      console.error("❌ Critical error saving lead:", error);
      
      toast({
        title: "Errore",
        description: `Non è stato possibile inviare la tua richiesta: ${error instanceof Error ? error.message : 'Errore sconosciuto'}. Riprova più tardi.`,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSavingLead(false);
    }
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
        return <WelcomePage onStart={handleNext} />;
      
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
            isCalculatingEstimate={isCalculating}
          />
        );
      
      case 'StimaFinale':
        return (
          <StimaFinale
            formData={formData}
            updateFormData={updateFormData}
            estimate={estimate || formData.estimate}
            onBack={handleBack}
            onSubmit={handleSubmitLead}
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
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col">
          {renderCurrentStep()}
        </div>
      </CardContent>
    </Card>
  );
};
