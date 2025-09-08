import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sun, Home, Target, Battery, MapPin } from "lucide-react";
import { QuestionWithOptions } from "@/components/shared/QuestionWithOptions";
import { FormData } from "@/components/Configuratore";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const DisponibilitaSuperficieTetto = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.superficieDisponibile;
  const [superficiePersonalizzata, setSuperficiePersonalizzata] = useState(
    formData.moduloFotovoltaico?.superficieEffettiva || ""
  );

  // Calcolo personalizzato della superficie necessaria come range
  const calcolaSuperficieNecessaria = (): { superficieMin: number; superficieMax: number; dettagli: string[] } => {
    const modulo = formData.moduloFotovoltaico;
    const info = formData.informazioniGenerali;
    
    // Base: 6 kW (24 pannelli) = ~40 mq per casa standard
    let superficieBase = 40;
    
    const dettagli: string[] = [];

    // Fattore consumi energetici
    let fattoreConsumi = 1;
    if (modulo?.conosceConsumi === 'si' && modulo.consumiKWh) {
      fattoreConsumi = modulo.consumiKWh / 3500; // 3500 kWh = consumo medio famiglia
    } else if (modulo?.spesaMensile) {
      const stimaConsumi = modulo.spesaMensile * 12 / 0.25; // €0.25/kWh medio
      fattoreConsumi = stimaConsumi / 3500;
    }

    // Fattore obiettivo
    let fattoreObiettivo = 1;
    if (modulo?.obiettivoPrincipale === 'indipendenza-energetica') {
      fattoreObiettivo = 1.3;
    }

    // Fattore orientamento
    let fattoreOrientamento = 1;
    const orientamento = Array.isArray(modulo?.orientamentoTetto) 
      ? modulo.orientamentoTetto[0] 
      : modulo?.orientamentoTetto;
    
    if (orientamento === 'sud') {
      fattoreOrientamento = 1;
    } else if (orientamento === 'sud-est' || orientamento === 'sud-ovest') {
      fattoreOrientamento = 1.1;
    } else if (orientamento === 'est' || orientamento === 'ovest' || orientamento === 'est-ovest') {
      fattoreOrientamento = 1.2;
    }

    // Fattore ombre
    let fattoreOmbre = 1;
    if (modulo?.zoneOmbra === 'leggera') {
      fattoreOmbre = 1.15;
    } else if (modulo?.zoneOmbra === 'importante') {
      fattoreOmbre = 1.3;
    }

    // Fattore batteria (più energia da produrre)
    let fattoreBatteria = 1;
    if (modulo?.batteriaAccumulo === 'si') {
      fattoreBatteria = 1.2;
    }

    // Fattore regionale approssimativo
    let fattoreRegionale = 1;
    const regione = info?.regione?.toLowerCase();
    if (regione?.includes('sicilia') || regione?.includes('sardegna') || regione?.includes('calabria')) {
      fattoreRegionale = 0.9;
    } else if (regione?.includes('lombardia') || regione?.includes('piemonte') || regione?.includes('valle')) {
      fattoreRegionale = 1.1;
    }

    const superficieCalcolata = superficieBase * fattoreConsumi * fattoreObiettivo * fattoreOrientamento * 
      fattoreOmbre * fattoreBatteria * fattoreRegionale;

    // Arrotondare ai range di decine
    const superficieArrotondata = Math.round(superficieCalcolata / 10) * 10;
    const superficieMin = Math.max(30, superficieArrotondata - 10);
    const superficieMax = superficieArrotondata;

    return {
      superficieMin,
      superficieMax,
      dettagli
    };
  };

  const { superficieMin, superficieMax, dettagli } = calcolaSuperficieNecessaria();

  const options = [
    { id: 'si', label: 'Sì, ho questa superficie disponibile' },
    { id: 'no', label: 'No, non ho abbastanza spazio' },
    { id: 'non-lo-so', label: 'Non lo so' }
  ];

  const infoBox = {
    title: "Perché questa superficie?",
    content: "La stima è personalizzata in base ai tuoi consumi energetici, al tipo e orientamento del tetto, agli obiettivi di indipendenza energetica e alla tua posizione geografica. Maggiore è la superficie disponibile, maggiore sarà la produzione di energia solare."
  };

  const handleSelectionChange = (value: string) => {
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        superficieDisponibile: value,
        // Reset superficie effettiva se non è più "no"
        superficieEffettiva: value === 'no' ? superficiePersonalizzata : undefined
      }
    });
  };

  const handleSuperficieChange = (value: string) => {
    setSuperficiePersonalizzata(value);
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        superficieEffettiva: value
      }
    });
  };

  const handleNext = () => {
    if (!currentValue) return;
    
    // Se ha selezionato "no" ma non ha inserito la superficie, non procede
    if (currentValue === 'no' && !superficiePersonalizzata?.trim()) {
      return;
    }
    
    onNext();
  };

  const isFormValid = currentValue && (currentValue !== 'no' || superficiePersonalizzata?.trim());

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="pb-20 md:pb-8">
        {/* Badge */}
        <div className="flex justify-center mb-6 md:mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white border-gray-200">
            Impianto fotovoltaico
          </Badge>
        </div>

        {/* Header con icona */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
              alt="Casa"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-4">
            Hai {superficieMin}-{superficieMax} mq di superficie disponibile sul tetto?
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            In base alle tue esigenze energetiche e alle caratteristiche del tetto, abbiamo calcolato la superficie necessaria per il tuo impianto fotovoltaico personalizzato.
          </p>
        </div>

        <div className="px-4">
          {/* Info Box */}
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">{infoBox.title}</p>
                  <p>{infoBox.content}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Opzioni */}
          <div className="space-y-3 md:space-y-4 mb-6">
            {options.map((option) => {
              const isSelected = currentValue === option.id;
              
              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectionChange(option.id)}
                  className={`
                    rounded-xl transition-all duration-300 border cursor-pointer p-4
                    ${isSelected 
                      ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base text-[#1c1c1c]">
                        {option.label}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Campo condizionale per superficie personalizzata */}
          {currentValue === 'no' && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <Label htmlFor="superficie-effettiva" className="text-base font-medium text-[#1c1c1c] mb-3 block">
                Quanti metri quadri di tetto puoi effettivamente destinare ai pannelli solari?
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="superficie-effettiva"
                  type="number"
                  placeholder="Inserisci il numero di mq"
                  value={superficiePersonalizzata}
                  onChange={(e) => handleSuperficieChange(e.target.value)}
                  className="flex-1"
                  min="1"
                  max="500"
                />
                <span className="text-gray-500 font-medium">mq</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-0 md:bg-transparent md:p-0 md:mt-8">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Indietro
          </button>
          <button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`
              flex-1 px-6 py-3 rounded-lg font-medium transition-colors
              ${isFormValid
                ? 'bg-[#d8010c] text-white hover:bg-[#b8000a]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            Continua
          </button>
        </div>
      </div>
    </div>
  );
};