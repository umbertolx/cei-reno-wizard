import { Card, CardContent } from "@/components/ui/card";
import { Zap, Battery, Home, Sun } from "lucide-react";
import { FormData } from "@/components/Configuratore";

type Props = {
  formData: FormData;
  superficieMin: number;
  superficieMax: number;
};

export const SystemSummary = ({ formData, superficieMin, superficieMax }: Props) => {
  // Calcola il consumo annuale
  const getConsumoAnnuale = (): number => {
    const modulo = formData.moduloFotovoltaico;
    if (modulo?.conosceConsumi === 'si' && modulo.consumiKWh) {
      return modulo.consumiKWh;
    } else if (modulo?.spesaMensile) {
      return Math.round(modulo.spesaMensile * 12 / 0.25); // €0.25/kWh medio
    }
    return 3500; // Default famiglia media
  };

  // Calcola la produzione stimata
  const getProduzioneStimata = (): number => {
    const consumo = getConsumoAnnuale();
    const modulo = formData.moduloFotovoltaico;
    
    // Base: 1 kWp produce ~1300 kWh/anno in Italia
    const kWhPerKWp = 1300;
    
    // Fattore orientamento
    let fattoreOrientamento = 1;
    const orientamento = Array.isArray(modulo?.orientamentoTetto) 
      ? modulo.orientamentoTetto[0] 
      : modulo?.orientamentoTetto;
    
    if (orientamento === 'sud') {
      fattoreOrientamento = 1;
    } else if (orientamento === 'sud-est' || orientamento === 'sud-ovest') {
      fattoreOrientamento = 0.95;
    } else if (orientamento === 'est' || orientamento === 'ovest' || orientamento === 'est-ovest') {
      fattoreOrientamento = 0.85;
    }

    // Fattore ombre
    let fattoreOmbre = 1;
    if (modulo?.zoneOmbra === 'leggera') {
      fattoreOmbre = 0.9;
    } else if (modulo?.zoneOmbra === 'importante') {
      fattoreOmbre = 0.75;
    }

    // Fattore regionale
    let fattoreRegionale = 1;
    const regione = formData.informazioniGenerali?.regione?.toLowerCase();
    if (regione?.includes('sicilia') || regione?.includes('sardegna') || regione?.includes('calabria')) {
      fattoreRegionale = 1.15;
    } else if (regione?.includes('lombardia') || regione?.includes('piemonte') || regione?.includes('valle')) {
      fattoreRegionale = 0.9;
    }

    // Stima kWp necessari (6 mq = ~1 kWp)
    const kWpStimati = (superficieMin + superficieMax) / 2 / 6;
    
    // Produzione totale stimata
    const produzione = kWpStimati * kWhPerKWp * fattoreOrientamento * fattoreOmbre * fattoreRegionale;
    
    return Math.round(produzione);
  };

  const consumoAnnuale = getConsumoAnnuale();
  const produzionStimata = getProduzioneStimata();
  const hasBatteria = formData.moduloFotovoltaico?.batteriaAccumulo === 'si';

  return (
    <div className="bg-muted/40 rounded-lg p-5 border border-border">
      <h4 className="font-semibold text-foreground text-base mb-4">
        Riepilogo del tuo impianto
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background rounded-md p-3 border border-primary/30">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Superficie necessaria</div>
          <div className="font-bold text-primary text-lg">{superficieMin}-{superficieMax} mq</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Consumo annuale</div>
          <div className="font-semibold text-foreground">{consumoAnnuale.toLocaleString()}</div>
          <div className="text-muted-foreground text-xs">kWh</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Con batteria</div>
          <div className="font-semibold text-foreground">{hasBatteria ? 'Sì' : 'No'}</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Produzione stimata</div>
          <div className="font-semibold text-foreground">{produzionStimata.toLocaleString()}</div>
          <div className="text-muted-foreground text-xs">kWh/anno</div>
        </div>
      </div>
    </div>
  );
};