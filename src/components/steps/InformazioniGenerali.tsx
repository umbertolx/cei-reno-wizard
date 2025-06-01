
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
  // Calcola il totale delle stanze
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
    <div className="space-y-6 sm:space-y-8">
      {/* Timeline ottimizzata per mobile */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="flex items-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl justify-between px-2 sm:px-0">
          {/* Punto 1: Info generali (attivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#fbe12e] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-black" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center max-w-[60px] sm:max-w-none leading-tight">Info generali</span>
          </div>
          
          {/* Linea di collegamento 1-2 */}
          <div className="h-[2px] flex-grow bg-[#fbe12e] mx-1 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 2: Configuratore (inattivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-gray-200 rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center text-gray-500 max-w-[60px] sm:max-w-none leading-tight">Configuratore</span>
          </div>
          
          {/* Linea di collegamento 2-3 */}
          <div className="h-[2px] flex-grow bg-gray-300 mx-1 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 3: Stima dei costi (inattivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-gray-200 rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-gray-400" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center text-gray-500 max-w-[60px] sm:max-w-none leading-tight">Stima costi</span>
          </div>
        </div>
      </div>

      {/* Contenuto principale con spaziatura ottimizzata */}
      <div className="space-y-6 sm:space-y-8">
        {/* Tipologia abitazione */}
        <TipoAbitazione 
          value={formData.tipologiaAbitazione}
          onChange={(value) => updateFormData({ tipologiaAbitazione: value })}
        />

        {/* Superficie */}
        <SuperficieSlider
          value={formData.superficie || 20}
          onChange={(value) => updateFormData({ superficie: value })}
        />

        {/* Indirizzo */}
        <IndirizzoField
          value={formData.indirizzo}
          onChange={(value) => updateFormData({ indirizzo: value })}
          onSelectLocation={selectLocation}
        />

        {/* Suddivisione degli spazi */}
        <SuddivisioneSpazi
          composizione={formData.composizione}
          onChangeStanza={handleChangeComposizione}
          totalRooms={totalRooms}
        />
      </div>

      {/* Pulsante Continua con margine ottimizzato */}
      <div className="pt-4 sm:pt-6">
        <Button 
          onClick={handleSubmit}
          className="w-full py-4 sm:py-6 text-base sm:text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 focus:bg-[#d8010c] focus:text-white active:bg-[#d8010c] active:text-white"
        >
          Continua e calcola il preventivo
        </Button>
      </div>
    </div>
  );
};
