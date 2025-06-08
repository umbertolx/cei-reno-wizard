import { useState } from "react";
import { WelcomePage } from "./steps/WelcomePage";
import { InformazioniGenerali } from "./steps/InformazioniGenerali";
import { ConfiguratoreElettrico } from "./steps/ConfiguratoreElettrico";
import { RiepilogoFinale } from "./steps/RiepilogoFinale";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { RichiestaInviata } from "./steps/RichiestaInviata";
import { DatiContatto } from "./steps/DatiContatto";
import { StimaFinale } from "./steps/StimaFinale";

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
  dataRichiestaSopralluogo?: string;
  orarioSopralluogo?: string;
  note?: string;
};

export const Configuratore = () => {
  // Step iniziale ora è 0 (pagina di benvenuto)
  const [step, setStep] = useState<number>(0);
  
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
  
  const calcolaStima = (): { min: number; max: number } => {
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
      // Qui andrebbe la logica di invio dei dati al backend
      console.log("Dati da inviare:", formData);
      
      // Simula un invio dati riuscito
      toast({
        title: "Richiesta inviata con successo!",
        description: "Ti contatteremo al più presto.",
        duration: 5000,
      });
      
      // Passa allo step di conferma
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

  // Renderizza il contenuto in base allo step corrente
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
        return (
          <DatiContatto
            formData={formData}
            updateFormData={updateFormData}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 4:
        const stima = calcolaStima();
        return (
          <StimaFinale
            formData={formData}
            updateFormData={updateFormData}
            stima={stima}
            onBack={handleBack}
            onSubmit={handleInviaDati}
          />
        );
      case 5:
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
