import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { CheckCircle, Plus, ChevronDown, Check } from "lucide-react";
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
    { id: "sud", label: "Sud", description: "Efficienza massima ~100%" },
    { id: "sud-est", label: "Sud - Est", description: "Ottima efficienza ~95%" },
    { id: "sud-ovest", label: "Sud - Ovest", description: "Buona efficienza ~90%" },
    { id: "est", label: "Est", description: "Buona efficienza ~85%" },
    { id: "ovest", label: "Ovest", description: "Buona efficienza ~85%" },
    { id: "nord-est", label: "Nord - Est", description: "Efficienza ridotta ~70%" },
    { id: "nord-ovest", label: "Nord - Ovest", description: "Efficienza ridotta ~70%" },
    { id: "nord", label: "Nord", description: "Efficienza minima ~60%" },
    { id: "non-lo-so", label: "Non lo so", description: "Possiamo valutarlo insieme" }
  ];

  const zoneOmbraOptions = [
    { id: "nessuna", label: "Nessuna ombra" },
    { id: "leggera", label: "Qualche ombra leggera" },
    { id: "importante", label: "Ombre importanti" }
  ];

  const handleTipoFaldaChange = (value: string) => {
    // Reset orientamento quando cambia il tipo di falda
    let newOrientamento: string | string[] = "";
    if (value === 'piano') {
      newOrientamento = ""; // Tetto piano non ha orientamento
    } else if (value === 'multiple') {
      newOrientamento = []; // Falde multiple usano array
    }
    
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        tipoFalda: value,
        orientamentoTetto: newOrientamento
      } 
    });
  };

  const handleOrientamentoChange = (value: string) => {
    if (tipoFalda === 'multiple') {
      // Per falde multiple, gestiamo un array di orientamenti
      const currentOrientamenti = Array.isArray(formData.moduloFotovoltaico?.orientamentoTetto) 
        ? formData.moduloFotovoltaico.orientamentoTetto 
        : formData.moduloFotovoltaico?.orientamentoTetto ? [formData.moduloFotovoltaico.orientamentoTetto] : [];
      
      let newOrientamenti;
      if (currentOrientamenti.includes(value)) {
        // Se già selezionato, rimuovilo
        newOrientamenti = currentOrientamenti.filter(o => o !== value);
      } else {
        // Se non selezionato e abbiamo meno di 2 selezioni, aggiungilo
        if (currentOrientamenti.length < 2) {
          newOrientamenti = [...currentOrientamenti, value];
        } else {
          // Se abbiamo già 2 selezioni, sostituisci la prima con la nuova
          newOrientamenti = [currentOrientamenti[1], value];
        }
      }
      
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          orientamentoTetto: newOrientamenti 
        } 
      });
    } else {
      // Per falda singola, comportamento normale
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          orientamentoTetto: value 
        } 
      });
    }
  };

  const handleZoneOmbraChange = (value: string) => {
    updateFormData({ 
      moduloFotovoltaico: { 
        ...formData.moduloFotovoltaico, 
        zoneOmbra: value 
      } 
    });
  };

  const canProceed = tipoFalda && zoneOmbra && (
    tipoFalda === 'piano' || // Per tetto piano non serve orientamento
    (tipoFalda === 'singola' && orientamentoTetto) || // Per falda singola serve un orientamento
    (tipoFalda === 'multiple' && Array.isArray(orientamentoTetto) && orientamentoTetto.length >= 1) // Per falde multiple serve almeno un orientamento
  );

  const handleNext = () => {
    if (canProceed) {
      onNext();
    }
  };

  const renderOptionButton = (option: any, isSelected: boolean, onClick: () => void, isMultiple = false) => (
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
            {option.description && (
              <div className="text-xs text-gray-500 font-normal mt-1 hidden sm:block">
                {option.description}
              </div>
            )}
          </div>
        </div>
        {isSelected && (
          <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
        {isMultiple && !isSelected && (
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full ml-3"></div>
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

          {/* Box informativo - collassabile su mobile e desktop */}
          <div>
            <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5 flex-shrink-0" color="#d8010c" strokeWidth={3} />
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

          {/* Orientamento del tetto - Solo se non è tetto piano */}
          {tipoFalda !== 'piano' && (
            <div className="space-y-3 md:space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#1c1c1c] px-3 md:px-0">
                  Qual è l'orientamento del tetto?
                </h3>
                {tipoFalda === 'multiple' && (
                  <p className="text-xs text-gray-500 mt-1 px-3 md:px-0 italic">
                    Puoi selezionare fino a 2 orientamenti per le diverse falde
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {orientamentoOptions.map((option) => {
                  const currentOrientamenti = Array.isArray(orientamentoTetto) ? orientamentoTetto : (orientamentoTetto ? [orientamentoTetto] : []);
                  const isSelected = tipoFalda === 'multiple' 
                    ? currentOrientamenti.includes(option.id)
                    : orientamentoTetto === option.id;
                  
                  return renderOptionButton(
                    option,
                    isSelected,
                    () => handleOrientamentoChange(option.id),
                    tipoFalda === 'multiple'
                  );
                })}
              </div>
            </div>
          )}

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