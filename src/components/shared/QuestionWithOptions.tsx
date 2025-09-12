import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Plus, ChevronDown, Check } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StickyNavigationBar } from "./StickyNavigationBar";

export type QuestionOption = {
  id: string;
  label: string;
};

export type InfoBox = {
  title: string;
  content: string;
};

export type QuestionWithOptionsProps = {
  badge: string;
  icon: string;
  iconAlt: string;
  title: string;
  description?: string;
  infoBox?: InfoBox;
  summaryContent?: React.ReactNode;
  options: QuestionOption[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  conditionalContent?: React.ReactNode;
};

export const QuestionWithOptions = ({
  badge,
  icon,
  iconAlt,
  title,
  description,
  infoBox,
  summaryContent,
  options,
  selectedValue,
  onSelectionChange,
  onNext,
  onBack,
  nextButtonText = "Avanti",
  backButtonText = "Indietro",
  conditionalContent
}: QuestionWithOptionsProps) => {
  const [infoBoxOpen, setInfoBoxOpen] = useState<boolean>(false);

  const isFormValid = selectedValue !== "";

  const handleSubmit = () => {
    if (isFormValid) {
      onNext();
    }
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

          {/* Box informativo - collassabile su tutte le dimensioni */}
          {infoBox && (
            <div>
              <Collapsible open={infoBoxOpen} onOpenChange={setInfoBoxOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="bg-transparent border border-yellow-200 rounded-xl p-4 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Plus className="h-5 w-5 flex-shrink-0" color="#d8010c" strokeWidth={3} />
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
          )}

          {/* Contenuto di riepilogo */}
          {summaryContent}
          
          {/* Opzioni */}
          <div className="space-y-3 md:space-y-4">
            {options.map((option) => {
              const isSelected = selectedValue === option.id;
              
              return (
                <div
                  key={option.id}
                  onClick={() => onSelectionChange(option.id)}
                  className={`
                    rounded-xl transition-all duration-300 border cursor-pointer p-4
                    ${isSelected 
                      ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-base text-[#1c1c1c]">
                        {option.label}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Contenuto condizionale */}
          {conditionalContent}
        </div>
      </div>

      {/* Pulsanti di navigazione - Using new component */}
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
