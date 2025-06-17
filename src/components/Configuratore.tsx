
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { InformazioniGenerali } from "./steps/InformazioniGenerali";
import { SuddivisioneSpazi } from "./steps/informazioni-generali/SuddivisioneSpazi";
import { TipoImpiantoElettrico } from "./steps/TipoImpiantoElettrico";
import { TapparelleElettriche } from "./steps/TapparelleElettriche";
import { DatiContatto } from "./steps/DatiContatto";
import { RiepilogoFinale } from "./steps/RiepilogoFinale";
import { RichiestaInviata } from "./steps/RichiestaInviata";
import { ConfiguratoreElettrico } from "./steps/ConfiguratoreElettrico";
import { TipoDomotica } from "./steps/TipoDomotica";
import { TipoProprietaSelector } from "./steps/stimafinale/TipoProprietaSelector";
import { EtaImpiantoElettrico } from "./steps/EtaImpiantoElettrico";

export type FormData = {
  // Informazioni generali
  superficie?: number;
  tipoAbitazione?: string;
  tipologiaAbitazione?: string;
  numeroStanze?: number;
  numeroBagni?: number;
  numeroSoggiorniCucine?: number;
  indirizzo?: string;
  citta?: string;
  cap?: string;
  regione?: string;
  piano?: string;
  
  // Composizione stanze
  composizione?: {
    cucina: number;
    cameraDoppia: number;
    cameraSingola: number;
    soggiorno: number;
    bagno: number;
    altro: number;
  };
  
  // Configurazione elettrico
  tipoRistrutturazione?: string;
  etaImpianto?: string;
  tipoImpianto?: string;
  tipoDomotica?: string;
  
  // KNX Features
  knxFeatures?: string[];
  knxConfig?: any;
  
  // Tapparelle
  tapparelleElettricheCount?: number;
  elettrificareTapparelle?: boolean;
  numeroTapparelle?: number;
  
  // Dati contatto
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  consensoPrivacy?: boolean;
  consensoMarketing?: boolean;
  accettoTermini?: boolean;
  
  // Stima finale
  tipoProprietario?: string;
  tipoProprietà?: string;
  dataRichiestaSopralluogo?: string;
  orarioSopralluogo?: string;
  note?: string;
  
  // Prezzi calcolati
  prezzoBase?: number;
  prezzoTotale?: number;
  risparmio?: number;
};

const steps = [
  "informazioniGenerali",
  "suddivisioneSpazi",
  "configuratoreElettrico",
  "etaImpiantoElettrico",
  "tipoImpiantoElettrico",
  "tipoDomotica",
  "tapparelleElettriche",
  "tipoProprietaSelector",
  "datiContatto",
  "riepilogoFinale",
  "richiestaInviata"
];

export const Configuratore = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    composizione: {
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      soggiorno: 0,
      bagno: 0,
      altro: 0
    }
  });

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
    setFormData({
      composizione: {
        cucina: 0,
        cameraDoppia: 0,
        cameraSingola: 0,
        soggiorno: 0,
        bagno: 0,
        altro: 0
      }
    });
    setCurrentStep(0);
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "informazioniGenerali":
        return <InformazioniGenerali formData={formData} updateFormData={updateFormData} onNext={nextStep} />;
      case "suddivisioneSpazi":
        return <SuddivisioneSpazi formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "configuratoreElettrico":
        return <ConfiguratoreElettrico formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "etaImpiantoElettrico":
        return <EtaImpiantoElettrico formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "tipoImpiantoElettrico":
        return <TipoImpiantoElettrico formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "tipoDomotica":
        return <TipoDomotica formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "tapparelleElettriche":
        return <TapparelleElettriche formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "tipoProprietaSelector":
        return <TipoProprietaSelector formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      case "datiContatto":
        return <DatiContatto formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} resetForm={resetForm} />;
      case "riepilogoFinale":
        return <RiepilogoFinale formData={formData} onBack={prevStep} />;
      case "richiestaInviata":
        return <RichiestaInviata formData={formData} />;
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
