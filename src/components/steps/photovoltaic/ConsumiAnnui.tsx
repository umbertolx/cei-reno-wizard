import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConsumiAnnui = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const conosceConsumi = formData.moduloFotovoltaico?.conosceConsumi || "";
  const consumiKWh = formData.moduloFotovoltaico?.consumiKWh || null;
  const spesaMensile = formData.moduloFotovoltaico?.spesaMensile || null;

  const options = [
    { id: "si", label: "Sì" },
    { id: "no", label: "No" }
  ];

  const handleSelectionChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        conosceConsumi: value,
        // Reset values when changing knowledge
        consumiKWh: undefined,
        spesaMensile: undefined
      } 
    });
  };

  const handleKWhChange = (value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        consumiKWh: numValue,
        // Clear the other field when this one is filled
        spesaMensile: numValue ? undefined : formData.moduloFotovoltaico?.spesaMensile
      } 
    });
  };

  const handleSpesaChange = (value: string) => {
    const numValue = value ? parseFloat(value) : undefined;
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        spesaMensile: numValue,
        // Clear the other field when this one is filled
        consumiKWh: numValue ? undefined : formData.moduloFotovoltaico?.consumiKWh
      } 
    });
  };

  const infoBox = {
    title: "Perché ti chiediamo questi dati?",
    content: "Inserire i tuoi consumi reali ci permette di fare una stima molto più precisa dell'impianto. Se non li conosci, nessun problema: possiamo calcolarli noi in base alle caratteristiche della casa, alle tue abitudini e agli elettrodomestici principali che utilizzi."
  };

  const conditionalContent = conosceConsumi === "si" ? (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#1c1c1c]">
        Inserisci i tuoi consumi annui
      </h3>
      
      <div className="space-y-4">
        {/* Input kWh */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#1c1c1c]">
            kWh annui (da bolletta, es. 3.000 kWh/anno)
          </label>
          <input
            type="number"
            placeholder="Inserisci i kWh annui"
            value={consumiKWh || ""}
            onChange={(e) => handleKWhChange(e.target.value)}
            disabled={!!spesaMensile}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8010c] focus:border-transparent ${spesaMensile ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>

        {/* Separatore OR */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-500 font-medium">OPPURE</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Input spesa mensile */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#1c1c1c]">
            Spesa media mensile in € (ci pensiamo noi a convertirla in kWh)
          </label>
          <input
            type="number"
            placeholder="Inserisci la spesa mensile"
            value={spesaMensile || ""}
            onChange={(e) => handleSpesaChange(e.target.value)}
            disabled={!!consumiKWh}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8010c] focus:border-transparent ${consumiKWh ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <QuestionStepLayout
      badge="Impianto fotovoltaico"
      icon="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
      iconAlt="House icon"
      title="Conosci i tuoi consumi annui di energia elettrica?"
      infoBox={infoBox}
      options={options}
      selectedValue={conosceConsumi}
      onSelectionChange={handleSelectionChange}
      conditionalContent={conditionalContent}
      onNext={onNext}
      onBack={onBack}
    />
  );
};