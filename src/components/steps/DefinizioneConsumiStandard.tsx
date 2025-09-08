import { FormData } from "../Configuratore";
import { StickyNavigationBar } from "../shared/StickyNavigationBar";
import { Check, Zap, Car, Droplets, Fan, ThermometerSun, FlameKindling, Utensils, Coffee, Wifi, ForkKnife, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

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

type AdvancedFeatureState = {
  isActivated: boolean;
  isCompleted: boolean;
  kmAnnui?: number;
  tipo?: string;
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
    { id: 'lavatrice', name: 'Lavatrice', icon: <Droplets className="h-5 w-5" />, selected: true },
    { id: 'forno', name: 'Forno', icon: <Coffee className="h-5 w-5" />, selected: true },
    { id: 'microonde', name: 'Forno a microonde', icon: <Coffee className="h-5 w-5" />, selected: true },
    { id: 'asciugatrice', name: 'Asciugatrice', icon: <Fan className="h-5 w-5" />, selected: true },
    { id: 'router', name: 'Router / Modem', icon: <Wifi className="h-5 w-5" />, selected: true },
  ]);

  const [advancedFeatures, setAdvancedFeatures] = useState<{ [key: string]: AdvancedFeatureState }>({
    'piano-induzione': { 
      isActivated: false, 
      isCompleted: currentConfig['piano-induzione']?.selected || false
    },
    'climatizzatori': { 
      isActivated: false, 
      isCompleted: currentConfig['climatizzatori']?.selected || false
    },
    'pompa-calore': { 
      isActivated: false, 
      isCompleted: currentConfig['pompa-calore']?.selected || false
    },
    'boiler-elettrico': { 
      isActivated: false, 
      isCompleted: currentConfig['boiler-elettrico']?.selected || false
    },
    'auto-elettrica': { 
      isActivated: false, 
      isCompleted: currentConfig['auto-elettrica']?.selected || false,
      kmAnnui: currentConfig['auto-elettrica']?.kmAnnui || 15000
    },
    'piscina': { 
      isActivated: false, 
      isCompleted: currentConfig['piscina']?.selected || false,
      tipo: currentConfig['piscina']?.tipo || 'solo-pompe'
    }
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

  const handleAdvancedFeatureClick = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    const currentState = advancedFeatures[featureId];
    
    if (currentState.isCompleted) {
      // Se è completata, deseleziona
      setAdvancedFeatures(prev => ({
        ...prev,
        [featureId]: {
          ...prev[featureId],
          isActivated: false,
          isCompleted: false
        }
      }));
    } else if (!feature?.hasAdvancedOptions) {
      // Se non ha opzioni avanzate, seleziona direttamente
      setAdvancedFeatures(prev => ({
        ...prev,
        [featureId]: {
          ...prev[featureId],
          isCompleted: true
        }
      }));
    } else if (!currentState.isActivated) {
      // Attiva per mostrare le opzioni avanzate
      setAdvancedFeatures(prev => ({
        ...prev,
        [featureId]: {
          ...prev[featureId],
          isActivated: true
        }
      }));
    } else {
      // Disattiva
      setAdvancedFeatures(prev => ({
        ...prev,
        [featureId]: {
          ...prev[featureId],
          isActivated: false
        }
      }));
    }
  };

  const handleAdvancedFeatureContinue = (featureId: string) => {
    setAdvancedFeatures(prev => ({
      ...prev,
      [featureId]: {
        ...prev[featureId],
        isActivated: false,
        isCompleted: true
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

    const advancedData = Object.entries(advancedFeatures).reduce((acc, [key, value]) => {
      acc[key] = { 
        selected: value.isCompleted,
        ...(key === 'auto-elettrica' && { kmAnnui: value.kmAnnui }),
        ...(key === 'piscina' && { tipo: value.tipo })
      };
      return acc;
    }, {} as { [key: string]: any });

    const combinedConfig = {
      ...standardData,
      ...advancedData
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
    <div
      key={appliance.id}
      onClick={() => toggleStandardAppliance(appliance.id)}
      className={`
        rounded-xl transition-all duration-300 border cursor-pointer p-4
        ${appliance.selected 
          ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
          : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {appliance.icon}
          <div className="font-semibold text-base text-[#1c1c1c]">
            {appliance.name}
          </div>
        </div>
        {appliance.selected && (
          <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );

  const renderAdvancedFeature = (feature: AdvancedFeature) => {
    const featureState = advancedFeatures[feature.id];
    const isActivated = featureState?.isActivated || false;
    const isCompleted = featureState?.isCompleted || false;
    
    return (
      <div key={feature.id} className="space-y-6">
        {/* Feature Card */}
        <div 
          className={`
            rounded-2xl shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative
            ${isCompleted
              ? 'border border-[#d8010c] bg-[#d8010c]/5' 
              : isActivated
              ? 'border border-[#d8010c] bg-[#d8010c]/5'
              : 'bg-white border border-gray-200 hover:border-[#d8010c] hover:shadow-md'
            }
          `}
          onClick={() => handleAdvancedFeatureClick(feature.id)}
        >
          {/* Selection Indicator - Mobile: top right */}
          <div className="md:hidden absolute top-4 right-4 z-10">
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2
              ${(isActivated || isCompleted)
                ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}>
              {(isActivated || isCompleted) && <Check className="h-4 w-4 text-white" />}
            </div>
          </div>

          <div className="space-y-0">
            {/* Feature Title and Description */}
            <div 
              className={`
                p-6 md:p-0
                ${isActivated && !isCompleted
                  ? 'bg-white rounded-t-2xl' 
                  : 'rounded-2xl'
                }
              `}
            >
              {/* Mobile Layout - Image full width on top */}
              <div className="md:hidden space-y-4">
                {/* Feature Image - Full width */}
                <div className="w-full">
                  <div className="w-full h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="p-4 text-gray-600">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content below image */}
                <div className="space-y-2">
                  <h2 className="text-base font-semibold text-[#1c1c1c]">
                    {feature.name}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Desktop Layout - Side by side with perfectly centered image */}
              <div className="hidden md:flex gap-6 p-6">
                {/* Feature Image Container - Fixed height matching content */}
                <div className="flex-shrink-0 flex items-center justify-center h-32">
                  <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="p-4 text-gray-600">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                
                {/* Content Container - Matching height */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-semibold text-[#1c1c1c]">
                      {feature.name}
                    </h2>
                    {/* Selection Indicator - Desktop only */}
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2 flex-shrink-0 ml-4
                      ${(isActivated || isCompleted)
                        ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                      }
                    `}>
                      {(isActivated || isCompleted) && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            {isActivated && !isCompleted && feature.hasAdvancedOptions && feature.advancedOptions && (
              <div className="border-t border-gray-200 space-y-4 bg-white px-6 pb-6 rounded-b-2xl">
                <div className="pt-4 space-y-3">
                  <h3 className="text-base md:text-lg font-semibold text-[#1c1c1c]">
                    Personalizza le impostazioni
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Configura i parametri per una stima più precisa
                  </p>
                </div>

                {/* Input per Auto elettrica */}
                {feature.id === 'auto-elettrica' && feature.advancedOptions.type === 'input' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-[#1c1c1c]">
                        {feature.advancedOptions.label}
                      </Label>
                      <span className="text-sm font-bold text-[#d8010c]">
                        {featureState.kmAnnui || feature.advancedOptions.default}
                      </span>
                    </div>
                    
                    <Input
                      type="number"
                      min={feature.advancedOptions.min}
                      max={feature.advancedOptions.max}
                      value={featureState.kmAnnui || feature.advancedOptions.default}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || feature.advancedOptions!.default;
                        setAdvancedFeatures(prev => ({
                          ...prev,
                          [feature.id]: { ...prev[feature.id], kmAnnui: value }
                        }));
                      }}
                      className="text-sm h-10"
                      placeholder={`${feature.advancedOptions.min}–${feature.advancedOptions.max}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                {/* Opzioni per Piscina */}
                {feature.id === 'piscina' && feature.advancedOptions.type === 'select' && (
                  <div className="space-y-3">
                    {feature.advancedOptions.options?.map((option) => {
                      const isSelected = featureState.tipo === option.value;
                      
                      return (
                        <div
                          key={option.value}
                          onClick={(e) => {
                            e.stopPropagation();
                            setAdvancedFeatures(prev => ({
                              ...prev,
                              [feature.id]: { ...prev[feature.id], tipo: option.value }
                            }));
                          }}
                          className={`
                            rounded-xl transition-all duration-300 border cursor-pointer p-3
                            ${isSelected 
                              ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                              : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs md:text-sm text-[#1c1c1c] mb-1">
                                {option.label}
                              </div>
                            </div>
                            {/* Selection Indicator - Always visible */}
                            <div className={`
                              w-6 h-6 rounded-full flex items-center justify-center ml-3 transition-all duration-200 border-2
                              ${isSelected 
                                ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                                : 'border-gray-300 bg-white hover:border-gray-400'
                              }
                            `}>
                              {isSelected && <Check className="h-4 w-4 text-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Continue Button */}
                <div className="pt-3">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdvancedFeatureContinue(feature.id);
                    }}
                    className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white py-3 text-sm md:text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Continua</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
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