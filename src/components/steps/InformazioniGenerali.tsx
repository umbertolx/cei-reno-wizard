
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { TipoAbitazione } from "./informazioni-generali/TipoAbitazione";
import { SuperficieSlider } from "./informazioni-generali/SuperficieSlider";
import { IndirizzoField } from "./informazioni-generali/IndirizzoField";
import { SuddivisioneSpazi } from "./informazioni-generali/SuddivisioneSpazi";
import { CircleDot, ArrowRight, Home, Settings, Calculator, CheckCircle } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
};

export const InformazioniGenerali = ({ formData, updateFormData, onNext }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalRooms = Object.values(formData.composizione).reduce((sum, count) => sum + count, 0);
  
  const validateForm = () => {
    if (!formData.tipologiaAbitazione) {
      toast({
        title: "Attenzione",
        description: "Seleziona la tipologia di abitazione",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.superficie || formData.superficie <= 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci una superficie valida",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.indirizzo) {
      toast({
        title: "Attenzione",
        description: "Inserisci l'indirizzo completo",
        variant: "destructive",
      });
      return false;
    }
    
    const { cucina, cameraDoppia, cameraSingola, soggiorno, bagno } = formData.composizione;
    if (cucina + cameraDoppia + cameraSingola + soggiorno + bagno === 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci almeno una stanza nella suddivisione degli spazi",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const selectLocation = (location: string) => {
    const [indirizzo, citta, cap, regione] = location.split(", ");
    updateFormData({
      indirizzo: location,
      citta,
      cap,
      regione
    });
  };
  
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      // Simula un breve caricamento per UX migliore
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsSubmitting(false);
      onNext();
    }
  };

  const handleChangeComposizione = (tipo: keyof FormData['composizione'], value: number) => {
    updateFormData({
      composizione: {
        ...formData.composizione,
        [tipo]: value
      }
    });
  };

  // Check completion status for each section
  const isStepComplete = (step: string) => {
    switch (step) {
      case 'tipologia':
        return !!formData.tipologiaAbitazione;
      case 'superficie':
        return formData.superficie > 0;
      case 'indirizzo':
        return !!formData.indirizzo;
      case 'composizione':
        return totalRooms > 0;
      default:
        return false;
    }
  };

  const isFormValid = isStepComplete('tipologia') && isStepComplete('superficie') && 
                     isStepComplete('indirizzo') && isStepComplete('composizione');

  return (
    <div className="space-y-4">
      {/* Progress indicator */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6">
        <div className="bg-[#d8010c] h-1.5 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
      </div>

      {/* Badge Impianti Civili */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Header principale */}
      <div className="space-y-2 md:space-y-3 mt-7 text-center mb-8 md:mb-10">
        <h1 className="text-[28px] md:text-[40px] font-bold text-[#1c1c1c] leading-[1.05]">
          <span className="md:inline">Informazioni</span>
          <span className="text-[#d8010c] md:inline"> generali</span>
        </h1>
        
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed opacity-90">
          Per offrirti una stima realistica, servono solo pochi dati di base. <br className="hidden md:block" />Il resto lo calcoliamo noi, in pochi minuti.
        </p>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-7 md:space-y-10 px-4 md:px-6">
        <div className="animate-fade-in">
          <TipoAbitazione 
            value={formData.tipologiaAbitazione}
            onChange={(value) => updateFormData({ tipologiaAbitazione: value })}
            isComplete={isStepComplete('tipologia')}
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <SuperficieSlider
            value={formData.superficie || 20}
            onChange={(value) => updateFormData({ superficie: value })}
            isComplete={isStepComplete('superficie')}
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <IndirizzoField
            value={formData.indirizzo}
            onChange={(value) => updateFormData({ indirizzo: value })}
            onSelectLocation={selectLocation}
            isComplete={isStepComplete('indirizzo')}
          />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <SuddivisioneSpazi
            composizione={formData.composizione}
            onChangeStanza={handleChangeComposizione}
            totalRooms={totalRooms}
            isComplete={isStepComplete('composizione')}
          />
        </div>
      </div>

      {/* Pulsante Avanti */}
      <div className="max-w-4xl md:mx-auto px-4 md:px-6 pt-4">
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`
            w-full px-6 py-4 md:py-5
            text-base md:text-lg 
            ${isFormValid && !isSubmitting 
              ? 'bg-[#d8010c] hover:bg-[#b8000a] hover:scale-[1.02]' 
              : 'bg-gray-300 cursor-not-allowed'
            }
            text-white 
            rounded-xl 
            flex items-center justify-center gap-2
            transition-all duration-200 
            shadow-sm hover:shadow-md
            min-h-[48px]
          `}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Elaborazione...</span>
            </>
          ) : (
            <>
              <span>Avanti</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
