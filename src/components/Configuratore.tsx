import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { TipoImpiantoElettrico } from "./steps/TipoImpiantoElettrico";
import { Tapparelle } from "./steps/Tapparelle";
import { ContactForm } from "./steps/ContactForm";
import { Riepilogo } from "./steps/Riepilogo";
import { ThankYou } from "./steps/ThankYou";
import { ConfiguratoreElettrico } from "./steps/ConfiguratoreElettrico";
import { Domotica } from "./steps/Domotica";
import { TipoProprietario } from "./steps/TipoProprietario";
import { EtaImpiantoElettrico } from "./steps/EtaImpiantoElettrico";

export type FormData = {
  // Informazioni generali
  superficie?: number;
  tipoAbitazione?: string;
  numeroStanze?: number;
  numeroBagni?: number;
  numeroSoggiorniCucine?: number;
  indirizzo?: string;
  
  // Configurazione elettrico
  tipoRistrutturazione?: string;
  etaImpianto?: string;
  tipoImpianto?: string;
  tipoDomotica?: string;
  
  // KNX Features
  knxFeatures?: string[];
  
  // Tapparelle
  tapparelleElettricheCount?: number;
  
  // Dati contatto
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  consensoPrivacy?: boolean;
  consensoMarketing?: boolean;
  
  // Stima finale
  tipoProprietario?: string;
  
  // Prezzi calcolati
  prezzoBase?: number;
  prezzoTotale?: number;
  risparmio?: number;
};

const steps = [
  "step1",
  "step2",
  "configuratoreElettrico",
  "etaImpiantoElettrico",
  "tipoImpiantoElettrico",
  "domotica",
  "tapparelle",
  "tipoProprietario",
  "contactForm",
  "riepilogo",
  "thankYou"
];

export const Configuratore = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  const updateFormData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "step1":
        return <Step1 formData={formData} updateFormData={updateFormData} onNext={nextStep} />;
      case "step2":
        return <Step2 formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "configuratoreElettrico":
        return <ConfiguratoreElettrico formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "etaImpiantoElettrico":
        return <EtaImpiantoElettrico formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "tipoImpiantoElettrico":
        return <TipoImpiantoElettrico formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "domotica":
        return <Domotica formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "tapparelle":
        return <Tapparelle formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "tipoProprietario":
        return <TipoProprietario formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "contactForm":
        return <ContactForm formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} resetForm={resetForm} />;
      case "riepilogo":
        return <Riepilogo formData={formData} onBack={prevStep} />;
      case "thankYou":
        return <ThankYou formData={formData} />;
      default:
        return <div>Passo non trovato</div>;
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};
