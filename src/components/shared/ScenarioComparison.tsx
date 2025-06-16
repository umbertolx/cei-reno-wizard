
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, ChevronDown, Check, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StickyNavigationBar } from "./StickyNavigationBar";

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

  const toggleCardExpansion = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Badge */}
      <div className="flex justify-center pt-6 pb-4">
        <div className="bg-[#d8010c] text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg">
          {badge}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src={icon}
                alt={iconAlt}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-medium text-[#1c1c1c] leading-tight">
                {title}
              </h2>
              {description && (
                <p className="text-sm sm:text-base text-[#1c1c1c] opacity-80 mt-2">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Comparison Cards */}
          <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {options.map((option) => {
              const isSelected = selectedValue === option.id;
              const isExpanded = expandedCards.includes(option.id);
              
              return (
                <div key={option.id}>
                  {/* Mobile Version */}
                  <div className="block lg:hidden">
                    <div
                      className={`
                        relative border rounded-xl transition-all duration-300 overflow-hidden cursor-pointer
                        ${isSelected 
                          ? 'border-[#d8010c] shadow-lg' 
                          : 'border-gray-200 hover:border-[#d8010c] hover:shadow-md'
                        }
                      `}
                    >
                      {/* Mobile Header - Always visible */}
                      <div 
                        className={`
                          p-4 flex items-center justify-between
                          ${isSelected 
                            ? 'bg-[#d8010c]/5' 
                            : 'bg-white hover:bg-gray-50'
                          }
                        `}
                        onClick={() => handleCardClick(option.id)}
                      >
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2 leading-tight">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 font-medium text-sm leading-tight">
                            {option.subtitle}
                          </p>
                        </div>
                        
                        {/* Selection Indicator */}
                        <div className={`
                          w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 border-2
                          ${isSelected 
                            ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                          }
                        `}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>

                      {/* Mobile Features - Always visible */}
                      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/30">
                        <div className="space-y-2">
                          {option.features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#d8010c]/10 flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-3.5 h-3.5 text-[#d8010c]" />
                                </div>
                                <span className="text-xs text-gray-800 font-medium">{feature.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mobile Expand/Collapse for Description */}
                      <Collapsible open={isExpanded}>
                        <CollapsibleTrigger 
                          className="w-full border-t border-gray-200 px-4 py-3 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50/80 transition-colors text-sm font-medium"
                          onClick={(e) => toggleCardExpansion(option.id, e)}
                        >
                          <span>
                            {isExpanded ? 'Nascondi descrizione dettagliata' : 'Mostra descrizione dettagliata'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="p-4 pt-0 bg-gray-50/30">
                            <p className="text-sm text-gray-700 leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
                              {option.description}
                            </p>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>

                  {/* Desktop Version */}
                  <div className="hidden lg:block">
                    <div
                      className={`
                        relative rounded-xl border cursor-pointer transition-all duration-300 overflow-hidden
                        ${isSelected 
                          ? 'border-[#d8010c] bg-[#d8010c]/5 shadow-xl transform scale-[1.02]' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-lg bg-white hover:transform hover:scale-[1.01]'
                        }
                      `}
                    >
                      {/* Desktop Header - Always visible */}
                      <div 
                        className="p-6 pb-4"
                        onClick={() => handleCardClick(option.id)}
                      >
                        {/* Selection Indicator */}
                        <div className={`
                          absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border-2
                          ${isSelected 
                            ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                          }
                        `}>
                          {isSelected && <Check className="w-5 h-5 text-white" />}
                        </div>

                        {/* Header Content */}
                        <div className="pr-12">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                            {option.title}
                          </h3>
                          <p className="text-gray-600 font-medium text-base">
                            {option.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Desktop Features - Always visible */}
                      <div className="px-6 pb-4">
                        <div className="space-y-3">
                          {option.features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-[#d8010c]/10 flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-4 h-4 text-[#d8010c]" />
                                </div>
                                <span className="text-gray-800 font-medium text-sm">{feature.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Desktop Expand/Collapse for Description */}
                      <Collapsible open={isExpanded}>
                        <CollapsibleTrigger 
                          className="w-full border-t border-gray-200 px-6 py-4 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50/80 transition-colors text-sm font-medium"
                          onClick={(e) => toggleCardExpansion(option.id, e)}
                        >
                          <span>
                            {isExpanded ? 'Nascondi descrizione dettagliata' : 'Mostra descrizione dettagliata'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="px-6 pb-6">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                              <p className="text-gray-700 leading-relaxed text-sm">
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Using new component */}
      <StickyNavigationBar
        onBack={onBack}
        onNext={handleSubmit}
        nextButtonText={nextButtonText}
        backButtonText={backButtonText}
        isNextDisabled={!isFormValid}
      />
    </div>
  );
};
