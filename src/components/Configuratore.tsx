import { createContext, useState, useContext, ReactNode } from "react";

export type FormData = {
  // Informazioni generali
  tipologiaAbitazione: string;
  superficie: number;
  indirizzo: string;
  citta: string;
  cap: string;
  regione: string;
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
