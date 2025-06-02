
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
    <div className="space-y-3 md:space-y-8 px-3 md:px-0">
      {/* Badge Impianti Civili */}
      <div className="flex justify-start md:justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Timeline compatta per mobile */}
      <div className="flex justify-center mb-3 md:mb-8">
        <div className="flex items-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl justify-between px-2 sm:px-0">
          {/* Punto 1: Info generali (attivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#fbe12e] rounded-full p-1 sm:p-1.5 md:p-2 z-10">
              <CircleDot className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-black" />
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium mt-0.5 sm:mt-1 md:mt-2 text-center max-w-[50px] sm:max-w-[60px] md:max-w-none leading-tight">Info generali</span>
          </div>
          
          {/* Linea di collegamento 1-2 */}
          <div className="h-[1.5px] md:h-[2px] flex-grow bg-[#fbe12e] mx-1 sm:mx-2 relative top-[6px] sm:top-[8px] md:top-[10px]"></div>
          
          {/* Punto 2: Configuratore (inattivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-gray-200 rounded-full p-1 sm:p-1.5 md:p-2 z-10">
              <CircleDot className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-gray-400" />
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium mt-0.5 sm:mt-1 md:mt-2 text-center text-gray-500 max-w-[50px] sm:max-w-[60px] md:max-w-none leading-tight">Configuratore</span>
          </div>
          
          {/* Linea di collegamento 2-3 */}
          <div className="h-[1.5px] md:h-[2px] flex-grow bg-gray-300 mx-1 sm:mx-2 relative top-[6px] sm:top-[8px] md:top-[10px]"></div>
          
          {/* Punto 3: Stima dei costi (inattivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-gray-200 rounded-full p-1 sm:p-1.5 md:p-2 z-10">
              <CircleDot className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5 text-gray-400" />
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-medium mt-0.5 sm:mt-1 md:mt-2 text-center text-gray-500 max-w-[50px] sm:max-w-[60px] md:max-w-none leading-tight">Stima costi</span>
          </div>
        </div>
      </div>

      {/* Header principale - stesso stile della prima pagina */}
      <div className="space-y-2 md:space-y-4 mb-4 md:mb-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1c1c1c] leading-tight text-left md:text-center">
          <span className="block md:inline">Informazioni</span>
          <br className="hidden md:block" />
          <span className="text-[#d8010c] block md:inline">generali</span>
        </h1>
        
        <p className="text-base md:text-xl text-gray-600 max-w-2xl text-left md:text-center md:mx-auto">
          Inserisci i dettagli del tuo progetto per ottenere una stima accurata
        </p>
      </div>

      {/* Contenuto principale con spaziatura ridotta per mobile */}
      <div className="space-y-4 md:space-y-8">
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

      {/* Pulsante Continua - stesso stile della prima pagina */}
      <div className="pt-3 md:pt-6">
        <Button 
          onClick={handleSubmit}
          className="
            w-full px-6 md:px-12 py-5 md:py-6 
            text-lg md:text-xl 
            bg-[#d8010c] hover:bg-[#b8000a] md:hover:bg-[#b8000a] 
            text-white 
            rounded-xl 
            flex items-center justify-center gap-3 
            transition-all duration-300 
            shadow-lg
          "
        >
          Continua e calcola il preventivo
        </Button>
        
        <div className="text-xs md:text-sm text-gray-500 text-left md:text-center mt-2 md:mt-4">
          Gratuito • Pochi minuti • Senza impegno
        </div>
      </div>
    </div>
  );
};
