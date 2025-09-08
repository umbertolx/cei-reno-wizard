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
    <Card className="bg-background border-red-500 border-2">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-4">
          Riepilogo del tuo impianto
        </h3>
        
        <div className="flex gap-6">
          {/* Superficie necessaria - enfatizzata */}
          <div className="flex-1">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Home className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-sm text-red-700 mb-1">Superficie necessaria</div>
              <div className="text-2xl font-bold text-red-800">{superficieMin}-{superficieMax} mq</div>
            </div>
          </div>

          {/* Altre variabili */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Consumo annuale</div>
                <div className="font-semibold text-foreground text-sm">{consumoAnnuale.toLocaleString()} kWh</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Battery className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Sistema accumulo</div>
                <div className="font-semibold text-foreground text-sm">
                  {hasBatteria ? 'Con batteria' : 'Senza batteria'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Sun className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Produzione stimata</div>
                <div className="font-semibold text-foreground text-sm">{produzionStimata.toLocaleString()} kWh/anno</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};