
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ChevronDown, Check } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export type ScenarioOption = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: Array<{
    icon: any;
    text: string;
  }>;
};

export type ScenarioComparisonProps = {
  badge: string;
  icon: string;
  iconAlt: string;
  title: string;
  description?: string;
  options: ScenarioOption[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  nextButtonText?: string;
  backButtonText?: string;
};

export const ScenarioComparison = ({
  badge,
  icon,
  iconAlt,
  title,
  description,
  options,
  selectedValue,
  onSelectionChange,
  onNext,
  onBack,
  nextButtonText = "Avanti",
  backButtonText = "Indietro"
}: ScenarioComparisonProps) => {
  const [expandedCards, setExpandedCards] = useState<string[]>([]);

  const isFormValid = selectedValue !== "";

  const handleSubmit = () => {
    if (isFormValid) {
      onNext();
    }
  };

  const handleCardClick = (optionId: string) => {
    onSelectionChange(optionId);
  };

  const toggleCardExpansion = (optionId: string) => {
    setExpandedCards(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Badge - consistente con altri step */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
          {badge}
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl mx-auto space-y-8 mt-16">
        <div className="space-y-6">
          {/* Header - consistente con altri step */}
          <div className="flex items-center gap-4">
            <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src={icon}
                alt={iconAlt}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-medium text-[#1c1c1c]">{title}</h2>
              {description && (
                <p className="text-base text-[#1c1c1c] opacity-80 mt-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Comparison Cards */}
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
            {options.map((option) => {
              const isSelected = selectedValue === option.id;
              const isExpanded = expandedCards.includes(option.id);
              
              return (
                <div key={option.id} className="md:contents">
                  {/* Mobile Version - Collapsible con design migliorato */}
                  <div className="block md:hidden">
                    <div
                      className={`
                        relative border-2 rounded-2xl transition-all duration-300 h-[160px] shadow-sm
                        ${isSelected 
                          ? 'border-[#d8010c] bg-gradient-to-br from-[#d8010c]/8 to-[#d8010c]/3 shadow-md' 
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      {/* Mobile Header - design ottimizzato */}
                      <div 
                        className="p-5 h-[100px] cursor-pointer flex items-center relative"
                        onClick={() => handleCardClick(option.id)}
                      >
                        <div className="flex items-center justify-between w-full h-full">
                          <div className="flex-1 pr-4 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2 leading-tight line-clamp-2">
                              {option.title}
                            </h3>
                            <p className="text-gray-600 font-medium text-sm leading-tight line-clamp-2">
                              {option.subtitle}
                            </p>
                          </div>
                          
                          {/* Selection Indicator con design migliorato */}
                          <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200
                            ${isSelected 
                              ? 'bg-[#d8010c] shadow-lg' 
                              : 'border-2 border-gray-300 bg-white'
                            }
                          `}>
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </div>
                        </div>
                      </div>

                      {/* Mobile Expand Button con design migliorato */}
                      <Collapsible open={isExpanded} onOpenChange={() => toggleCardExpansion(option.id)}>
                        <CollapsibleTrigger className="w-full h-[60px] border-t border-gray-200 px-5 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50/80 transition-colors rounded-b-2xl">
                          <span className="text-sm font-medium">
                            {isExpanded ? 'Nascondi dettagli' : 'Mostra dettagli'}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="p-5 pt-0 space-y-4 bg-white rounded-b-2xl">
                            {/* Features List con design migliorato */}
                            <div className="space-y-3">
                              {option.features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                  <div key={index} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#d8010c]/10 flex items-center justify-center flex-shrink-0">
                                      <IconComponent className="w-4 h-4 text-[#d8010c]" />
                                    </div>
                                    <span className="text-sm text-gray-800 font-medium">{feature.text}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {option.description}
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>

                  {/* Desktop Version con design migliorato e dimensioni identiche */}
                  <div className="hidden md:block">
                    <div
                      className={`
                        relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 h-[420px] flex flex-col shadow-sm
                        ${isSelected 
                          ? 'border-[#d8010c] bg-gradient-to-br from-[#d8010c]/8 to-[#d8010c]/3 shadow-xl transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white'
                        }
                      `}
                      onClick={() => handleCardClick(option.id)}
                    >
                      {/* Selection Indicator con design migliorato */}
                      <div className={`
                        absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                        ${isSelected 
                          ? 'bg-[#d8010c] shadow-lg' 
                          : 'border-2 border-gray-300 bg-white'
                        }
                      `}>
                        {isSelected && <Check className="w-5 h-5 text-white" />}
                      </div>

                      {/* Card Content con layout ottimizzato */}
                      <div className="flex flex-col h-full">
                        {/* Header Section */}
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 font-medium text-base">
                            {option.subtitle}
                          </p>
                        </div>

                        {/* Features List con design migliorato */}
                        <div className="space-y-3 mb-6 flex-1">
                          {option.features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#d8010c]/10 flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-5 h-5 text-[#d8010c]" />
                                </div>
                                <span className="text-gray-800 font-medium">{feature.text}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pulsanti di navigazione - consistenti con altri step */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 text-base font-medium border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {backButtonText}
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="
            flex-1 h-12
            text-base font-medium
            bg-[#d8010c] hover:bg-[#b8000a]
            text-white 
            rounded-lg 
            flex items-center justify-center gap-2
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span>{nextButtonText}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
