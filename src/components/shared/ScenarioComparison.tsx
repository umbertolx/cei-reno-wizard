
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Info, ChevronDown, Check } from "lucide-react";
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

export type InfoBox = {
  title: string;
  content: string;
};

export type ScenarioComparisonProps = {
  badge: string;
  icon: string;
  iconAlt: string;
  title: string;
  description?: string;
  infoBox?: InfoBox;
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
  infoBox,
  options,
  selectedValue,
  onSelectionChange,
  onNext,
  onBack,
  nextButtonText = "Avanti",
  backButtonText = "Indietro"
}: ScenarioComparisonProps) => {
  const [infoBoxOpen, setInfoBoxOpen] = useState<boolean>(false);

  const isFormValid = selectedValue !== "";

  const handleSubmit = () => {
    if (isFormValid) {
      onNext();
    }
  };

  const handleCardClick = (optionId: string) => {
    onSelectionChange(optionId);
  };

  return (
    <div className="space-y-6">
      {/* Badge */}
      <div className="flex justify-center">
        <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
          {badge}
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl md:mx-auto space-y-6 md:space-y-8 mt-8 md:mt-16">
        <div className="space-y-4 md:space-y-6">
          {/* Header - Layout responsive */}
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src={icon}
                alt={iconAlt}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">{title}</h2>
              {description && (
                <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Box informativo - collassabile su mobile, sempre aperto su desktop */}
          {infoBox && (
            <div>
              {/* Versione mobile - collassabile */}
              <div className="block md:hidden">
                <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen}>
                  <CollapsibleTrigger className="w-full">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Info className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-yellow-800 text-left">
                            {infoBox.title}
                          </span>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform duration-200 ${infoBoxOpen ? 'rotate-180' : ''}`} />
                      </div>
                      {infoBoxOpen && (
                        <div className="mt-3 pt-3 border-t border-yellow-200">
                          <p className="text-sm text-yellow-800 text-left">
                            {infoBox.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>

              {/* Versione desktop - sempre aperto */}
              <div className="hidden md:block">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">{infoBox.title}</p>
                      <p>{infoBox.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {options.map((option) => {
              const isSelected = selectedValue === option.id;
              
              return (
                <div
                  key={option.id}
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
                    <p className="text-gray-700 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
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
