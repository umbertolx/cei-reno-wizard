import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { TipoAbitazione } from "./informazioni-generali/TipoAbitazione";
import { SuperficieSlider } from "./informazioni-generali/SuperficieSlider";
import { IndirizzoField } from "./informazioni-generali/IndirizzoField";
import { SuddivisioneSpazi } from "./informazioni-generali/SuddivisioneSpazi";
import { CircleDot } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
};

export const InformazioniGenerali = ({ formData, updateFormData, onNext }: Props) => {
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
    
    const { cucina, cameraDoppia, cameraSingola, soggiorno, bagno, altro } = formData.composizione;
    if (cucina + cameraDoppia + cameraSingola + soggiorno + bagno + altro === 0) {
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
  
  const handleSubmit = () => {
    if (validateForm()) {
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

  return (
    <div className="space-y-6 md:space-y-8 px-3 md:px-0">
      {/* Badge Impianti Civili */}
      <div className="flex justify-start md:justify-center">
        <div className="bg-[#d8010c] text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-sm font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Timeline migliorata */}
      <div className="flex justify-center mb-6 md:mb-8">
        <div className="flex items-center w-full max-w-md justify-between px-4">
          {/* Punto 1: Info generali (attivo) */}
          <div className="flex flex-col items-center">
            <div className="bg-[#fbe12e] rounded-full p-2 z-10 shadow-sm">
              <CircleDot className="h-3 w-3 md:h-4 md:w-4 text-black" />
            </div>
            <span className="text-xs md:text-sm font-medium mt-2 text-center">Info</span>
          </div>
          
          {/* Linea 1-2 */}
          <div className="h-[2px] flex-grow bg-[#fbe12e] mx-3 rounded"></div>
          
          {/* Punto 2: Configuratore */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full p-2 z-10">
              <CircleDot className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
            </div>
            <span className="text-xs md:text-sm font-medium mt-2 text-center text-gray-500">Contatti</span>
          </div>
          
          {/* Linea 2-3 */}
          <div className="h-[2px] flex-grow bg-gray-300 mx-3 rounded"></div>
          
          {/* Punto 3: Stima */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full p-2 z-10">
              <CircleDot className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
            </div>
            <span className="text-xs md:text-sm font-medium mt-2 text-center text-gray-500">Stima</span>
          </div>
        </div>
      </div>

      {/* Header principale */}
      <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        <h1 className="text-lg md:text-2xl font-bold text-[#1c1c1c] leading-tight text-left md:text-center">
          <span className="block md:inline">Informazioni</span>
          <br className="hidden md:block" />
          <span className="text-[#d8010c] block md:inline">generali</span>
        </h1>
        
        <p className="text-base md:text-xl text-gray-600 max-w-2xl text-left md:text-center md:mx-auto">
          Inserisci i dettagli del tuo progetto per ottenere una stima accurata
        </p>
      </div>

      {/* Contenuto principale */}
      <div className="space-y-6 md:space-y-8">
        <TipoAbitazione 
          value={formData.tipologiaAbitazione}
          onChange={(value) => updateFormData({ tipologiaAbitazione: value })}
        />

        <SuperficieSlider
          value={formData.superficie || 20}
          onChange={(value) => updateFormData({ superficie: value })}
        />

        <IndirizzoField
          value={formData.indirizzo}
          onChange={(value) => updateFormData({ indirizzo: value })}
          onSelectLocation={selectLocation}
        />

        <SuddivisioneSpazi
          composizione={formData.composizione}
          onChangeStanza={handleChangeComposizione}
          totalRooms={totalRooms}
        />
      </div>

      {/* Pulsante Avanti */}
      <div className="pt-6 md:pt-8">
        <Button 
          onClick={handleSubmit}
          className="
            w-full px-6 md:px-12 py-5 md:py-6 
            text-lg md:text-xl 
            bg-[#d8010c] hover:bg-[#b8000a] 
            text-white 
            rounded-xl 
            flex items-center justify-center gap-3 
            transition-all duration-300 
            shadow-lg
          "
        >
          Avanti
        </Button>
      </div>
    </div>
  );
};
