import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const BatteriaAccumulo = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.batteriaAccumulo || "";

  const options = [
    { id: "si", label: "Sì, voglio aggiungere una batteria" },
    { id: "no", label: "No, non mi interessa" }
  ];

  const infoBox = {
    title: "Cos'è una batteria di accumulo?",
    content: "Una batteria di accumulo permette di immagazzinare l'energia elettrica prodotta dall'impianto fotovoltaico durante le ore di sole per utilizzarla successivamente quando serve, ad esempio la sera o di notte. Questo aumenta l'autoconsumo e l'indipendenza energetica della tua abitazione."
  };

  const handleSelectionChange = (value: string) => {
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        batteriaAccumulo: value
      }
    });
  };

  // Check if battery is recommended based on evening consumption and energy independence goal
  const consumoEnergetico = formData.moduloFotovoltaico?.consumoEnergetico || [50, 50];
  const eveningConsumption = consumoEnergetico[1];
  const obiettivoPrincipale = formData.moduloFotovoltaico?.obiettivoPrincipale;
  const showBatteryRecommendation = eveningConsumption > 50 && obiettivoPrincipale === "indipendenza";

  const conditionalContent = showBatteryRecommendation ? (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:relative md:bottom-auto md:left-auto md:right-auto md:mt-6">
      <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
        <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          <strong>Consiglio:</strong> Considerando che i tuoi consumi sono per più del 50% serali e il tuo obiettivo è raggiungere l'indipendenza energetica, ti consigliamo di installare una batteria di accumulo per massimizzare l'autoconsumo.
        </AlertDescription>
      </Alert>
    </div>
  ) : undefined;

  return (
    <QuestionStepLayout
      badge="Impianto fotovoltaico"
      title="Vuoi aggiungere una batteria di accumulo?"
      description="Immagazzina l'energia prodotta durante il giorno e usala la sera"
      infoBox={infoBox}
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelectionChange}
      onNext={onNext}
      onBack={onBack}
      nextButtonText="Avanti"
      backButtonText="Indietro"
      conditionalContent={conditionalContent}
    />
  );
};