import { useEffect } from "react";
import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { TipoAbitazione } from "./sub-components/TipoAbitazione";
import { SuperficieSlider } from "./sub-components/SuperficieSlider";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TipologiaESuperficie = ({ formData, updateFormData, onNext, onBack }: Props) => {
  useEffect(() => {
    if (!formData.informazioniGenerali?.tipologiaAbitazione) {
      updateFormData({
        informazioniGenerali: {
          tipologiaAbitazione: "appartamento",
          superficie: 85,
          indirizzo: "",
          citta: "",
          cap: "",
          regione: "",
          piano: "",
          utilizzoAbitazione: "prima casa",
          numeroPersone: 2,
          composizione: {
            cucina: 1,
            cameraDoppia: 0,
            cameraSingola: 0,
            soggiorno: 0,
            bagno: 1,
            altro: 0
          }
        }
      });
    }
  }, [formData.informazioniGenerali, updateFormData]);

  const info = formData.informazioniGenerali || {
    tipologiaAbitazione: "appartamento",
    superficie: 85,
    indirizzo: "",
    citta: "",
    cap: "",
    regione: "",
    piano: "",
    utilizzoAbitazione: "prima casa",
    numeroPersone: 2,
    composizione: {
      cucina: 1,
      cameraDoppia: 0,
      cameraSingola: 0,
      bagno: 1,
      soggiorno: 0,
      altro: 0
    }
  };

  const isFormValid = () => {
    return info.tipologiaAbitazione && info.superficie > 0;
  };

  return (
    <StepLayout
      badge="Impianti Civili"
      title="Che tipo di immobile è?"
      description="Inizia la configurazione selezionando la tipologia e la superficie dell'immobile"
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={!isFormValid()}
    >
      <div className="space-y-8">
        <TipoAbitazione
          value={info.tipologiaAbitazione}
          onChange={(type) => updateFormData({
            informazioniGenerali: { ...info, tipologiaAbitazione: type }
          })}
        />

        <SuperficieSlider
          value={info.superficie}
          onChange={(value) => updateFormData({
            informazioniGenerali: { ...info, superficie: value }
          })}
        />
      </div>
    </StepLayout>
  );
};
