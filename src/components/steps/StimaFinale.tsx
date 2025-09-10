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

      {/* Box stima principale in stile CEI */}
      <div className="bg-[#f4f4f4] border border-gray-200 rounded-xl p-6">
        <div className="space-y-6">
          {/* Stima principale */}
          <div className="text-center space-y-4">
            <div className="text-sm text-gray-600 mb-1 font-medium">
              Budget stimato per questo progetto
            </div>
            
            <div className="text-3xl md:text-4xl font-bold text-[#1c1c1c]">
              €{estimate.min.toLocaleString()} - €{estimate.max.toLocaleString()}
            </div>
            
            {/* IVA esclusa */}
            <div className="text-base text-gray-600">
              IVA €{Math.round(estimate.min * 0.22).toLocaleString()} - €{Math.round(estimate.max * 0.22).toLocaleString()} esclusa
            </div>
            
            {/* Detrazione fiscale dinamica */}
            {formData.informazioniGenerali?.tipoProprieta === 'seconda casa' ? (
              <div className="text-lg text-[#d8010c] font-semibold">
                Fino a €{Math.round(estimate.max * 0.36).toLocaleString()} Detrazione (36%)
              </div>
            ) : (
              <div className="text-lg text-[#d8010c] font-semibold">
                Fino a €{Math.round(estimate.max * 0.50).toLocaleString()} Bonus Casa (50%)
              </div>
            )}
          </div>

          <hr className="border-gray-200" />

          {/* Informazioni configurazione */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-600 mb-3">Configurazione completata:</div>
            
            {/* Informazioni principali in formato semplice */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Tipologia:</span>
                <span className="font-medium text-[#1c1c1c] capitalize">{tipologiaAbitazione}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Superficie:</span>
                <span className="font-medium text-[#d8010c]">{superficie} mq</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Persone:</span>
                <span className="font-medium text-[#1c1c1c]">{formData.informazioniGenerali?.numeroPersone || 2}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Proprietà:</span>
                <span className="font-medium text-[#1c1c1c] capitalize">
                  {(formData.informazioniGenerali?.tipoProprieta || 'prima casa') === 'prima casa' ? 'Prima' : 'Seconda'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Stanze totali:</span>
                <span className="font-medium text-[#1c1c1c]">{totalRooms}</span>
              </div>
            </div>

            {/* Indirizzo */}
            <div className="space-y-1">
              <div>
                <p className="text-[#1c1c1c] font-medium">
                  {formData.informazioniGenerali?.indirizzo || 'Non specificato'}
                </p>
                <p className="text-gray-600 text-sm">
                  {citta}
                </p>
              </div>
            </div>

            {/* Composizione stanze */}
            <div>
              <p className="text-gray-600 mb-2">Composizione ({totalRooms} stanze totali):</p>
              <div className="flex flex-wrap gap-3">
                {composizione && Object.entries(composizione).map(([key, value]) => {
                  const numValue = typeof value === 'number' ? value : parseInt(value as string) || 0;
                  return numValue > 0 ? (
                    <span key={key} className="bg-[#fbe12e] text-[#1c1c1c] px-3 py-1 rounded-full text-sm font-medium">
                      {numValue} {key === 'cameraDoppia' ? 'cam. doppia' : 
                             key === 'cameraSingola' ? 'cam. singola' : key}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            {/* Moduli configurati */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 font-medium mb-3">Interventi configurati:</p>
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.moduliSelezionati?.includes('elettrico')
                    ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  Impianto elettrico
                  {formData.moduloElettrico?.tipoImpianto && ` - ${formData.moduloElettrico.tipoImpianto}`}
                  {formData.moduloElettrico?.tipoDomotica && formData.moduloElettrico.tipoDomotica !== 'nessuna' && 
                    ` - ${formData.moduloElettrico.tipoDomotica.toUpperCase()}`}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.moduliSelezionati?.includes('fotovoltaico')
                    ? 'bg-[#fbe12e] text-[#1c1c1c]' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  Impianto fotovoltaico
                  {formData.moduloFotovoltaico?.tipoInterventoFotovoltaico && ` - ${formData.moduloFotovoltaico.tipoInterventoFotovoltaico}`}
                  {formData.moduloFotovoltaico?.batteriaAccumulo === 'si' && ` con accumulo`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Box messaggio sopralluogo in stile CEI */}
      <div className="bg-white border-2 border-[#fbe12e] p-4 rounded-xl text-center shadow-sm">
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
