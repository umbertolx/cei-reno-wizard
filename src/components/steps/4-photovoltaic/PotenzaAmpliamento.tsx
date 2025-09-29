import { FormData } from "../../Configuratore";
import { QuestionStepLayout } from "../../templates";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SystemSummary } from "../components/SystemSummary";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const PotenzaAmpliamento = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.superficieDisponibile;
  const [superficiePersonalizzata, setSuperficiePersonalizzata] = useState(
    formData.moduloFotovoltaico?.superficieEffettiva || ""
  );

  // Calcolo personalizzato della superficie necessaria per l'ampliamento
  const calcolaSuperficieNecessaria = (): { superficieMin: number; superficieMax: number; dettagli: string[] } => {
    const modulo = formData.moduloFotovoltaico;
    const info = formData.informazioniGenerali;
    
    // Base per ampliamento: calcolo in base agli obiettivi di ampliamento
    let superficieBase = 30; // Superficie base più contenuta per ampliamento
    
    const dettagli: string[] = [];

    // Fattore obiettivo ampliamento
    let fattoreObiettivo = 1;
    if (modulo?.obiettivoAmpliamento === 'indipendenza-energetica') {
      fattoreObiettivo = 1.4;
    } else if (modulo?.obiettivoAmpliamento === 'risparmio-bolletta') {
      fattoreObiettivo = 1;
    }

    // Fattore copertura attuale (se ha poca copertura attuale, serve più ampliamento)
    let fattoreCopertura = 1;
    if (modulo?.percentualeCopertura && modulo.percentualeCopertura[0] < 30) {
      fattoreCopertura = 1.3;
    } else if (modulo?.percentualeCopertura && modulo.percentualeCopertura[0] < 50) {
      fattoreCopertura = 1.2;
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
    } else if (orientamento === 'est' || orientamento === 'ovest') {
      fattoreOrientamento = 1.2;
    } else if (orientamento === 'nord-est' || orientamento === 'nord-ovest') {
      fattoreOrientamento = 1.4;
    } else if (orientamento === 'nord') {
      fattoreOrientamento = 1.6;
    } else if (orientamento === 'non-lo-so') {
      fattoreOrientamento = 1.2;
    }

    // Fattore ombre
    let fattoreOmbre = 1;
    if (modulo?.zoneOmbra === 'leggera') {
      fattoreOmbre = 1.15;
    } else if (modulo?.zoneOmbra === 'importante') {
      fattoreOmbre = 1.3;
    }

    // Fattore batteria
    let fattoreBatteria = 1;
    if (modulo?.batteriaAccumulo === 'si') {
      fattoreBatteria = 1.2;
    }

    // Fattore regionale
    let fattoreRegionale = 1;
    const regione = info?.regione?.toLowerCase();
    if (regione?.includes('sicilia') || regione?.includes('sardegna') || regione?.includes('calabria')) {
      fattoreRegionale = 0.9;
    } else if (regione?.includes('lombardia') || regione?.includes('piemonte') || regione?.includes('valle')) {
      fattoreRegionale = 1.1;
    }

    const superficieCalcolata = superficieBase * fattoreObiettivo * fattoreCopertura * fattoreOrientamento * 
      fattoreOmbre * fattoreBatteria * fattoreRegionale;

    // Arrotondare ai range di decine
    const superficieArrotondata = Math.round(superficieCalcolata / 10) * 10;
    const superficieMin = Math.max(20, superficieArrotondata - 10);
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
    { id: 'non-lo-so', label: 'Non lo so, voglio un sopralluogo' }
  ];

  const infoBox = {
    title: "Perché questa superficie per l'ampliamento?",
    content: "La stima per l'ampliamento è calcolata in base al tuo obiettivo (risparmio o indipendenza energetica), alla copertura attuale del tuo impianto esistente e alle caratteristiche del tetto. L'ampliamento ti permetterà di aumentare significativamente la produzione di energia."
  };

  const handleSelectionChange = (value: string) => {
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        superficieDisponibile: value,
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
    if (currentValue === 'no' && (!superficiePersonalizzata?.trim() || Number(superficiePersonalizzata) <= 0)) {
      return;
    }
    onNext();
  };

  const conditionalContent = currentValue === 'no' ? (
    <div className="mt-4">
      <Card>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <Label htmlFor="superficie-effettiva" className="text-base font-medium text-[#1c1c1c]">
              Inserisci il numero di mq disponibili per l'ampliamento:
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="superficie-effettiva"
                type="number"
                placeholder="Es. 25"
                value={superficiePersonalizzata}
                onChange={(e) => handleSuperficieChange(e.target.value)}
                className="flex-1"
                min="1"
                max="500"
              />
              <span className="text-gray-500 font-medium">mq</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : null;

  const summaryContent = (
    <SystemSummary 
      formData={formData}
      superficieMin={superficieMin}
      superficieMax={superficieMax}
    />
  );

  return (
    <QuestionStepLayout
      title="Superficie necessaria per l'ampliamento"
      description="In base ai tuoi obiettivi di ampliamento e alle caratteristiche del tetto, abbiamo calcolato la superficie aggiuntiva necessaria per potenziare il tuo impianto fotovoltaico."
      infoBox={infoBox}
      summaryContent={summaryContent}
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelectionChange}
      onNext={handleNext}
      onBack={onBack}
      nextButtonText="Continua"
      backButtonText="Indietro"
      conditionalContent={conditionalContent}
    />
  );
};