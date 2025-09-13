import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { Sun, Moon } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConsumptionGoals = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const obiettivoPrincipale = formData.moduloFotovoltaico?.obiettivoPrincipale || "";
  const consumoEnergetico = formData.moduloFotovoltaico?.consumoEnergetico || [50];

  const obiettivoOptions = [
    { id: "risparmio-bolletta", label: "Risparmio in bolletta" },
    { id: "indipendenza-energetica", label: "Indipendenza energetica" }
  ];

  const handleObiettivoChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        obiettivoPrincipale: value 
      } 
    });
  };

  const handleConsumoChange = (value: number[]) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        consumoEnergetico: value 
      } 
    });
  };

  const canProceed = obiettivoPrincipale;

  const handleSelectionChange = (value: string) => {
    handleObiettivoChange(value);
  };

  const infoBox = {
    title: "Perché questa informazione è importante",
    content: "Conoscere il tuo obiettivo principale ci permette di dimensionare l'impianto in modo ottimale. Se punti al risparmio, ottimizzeremo per ridurre la bolletta. Se vuoi l'indipendenza energetica, progetteremo un impianto più grande per massimizzare l'autoconsumo."
  };

  const conditionalContent = obiettivoPrincipale ? (
    <div className="space-y-4 md:space-y-6 px-3 md:px-0">
      <div>
        <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2">
          Quando consumi di più l'energia elettrica?
        </h3>
        <p className="text-xs text-gray-500 italic">
          Sposta il cursore per indicare se i tuoi consumi sono più concentrati durante il giorno o la sera
        </p>
      </div>
      
      <div className="space-y-6 bg-gradient-to-br from-white to-gray-50/30 border border-gray-200/60 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-3 py-2 bg-yellow-50 rounded-full border border-yellow-200/60">
            <Sun className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">Giorno</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-full border border-slate-200/60">
            <span className="text-sm font-semibold text-slate-800">Sera</span>
            <Moon className="h-5 w-5 text-slate-600" />
          </div>
        </div>
        
        <Slider
          value={consumoEnergetico}
          onValueChange={handleConsumoChange}
          max={100}
          min={0}
          step={10}
          className="w-full"
        />
        
        <div className="text-center text-sm text-gray-600">
          <span className="font-medium">
            {consumoEnergetico[0]}% giorno - {100 - consumoEnergetico[0]}% sera
          </span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <QuestionStepLayout
      badge="Impianto fotovoltaico"
      title="Obiettivi consumi"
      description="Qual è il tuo obiettivo principale?"
      infoBox={infoBox}
      options={obiettivoOptions}
      selectedValue={obiettivoPrincipale}
      onSelectionChange={handleSelectionChange}
      conditionalContent={conditionalContent}
      onNext={onNext}
      onBack={onBack}
    />
  );
};