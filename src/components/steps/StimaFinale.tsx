
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, CircleDot, Calendar, Clock, Calculator, Percent } from "lucide-react";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  stima: {
    min: number;
    max: number;
  };
  onBack: () => void;
  onSubmit: () => void;
};

export const StimaFinale = ({ formData, updateFormData, stima, onBack, onSubmit }: Props) => {
  // Formatta il prezzo con separatore migliaia
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Calcola i valori per IVA e detrazioni basati sulla media della stima
  const costoMedio = (stima.min + stima.max) / 2;
  const iva = costoMedio * 0.22;
  const detrazione50 = costoMedio * 0.5;
  const detrazione36 = costoMedio * 0.36;
  const detrazione65 = costoMedio * 0.65;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Stima finale</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">Ecco il costo stimato della tua ristrutturazione</p>
      </div>

      {/* Timeline migliorata e responsive */}
      <div className="flex justify-center mb-4 sm:mb-6 -mx-2 sm:mx-0">
        <div className="flex items-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl justify-between">
          {/* Punto 1: Info generali (completato) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#d8010c] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Info generali</span>
          </div>
          
          {/* Linea di collegamento 1-2 */}
          <div className="h-[2px] flex-grow bg-[#d8010c] mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 2: Dati di contatto (completato) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#d8010c] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Dati contatto</span>
          </div>
          
          {/* Linea di collegamento 2-3 */}
          <div className="h-[2px] flex-grow bg-[#fbe12e] mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          {/* Punto 3: Stima finale (attivo) */}
          <div className="flex flex-col items-center relative">
            <div className="bg-[#fbe12e] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-black" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Stima finale</span>
          </div>
        </div>
      </div>

      {/* Stima dei costi */}
      <div className="bg-[#fbe12e] p-6 rounded-2xl space-y-4">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">La tua stima</h2>
        
        <div className="text-center py-6">
          <span className="text-xl">da </span>
          <span className="text-3xl md:text-5xl font-bold">€ {formatPrice(stima.min)}</span>
          <span className="text-xl"> a </span>
          <span className="text-3xl md:text-5xl font-bold">€ {formatPrice(stima.max)}</span>
        </div>
        
        <div className="bg-white bg-opacity-50 p-4 rounded-lg text-center">
          <p className="text-lg text-[#1c1c1c]">
            È una stima calcolata in tempo reale. Per un preventivo preciso richiedi un sopralluogo.
          </p>
        </div>
      </div>

      {/* Box IVA e Detrazioni Fiscali */}
      <div className="bg-[#f4f4f4] p-6 rounded-2xl space-y-6">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-[#d8010c]" />
          <h2 className="text-2xl font-medium text-[#1c1c1c]">IVA e Detrazioni Fiscali</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* IVA */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-[#d8010c]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#1c1c1c] opacity-70">IVA (22%)</p>
                <p className="text-lg font-bold text-[#d8010c]">€ {formatPrice(Math.round(iva))}</p>
              </div>
              <Percent className="h-5 w-5 text-[#d8010c]" />
            </div>
          </div>

          {/* Detrazione 50% - Prima casa */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-[#fbe12e]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#1c1c1c] opacity-70">Bonus Casa 1ª casa (50%)</p>
                <p className="text-lg font-bold text-[#1c1c1c]">€ {formatPrice(Math.round(detrazione50))}</p>
              </div>
              <Percent className="h-5 w-5 text-[#fbe12e]" />
            </div>
          </div>

          {/* Detrazione 36% - Seconda casa */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-[#d8797a]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#1c1c1c] opacity-70">Bonus Casa 2ª casa (36%)</p>
                <p className="text-lg font-bold text-[#1c1c1c]">€ {formatPrice(Math.round(detrazione36))}</p>
              </div>
              <Percent className="h-5 w-5 text-[#d8797a]" />
            </div>
          </div>

          {/* Detrazione 65% - Ecobonus */}
          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#1c1c1c] opacity-70">Ecobonus (65%)</p>
                <p className="text-lg font-bold text-[#1c1c1c]">€ {formatPrice(Math.round(detrazione65))}</p>
              </div>
              <Percent className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-60 p-4 rounded-lg">
          <p className="text-sm text-[#1c1c1c] opacity-80">
            <strong>Nota:</strong> Le detrazioni fiscali sono indicative e soggette a verifica dei requisiti previsti dalla normativa vigente. 
            Consulta un commercialista per informazioni dettagliate.
          </p>
        </div>
      </div>

      {/* Richiesta sopralluogo */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-[#1c1c1c]">Richiedi un sopralluogo gratuito</h2>
        <p className="text-base text-[#1c1c1c] opacity-80">
          Per un preventivo dettagliato, richiedi un sopralluogo. Inserisci la data e l'orario che preferisci.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="dataSopralluogo" className="text-lg">Data preferita</Label>
            </div>
            <Input 
              id="dataSopralluogo"
              type="date"
              value={formData.dataRichiestaSopralluogo || ""}
              onChange={(e) => updateFormData({ dataRichiestaSopralluogo: e.target.value })}
              className="text-lg p-6 rounded-lg"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-[#d8010c]" />
              <Label htmlFor="orarioSopralluogo" className="text-lg">Orario preferito</Label>
            </div>
            <Input 
              id="orarioSopralluogo"
              type="time"
              value={formData.orarioSopralluogo || ""}
              onChange={(e) => updateFormData({ orarioSopralluogo: e.target.value })}
              className="text-lg p-6 rounded-lg"
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="note" className="text-lg">Note aggiuntive (opzionale)</Label>
            <Textarea 
              id="note"
              value={formData.note || ""}
              onChange={(e) => updateFormData({ note: e.target.value })}
              className="text-lg p-6 rounded-lg min-h-[120px]"
              placeholder="Inserisci eventuali note o richieste particolari..."
            />
          </div>
        </div>
      </div>

      {/* Pulsanti */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 p-6 text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl"
        >
          Torna indietro
        </Button>
        
        <Button 
          onClick={onSubmit}
          className="flex-1 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
        >
          Richiedi sopralluogo
          <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
        </Button>
      </div>
    </div>
  );
};
