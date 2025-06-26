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
import { RiepilogoFinale } from "./steps/RiepilogoFinale";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { RichiestaInviata } from "./steps/RichiestaInviata";
import { DatiContatto } from "./steps/DatiContatto";
import { StimaFinale } from "./steps/StimaFinale";
import { calculateEstimate } from "@/services/estimateService";
import { EstimateResponse } from "@/types/estimate";

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
  // New field for the estimate received from external API
  estimate?: EstimateResponse;
};

export const Configuratore = () => {
  const [step, setStep] = useState<number>(0);
  const [isCalculatingEstimate, setIsCalculatingEstimate] = useState(false);
  
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
  
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  // Function to call external API and get estimate
  const handleCalculateEstimate = async () => {
    setIsCalculatingEstimate(true);
    try {
      const estimate = await calculateEstimate(formData);
      updateFormData({ estimate });
      toast({
        title: "Stima calcolata",
        description: "La tua stima personalizzata è pronta!",
      });
    } catch (error) {
      toast({
        title: "Errore nel calcolo",
        description: "Non è stato possibile calcolare la stima. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsCalculatingEstimate(false);
    }
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setStep(0);
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

  const handleInviaDati = async () => {
    try {
      // Here we would send all structured data to the backend:
      // - All configuration data (formData)
      // - Contact information
      // - The estimate received from external API
      // - Survey request details
      
      const dataToSend = {
        configuration: {
          tipologiaAbitazione: formData.tipologiaAbitazione,
          superficie: formData.superficie,
          indirizzo: formData.indirizzo,
          citta: formData.citta,
          cap: formData.cap,
          regione: formData.regione,
          piano: formData.piano,
          composizione: formData.composizione,
          tipoProprietà: formData.tipoProprietà,
          tipoRistrutturazione: formData.tipoRistrutturazione,
          impiantoVecchio: formData.impiantoVecchio,
          interventiElettrici: formData.interventiElettrici,
          ambientiSelezionati: formData.ambientiSelezionati,
          tipoImpianto: formData.tipoImpianto,
          tipoDomotica: formData.tipoDomotica,
          knxConfig: formData.knxConfig,
          bTicinoConfig: formData.bTicinoConfig,
          elettrificareTapparelle: formData.elettrificareTapparelle,
          numeroTapparelle: formData.numeroTapparelle,
        },
        contactData: {
          nome: formData.nome,
          cognome: formData.cognome,
          email: formData.email,
          telefono: formData.telefono,
        },
        estimate: formData.estimate,
        surveyRequest: {
          dataRichiestaSopralluogo: formData.dataRichiestaSopralluogo,
          orarioSopralluogo: formData.orarioSopralluogo,
          note: formData.note,
        },
        submittedAt: new Date().toISOString()
      };
      
      console.log("Structured data to send to admin dashboard:", dataToSend);
      
      // TODO: Replace with actual API call to save data
      // await fetch('/api/leads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dataToSend)
      // });
      
      toast({
        title: "Richiesta inviata con successo!",
        description: "Ti contatteremo al più presto.",
        duration: 5000,
      });
      
      setStep(prev => prev + 1);
      
    } catch (error) {
      toast({
        title: "Errore",
        description: "Non è stato possibile inviare la tua richiesta. Riprova più tardi.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Enhanced handleNext function for DatiContatto -> StimaFinale transition
  const handleNextFromDatiContatto = async () => {
    if (!formData.estimate) {
      await handleCalculateEstimate();
    }
    handleNext();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <WelcomePage 
            onStart={handleNext} 
          />
        );
      case 1:
        return (
          <InformazioniGenerali 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        );
      case 2:
        return (
          <ConfiguratoreElettrico 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        );
      case 3:
        if (formData.tipoRistrutturazione === 'parziale') {
          return (
            <EtaImpiantoElettrico 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack}
            />
          );
        } else {
          return (
            <TipoImpiantoElettrico 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack}
            />
          );
        }
      case 4:
        if (formData.tipoRistrutturazione === 'parziale') {
          return (
            <InterventiElettrici 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack}
            />
          );
        } else {
          if (formData.tipoImpianto === 'livello3') {
            return (
              <TipoDomotica
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            );
          } else {
            return (
              <TapparelleElettriche 
                formData={formData} 
                updateFormData={updateFormData} 
                onNext={handleNext} 
                onBack={handleBack}
              />
            );
          }
        }
      case 5:
        if (formData.tipoRistrutturazione === 'parziale') {
          return (
            <SelezioneAmbienti
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          );
        } else {
          if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'knx') {
            return (
              <ConfigurazioneKNX
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            );
          } else if (formData.tipoImpianto === 'livello3' && formData.tipoDomotica === 'wireless') {
            return (
              <ConfigurazioneBTicino
                formData={formData}
                updateFormData={updateFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            );
          } else {
            return (
              <DatiContatto
                formData={formData}
                updateFormData={updateFormData}
                onBack={handleBack}
                onNext={handleNextFromDatiContatto}
                isCalculatingEstimate={isCalculatingEstimate}
              />
            );
          }
        }
      case 6:
        if (formData.tipoRistrutturazione === 'parziale') {
          return (
            <DatiContatto
              formData={formData}
              updateFormData={updateFormData}
              onBack={handleBack}
              onNext={handleNextFromDatiContatto}
              isCalculatingEstimate={isCalculatingEstimate}
            />
          );
        } else {
          if (formData.tipoImpianto === 'livello3' && (formData.tipoDomotica === 'knx' || formData.tipoDomotica === 'wireless')) {
            return (
              <DatiContatto
                formData={formData}
                updateFormData={updateFormData}
                onBack={handleBack}
                onNext={handleNextFromDatiContatto}
                isCalculatingEstimate={isCalculatingEstimate}
              />
            );
          } else {
            return (
              <StimaFinale
                formData={formData}
                updateFormData={updateFormData}
                estimate={formData.estimate}
                onBack={handleBack}
                onSubmit={handleInviaDati}
              />
            );
          }
        }
      case 7:
        if (formData.tipoRistrutturazione === 'parziale') {
          return (
            <StimaFinale
              formData={formData}
              updateFormData={updateFormData}
              estimate={formData.estimate}
              onBack={handleBack}
              onSubmit={handleInviaDati}
            />
          );
        } else {
          if (formData.tipoImpianto === 'livello3' && (formData.tipoDomotica === 'knx' || formData.tipoDomotica === 'wireless')) {
            return (
              <StimaFinale
                formData={formData}
                updateFormData={updateFormData}
                estimate={formData.estimate}
                onBack={handleBack}
                onSubmit={handleInviaDati}
              />
            );
          } else {
            return <RichiestaInviata onReset={handleReset} />;
          }
        }
      case 8:
        if (formData.tipoRistrutturazione === 'parziale') {
          return <RichiestaInviata onReset={handleReset} />;
        } else {
          return <RichiestaInviata onReset={handleReset} />;
        }
      case 9:
        return <RichiestaInviata onReset={handleReset} />;
      default:
        return <div>Step non valido</div>;
    }
  };

  return (
    <Card className="w-full max-w-4xl rounded-[20px] shadow-lg overflow-hidden">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col">
          {renderStep()}
        </div>
      </CardContent>
    </Card>
  );
};
