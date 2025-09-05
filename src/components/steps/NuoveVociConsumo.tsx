import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { StickyNavigationBar } from "@/components/shared/StickyNavigationBar";

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

type ConsumoOption = {
  id: string;
  label: string;
  description: string;
};

const NuoveVociConsumo = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [selectedConsumi, setSelectedConsumi] = useState<string[]>(
    formData.nuoveVociConsumo || []
  );

  const consumoOptions: ConsumoOption[] = [
    {
      id: 'climatizzatori',
      label: 'Climatizzatori',
      description: 'Sistemi di climatizzazione per riscaldamento e raffrescamento'
    },
    {
      id: 'pompa_calore',
      label: 'Pompa di calore (riscaldamento + raffrescamento)',
      description: 'Sistema efficiente per riscaldamento e raffrescamento'
    },
    {
      id: 'boiler_elettrico',
      label: 'Boiler elettrico (scaldabagno)',
      description: 'Scaldabagno elettrico per acqua calda sanitaria'
    },
    {
      id: 'auto_elettrica',
      label: 'Auto elettrica',
      description: 'Ricarica domestica per veicoli elettrici'
    },
    {
      id: 'piscina',
      label: 'Piscina',
      description: 'Sistemi di filtrazione e riscaldamento per piscina'
    }
  ];

  const handleOptionToggle = (optionId: string) => {
    const newSelected = selectedConsumi.includes(optionId)
      ? selectedConsumi.filter(id => id !== optionId)
      : [...selectedConsumi, optionId];
    
    setSelectedConsumi(newSelected);
    updateFormData({
      nuoveVociConsumo: newSelected
    });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Badge variant="outline" className="mb-4">
            Fotovoltaico
          </Badge>
          
          <h2 className="text-2xl font-bold text-gray-900">
            Hai in programma di aggiungere nuove voci di consumo impattanti?
          </h2>
          
          <p className="text-gray-600">
            Seleziona tutti gli elettrodomestici o sistemi che hai intenzione di installare o acquistare.
          </p>
        </div>

        <div className="space-y-4">
          {consumoOptions.map((option) => (
            <div
              key={option.id}
              className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleOptionToggle(option.id)}
            >
              <Checkbox
                id={option.id}
                checked={selectedConsumi.includes(option.id)}
                onCheckedChange={() => handleOptionToggle(option.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <label
                  htmlFor={option.id}
                  className="text-base font-medium text-gray-900 cursor-pointer"
                >
                  {option.label}
                </label>
                <p className="text-sm text-gray-600">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            Perché ti chiediamo queste informazioni?
          </h4>
          <p className="text-sm text-blue-800">
            Conoscere i tuoi piani futuri ci aiuta a dimensionare correttamente l'impianto fotovoltaico, 
            considerando anche i consumi aggiuntivi che potrebbero aumentare nel tempo.
          </p>
        </div>

        <StickyNavigationBar
          onBack={onBack}
          onNext={handleNext}
          nextButtonText="Continua"
        />
      </CardContent>
    </Card>
  );
};

export default NuoveVociConsumo;