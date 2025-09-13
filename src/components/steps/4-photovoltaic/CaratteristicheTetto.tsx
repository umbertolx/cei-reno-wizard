import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";
import { CheckCircle, Plus, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const CaratteristicheTetto = ({ formData, updateFormData, onNext, onBack }: Props) => {
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

  const renderOptionButton = (option: any, isSelected: boolean, onClick: () => void, isMultiple = false) => (
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
    <StepLayout
      badge="Impianto fotovoltaico"
      title="Caratteristiche del tuo tetto"
      icon="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
      iconAlt="House icon"
      onNext={canProceed ? onNext : undefined}
      onBack={onBack}
      isNextDisabled={!canProceed}
    >
      {/* Box informativo */}
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">{infoBox.title}</h4>
          <p className="text-sm text-blue-700">{infoBox.content}</p>
        </div>
      </div>

      {/* Tipo di falda */}
      <div className="space-y-3 md:space-y-4 mb-8">
        <h3 className="text-lg font-semibold text-[#1c1c1c]">
          Che tipo di tetto hai?
        </h3>
        <div className="space-y-3">
          {tipoFaldaOptions.map((option) =>
            renderOptionButton(
              option,
              tipoFalda === option.id,
              () => handleTipoFaldaChange(option.id)
            )
          )}
        </div>
      </div>

      {/* Orientamento del tetto - Solo se non è tetto piano */}
      {tipoFalda !== 'piano' && (
        <div className="space-y-3 md:space-y-4 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-[#1c1c1c]">
              Qual è l'orientamento del tetto?
            </h3>
            {tipoFalda === 'multiple' && (
              <p className="text-xs text-gray-500 mt-1 italic">
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
          <h3 className="text-lg font-semibold text-[#1c1c1c]">
            Il tetto ha zone in ombra durante il giorno?
          </h3>
          <p className="text-xs text-gray-500 mt-1 italic">
            Considera alberi, palazzi, camini o altre strutture
          </p>
        </div>
        <div className="space-y-3">
          {zoneOmbraOptions.map((option) =>
            renderOptionButton(
              option,
              zoneOmbra === option.id,
              () => handleZoneOmbraChange(option.id)
            )
          )}
        </div>
      </div>
    </StepLayout>
  );
};