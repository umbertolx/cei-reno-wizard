
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Shield, Thermometer, Check, Home, Users, MapPin, Plus, Minus } from "lucide-react";

type Props = {
  onStart: () => void;
};

type Ambiente = {
  id: string;
  nome: string;
  count: number;
  max?: number;
};

export const BenvenutoTool = ({ onStart }: Props) => {
  const [ambienti, setAmbienti] = useState<Ambiente[]>([
    { id: 'soggiorno', nome: 'Soggiorno', count: 1 },
    { id: 'cucina', nome: 'Cucina', count: 1, max: 1 },
    { id: 'camera-doppia', nome: 'Camera doppia', count: 1 },
    { id: 'camera-singola', nome: 'Camera singola', count: 0 },
    { id: 'bagno', nome: 'Bagno', count: 1 },
    { id: 'altro', nome: 'Altro', count: 0 }
  ]);

  const [moduliSelezionati, setModuliSelezionati] = useState([
    'Impianto elettrico',
    'Sicurezza', 
    'Domotica base'
  ]);

  const totalStanze = ambienti.reduce((sum, ambiente) => sum + ambiente.count, 0);

  const updateAmbiente = (id: string, increment: boolean) => {
    setAmbienti(prev => prev.map(ambiente => {
      if (ambiente.id === id) {
        const newCount = increment 
          ? Math.min(ambiente.count + 1, ambiente.max || 10)
          : Math.max(ambiente.count - 1, 0);
        return { ...ambiente, count: newCount };
      }
      return ambiente;
    }));
  };

  const calcolaStima = () => {
    const costoBase = 80 * 400; // 80mq * 400€/mq
    const costoAmbienti = ambienti.reduce((sum, ambiente) => {
      const costi = {
        'soggiorno': 3500,
        'cucina': 5000,
        'camera-doppia': 3000,
        'camera-singola': 2500,
        'bagno': 5500,
        'altro': 2000
      };
      return sum + (ambiente.count * (costi[ambiente.id as keyof typeof costi] || 0));
    }, 0);
    
    const costoTotale = costoBase + costoAmbienti;
    return {
      min: Math.round(costoTotale * 0.8),
      max: Math.round(costoTotale * 1.2)
    };
  };

  const stima = calcolaStima();

  return (
    <div className="space-y-12 text-center">
      {/* Header principale */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight">
          Configura il tuo impianto<br />
          <span className="text-[#d8010c]">ottieni subito un budget</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Seleziona il tipo di intervento e ricevi una stima gratuita online
        </p>

        <Button 
          onClick={onStart}
          className="px-8 py-4 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300"
        >
          Inizia configurazione
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Moduli semplificati */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Zap className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Impianto elettrico</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Sun className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Fotovoltaico</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Shield className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Sicurezza</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <Thermometer className="h-8 w-8 text-[#d8010c] mx-auto mb-3" />
          <div className="font-semibold text-[#1c1c1c] text-sm">Termotecnico</div>
        </div>
      </div>

      {/* Box stima con contorno giallo */}
      <div className="bg-white border-2 border-[#fbe12e] p-8 rounded-2xl shadow-sm max-w-2xl mx-auto">
        {/* Caratteristiche immobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <Home className="h-6 w-6 text-[#d8010c] mb-2" />
            <div className="text-sm text-gray-600">Appartamento</div>
            <div className="text-lg font-bold text-[#1c1c1c]">80 m²</div>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-6 w-6 text-[#d8010c] mb-2" />
            <div className="text-sm text-gray-600">Composizione</div>
            <div className="text-lg font-bold text-[#1c1c1c]">1 Sala + 1 Cucina + 2 Camere + 2 Bagni</div>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="h-6 w-6 text-[#d8010c] mb-2" />
            <div className="text-sm text-gray-600">Località</div>
            <div className="text-lg font-bold text-[#1c1c1c]">Torino</div>
          </div>
        </div>

        {/* Moduli selezionati */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-[#d8010c] text-white px-4 py-2 rounded-full text-sm font-medium">
              Moduli selezionati
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Impianto elettrico</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Sicurezza</span>
            </div>
          </div>
        </div>
        
        {/* Stima del budget */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-3">Budget stimato per questo progetto</div>
          <div className="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-4">
            €45.000 - €55.000
          </div>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg inline-block border border-green-200">
            <span className="text-sm font-medium">+ Detrazioni fiscali disponibili</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        Gratuito • Pochi minuti • Senza impegno
      </div>
    </div>
  );
};
