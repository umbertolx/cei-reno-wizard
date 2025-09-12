import { FormData } from "../Configuratore";
import { SummaryStepLayout } from "../templates";
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

  // Prepare estimate data for SummaryStepLayout
  const estimateData = {
    min: estimate.min,
    max: estimate.max,
    currency: "€",
    subtitle: "Budget stimato per questo progetto",
    deductions: {
      label: formData.informazioniGenerali?.utilizzoAbitazione === 'seconda casa' 
        ? "Detrazione (36%)"
        : "Bonus Casa (50%)",
      amount: formData.informazioniGenerali?.utilizzoAbitazione === 'seconda casa' 
        ? Math.round(estimate.max * 0.36)
        : Math.round(estimate.max * 0.50),
      percentage: formData.informazioniGenerali?.utilizzoAbitazione === 'seconda casa' ? 36 : 50
    },
    features: [
      { label: `${tipologiaAbitazione}`, included: true },
      { label: `${superficie} mq`, included: true },
      { label: citta, included: true },
      { label: `${totalRooms} locali - ${formData.informazioniGenerali?.numeroPersone || 2} persone`, included: true },
      ...(formData.moduliSelezionati?.includes('elettrico') ? [{ label: "Impianto elettrico", included: true }] : []),
      ...(formData.moduloElettrico?.tipoDomotica && formData.moduloElettrico.tipoDomotica !== 'nessuna' 
        ? [{ label: `Domotica ${formData.moduloElettrico.tipoDomotica.toUpperCase()}`, included: true }] : []),
      ...(formData.moduliSelezionati?.includes('fotovoltaico') ? [{ label: "Impianto fotovoltaico", included: true }] : []),
      ...(formData.moduloFotovoltaico?.batteriaAccumulo === 'si' ? [{ label: "Batteria di accumulo", included: true }] : []),
      { label: (formData.informazioniGenerali?.utilizzoAbitazione || 'prima casa') === 'prima casa' ? 'Prima casa' : 'Seconda casa', included: true }
    ]
  };

  // Prepare summary cards
  const summaryCards = [
    {
      id: 'dettagli-progetto',
      title: 'Dettagli del progetto',
      content: (
        <div className="space-y-4">
          {/* Moduli configurati */}
          <div>
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
      )
    }

  ];

  const additionalContent = (
    <div className="space-y-6">
      {/* Box messaggio sopralluogo in stile CEI */}
      <div className="bg-white border-dashed border-2 border-[#d8010c] p-4 rounded-xl text-center shadow-sm">
        <p className="text-md text-[#1c1c1c] font-medium uppercase">
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
    </div>
  );

  return (
    <SummaryStepLayout
      title="La tua stima personalizzata"
      estimate={estimateData}
      summaryCards={summaryCards}
      additionalContent={additionalContent}
      onBack={onBack}
      onNext={handleSubmitClick}
      nextButtonText={isSubmitting ? "Invio richiesta..." : "Richiedi sopralluogo"}
      backButtonText="Modifica dati"
      isNextDisabled={isSubmitting}
    />
  );
};
