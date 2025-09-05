import { FormData } from "../Configuratore";
import { Badge } from "@/components/ui/badge";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const CaratteristicheTetto = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const tipoFalda = formData.moduloFotovoltaico?.tipoFalda || "";
  const orientamentoTetto = formData.moduloFotovoltaico?.orientamentoTetto || "";
  const zoneOmbra = formData.moduloFotovoltaico?.zoneOmbra || "";

  const tipoFaldaOptions = [
    { id: "piano", label: "Tetto piano", description: "Superficie piana o quasi piana" },
    { id: "singola", label: "Tetto a falda singola", description: "Una sola pendenza" },
    { id: "multiple", label: "Tetto a falde multiple", description: "Più pendenze diverse" }
  ];

  const orientamentoOptions = [
    { id: "sud", label: "Sud" },
    { id: "sud-est", label: "Sud-Est" },
    { id: "sud-ovest", label: "Sud-Ovest" },
    { id: "est", label: "Est" },
    { id: "ovest", label: "Ovest" },
    { id: "est-ovest", label: "Est-Ovest" },
    { id: "non-so", label: "Non lo so" }
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

  const renderOptionButton = (option: any, isSelected: boolean, onClick: () => void) => (
    <button
      key={option.id}
      onClick={onClick}
      className={`
        relative p-4 rounded-lg border-2 text-left transition-all duration-200 w-full
        ${isSelected 
          ? 'border-primary bg-primary/5 text-foreground' 
          : 'border-border bg-background hover:border-primary/30 hover:bg-primary/5 text-foreground'
        }
      `}
    >
      {isSelected && (
        <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-primary" />
      )}
      <div className="pr-8">
        <div className="font-medium text-base mb-1">{option.label}</div>
        {option.description && (
          <div className="text-sm text-muted-foreground">{option.description}</div>
        )}
      </div>
    </button>
  );

  const infoBox = {
    title: "Informazioni sulle caratteristiche del tetto",
    content: "Queste informazioni ci permettono di calcolare la produzione energetica ottimale del tuo impianto fotovoltaico. Il tipo di falda, l'orientamento e le zone d'ombra influenzano direttamente l'efficienza dei pannelli solari."
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="secondary" className="mb-4">
          Impianto fotovoltaico
        </Badge>
        
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <img 
              src="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png" 
              alt="House icon" 
              className="h-6 w-6"
            />
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          Caratteristiche del tuo tetto
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Per dimensionare correttamente l'impianto fotovoltaico, abbiamo bisogno di alcune informazioni sul tuo tetto
        </p>
      </div>

      {/* Info Box */}
      {isMobile ? (
        <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen} className="mb-8">
          <CollapsibleTrigger className="flex items-center gap-2 text-primary font-medium mb-2">
            <Info className="h-4 w-4" />
            {infoBox.title}
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            {infoBox.content}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <div className="bg-muted/50 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 text-primary font-medium mb-2">
            <Info className="h-4 w-4" />
            {infoBox.title}
          </div>
          <p className="text-sm text-muted-foreground">{infoBox.content}</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Tipo di falda */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
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
        </div>

        {/* Orientamento del tetto */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Qual è l'orientamento del tetto?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {orientamentoOptions.filter(opt => opt.id !== 'non-so').map((option) =>
              renderOptionButton(
                option,
                orientamentoTetto === option.id,
                () => handleOrientamentoChange(option.id)
              )
            )}
          </div>
          <div className="pt-2 border-t border-border">
            {orientamentoOptions.filter(opt => opt.id === 'non-so').map((option) =>
              renderOptionButton(
                option,
                orientamentoTetto === option.id,
                () => handleOrientamentoChange(option.id)
              )
            )}
          </div>
        </div>

        {/* Zone in ombra */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Il tetto ha zone in ombra durante il giorno?
          </h3>
          <p className="text-sm text-muted-foreground">
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
        </div>
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