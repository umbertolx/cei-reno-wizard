import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { UtilizzoAbitazioneSelector } from "../5-final/sub-components/UtilizzoAbitazioneSelector";
import { NumeroPersoneSelector } from "./sub-components/NumeroPersoneSelector";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const DestinazioneUso = ({ formData, updateFormData, onNext, onBack }: Props) => {
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
    return info.utilizzoAbitazione && info.numeroPersone >= 1;
  };

  return (
    <StepLayout
      badge="Impianti Civili"
      title="Come viene utilizzato l'immobile?"
      description="Indica la destinazione d'uso e il numero di occupanti"
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={!isFormValid()}
    >
      <div className="space-y-8">
        <UtilizzoAbitazioneSelector
          value={info.utilizzoAbitazione}
          onChange={(value) => updateFormData({
            informazioniGenerali: { ...info, utilizzoAbitazione: value }
          })}
        />

        <NumeroPersoneSelector
          value={info.numeroPersone}
          onChange={(value) => updateFormData({
            informazioniGenerali: { ...info, numeroPersone: value }
          })}
        />
      </div>
    </StepLayout>
  );
};
