
import { createContext, useState, useContext, ReactNode } from "react";

export type FormData = {
  // Informazioni generali
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
    soggiorno: number;
    bagno: number;
  };

  // Configurazione elettrica
  tipoRistrutturazione: string;
  tipoImpianto: string;
  tipoDomotico: string;

  // Tapparelle
  elettrificareTapparelle: string;
  numeroTapparelle: number;

  // Contatti
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  tipoProprietario: string;
  periodo: string;
  budget: string;
  altroProprietario: string;
  accettoTermini: boolean;

  // Stima finale
  dataRichiestaSopralluogo: string;
  orarioSopralluogo: string;
  note: string;
};

type FormContextType = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm deve essere utilizzato all'interno di un FormProvider");
  }
  return context;
};

type FormProviderProps = {
  children: ReactNode;
};

export const FormProvider = ({ children }: FormProviderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    tipologiaAbitazione: "",
    superficie: 20,
    indirizzo: "",
    citta: "",
    cap: "",
    regione: "",
    piano: "",
    composizione: {
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      soggiorno: 0,
      bagno: 0,
    },
    tipoRistrutturazione: "",
    tipoImpianto: "",
    tipoDomotico: "",
    elettrificareTapparelle: "",
    numeroTapparelle: 1,
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    tipoProprietario: "",
    periodo: "",
    budget: "",
    altroProprietario: "",
    accettoTermini: false,
    dataRichiestaSopralluogo: "",
    orarioSopralluogo: "",
    note: "",
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      tipologiaAbitazione: "",
      superficie: 20,
      indirizzo: "",
      citta: "",
      cap: "",
      regione: "",
      piano: "",
      composizione: {
        cucina: 0,
        cameraDoppia: 0,
        cameraSingola: 0,
        soggiorno: 0,
        bagno: 0,
      },
      tipoRistrutturazione: "",
      tipoImpianto: "",
      tipoDomotico: "",
      elettrificareTapparelle: "",
      numeroTapparelle: 1,
      nome: "",
      cognome: "",
      email: "",
      telefono: "",
      tipoProprietario: "",
      periodo: "",
      budget: "",
      altroProprietario: "",
      accettoTermini: false,
      dataRichiestaSopralluogo: "",
      orarioSopralluogo: "",
      note: "",
    });
  };

  const value = {
    formData,
    updateFormData,
    currentStep,
    nextStep,
    prevStep,
    resetForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Add the missing Configuratore component export
import { WelcomePage } from "./steps/WelcomePage";
import { InformazioniGenerali } from "./steps/InformazioniGenerali";
import { ConfiguratoreElettrico } from "./steps/ConfiguratoreElettrico";
import { TipoImpiantoElettrico } from "./steps/TipoImpiantoElettrico";
import { TipoDomotico } from "./steps/TipoDomotico";
import { TapparelleElettriche } from "./steps/TapparelleElettriche";
import { DatiContatto } from "./steps/DatiContatto";
import { StimaFinale } from "./steps/StimaFinale";
import { RichiestaInviata } from "./steps/RichiestaInviata";

export const Configuratore = () => {
  return (
    <FormProvider>
      <ConfiguratoreContent />
    </FormProvider>
  );
};

const ConfiguratoreContent = () => {
  const { formData, updateFormData, currentStep, nextStep, prevStep, resetForm } = useForm();

  const calculateStima = () => {
    let basePrice = formData.superficie * 800;
    
    if (formData.tipoImpianto === 'livello2') {
      basePrice *= 1.2;
    } else if (formData.tipoImpianto === 'livello3') {
      basePrice *= 1.5;
    }

    if (formData.elettrificareTapparelle === 'si') {
      basePrice += formData.numeroTapparelle * 300;
    }

    return {
      min: Math.round(basePrice * 0.8),
      max: Math.round(basePrice * 1.2)
    };
  };

  const stima = calculateStima();

  const getStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <WelcomePage onNext={nextStep} />;
      case 1:
        return (
          <InformazioniGenerali
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <ConfiguratoreElettrico
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <TipoImpiantoElettrico
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        if (formData.tipoImpianto === 'livello3') {
          return (
            <TipoDomotico
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          );
        } else {
          return (
            <TapparelleElettriche
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          );
        }
      case 5:
        if (formData.tipoImpianto === 'livello3') {
          return (
            <TapparelleElettriche
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          );
        } else {
          return (
            <DatiContatto
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          );
        }
      case 6:
        if (formData.tipoImpianto === 'livello3') {
          return (
            <DatiContatto
              formData={formData}
              updateFormData={updateFormData}
              onNext={nextStep}
              onBack={prevStep}
            />
          );
        } else {
          return (
            <StimaFinale
              formData={formData}
              updateFormData={updateFormData}
              stima={stima}
              onBack={prevStep}
              onSubmit={nextStep}
            />
          );
        }
      case 7:
        if (formData.tipoImpianto === 'livello3') {
          return (
            <StimaFinale
              formData={formData}
              updateFormData={updateFormData}
              stima={stima}
              onBack={prevStep}
              onSubmit={nextStep}
            />
          );
        } else {
          return <RichiestaInviata formData={formData} onRestart={resetForm} />;
        }
      case 8:
        return <RichiestaInviata formData={formData} onRestart={resetForm} />;
      default:
        return <WelcomePage onNext={nextStep} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {getStepComponent()}
    </div>
  );
};
