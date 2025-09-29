import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { Slider } from "@/components/ui/slider";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const PotenzaAmpliamento = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.potenzaAmpliamento || 3;

  const handleValueChange = (value: number) => {
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        potenzaAmpliamento: value
      }
    });
  };

  return (
    <StepLayout
      badge="Impianto fotovoltaico"
      title="Potenza dell'ampliamento"
      description="Indica la potenza desiderata per l'ampliamento del tuo impianto fotovoltaico"
      onNext={onNext}
      onBack={onBack}
      nextButtonText="Avanti"
      backButtonText="Indietro"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-lg md:text-xl font-bold text-[#d8010c]">{currentValue} kW</span>
        </div>
        
        <div className="space-y-4">
          <Slider
            id="potenza-ampliamento"
            min={1}
            max={20}
            step={0.5}
            defaultValue={[currentValue]}
            value={[currentValue]}
            onValueChange={(values) => handleValueChange(values[0])}
            className="py-2"
          />
          
          <div className="flex justify-between text-sm text-gray-500">
            <span>1 kW</span>
            <span>20 kW</span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Suggerimento:</strong> La potenza dell'ampliamento dipende dalle tue esigenze energetiche aggiuntive e dallo spazio disponibile sul tetto.
          </p>
        </div>
      </div>
    </StepLayout>
  );
};