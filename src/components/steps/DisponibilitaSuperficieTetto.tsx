import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Home, Target, Battery, MapPin } from "lucide-react";
import { QuestionWithOptions } from "@/components/shared/QuestionWithOptions";
import { FormData } from "@/components/Configuratore";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const DisponibilitaSuperficieTetto = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.superficieDisponibile;

  // Calcolo personalizzato della superficie necessaria
  const calcolaSuperficieNecessaria = (): { superficie: number; dettagli: string[] } => {
    const modulo = formData.moduloFotovoltaico;
    const info = formData.informazioniGenerali;
    
    // Base: 6 kW (24 pannelli) = ~40 mq per casa standard
    let superficieBase = 40;
    let potenzaBase = 6;
    
    const dettagli: string[] = [];

    // Fattore consumi energetici
    let fattoreConsumi = 1;
    if (modulo?.conosceConsumi === 'si' && modulo.consumiKWh) {
      fattoreConsumi = modulo.consumiKWh / 3500; // 3500 kWh = consumo medio famiglia
      dettagli.push(`Consumi annui: ${modulo.consumiKWh} kWh`);
    } else if (modulo?.spesaMensile) {
      const stimaConsumi = modulo.spesaMensile * 12 / 0.25; // €0.25/kWh medio
      fattoreConsumi = stimaConsumi / 3500;
      dettagli.push(`Spesa mensile: €${modulo.spesaMensile} (≈${Math.round(stimaConsumi)} kWh/anno)`);
    }

    // Fattore obiettivo
    let fattoreObiettivo = 1;
    if (modulo?.obiettivoPrincipale === 'indipendenza-energetica') {
      fattoreObiettivo = 1.3;
      dettagli.push('Obiettivo: indipendenza energetica (+30%)');
    } else {
      dettagli.push('Obiettivo: risparmio bolletta');
    }

    // Fattore orientamento
    let fattoreOrientamento = 1;
    const orientamento = Array.isArray(modulo?.orientamentoTetto) 
      ? modulo.orientamentoTetto[0] 
      : modulo?.orientamentoTetto;
    
    if (orientamento === 'sud') {
      fattoreOrientamento = 1;
      dettagli.push('Orientamento: Sud (ottimale)');
    } else if (orientamento === 'sud-est' || orientamento === 'sud-ovest') {
      fattoreOrientamento = 1.1;
      dettagli.push('Orientamento: Sud-Est/Sud-Ovest (+10% superficie)');
    } else if (orientamento === 'est' || orientamento === 'ovest' || orientamento === 'est-ovest') {
      fattoreOrientamento = 1.2;
      dettagli.push('Orientamento: Est/Ovest (+20% superficie)');
    }

    // Fattore ombre
    let fattoreOmbre = 1;
    if (modulo?.zoneOmbra === 'leggera') {
      fattoreOmbre = 1.15;
      dettagli.push('Ombre leggere (+15% superficie)');
    } else if (modulo?.zoneOmbra === 'importante') {
      fattoreOmbre = 1.3;
      dettagli.push('Ombre importanti (+30% superficie)');
    }

    // Fattore batteria (più energia da produrre)
    let fattoreBatteria = 1;
    if (modulo?.batteriaAccumulo === 'si') {
      fattoreBatteria = 1.2;
      dettagli.push('Con batteria di accumulo (+20% per ottimizzazione)');
    }

    // Fattore regionale approssimativo
    let fattoreRegionale = 1;
    const regione = info.regione?.toLowerCase();
    if (regione?.includes('sicilia') || regione?.includes('sardegna') || regione?.includes('calabria')) {
      fattoreRegionale = 0.9;
      dettagli.push('Regione del Sud (-10% grazie a maggiore irradiazione)');
    } else if (regione?.includes('lombardia') || regione?.includes('piemonte') || regione?.includes('valle')) {
      fattoreRegionale = 1.1;
      dettagli.push('Regione del Nord (+10% per minore irradiazione)');
    }

    const superficieCalcolata = Math.ceil(
      superficieBase * fattoreConsumi * fattoreObiettivo * fattoreOrientamento * 
      fattoreOmbre * fattoreBatteria * fattoreRegionale
    );

    return {
      superficie: superficieCalcolata,
      dettagli
    };
  };

  const { superficie, dettagli } = calcolaSuperficieNecessaria();

  const options = [
    { id: 'si', label: 'Sì, ho questa superficie disponibile' },
    { id: 'no', label: 'No, non ho abbastanza spazio' }
  ];

  const infoBox = {
    title: "Come calcoliamo la superficie necessaria",
    content: `La superficie del tetto necessaria dipende da diversi fattori: i tuoi consumi energetici, l'orientamento e le caratteristiche del tetto, la presenza di ombre, i tuoi obiettivi e la zona geografica. ${dettagli.join('. ')}.`
  };

  const handleSelectionChange = (value: string) => {
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        superficieDisponibile: value
      }
    });
  };

  return (
    <QuestionWithOptions
      badge="Impianto fotovoltaico"
      icon="🏠"
      iconAlt="Casa"
      title={`Hai almeno ${superficie} mq di superficie disponibile sul tetto?`}
      description="In base alle informazioni che ci hai fornito, abbiamo calcolato la superficie di tetto necessaria per il tuo impianto fotovoltaico personalizzato."
      infoBox={infoBox}
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelectionChange}
      onNext={onNext}
      onBack={onBack}
      nextButtonText="Continua"
      backButtonText="Indietro"
    />
  );
};