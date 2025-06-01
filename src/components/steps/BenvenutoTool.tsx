
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
  const [moduliSelezionati, setModuliSelezionati] = useState<string[]>(['impianto-elettrico']);

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
        // Rimuovi se già selezionato
        return prev.filter(id => id !== moduloId);
      } else if (prev.length < 4) {
        // Aggiungi se non siamo al limite
        return [...prev, moduloId];
      }
      // Se siamo al limite, non fare nulla
      return prev;
    });
  };

  return (
    <div className="space-y-8 text-center">
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

      {/* Box stima con sfondo pieno */}
      <div className="bg-[#fbe12e] p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
        <div className="text-center">
          <div className="text-sm text-gray-700 mb-2 font-medium">Budget stimato per questo progetto</div>
          <div className="text-3xl md:text-4xl font-bold text-[#1c1c1c] mb-3">
            €45.000 - €55.000
          </div>
          <div className="bg-green-600 text-white px-3 py-1.5 rounded-lg inline-block font-medium text-sm mb-3">
            + Detrazioni fiscali disponibili
          </div>
          
          {/* Dettagli configurazione minimal */}
          <div className="text-xs text-gray-600 pt-2 border-t border-gray-300/50">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                Appartamento 80 m²
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                Torino
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                4 locali
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3 text-green-600" />
                Impianto + Sicurezza
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Selezione moduli */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1c1c1c] mb-2">Seleziona i moduli per il tuo progetto</h2>
          <p className="text-sm text-gray-600">
            Puoi selezionare fino a {4 - moduliSelezionati.length} moduli aggiuntivi ({moduliSelezionati.length}/4 selezionati)
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {moduli.map((modulo) => {
            const Icon = modulo.icon;
            const isSelected = moduliSelezionati.includes(modulo.id);
            const isDisabled = !isSelected && moduliSelezionati.length >= 4;
            
            return (
              <div
                key={modulo.id}
                onClick={() => !isDisabled && toggleModulo(modulo.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'bg-[#d8010c] text-white shadow-lg' 
                    : isDisabled
                    ? 'bg-gray-100 border-2 border-gray-200 cursor-not-allowed opacity-50'
                    : 'bg-white border-2 border-gray-200 hover:border-[#d8010c] hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    isSelected ? 'bg-white text-[#d8010c]' : 'bg-gray-100 text-[#d8010c]'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-left flex-1">
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

        {/* Bottone inizia ora prominente */}
        <div className="space-y-4">
          <Button 
            onClick={onStart}
            disabled={moduliSelezionati.length === 0}
            className="px-12 py-6 text-xl bg-[#d8010c] hover:bg-[#b8000a] text-white rounded-xl flex items-center justify-center gap-3 mx-auto transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Inizia la configurazione
            <ArrowRight className="h-6 w-6" />
          </Button>
          
          <div className="text-sm text-gray-500">
            Gratuito • Pochi minuti • Senza impegno
          </div>
        </div>
      </div>
    </div>
  );
};
