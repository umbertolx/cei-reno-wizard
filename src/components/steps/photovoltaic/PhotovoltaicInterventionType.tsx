import { FormData } from "../../Configuratore";
import { QuestionWithOptions } from "../../shared/QuestionWithOptions";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const PhotovoltaicInterventionType = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.tipoInterventoFotovoltaico || "";

  const options = [
    { id: "nuovo", label: "Nuovo impianto fotovoltaico" },
    { id: "ampliamento", label: "Ampliamento impianto esistente" }
  ];

  const infoBox = {
    title: "Informazioni sull'impianto fotovoltaico",
    content: "Un impianto fotovoltaico trasforma l'energia solare in elettricità per la tua casa. Un nuovo impianto include pannelli, inverter e sistema di monitoraggio. L'ampliamento aggiunge potenza al tuo impianto esistente per aumentare la produzione energetica."
  };

  const handleSelectionChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        tipoInterventoFotovoltaico: value 
      } 
    });
  };

  return (
    <QuestionWithOptions
      badge="Impianto fotovoltaico"
      icon="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
      iconAlt="House icon"
      title="Si tratta di un nuovo impianto o di un ampliamento?"
      description="Scegli se installare un nuovo impianto fotovoltaico o ampliare quello esistente"
      infoBox={infoBox}
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelectionChange}
      onNext={onNext}
      onBack={onBack}
      nextButtonText="Avanti"
      backButtonText="Indietro"
    />
  );
};