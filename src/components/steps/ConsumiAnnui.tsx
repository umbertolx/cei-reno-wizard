import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { Check, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConsumiAnnui = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  
  const conosceConsumi = formData.moduloFotovoltaico?.conosceConsumi || "";
  const consumiKWh = formData.moduloFotovoltaico?.consumiKWh || null;
  const spesaMensile = formData.moduloFotovoltaico?.spesaMensile || null;

  const opzioniConoscenza = [
    { id: "si", label: "Sì" },
    { id: "no", label: "No" }
  ];

  const handleConoscenzaChange = (value: string) => {
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

  const canProceed = conosceConsumi === "no" || 
    (conosceConsumi === "si" && (consumiKWh || spesaMensile));

  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  const renderOptionButton = (option: any, isSelected: boolean, onClick: () => void) => (
    <div
      key={option.id}
      onClick={onClick}
      className={`
        rounded-xl transition-all duration-300 border cursor-pointer p-4 mx-3 md:mx-0
        ${isSelected 
          ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
          : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base text-[#1c1c1c]">
            {option.label}
          </div>
        </div>
        {isSelected && (
          <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );

  const infoBox = {
    title: "Perché ti chiediamo questi dati?",
    content: "Inserire i tuoi consumi reali ci permette di fare una stima molto più precisa dell'impianto. Se non li conosci, nessun problema: possiamo calcolarli noi in base alle caratteristiche della casa, alle tue abitudini e agli elettrodomestici principali che utilizzi."
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto fotovoltaico
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          {/* Header - Layout responsive */}
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
                alt="House icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Consumi energetici</h2>
            </div>
          </div>

          {/* Box informativo - collassabile su mobile e desktop */}
          <div>
            <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-black flex-shrink-0 fill-black" />
                      <span className="text-sm font-medium text-yellow-800 text-left">
                        {infoBox.title}
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform duration-200 ${infoBoxOpen ? 'rotate-180' : ''}`} />
                  </div>
                  {infoBoxOpen && (
                    <div className="mt-3 pt-3 border-t border-yellow-200">
                      <p className="text-sm text-yellow-800 text-left">
                        {infoBox.content}
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
          
          {/* Domanda principale */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Conosci i tuoi consumi annui di energia elettrica?
            </h3>
            {opzioniConoscenza.map((option) =>
              renderOptionButton(
                option,
                conosceConsumi === option.id,
                () => handleConoscenzaChange(option.id)
              )
            )}
          </div>

          {/* Sezione input dati - mostrata solo se risponde "sì" */}
          {conosceConsumi === "si" && (
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
                Inserisci i tuoi consumi annui
              </h3>
              
              <div className="space-y-4 px-3 md:px-0">
                {/* Input kWh */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#1c1c1c]">
                    kWh annui (da bolletta, es. 3.000 kWh/anno)
                  </label>
                  <Input
                    type="number"
                    placeholder="Inserisci i kWh annui"
                    value={consumiKWh || ""}
                    onChange={(e) => handleKWhChange(e.target.value)}
                    disabled={!!spesaMensile}
                    className={spesaMensile ? "opacity-50 cursor-not-allowed" : ""}
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
                  <Input
                    type="number"
                    placeholder="Inserisci la spesa mensile"
                    value={spesaMensile || ""}
                    onChange={(e) => handleSpesaChange(e.target.value)}
                    disabled={!!consumiKWh}
                    className={consumiKWh ? "opacity-50 cursor-not-allowed" : ""}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <StickyNavigationBar
        onBack={onBack}
        onNext={handleNext}
        isNextDisabled={!canProceed}
        nextButtonText="Avanti"
        backButtonText="Indietro"
      />
    </div>
  );
};