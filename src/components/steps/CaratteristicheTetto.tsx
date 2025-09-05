import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { CheckCircle, Info, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const CaratteristicheTetto = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  
  const tipoFalda = formData.moduloFotovoltaico?.tipoFalda || "";
  const orientamentoTetto = formData.moduloFotovoltaico?.orientamentoTetto || "";
  const zoneOmbra = formData.moduloFotovoltaico?.zoneOmbra || "";

  const tipoFaldaOptions = [
    { id: "piano", label: "Tetto piano" },
    { id: "singola", label: "Tetto a falda singola" },
    { id: "multiple", label: "Tetto a falde multiple" }
  ];

  const orientamentoOptions = [
    { id: "sud", label: "Sud", description: "Efficienza maggiore" },
    { id: "sud-est", label: "Sud-Est" },
    { id: "sud-ovest", label: "Sud-Ovest" },
    { id: "est", label: "Est" },
    { id: "ovest", label: "Ovest" },
    { id: "est-ovest", label: "Est-Ovest", description: "Tipico dei tetti a falda multipla" },
    { id: "non-so", label: "Non lo so" }
  ];

  const zoneOmbraOptions = [
    { id: "nessuna", label: "Nessuna ombra" },
    { id: "leggera", label: "Qualche ombra leggera" },
    { id: "importante", label: "Ombre importanti" }
  ];

  const handleTipoFaldaChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        tipoFalda: value 
      } 
    });
  };

  const handleOrientamentoChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        orientamentoTetto: value 
      } 
    });
  };

  const handleZoneOmbraChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        zoneOmbra: value 
      } 
    });
  };

  const canProceed = tipoFalda && orientamentoTetto && zoneOmbra;

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
        rounded-xl transition-all duration-300 border cursor-pointer p-4
        ${isSelected 
          ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
          : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base text-[#1c1c1c] flex items-center gap-2">
            {option.label}
            {option.description && (
              <span className="text-xs text-gray-500 font-normal">
                ({option.description})
              </span>
            )}
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
    title: "Informazioni sulle caratteristiche del tetto",
    content: "Queste informazioni ci permettono di calcolare la produzione energetica ottimale del tuo impianto fotovoltaico. Il tipo di falda, l'orientamento e le zone d'ombra influenzano direttamente l'efficienza dei pannelli solari."
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
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Caratteristiche del tuo tetto</h2>
            </div>
          </div>

          {/* Box informativo - collassabile su mobile, sempre aperto su desktop */}
          <div>
            {/* Versione mobile - collassabile */}
            <div className="block md:hidden">
              <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Info className="h-5 w-5 text-yellow-600 flex-shrink-0" />
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

            {/* Versione desktop - sempre aperto */}
            <div className="hidden md:block">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">{infoBox.title}</p>
                    <p>{infoBox.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tipo di falda */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Che tipo di tetto hai?
            </h3>
            {tipoFaldaOptions.map((option) =>
              renderOptionButton(
                option,
                tipoFalda === option.id,
                () => handleTipoFaldaChange(option.id)
              )
            )}
          </div>

          {/* Orientamento del tetto */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
              Qual è l'orientamento del tetto?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {orientamentoOptions.map((option) =>
                renderOptionButton(
                  option,
                  orientamentoTetto === option.id,
                  () => handleOrientamentoChange(option.id)
                )
              )}
            </div>
          </div>

          {/* Zone in ombra */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
                Il tetto ha zone in ombra durante il giorno?
              </h3>
              <p className="text-xs text-gray-500 mt-1 px-3 md:px-0 italic">
                Considera alberi, palazzi, camini o altre strutture
              </p>
            </div>
            {zoneOmbraOptions.map((option) =>
              renderOptionButton(
                option,
                zoneOmbra === option.id,
                () => handleZoneOmbraChange(option.id)
              )
            )}
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