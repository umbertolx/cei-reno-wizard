
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sun, Shield, Thermometer, Check, Home, Users, MapPin } from "lucide-react";

type Props = {
  onStart: () => void;
};

export const BenvenutoTool = ({ onStart }: Props) => {
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

      {/* Box stima ridisegnato */}
      <div className="bg-gradient-to-br from-[#fbe12e] to-[#f5d91a] p-8 rounded-3xl shadow-lg max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#1c1c1c] mb-2">Esempio di stima personalizzata</h2>
          <p className="text-sm text-[#1c1c1c] opacity-75">Basata su una configurazione tipo</p>
        </div>
        
        {/* Caratteristiche immobile */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Home className="h-6 w-6 text-[#d8010c] mb-2" />
              <div className="text-sm font-medium text-[#1c1c1c]">Appartamento</div>
              <div className="text-lg font-bold text-[#1c1c1c]">80 m²</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 text-[#d8010c] mb-2" />
              <div className="text-sm font-medium text-[#1c1c1c]">Composizione</div>
              <div className="text-lg font-bold text-[#1c1c1c]">4 locali</div>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-6 w-6 text-[#d8010c] mb-2" />
              <div className="text-sm font-medium text-[#1c1c1c]">Zona</div>
              <div className="text-lg font-bold text-[#1c1c1c]">Nord Italia</div>
            </div>
          </div>
        </div>

        {/* Moduli selezionati */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-[#1c1c1c]">Moduli selezionati</h3>
            <div className="inline-block bg-[#d8010c] text-white px-3 py-1 rounded-full text-sm font-medium mt-1">
              3 di 4 moduli
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Impianto elettrico</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Sicurezza</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-green-700">Domotica base</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg opacity-60">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-500">Termotecnico</span>
            </div>
          </div>
        </div>
        
        {/* Range di prezzo */}
        <div className="text-center">
          <div className="text-sm font-medium text-[#1c1c1c] mb-2">Stima del budget</div>
          <div className="text-4xl md:text-5xl font-bold text-[#1c1c1c] mb-2">
            €4.500 - €6.800
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg inline-block">
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
