import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EstimateResponse } from "@/types/estimate";
import { TipoProprietaSelector } from "./stimafinale/TipoProprietaSelector";
import { CircleDot, ChevronDown, Euro, Calculator, Loader2, Receipt, TrendingDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  estimate?: EstimateResponse;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
};

export const StimaFinale = ({ 
  formData, 
  updateFormData, 
  estimate, 
  onBack, 
  onSubmit,
  isSubmitting = false
}: Props) => {
  console.log("💰 StimaFinale render - estimate:", estimate);
  console.log("📋 StimaFinale render - formData:", formData);
  
  // Aggiungi logging per il click del pulsante
  const handleSubmitClick = () => {
    console.log("🖱️ StimaFinale: Survey request button clicked!");
    console.log("📊 StimaFinale: Current estimate:", estimate);
    console.log("📋 StimaFinale: Current formData:", formData);
    console.log("⚡ StimaFinale: Calling onSubmit for survey request...");
    onSubmit();
  };
  
  if (!estimate) {
    console.warn("⚠️ No estimate available in StimaFinale");
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Errore nella stima</h1>
          <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">
            Non è stato possibile calcolare la stima. Riprova o torna indietro.
          </p>
        </div>
        <Button onClick={onBack} className="w-full p-6 text-lg">
          Torna indietro
        </Button>
      </div>
    );
  }

  const totalRooms = Object.values(formData.composizione).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">La tua stima personalizzata</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">
          I tuoi dati sono stati salvati. Richiedi un sopralluogo per un preventivo dettagliato.
        </p>
      </div>

      {/* Timeline */}
      <div className="flex justify-center mb-4 sm:mb-6 -mx-2 sm:mx-0">
        <div className="flex items-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl justify-between">
          <div className="flex flex-col items-center relative">
            <div className="bg-[#d8010c] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Info generali</span>
          </div>
          
          <div className="h-[2px] flex-grow bg-[#d8010c] mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          <div className="flex flex-col items-center relative">
            <div className="bg-[#d8010c] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Dati contatto</span>
          </div>
          
          <div className="h-[2px] flex-grow bg-[#fbe12e] mx-0.5 sm:mx-2 relative top-[8px] sm:top-[10px]"></div>
          
          <div className="flex flex-col items-center relative">
            <div className="bg-[#fbe12e] rounded-full p-1.5 sm:p-2 z-10">
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-black" />
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium mt-1 sm:mt-2 text-center">Stima finale</span>
          </div>
        </div>
      </div>

      {/* Stima principale */}
      <Card className="border-2 border-[#fbe12e] bg-gradient-to-br from-[#fbe12e]/10 to-[#fbe12e]/5">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Euro className="h-6 w-6 text-[#d8010c]" />
            Stima del tuo progetto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-bold text-[#d8010c] mb-2">
              €{estimate.min.toLocaleString()} - €{estimate.max.toLocaleString()}
            </div>
          </div>

          {/* Sezione IVA e Detrazioni Fiscali */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="h-5 w-5 text-red-600" />
                <span className="text-sm font-bold text-red-600 uppercase tracking-wide">IVA (22%)</span>
              </div>
              <div className="text-lg font-bold text-red-700 mb-1">
                €{Math.round(estimate.min * 0.22).toLocaleString()} - €{Math.round(estimate.max * 0.22).toLocaleString()}
              </div>
              <div className="text-sm text-red-600">Da aggiungere al preventivo</div>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Detrazione Fiscale (50%)</span>
              </div>
              <div className="text-lg font-bold text-emerald-700 mb-1">
                €{Math.round(estimate.min * 0.50).toLocaleString()} - €{Math.round(estimate.max * 0.50).toLocaleString()}
              </div>
              <div className="text-sm text-emerald-600">Risparmio fiscale in 10 anni</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Riepilogo configurazione */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Riepilogo configurazione
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Abitazione:</span>
              <p className="font-medium capitalize">{formData.tipologiaAbitazione}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Superficie:</span>
              <p className="font-medium">{formData.superficie} mq</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Totale stanze:</span>
              <p className="font-medium">{totalRooms}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Città:</span>
              <p className="font-medium">{formData.citta}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tipo Proprietà */}
      <TipoProprietaSelector
        value={formData.tipoProprietà}
        onChange={(value) => updateFormData({ tipoProprietà: value })}
      />

      {/* Note aggiuntive per il sopralluogo */}
      <div className="space-y-2">
        <Label htmlFor="note" className="text-lg">Note per il sopralluogo (opzionale)</Label>
        <Textarea
          id="note"
          placeholder="Aggiungi eventuali note o richieste specifiche per il sopralluogo..."
          value={formData.note || ""}
          onChange={(e) => updateFormData({ note: e.target.value })}
          rows={4}
          className="text-base"
        />
      </div>

      {/* Pulsanti */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 p-6 text-lg border-[#1c1c1c] text-[#1c1c1c] hover:bg-[#f4f4f4] rounded-xl"
          disabled={isSubmitting}
        >
          Modifica dati
        </Button>
        
        <Button 
          onClick={handleSubmitClick}
          className="flex-1 p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Invio richiesta...
            </>
          ) : (
            <>
              Richiedi sopralluogo
              <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
            </>
          )}
        </Button>
      </div>

      <div className="text-sm text-gray-600 text-center">
        {isSubmitting ? (
          "Invio della richiesta di sopralluogo in corso..."
        ) : (
          "Richiedendo il sopralluogo, un nostro tecnico ti contatterà entro 24-48h per confermare l'appuntamento"
        )}
      </div>
    </div>
  );
};
