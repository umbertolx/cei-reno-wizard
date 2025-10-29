import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { SuddivisioneSpazi } from "./sub-components/SuddivisioneSpazi";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ComposizioneSpazi = ({ formData, updateFormData, onNext, onBack }: Props) => {
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

  const totalRooms = Object.values(info.composizione).reduce((sum, count) => sum + count, 0);

  const isFormValid = () => {
    const { cucina, cameraDoppia, cameraSingola, soggiorno, bagno } = info.composizione;
    return cucina + cameraDoppia + cameraSingola + soggiorno + bagno > 0;
  };

  const handleChangeComposizione = (tipo: keyof typeof info.composizione, value: number) => {
    updateFormData({
      informazioniGenerali: {
        ...info,
        composizione: {
          ...info.composizione,
          [tipo]: value
        }
      }
    });
  };

  return (
    <StepLayout
      badge="Impianti Civili"
      title="Come è suddiviso l'immobile?"
      description="Indica la composizione degli spazi dell'abitazione"
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={!isFormValid()}
    >
      <SuddivisioneSpazi
        composizione={info.composizione}
        onChangeStanza={handleChangeComposizione}
        totalRooms={totalRooms}
      />
    </StepLayout>
  );
};
