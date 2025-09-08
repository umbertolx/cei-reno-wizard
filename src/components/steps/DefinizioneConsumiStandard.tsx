import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { Check, Zap, Car, Droplets, Fan, ThermometerSun, FlameKindling, Utensils, Coffee, Wifi, ForkKnife } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

type StandardAppliance = {
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
};

type AdvancedFeature = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  hasAdvancedOptions?: boolean;
  advancedOptions?: {
    type: 'slider' | 'select' | 'input';
    label: string;
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    default?: any;
  };
};

export const DefinizioneConsumiStandard = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentConfig = formData.moduloFotovoltaico?.definizioneConsumiStandard || {};
  
  const [standardAppliances, setStandardAppliances] = useState<StandardAppliance[]>([
    { id: 'frigorifero', name: 'Frigorifero', icon: <Utensils className="h-5 w-5" />, selected: true },
    { id: 'lavastoviglie', name: 'Lavastoviglie', icon: <ForkKnife className="h-5 w-5" />, selected: true },
    { id: 'forno', name: 'Forno', icon: <Coffee className="h-5 w-5" />, selected: true },
    { id: 'microonde', name: 'Forno a microonde', icon: <Coffee className="h-5 w-5" />, selected: true },
    { id: 'router', name: 'Router / Modem', icon: <Wifi className="h-5 w-5" />, selected: true },
  ]);

  const [advancedFeatures, setAdvancedFeatures] = useState<{ [key: string]: any }>({
    'piano-induzione': currentConfig['piano-induzione'] || { selected: false },
    'climatizzatori': currentConfig['climatizzatori'] || { selected: false },
    'pompa-calore': currentConfig['pompa-calore'] || { selected: false },
    'boiler-elettrico': currentConfig['boiler-elettrico'] || { selected: false },
    'auto-elettrica': currentConfig['auto-elettrica'] || { selected: false, kmAnnui: 15000 },
    'piscina': currentConfig['piscina'] || { selected: false, tipo: 'solo-pompe' },
  });

  const features: AdvancedFeature[] = [
    {
      id: 'piano-induzione',
      name: 'Piano a induzione',
      description: 'Consumi elevati durante la cottura, ma molto più efficienti del gas.',
      icon: <Zap className="h-6 w-6" />
    },
    {
      id: 'climatizzatori',
      name: 'Climatizzatori',
      description: 'Stima basata su un impianto moderno che raffresca tutta la casa. Consideriamo quante persone abitano l\'immobile e se è prima o seconda casa.',
      icon: <Fan className="h-6 w-6" />
    },
    {
      id: 'pompa-calore',
      name: 'Pompa di calore (riscaldamento + raffrescamento)',
      description: 'Copre sia inverno che estate, a pavimento o con radiatori. È un sistema ad alta efficienza che sostituisce gas e stufe.',
      icon: <ThermometerSun className="h-6 w-6" />
    },
    {
      id: 'boiler-elettrico',
      name: 'Boiler elettrico (scaldabagno)',
      description: 'Il consumo dipende da quanti bagni ci sono, quante persone vivono in casa e se è abitazione principale o secondaria.',
      icon: <FlameKindling className="h-6 w-6" />
    },
    {
      id: 'auto-elettrica',
      name: 'Auto elettrica',
      description: 'Stima basata su 15.000 km/anno con un\'auto di nuova generazione. Puoi personalizzare il tuo chilometraggio.',
      icon: <Car className="h-6 w-6" />,
      hasAdvancedOptions: true,
      advancedOptions: {
        type: 'input',
        label: 'Km annui',
        min: 5000,
        max: 50000,
        default: 15000
      }
    },
    {
      id: 'piscina',
      name: 'Piscina',
      description: 'Consumo base per pompe e filtraggio. Se la piscina è riscaldata, aggiungiamo l\'energia per mantenere l\'acqua.',
      icon: <Droplets className="h-6 w-6" />,
      hasAdvancedOptions: true,
      advancedOptions: {
        type: 'select',
        label: 'Tipo di piscina',
        options: [
          { value: 'solo-pompe', label: 'Solo pompe e filtraggio' },
          { value: 'con-riscaldamento', label: 'Pompe, filtraggio + riscaldamento' }
        ],
        default: 'solo-pompe'
      }
    }
  ];

  const toggleStandardAppliance = (id: string) => {
    setStandardAppliances(prev => 
      prev.map(appliance => 
        appliance.id === id 
          ? { ...appliance, selected: !appliance.selected }
          : appliance
      )
    );
  };

  const toggleAdvancedFeature = (featureId: string) => {
    setAdvancedFeatures(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        selected: !prev[featureId]?.selected
      }
    }));
  };

  const updateAdvancedFeatureOption = (featureId: string, value: any) => {
    setAdvancedFeatures(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        ...(featureId === 'auto-elettrica' ? { kmAnnui: value } : { tipo: value })
      }
    }));
  };

  const handleNext = () => {
    // Combina elettrodomestici standard e features avanzate
    const standardData = standardAppliances.reduce((acc, appliance) => {
      acc[appliance.id] = { selected: appliance.selected };
      return acc;
    }, {} as { [key: string]: any });

    const combinedConfig = {
      ...standardData,
      ...advancedFeatures
    };

    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        definizioneConsumiStandard: combinedConfig
      }
    });

    onNext();
  };

  const renderStandardAppliance = (appliance: StandardAppliance) => (
    <Button
      key={appliance.id}
      onClick={() => toggleStandardAppliance(appliance.id)}
      variant={appliance.selected ? "default" : "outline"}
      className={`
        h-auto p-4 justify-start text-left
        ${appliance.selected 
          ? 'bg-[#d8010c] hover:bg-[#b8000a] text-white border-[#d8010c]' 
          : 'bg-white border-gray-200 text-gray-700 hover:border-[#d8010c] hover:text-[#d8010c]'
        }
      `}
    >
      <div className="flex items-center gap-3 w-full">
        {appliance.icon}
        <span className="font-medium">{appliance.name}</span>
        {appliance.selected && (
          <Check className="h-4 w-4 ml-auto" />
        )}
      </div>
    </Button>
  );

  const renderAdvancedFeature = (feature: AdvancedFeature) => {
    const isSelected = advancedFeatures[feature.id]?.selected || false;
    
    return (
      <div key={feature.id} className="space-y-3">
        <div
          onClick={() => toggleAdvancedFeature(feature.id)}
          className={`
            rounded-xl transition-all duration-300 border cursor-pointer p-6
            ${isSelected 
              ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
              : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
            }
          `}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className={`
                p-3 rounded-lg flex-shrink-0
                ${isSelected ? 'bg-[#d8010c] text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                {feature.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-lg text-[#1c1c1c] mb-2">
                  {feature.name}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
            {isSelected && (
              <div className="w-6 h-6 bg-[#d8010c] rounded-full flex items-center justify-center ml-4 flex-shrink-0">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Opzioni avanzate */}
        {isSelected && feature.hasAdvancedOptions && feature.advancedOptions && (
          <div className="ml-4 pl-6 border-l-2 border-[#d8010c]/20 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1c1c1c]">
                {feature.advancedOptions.label}
              </label>
              
              {feature.advancedOptions.type === 'input' && (
                <Input
                  type="number"
                  min={feature.advancedOptions.min}
                  max={feature.advancedOptions.max}
                  value={advancedFeatures[feature.id]?.kmAnnui || feature.advancedOptions.default}
                  onChange={(e) => updateAdvancedFeatureOption(feature.id, parseInt(e.target.value) || feature.advancedOptions!.default)}
                  className="max-w-xs"
                  placeholder={`${feature.advancedOptions.min}–${feature.advancedOptions.max}`}
                />
              )}
              
              {feature.advancedOptions.type === 'select' && (
                <div className="space-y-2">
                  {feature.advancedOptions.options?.map((option) => (
                    <Button
                      key={option.value}
                      onClick={() => updateAdvancedFeatureOption(feature.id, option.value)}
                      variant={advancedFeatures[feature.id]?.tipo === option.value ? "default" : "outline"}
                      className={`
                        w-full justify-start h-auto p-3
                        ${advancedFeatures[feature.id]?.tipo === option.value
                          ? 'bg-[#d8010c] hover:bg-[#b8000a] text-white border-[#d8010c]' 
                          : 'bg-white border-gray-200 text-gray-700 hover:border-[#d8010c]'
                        }
                      `}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          Impianto fotovoltaico
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
                alt="House icon"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Definizione consumi</h2>
            </div>
          </div>
          
          {/* Domanda principale */}
          <div className="space-y-4 px-3 md:px-0">
            <h3 className="text-lg font-semibold text-[#1c1c1c]">
              Definisci le principali voci di consumo per aiutarci a stimare il tuo fabbisogno:
            </h3>
          </div>

          {/* Elettrodomestici standard */}
          <div className="space-y-4 px-3 md:px-0">
            <h4 className="text-base font-medium text-[#1c1c1c]">
              Elettrodomestici base (preselezionati)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {standardAppliances.map(renderStandardAppliance)}
            </div>
          </div>

          <Separator className="mx-3 md:mx-0" />

          {/* Features avanzate */}
          <div className="space-y-4 px-3 md:px-0">
            <h4 className="text-base font-medium text-[#1c1c1c]">
              Consumi impattanti (seleziona se presenti)
            </h4>
            <div className="space-y-4">
              {features.map(renderAdvancedFeature)}
            </div>
          </div>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <StickyNavigationBar
        onBack={onBack}
        onNext={handleNext}
        nextButtonText="Avanti"
        backButtonText="Indietro"
      />
    </div>
  );
};