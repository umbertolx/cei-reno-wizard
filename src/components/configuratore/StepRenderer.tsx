
import { FormData } from "@/types/FormData";
import { WelcomePage } from "../steps/WelcomePage";
import { InformazioniGenerali } from "../steps/InformazioniGenerali";
import { ConfiguratoreElettrico } from "../steps/ConfiguratoreElettrico";
import { EtaImpiantoElettrico } from "../steps/EtaImpiantoElettrico";
import { InterventiElettrici } from "../steps/InterventiElettrici";
import { TipoImpiantoElettrico } from "../steps/TipoImpiantoElettrico";
import { TipoDomotica } from "../steps/TipoDomotica";
import { ConfigurazioneKNX } from "../steps/ConfigurazioneKNX";
import { TapparelleElettriche } from "../steps/TapparelleElettriche";
import { RichiestaInviata } from "../steps/RichiestaInviata";
import { DatiContatto } from "../steps/DatiContatto";
import { StimaFinale } from "../steps/StimaFinale";
import { useStepManager } from "@/hooks/useStepManager";

type Props = {
  step: number;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
  onSubmit: () => void;
  calcolaStima: () => { min: number; max: number };
};

export const StepRenderer = ({ 
  step, 
  formData, 
  updateFormData, 
  onNext, 
  onBack, 
  onReset, 
  onSubmit, 
  calcolaStima 
}: Props) => {
  const { getStepComponent } = useStepManager(step, formData);

  if (step === 0) {
    return <WelcomePage onStart={onNext} />;
  }

  if (step === 1) {
    return (
      <InformazioniGenerali 
        formData={formData} 
        updateFormData={updateFormData} 
        onNext={onNext} 
      />
    );
  }

  if (step === 2) {
    return (
      <ConfiguratoreElettrico 
        formData={formData} 
        updateFormData={updateFormData} 
        onNext={onNext} 
        onBack={onBack}
      />
    );
  }

  const stepComponent = getStepComponent();

  switch (stepComponent) {
    case 'EtaImpiantoElettrico':
      return (
        <EtaImpiantoElettrico 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={onNext} 
          onBack={onBack}
        />
      );
    case 'InterventiElettrici':
      return (
        <InterventiElettrici 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={onNext} 
          onBack={onBack}
        />
      );
    case 'TipoImpiantoElettrico':
      return (
        <TipoImpiantoElettrico 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={onNext} 
          onBack={onBack}
        />
      );
    case 'TipoDomotica':
      return (
        <TipoDomotica
          formData={formData}
          updateFormData={updateFormData}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 'ConfigurazioneKNX':
      return (
        <ConfigurazioneKNX
          formData={formData}
          updateFormData={updateFormData}
          onNext={onNext}
          onBack={onBack}
        />
      );
    case 'TapparelleElettriche':
      return (
        <TapparelleElettriche 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={onNext} 
          onBack={onBack}
        />
      );
    case 'DatiContatto':
      return (
        <DatiContatto
          formData={formData}
          updateFormData={updateFormData}
          onBack={onBack}
          onNext={onNext}
        />
      );
    case 'StimaFinale':
      const stima = calcolaStima();
      return (
        <StimaFinale
          formData={formData}
          updateFormData={updateFormData}
          stima={stima}
          onBack={onBack}
          onSubmit={onSubmit}
        />
      );
    case 'RichiestaInviata':
      return <RichiestaInviata onReset={onReset} />;
    default:
      return <div>Step non valido</div>;
  }
};
