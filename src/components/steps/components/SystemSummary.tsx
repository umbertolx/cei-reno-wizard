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
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          Riepilogo del tuo impianto
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Consumo annuale</div>
              <div className="font-semibold text-gray-900">{consumoAnnuale.toLocaleString()} kWh</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Battery className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Sistema accumulo</div>
              <div className="font-semibold text-gray-900">
                {hasBatteria ? 'Con batteria' : 'Senza batteria'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Superficie necessaria</div>
              <div className="font-semibold text-gray-900">{superficieMin}-{superficieMax} mq</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Sun className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Produzione stimata</div>
              <div className="font-semibold text-gray-900">{produzionStimata.toLocaleString()} kWh/anno</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};