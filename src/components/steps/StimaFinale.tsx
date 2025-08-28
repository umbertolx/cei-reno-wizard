import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EstimateResponse } from "@/types/estimate";
import { TipoProprietaSelector } from "./stimafinale/TipoProprietaSelector";
import { CircleDot, ChevronDown, Euro, Calculator, Loader2, Receipt, TrendingDown, Sparkles, Check } from "lucide-react";
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
          <h1 className="text-2xl md:text-4xl font-bold text-[#1c1c1c] leading-[1.05] mb-1 md:mb-2">Errore nella stima</h1>
          <p className="text-sm md:text-base text-gray-600">
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
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-[#1c1c1c] leading-tight">La tua stima personalizzata</h1>
      </div>

      {/* Stima principale */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-[#fbe12e] hover:border-[3px] transition-all duration-300">
        <div className="p-4 md:p-6">
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-500 mb-1 font-medium">
              Budget stimato per questo progetto
            </div>
            
            <div className="text-4xl md:text-5xl font-bold text-gray-900">
              €{estimate.min.toLocaleString()} - €{estimate.max.toLocaleString()}
            </div>
            
            {/* IVA esclusa */}
            <div className="text-base md:text-lg text-gray-600">
              IVA €{Math.round(estimate.min * 0.22).toLocaleString()} - €{Math.round(estimate.max * 0.22).toLocaleString()} esclusa
            </div>
            
            {/* Detrazione fiscale dinamica */}
            {formData.tipoProprietà === 'seconda casa' ? (
              <div className="text-lg md:text-xl text-green-600 font-semibold">
                Fino a €{Math.round(estimate.max * 0.36).toLocaleString()} Detrazione (36%)
              </div>
            ) : (
              <div className="text-lg md:text-xl text-green-600 font-semibold">
                Fino a €{Math.round(estimate.max * 0.50).toLocaleString()} Bonus Casa (50%)
              </div>
            )}
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Checklist */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-gray-700 capitalize">{formData.tipologiaAbitazione}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-gray-700">{formData.superficie} mq</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-gray-700">{formData.citta}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-gray-700">{totalRooms} locali</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-gray-700">Impianto elettrico</span>
            </div>
            
            {formData.tipoDomotica && formData.tipoDomotica !== 'nessuna' && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-700">Domotica {formData.tipoDomotica.toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

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
