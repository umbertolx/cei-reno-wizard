import { useState } from "react";
import { InformazioniGenerali } from "./steps/InformazioniGenerali";
import { RiepilogoFinale } from "./steps/RiepilogoFinale";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { RichiestaInviata } from "./steps/RichiestaInviata";

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
};

export const Configuratore = () => {
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
    accettoTermini: false
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
      accettoTermini: false
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
          <InformazioniGenerali 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        );
      case 1:
        const stima = calcolaStima();
        return (
          <RiepilogoFinale 
            formData={formData} 
            updateFormData={updateFormData}
            stima={stima}
            onBack={handleBack}
            onSubmit={handleInviaDati}
          />
        );
      case 2:
        return <RichiestaInviata onReset={handleReset} />;
      default:
        return <div>Step non valido</div>;
    }
  };

  return (
    <Card className="w-full max-w-4xl rounded-[20px] shadow-lg overflow-hidden">
      <CardContent className="p-6 md:p-10 lg:p-[72px]">
        <div className="flex flex-col">
          {renderStep()}
        </div>
      </CardContent>
    </Card>
  );
};
