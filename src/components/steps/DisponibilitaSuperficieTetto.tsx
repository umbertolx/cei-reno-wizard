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
    <div className="w-full">
      <QuestionWithOptions
        badge="Impianto fotovoltaico"
        icon="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
        iconAlt="Casa"
        title={`Hai ${superficieMin}-${superficieMax} mq di superficie disponibile sul tetto?`}
        description="In base alle tue esigenze energetiche e alle caratteristiche del tetto, abbiamo calcolato la superficie necessaria per il tuo impianto fotovoltaico personalizzato."
        infoBox={infoBox}
        options={options}
        selectedValue={currentValue}
        onSelectionChange={handleSelectionChange}
        onNext={handleNext}
        onBack={onBack}
        nextButtonText="Continua"
        backButtonText="Indietro"
      />
      
      {/* Campo condizionale per superficie personalizzata */}
      {currentValue === 'no' && (
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:bottom-auto md:border-0 md:bg-gray-50 md:border md:border-gray-200 md:rounded-lg md:mt-6 md:mx-4">
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
  );
};