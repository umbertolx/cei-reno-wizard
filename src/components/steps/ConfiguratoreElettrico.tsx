
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, ArrowLeft, Building } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ConfiguratoreElettrico = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [tipoRistrutturazione, setTipoRistrutturazione] = useState<string>(formData.tipoRistrutturazione || "");

  const handleSubmit = () => {
    updateFormData({ 
      tipoRistrutturazione 
    });
    onNext();
  };

  const isFormValid = tipoRistrutturazione !== "";

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Badge in alto */}
      <div className="text-center">
        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 border-blue-200">
          Impianto elettrico
        </Badge>
      </div>

      {/* Contenuto principale */}
      <div className="space-y-8">
        {/* Icona e domanda */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Che tipo di intervento stai pianificando?
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Seleziona il tipo di lavoro per ricevere una stima più precisa
            </p>
          </div>
        </div>

        {/* Opzioni di risposta */}
        <div className="max-w-xl mx-auto space-y-3">
          <RadioGroup value={tipoRistrutturazione} onValueChange={setTipoRistrutturazione}>
            <div 
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
                ${tipoRistrutturazione === 'completa' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
              onClick={() => setTipoRistrutturazione('completa')}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem 
                  value="completa" 
                  id="completa" 
                  className={`${tipoRistrutturazione === 'completa' ? 'border-blue-500 text-blue-500' : ''}`}
                />
                <label htmlFor="completa" className="text-base font-medium text-gray-900 cursor-pointer flex-1">
                  Ristrutturazione completa
                </label>
              </div>
            </div>

            <div 
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
                ${tipoRistrutturazione === 'nuova' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
              onClick={() => setTipoRistrutturazione('nuova')}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem 
                  value="nuova" 
                  id="nuova" 
                  className={`${tipoRistrutturazione === 'nuova' ? 'border-blue-500 text-blue-500' : ''}`}
                />
                <label htmlFor="nuova" className="text-base font-medium text-gray-900 cursor-pointer flex-1">
                  Nuova costruzione
                </label>
              </div>
            </div>

            <div 
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all duration-200
                ${tipoRistrutturazione === 'parziale' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
              onClick={() => setTipoRistrutturazione('parziale')}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem 
                  value="parziale" 
                  id="parziale" 
                  className={`${tipoRistrutturazione === 'parziale' ? 'border-blue-500 text-blue-500' : ''}`}
                />
                <label htmlFor="parziale" className="text-base font-medium text-gray-900 cursor-pointer flex-1">
                  Intervento parziale
                </label>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <div className="flex gap-4 justify-center pt-8">
        <Button 
          onClick={onBack}
          variant="outline"
          className="px-6 py-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Indietro
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="px-6 py-2"
        >
          Avanti
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
