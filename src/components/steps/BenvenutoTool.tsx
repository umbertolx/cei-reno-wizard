
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Shield, Thermometer, Check } from "lucide-react";

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
  const [moduloSelezionato, setModuloSelezionato] = useState<string>('impianto-elettrico');

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
            const isSelected = moduloSelezionato === modulo.id;
            
            return (
              <div
                key={modulo.id}
                onClick={() => setModuloSelezionato(modulo.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'bg-[#d8010c] text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-200 hover:border-[#d8010c] hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    isSelected ? 'bg-white text-[#d8010c]' : 'bg-gray-100 text-[#d8010c]'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${isSelected ? 'text-white' : 'text-[#1c1c1c]'}`}>
                      {modulo.nome}
                    </div>
                    <div className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                      {modulo.descrizione}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-auto">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-[#d8010c]" />
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

      {/* Box stima con sfondo pieno */}
      <div className="bg-[#fbe12e] p-8 rounded-2xl shadow-lg max-w-lg mx-auto">
        <div className="text-center">
          <div className="text-sm text-gray-700 mb-3 font-medium">Budget stimato per questo progetto</div>
          <div className="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-4">
            €45.000 - €55.000
          </div>
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg inline-block font-medium">
            <span className="text-sm">+ Detrazioni fiscali disponibili</span>
          </div>
        </div>
      </div>

      {/* Dettagli configurazione minimal */}
      <div className="max-w-2xl mx-auto">
        <div className="text-sm text-gray-600 mb-4">Dettagli configurazione esempio:</div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>Appartamento 80 m²</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>Torino</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>1 Sala + 1 Cucina</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>2 Camere + 2 Bagni</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>Impianto elettrico</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>Sistema sicurezza</span>
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
