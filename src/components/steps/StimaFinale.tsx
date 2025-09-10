import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EstimateResponse } from "@/types/estimate";
import { CircleDot, ChevronDown, Euro, Calculator, Loader2, Receipt, TrendingDown, Sparkles, Check, Zap, Home, Battery } from "lucide-react";
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

  const composizione = formData.informazioniGenerali?.composizione || formData.composizione || {
    cucina: 1,
    cameraDoppia: 1,
    cameraSingola: 1,
    soggiorno: 1,
    bagno: 2,
    altro: 0
  };
  
  const totalRooms = Object.values(composizione).reduce((acc: number, curr) => {
    const numericValue = typeof curr === 'number' ? curr : parseInt(curr as string) || 0;
    return acc + numericValue;
  }, 0);

  // Get values from the correct nested structure
  const tipologiaAbitazione = formData.informazioniGenerali?.tipologiaAbitazione || formData.tipologiaAbitazione || 'appartamento';
  const superficie = formData.informazioniGenerali?.superficie || formData.superficie || 85;
  const citta = formData.informazioniGenerali?.citta || formData.citta || 'Milano';

  return (
    <div className="space-y-8">
      <div className="space-y-2 md:space-y-3 mt-4">
        <h1 className="text-[24px] md:text-[36px] font-bold text-[#1c1c1c] leading-[1.05] text-left md:text-center p-1">
          La tua stima personalizzata
        </h1>
      </div>

      {/* Budget estimation box - same style as welcome page */}
      <div className="relative max-w-full md:max-w-3xl md:mx-auto mb-6 md:mb-12 px-3 md:px-0">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-[#fbe12e] hover:border-[3px] transition-all duration-300">
          <div className="p-4 md:p-6">
            {/* Header section */}
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500 mb-1 font-medium p-1">
                Budget stimato per questo progetto
              </div>
              <div className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 p-1">
                €{estimate.min.toLocaleString()} - €{estimate.max.toLocaleString()}
              </div>
              
              {/* IVA esclusa */}
              <div className="text-sm md:text-base text-gray-600 mb-2 p-1">
                IVA €{Math.round(estimate.min * 0.22).toLocaleString()} - €{Math.round(estimate.max * 0.22).toLocaleString()} esclusa
              </div>
              
              {/* Tax deductions */}
              {formData.informazioniGenerali?.tipoProprieta === 'seconda casa' ? (
                <div className="text-sm md:text-base text-green-700 font-semibold mb-3 p-1">
                  Fino a €{Math.round(estimate.max * 0.36).toLocaleString()} Detrazione (36%)
                </div>
              ) : (
                <div className="text-sm md:text-base text-green-700 font-semibold mb-3 p-1">
                  Fino a €{Math.round(estimate.max * 0.50).toLocaleString()} Bonus Casa (50%)
                </div>
              )}
            </div>

            {/* Project details in a clean grid */}
            <div className="border-t border-gray-200 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Left column */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700 capitalize">{tipologiaAbitazione}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{superficie} mq</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{citta}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">{totalRooms} locali - {formData.informazioniGenerali?.numeroPersone || 2} persone</span>
                  </div>
                </div>
                
                {/* Right column */}
                <div className="space-y-2">
                  {formData.moduliSelezionati?.includes('elettrico') && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Impianto elettrico</span>
                    </div>
                  )}
                  {formData.moduloElettrico?.tipoDomotica && formData.moduloElettrico.tipoDomotica !== 'nessuna' && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Domotica {formData.moduloElettrico.tipoDomotica.toUpperCase()}</span>
                    </div>
                  )}
                  {formData.moduliSelezionati?.includes('fotovoltaico') && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Impianto fotovoltaico</span>
                    </div>
                  )}
                  {formData.moduloFotovoltaico?.batteriaAccumulo === 'si' && (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">Batteria di accumulo</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-2.5 w-2.5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700 capitalize">
                      {(formData.informazioniGenerali?.tipoProprieta || 'prima casa') === 'prima casa' ? 'Prima casa' : 'Seconda casa'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Moduli configurati - stile dati contatto */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-gray-600 font-medium mb-2 text-xs">Interventi configurati:</p>
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.moduliSelezionati?.includes('impianto-elettrico')
                      ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    Impianto elettrico
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.moduliSelezionati?.includes('fotovoltaico')
                      ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    Impianto fotovoltaico
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.moduliSelezionati?.includes('sicurezza')
                      ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    Impianto di sicurezza
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    formData.moduliSelezionati?.includes('termotecnico')
                      ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    Impianto termotecnico
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Box messaggio sopralluogo in stile CEI */}
      <div className="bg-white border-2 border-green-700 p-4 rounded-xl text-center shadow-sm">
        <p className="text-md text-[#1c1c1c] font-medium">
          Richiedendo il sopralluogo, un nostro tecnico ti contatterà entro 24-48h per confermare l'appuntamento
        </p>
      </div>

      {/* Note aggiuntive per il sopralluogo */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-[#1c1c1c]">Note per il sopralluogo (opzionale)</h2>
        <Textarea
          id="note"
          placeholder="Aggiungi eventuali note o richieste specifiche per il sopralluogo..."
          value={formData.note || ""}
          onChange={(e) => updateFormData({ note: e.target.value })}
          rows={4}
          className="text-base p-4 rounded-lg"
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
    </div>
  );
};
