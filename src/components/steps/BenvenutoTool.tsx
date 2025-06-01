
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Shield, Thermometer, Check, Home, Users, MapPin } from "lucide-react";

type Props = {
  onStart: () => void;
};

type Modulo = {
  id: string;
  nome: string;
  icon: React.ComponentType<any>;
  descrizione: string;
};

export const BenvenutoTool = ({ onStart }: Props) => {
  const [moduliSelezionati, setModuliSelezionati] = useState<string[]>([
    'impianto-elettrico',
    'sicurezza'
  ]);

  const moduli: Modulo[] = [
    {
      id: 'impianto-elettrico',
      nome: 'Impianto elettrico',
      icon: Zap,
      descrizione: 'Rifacimento completo impianto'
    },
    {
      id: 'fotovoltaico',
      nome: 'Fotovoltaico',
      icon: Sun,
      descrizione: 'Pannelli solari e storage'
    },
    {
      id: 'sicurezza',
      nome: 'Sicurezza',
      icon: Shield,
      descrizione: 'Allarmi e videosorveglianza'
    },
    {
      id: 'termotecnico',
      nome: 'Termotecnico',
      icon: Thermometer,
      descrizione: 'Riscaldamento e climatizzazione'
    }
  ];

  const toggleModulo = (moduloId: string) => {
    setModuliSelezionati(prev => {
      if (prev.includes(moduloId)) {
        return prev.filter(id => id !== moduloId);
      } else {
        return [...prev, moduloId];
      }
    });
  };

  return (
    <div className="space-y-12 text-center">
      {/* Badge Impianti Civili */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium">
          Impianti Civili
        </div>
      </div>

      {/* Header principale */}
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1c1c1c] leading-tight">
          Configura il tuo impianto,<br />
          <span className="text-[#d8010c]">scopri subito online budget e vantaggi</span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Personalizza il tuo intervento e scopri costi e curiosità
        </p>
      </div>

      {/* Selezione moduli */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1c1c1c] mb-8">Seleziona i moduli ed inizia ora</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduli.map((modulo) => {
            const Icon = modulo.icon;
            const isSelected = moduliSelezionati.includes(modulo.id);
            
            return (
              <div
                key={modulo.id}
                onClick={() => toggleModulo(modulo.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-[#d8010c] bg-red-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-[#fbe12e] hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    isSelected ? 'bg-[#d8010c] text-white' : 'bg-gray-100 text-[#d8010c]'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${isSelected ? 'text-[#d8010c]' : 'text-[#1c1c1c]'}`}>
                      {modulo.nome}
                    </div>
                    <div className="text-sm text-gray-600">{modulo.descrizione}</div>
                  </div>
                  {isSelected && (
                    <div className="ml-auto">
                      <div className="w-6 h-6 bg-[#d8010c] rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottone inizia configurazione */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#1c1c1c]">Inizia configurazione</h3>
        
        <Button 
          onClick={onStart}
          className="px-8 py-4 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300"
        >
          Inizia ora
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Box stima semplificato */}
      <div className="bg-white border-2 border-[#fbe12e] p-8 rounded-2xl shadow-sm max-w-lg mx-auto">
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

      {/* Caratteristiche esempio */}
      <div className="max-w-4xl mx-auto">
        <div className="text-sm text-gray-600 mb-6">Esempio di configurazione:</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tipo immobile */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Home className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Tipo immobile</span>
            </div>
            <div className="text-sm font-bold text-blue-900">Appartamento</div>
          </div>

          {/* Superficie */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Superficie</span>
            </div>
            <div className="text-sm font-bold text-green-900">80 m²</div>
          </div>

          {/* Località */}
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Località</span>
            </div>
            <div className="text-sm font-bold text-purple-900">Torino</div>
          </div>

          {/* Composizione */}
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-700">Composizione</span>
            </div>
            <div className="text-xs font-bold text-orange-900">1 Sala + 1 Cucina<br />2 Camere + 2 Bagni</div>
          </div>
        </div>

        {/* Moduli selezionati nell'esempio */}
        <div className="mt-6">
          <div className="flex justify-center mb-4">
            <div className="bg-[#d8010c] text-white px-4 py-2 rounded-full text-sm font-medium">
              Moduli selezionati nell'esempio
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
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
      </div>

      <div className="text-sm text-gray-500">
        Gratuito • Pochi minuti • Senza impegno
      </div>
    </div>
  );
};
