
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
        <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium">
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
          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            {options.map((option) => {
              const isSelected = selectedValue === option.id;
              const isExpanded = expandedCards.includes(option.id);
              
              return (
                <div key={option.id} className="md:contents">
                  {/* Mobile Version - Collapsible con altezza uniforme fissa */}
                  <div className="block md:hidden">
                    <div
                      className={`
                        relative border-2 rounded-xl transition-all duration-200 h-[140px]
                        ${isSelected 
                          ? 'border-[#d8010c] bg-[#d8010c]/5' 
                          : 'border-gray-200'
                        }
                      `}
                    >
                      {/* Mobile Header - layout ottimizzato per altezza fissa */}
                      <div 
                        className="p-4 h-[90px] cursor-pointer flex items-center"
                        onClick={() => handleCardClick(option.id)}
                      >
                        <div className="flex items-center justify-between w-full h-full">
                          <div className="flex-1 pr-4 flex flex-col justify-center">
                            <h3 className="text-base font-semibold text-[#1c1c1c] mb-1 leading-tight line-clamp-2">
                              {option.title}
                            </h3>
                            <p className="text-gray-600 font-medium text-sm leading-tight line-clamp-2">
                              {option.subtitle}
                            </p>
                          </div>
                          
                          {/* Selection Indicator */}
                          {isSelected && (
                            <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Mobile Expand Button - altezza fissa */}
                      <Collapsible open={isExpanded} onOpenChange={() => toggleCardExpansion(option.id)}>
                        <CollapsibleTrigger className="w-full h-[50px] border-t border-gray-200 px-4 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50">
                          <span className="text-sm font-medium">
                            {isExpanded ? 'Nascondi dettagli' : 'Mostra dettagli'}
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="p-4 pt-0 space-y-4 bg-white">
                            {/* Features List */}
                            <div className="space-y-2">
                              {option.features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                  <div key={index} className="flex items-center gap-3">
                                    <IconComponent className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-800">{feature.text}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-700">
                              {option.description}
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>

                  {/* Desktop Version - Always expanded */}
                  <div className="hidden md:block">
                    <div
                      className={`
                        relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'border-[#d8010c] bg-[#d8010c]/5 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                      onClick={() => handleCardClick(option.id)}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-8 h-8 bg-[#d8010c] rounded-full flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 font-medium">
                            {option.subtitle}
                          </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-2">
                          {option.features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0" />
                                <span className="text-gray-800">{feature.text}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Description */}
                        <p className="text-gray-700">
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
