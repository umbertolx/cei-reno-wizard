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
    } else if (orientamento === 'est' || orientamento === 'ovest') {
      fattoreOrientamento = 0.85;
    } else if (orientamento === 'nord-est' || orientamento === 'nord-ovest') {
      fattoreOrientamento = 0.70;
    } else if (orientamento === 'nord') {
      fattoreOrientamento = 0.60;
    } else if (orientamento === 'non-lo-so') {
      fattoreOrientamento = 0.85; // Fattore prudenziale
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
  
  // Calcola kWp stimati (6 mq = ~1 kWp)
  const kWpStimati = Math.round(((superficieMin + superficieMax) / 2 / 6) * 10) / 10;
  
  // Determina l'obiettivo
  const getObiettivo = (): string => {
    const tipoIntervento = formData.moduloFotovoltaico?.tipoInterventoFotovoltaico;
    const obiettivo = formData.moduloFotovoltaico?.obiettivoAmpliamento;
    
    if (tipoIntervento === 'ampliamento') {
      if (obiettivo === 'risparmio-bolletta') return 'Risparmio bolletta';
      if (obiettivo === 'indipendenza-energetica') return 'Indipendenza energetica';
      return 'Ampliamento impianto';
    }
    return 'Nuovo impianto';
  };

  // Ottieni tipo di falda
  const getTipoFalda = (): string => {
    const tipo = formData.moduloFotovoltaico?.tipoFalda;
    if (tipo === 'piano') return 'Tetto piano';
    if (tipo === 'singola') return 'Falda singola';
    if (tipo === 'multiple') return 'Falde multiple';
    return 'Non specificato';
  };

  // Ottieni orientamento
  const getOrientamento = (): string => {
    const tipoFalda = formData.moduloFotovoltaico?.tipoFalda;
    
    // Per tetto piano
    if (tipoFalda === 'piano') {
      return '0º Sud';
    }
    
    const orientamento = Array.isArray(formData.moduloFotovoltaico?.orientamentoTetto) 
      ? formData.moduloFotovoltaico.orientamentoTetto[0] 
      : formData.moduloFotovoltaico?.orientamentoTetto;
    
    if (orientamento === 'sud') return '0º Sud';
    if (orientamento === 'sud-est') return '45º Sud-Est';
    if (orientamento === 'sud-ovest') return '45º Sud-Ovest';
    if (orientamento === 'est') return '90º Est';
    if (orientamento === 'ovest') return '90º Ovest';
    if (orientamento === 'nord-est') return '135º Nord-Est';
    if (orientamento === 'nord-ovest') return '135º Nord-Ovest';
    if (orientamento === 'nord') return '180º Nord';
    if (orientamento === 'non-lo-so') return '0º Sud';
    return '0º Sud';
  };

  return (
    <div className="bg-muted/40 rounded-lg p-5">
      <h4 className="font-semibold text-foreground text-base mb-4">
        Riepilogo del tuo impianto
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-cei-red rounded-md p-3 border border-cei-red">
          <div className="text-white text-xs mb-2 uppercase tracking-wide font-bold">Superficie necessaria</div>
          <div className="font-bold text-white text-lg">25-30 mq</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Obiettivo</div>
          <div className="font-semibold text-foreground">{getObiettivo()}</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Nuovo impianto</div>
          <div className="font-semibold text-foreground">{kWpStimati}</div>
          <div className="text-muted-foreground text-xs">kWp</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Resa attesa</div>
          <div className="font-semibold text-foreground">{produzionStimata.toLocaleString()}</div>
          <div className="text-muted-foreground text-xs">kWh/anno</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Con batteria</div>
          <div className="font-semibold text-foreground">{hasBatteria ? 'Sì' : 'No'}</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Tipo falda</div>
          <div className="font-semibold text-foreground">{getTipoFalda()}</div>
        </div>
        
        <div className="bg-background rounded-md p-3">
          <div className="text-muted-foreground text-xs mb-2 uppercase tracking-wide">Orientamento</div>
          <div className="font-semibold text-foreground">{getOrientamento()}</div>
        </div>
      </div>
    </div>
  );
};