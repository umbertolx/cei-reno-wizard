
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Info, Zap, Wifi, Settings, Smartphone, Home, Cable } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const TipoDomotica = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoDomotica, setTipoDomotica] = useState<string>(formData.tipoDomotica || "");
  const [selectedCardExpanded, setSelectedCardExpanded] = useState<string>("");
  const [showInfo, setShowInfo] = useState(false);

  const handleCardSelect = (value: string) => {
    setTipoDomotica(value);
    setSelectedCardExpanded(value);
  };

  const handleSubmit = () => {
    updateFormData({ tipoDomotica });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Domotica avanzata
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Scegli il tipo di domotica che preferisci per la tua casa
          </h1>
        </div>

        {/* Info Box */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">
                Che differenza c'è tra i due sistemi?
              </span>
            </div>
            <ArrowRight 
              className={`w-4 h-4 text-yellow-600 transition-transform ${showInfo ? 'rotate-90' : ''}`} 
            />
          </button>
          
          {showInfo && (
            <div className="mt-3 text-sm text-yellow-700 space-y-2">
              <p>
                L'impianto filare (KNX) è una soluzione professionale, molto affidabile e stabile nel tempo. 
                Richiede un cablaggio dedicato e ha un costo più elevato, ma offre il massimo in termini di 
                personalizzazione e prestazioni.
              </p>
              <p>
                L'impianto wireless (BTicino Living Now) comunica via radio ed è più semplice e veloce da installare. 
                Ha funzionalità più limitate, ma può essere una buona soluzione quando si vuole contenere il budget.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Card 1: KNX */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            tipoDomotica === 'knx' 
              ? 'ring-2 ring-blue-500 border-blue-500' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => handleCardSelect('knx')}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Domotica filare professionale
                  </h3>
                  <p className="text-gray-600">
                    Massima stabilità e controllo completo
                  </p>
                </div>
                {tipoDomotica === 'knx' && (
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-blue-500" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Affidabilità professionale</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Home className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Già predisposto</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cable className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Personalizzabile</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Più costoso</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Wireless */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            tipoDomotica === 'wireless' 
              ? 'ring-2 ring-blue-500 border-blue-500' 
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => handleCardSelect('wireless')}
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Domotica wireless semplificata
                  </h3>
                  <p className="text-gray-600">
                    Controlla luci, prese e tapparelle via app
                  </p>
                </div>
                {tipoDomotica === 'wireless' && (
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-blue-500" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Comunicazione radio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Installazione veloce</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">💰</span>
                  <span className="text-sm text-gray-700">Più economico</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Controllo smartphone</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expanded Description */}
      {selectedCardExpanded && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 animate-fade-in">
          {selectedCardExpanded === 'knx' && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Sistema KNX - Domotica Filare Professionale</h4>
              <p className="text-gray-700">
                Questo sistema collega tutti i dispositivi con un cavo dedicato. È il più stabile, il più personalizzabile 
                e quello scelto da chi vuole un impianto professionale. Richiede un investimento maggiore, ma offre un 
                livello di automazione superiore e scalabile nel tempo.
              </p>
            </div>
          )}
          
          {selectedCardExpanded === 'wireless' && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">BTicino Living Now - Domotica Wireless</h4>
              <p className="text-gray-700">
                Questo impianto usa connessioni wireless tra i dispositivi. È più semplice da installare e ha un costo 
                più contenuto. Ideale se vuoi funzionalità smart di base senza complessità. Può essere ampliato nel tempo, 
                ma non ha la stessa stabilità della versione filare.
              </p>
            </div>
          )}
          
          {selectedCardExpanded === 'help' && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Ti aiutiamo noi nella scelta</h4>
              <p className="text-gray-700">
                Non sei sicuro di quale sistema scegliere? Nessun problema! I nostri esperti ti contatteranno per 
                valutare insieme le tue esigenze specifiche e consigliarti la soluzione più adatta al tuo progetto e budget.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Third Option */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => handleCardSelect('help')}
          className={`${
            tipoDomotica === 'help' 
              ? 'bg-blue-50 border-blue-500 text-blue-700' 
              : 'border-gray-300 text-gray-700 hover:border-blue-300'
          }`}
        >
          Non sono sicuro, aiutatemi voi
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Indietro</span>
        </Button>
        
        <Button 
          onClick={handleSubmit} 
          disabled={!tipoDomotica}
          className="flex items-center space-x-2"
        >
          <span>Avanti</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
