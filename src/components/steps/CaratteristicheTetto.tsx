import { FormData } from "../Configuratore";
import { Badge } from "@/components/ui/badge";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home } from "lucide-react";

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
    { id: "piano", label: "Tetto piano", description: "Superficie piana o quasi piana" },
    { id: "singola", label: "Tetto a falda singola", description: "Una sola pendenza" },
    { id: "multiple", label: "Tetto a falde multiple", description: "Più pendenze diverse" }
  ];

  const orientamentoOptions = [
    { id: "sud", label: "Sud", position: "bottom" },
    { id: "sud-est", label: "Sud-Est", position: "bottom-right" },
    { id: "sud-ovest", label: "Sud-Ovest", position: "bottom-left" },
    { id: "est", label: "Est", position: "right" },
    { id: "ovest", label: "Ovest", position: "left" },
    { id: "est-ovest", label: "Est-Ovest", position: "center" },
    { id: "non-so", label: "Non lo so", position: "separate" }
  ];

  const zoneOmbraOptions = [
    { id: "nessuna", label: "Nessuna ombra", description: "Il tetto è sempre esposto al sole" },
    { id: "leggera", label: "Qualche ombra leggera", description: "Ombre parziali in alcuni momenti" },
    { id: "importante", label: "Ombre importanti", description: "Ombre significative durante il giorno" }
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

  const renderOptionButton = (option: any, isSelected: boolean, onClick: () => void, className = "") => (
    <button
      key={option.id}
      onClick={onClick}
      className={`
        relative p-4 rounded-lg border-2 text-left transition-all duration-200 w-full
        ${isSelected 
          ? 'border-[#d8010c] bg-[#d8010c]/5 text-[#1c1c1c]' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-[#1c1c1c]'
        }
        ${className}
      `}
    >
      {isSelected && (
        <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-[#d8010c]" />
      )}
      <div className="pr-8">
        <div className="font-medium text-base mb-1">{option.label}</div>
        {option.description && (
          <div className="text-sm text-gray-600">{option.description}</div>
        )}
      </div>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4 bg-[#d8010c]/10 text-[#d8010c] border-[#d8010c]/20">
          Impianto fotovoltaico
        </Badge>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#d8010c]/10 rounded-full flex items-center justify-center">
            <Home className="h-6 w-6 text-[#d8010c]" />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-3">
          Caratteristiche del tuo tetto
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Per dimensionare correttamente l'impianto fotovoltaico, abbiamo bisogno di alcune informazioni sul tuo tetto
        </p>
      </div>

      <div className="space-y-8">
        {/* Tipo di falda */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1c1c1c] mb-4">
              Che tipo di tetto hai?
            </h3>
            <div className="grid gap-3">
              {tipoFaldaOptions.map((option) =>
                renderOptionButton(
                  option,
                  tipoFalda === option.id,
                  () => handleTipoFaldaChange(option.id)
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Orientamento del tetto */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1c1c1c] mb-4">
              Qual è l'orientamento del tetto?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {orientamentoOptions.filter(opt => opt.position !== 'separate').map((option) =>
                renderOptionButton(
                  option,
                  orientamentoTetto === option.id,
                  () => handleOrientamentoChange(option.id)
                )
              )}
            </div>
            <div className="pt-2 border-t border-gray-200">
              {orientamentoOptions.filter(opt => opt.position === 'separate').map((option) =>
                renderOptionButton(
                  option,
                  orientamentoTetto === option.id,
                  () => handleOrientamentoChange(option.id),
                  "bg-gray-50"
                )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Zone in ombra */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#1c1c1c] mb-4">
              Il tetto ha zone in ombra durante il giorno?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Considera alberi, palazzi, camini o altre strutture che possono fare ombra
            </p>
            <div className="grid gap-3">
              {zoneOmbraOptions.map((option) =>
                renderOptionButton(
                  option,
                  zoneOmbra === option.id,
                  () => handleZoneOmbraChange(option.id)
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

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