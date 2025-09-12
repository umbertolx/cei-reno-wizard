import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { Check, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const DettagliImpiantoEsistente = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [infoBoxOpen1, setInfoBoxOpen1] = useState(false);
  const [infoBoxOpen2, setInfoBoxOpen2] = useState(false);
  const [infoBoxOpen3, setInfoBoxOpen3] = useState(false);
  
  const potenzaImpianto = formData.moduloFotovoltaico?.potenzaImpianto || "";
  const annoInstallazione = formData.moduloFotovoltaico?.annoInstallazione || "";
  const hasBatteria = formData.moduloFotovoltaico?.hasBatteria || "";

  const annoOptions = [
    { id: "prima-2015", label: "Prima del 2015" },
    { id: "2015-2020", label: "Tra il 2015 e il 2020" },
    { id: "dopo-2020", label: "Dopo il 2020" }
  ];

  const batteriaOptions = [
    { id: "si", label: "Sì" },
    { id: "no", label: "No" }
  ];

  const handlePotenzaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        potenzaImpianto: value 
      } 
    });
  };

  const handleAnnoChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        annoInstallazione: value 
      } 
    });
  };

  const handleBatteriaChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        hasBatteria: value 
      } 
    });
  };

  const canProceed = potenzaImpianto && annoInstallazione && hasBatteria;

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

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Ampliamento fotovoltaico
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
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Dettagli impianto</h2>
            </div>
          </div>

          {/* Potenza impianto */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Qual è la potenza dell'impianto?
            </h3>
            <div className="px-3 md:px-0">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#1c1c1c]">
                  Inserisci la potenza in kWp (per esempio 3 kWp...)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="3.0"
                  value={potenzaImpianto}
                  onChange={handlePotenzaChange}
                  className="text-lg font-medium"
                />
              </div>
            </div>
            {/* Info box specifico per potenza */}
            <Collapsible open={infoBoxOpen1} onOpenChange={setInfoBoxOpen1}>
              <CollapsibleTrigger className="w-full mx-3 md:mx-0">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-black flex-shrink-0 fill-black" />
                      <span className="text-sm font-medium text-yellow-800 text-left">
                        Perché è importante?
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform duration-200 ${infoBoxOpen1 ? 'rotate-180' : ''}`} />
                  </div>
                  {infoBoxOpen1 && (
                    <div className="mt-2 pt-2 border-t border-yellow-200">
                      <p className="text-sm text-yellow-800 text-left">
                        Conoscere la potenza attuale ci permette di calcolare l'ampliamento ottimale e verificare la compatibilità con l'inverter esistente.
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleTrigger>
            </Collapsible>
          </div>

          {/* Anno installazione */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Quando è stato installato l'impianto?
            </h3>
            {annoOptions.map((option) =>
              renderOptionButton(
                option,
                annoInstallazione === option.id,
                () => handleAnnoChange(option.id)
              )
            )}
            {/* Info box specifico per anno */}
            <Collapsible open={infoBoxOpen2} onOpenChange={setInfoBoxOpen2}>
              <CollapsibleTrigger className="w-full mx-3 md:mx-0">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-black flex-shrink-0 fill-black" />
                      <span className="text-sm font-medium text-yellow-800 text-left">
                        Perché è importante?
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform duration-200 ${infoBoxOpen2 ? 'rotate-180' : ''}`} />
                  </div>
                  {infoBoxOpen2 && (
                    <div className="mt-2 pt-2 border-t border-yellow-200">
                      <p className="text-sm text-yellow-800 text-left">
                        L'età dell'impianto influenza la tecnologia disponibile e gli incentivi applicabili per l'ampliamento.
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleTrigger>
            </Collapsible>
          </div>

          {/* Batteria accumulo */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              L'impianto ha una batteria ad accumulo?
            </h3>
            {batteriaOptions.map((option) =>
              renderOptionButton(
                option,
                hasBatteria === option.id,
                () => handleBatteriaChange(option.id)
              )
            )}
            {/* Info box specifico per batteria */}
            <Collapsible open={infoBoxOpen3} onOpenChange={setInfoBoxOpen3}>
              <CollapsibleTrigger className="w-full mx-3 md:mx-0">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Plus className="h-4 w-4 text-black flex-shrink-0 fill-black" />
                      <span className="text-sm font-medium text-yellow-800 text-left">
                        Perché è importante?
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform duration-200 ${infoBoxOpen3 ? 'rotate-180' : ''}`} />
                  </div>
                  {infoBoxOpen3 && (
                    <div className="mt-2 pt-2 border-t border-yellow-200">
                      <p className="text-sm text-yellow-800 text-left">
                        Se hai già una batteria, possiamo ottimizzare l'ampliamento per massimizzare l'autoconsumo. Senza batteria, potremmo consigliarti di aggiungerne una.
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleTrigger>
            </Collapsible>
          </div>
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