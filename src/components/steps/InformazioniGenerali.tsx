
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { TipoAbitazione } from "./informazioni-generali/TipoAbitazione";
import { SuperficieSlider } from "./informazioni-generali/SuperficieSlider";
import { IndirizzoField } from "./informazioni-generali/IndirizzoField";
import { SuddivisioneSpazi } from "./informazioni-generali/SuddivisioneSpazi";
import { CircleDot, ArrowRight, Home, Settings, Calculator } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
};

export const InformazioniGenerali = ({ formData, updateFormData, onNext }: Props) => {
  // Initialize composizione if it doesn't exist
  if (!formData.composizione) {
    updateFormData({
      composizione: {
        cucina: 1,
        cameraDoppia: 1,
        cameraSingola: 1,
        soggiorno: 1,
        bagno: 2,
        altro: 0
      }
    });
  }

  // Pre-compila i dati se non sono già presenti
  if (!formData.tipologiaAbitazione) {
    updateFormData({
      tipologiaAbitazione: "appartamento",
      superficie: 85,
      indirizzo: "Via Roma 123, Milano, 20100, Lombardia",
      citta: "Milano",
      cap: "20100",
      regione: "Lombardia"
    });
  }

  const totalRooms = formData.composizione ? Object.values(formData.composizione).reduce((sum: number, count: number) => sum + count, 0) : 0;
  
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
    
    if (formData.composizione) {
      const { cucina, cameraDoppia, cameraSingola, soggiorno, bagno } = formData.composizione;
      if (cucina + cameraDoppia + cameraSingola + soggiorno + bagno === 0) {
        toast({
          title: "Attenzione",
          description: "Inserisci almeno una stanza nella suddivisione degli spazi",
          variant: "destructive",
        });
        return false;
      }
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
  
  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleChangeComposizione = (tipo: keyof NonNullable<FormData['composizione']>, value: number) => {
    if (formData.composizione) {
      updateFormData({
        composizione: {
          ...formData.composizione,
          [tipo]: value
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Badge Impianti Civili */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Header principale */}
      <div className="space-y-2 md:space-y-3 mt-7 text-center mb-12 md:mb-16">
        <h1 className="text-[28px] md:text-[40px] font-bold text-[#1c1c1c] leading-[1.05]">
          <span className="md:inline">Informazioni</span>
          <span className="text-[#d8010c] md:inline"> generali</span>
        </h1>
        
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Per offrirti una stima realistica, servono solo pochi dati di base. <br className="hidden md:block" />Il resto lo calcoliamo noi, in pochi minuti.
        </p>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8">
        <TipoAbitazione 
          value={formData.tipologiaAbitazione}
          onChange={(value) => updateFormData({ tipologiaAbitazione: value })}
        />

        <SuperficieSlider
          value={formData.superficie || 85}
          onChange={(value) => updateFormData({ superficie: value })}
        />

        <IndirizzoField
          value={formData.indirizzo}
          onChange={(value) => updateFormData({ indirizzo: value })}
          onSelectLocation={selectLocation}
        />

        {formData.composizione && (
          <SuddivisioneSpazi
            composizione={formData.composizione}
            onChangeStanza={handleChangeComposizione}
            totalRooms={totalRooms}
          />
        )}
      </div>

      {/* Pulsante Avanti */}
      <div className="max-w-4xl md:mx-auto px-3 md:px-0">
        <Button 
          onClick={handleSubmit}
          className="
            w-full px-6 py-4 md:py-5
            text-base md:text-lg 
            bg-[#d8010c] hover:bg-[#b8000a]
            text-white 
            rounded-xl 
            flex items-center justify-center gap-2
            transition-all duration-300 
            shadow-sm hover:shadow-md
            min-h-[48px]
          "
        >
          <span>Avanti</span>
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </div>
  );
};
