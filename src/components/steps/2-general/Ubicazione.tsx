import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { IndirizzoField } from "./sub-components/IndirizzoField";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Ubicazione = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const info = formData.informazioniGenerali || {
    tipologiaAbitazione: "",
    superficie: 0,
    indirizzo: "",
    citta: "",
    cap: "",
    regione: "",
    piano: "",
    utilizzoAbitazione: "prima casa",
    numeroPersone: 2,
    composizione: {
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      bagno: 0,
      soggiorno: 0,
      altro: 0
    }
  };

  const isFormValid = () => {
    return info.indirizzo && info.indirizzo.trim().length > 0;
  };

  const selectLocation = (location: string) => {
    const [indirizzo, citta, cap, regione] = location.split(", ");
    updateFormData({
      informazioniGenerali: {
        ...info,
        indirizzo: location,
        citta,
        cap,
        regione
      }
    });
  };

  return (
    <StepLayout
      badge="Impianti Civili"
      title="Dove si trova l'immobile?"
      description="Inserisci l'indirizzo completo dell'immobile"
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={!isFormValid()}
    >
      <IndirizzoField
        value={info.indirizzo}
        onChange={(value) => updateFormData({
          informazioniGenerali: { ...info, indirizzo: value }
        })}
        onSelectLocation={selectLocation}
      />
    </StepLayout>
  );
};
