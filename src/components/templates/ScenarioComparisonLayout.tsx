import { ReactNode, useState } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { CheckmarkIcon } from '@/components/ui/checkmark-icon';
import { InfoBox } from '@/components/shared/InfoBox';

export type ScenarioOption = {
  id: string;
  title: string;
  description: string;
  features: Array<{
    text: string;
  }>;
};

export type ScenarioComparisonLayoutProps = Omit<StepLayoutProps, 'children' | 'isNextDisabled'> & {
  options: ScenarioOption[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  additionalContent?: ReactNode;
};

export const ScenarioComparisonLayout = ({
  options,
  selectedValue,
  onSelectionChange,
  additionalContent,
  onNext,
  ...stepProps
}: ScenarioComparisonLayoutProps) => {
  const [openInfoBoxes, setOpenInfoBoxes] = useState<{ [key: string]: boolean }>({});
  
  const handleSubmit = () => {
    if (selectedValue && onNext) {
      onNext();
    }
  };

  const isFormValid = () => selectedValue !== "";

  const toggleInfoBox = (optionId: string, isOpen: boolean) => {
    setOpenInfoBoxes(prev => ({
      ...prev,
      [optionId]: isOpen
    }));
  };

  return (
    <StepLayout
      {...stepProps}
      onNext={handleSubmit}
      isNextDisabled={!isFormValid()}
    >
      {/* Scenario Options - Modern Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {options.map((option, index) => {
          const isSelected = selectedValue === option.id;
          const isInfoBoxOpen = openInfoBoxes[option.id] || false;
          
          return (
            <div
              key={option.id}
              onClick={() => onSelectionChange(option.id)}
              className={`
                group relative rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden
                transform hover:scale-[1.02] hover:-translate-y-2
                animate-fade-in
                ${isSelected 
                  ? 'bg-gradient-to-br from-[#d8010c]/10 via-white to-[#d8010c]/5 shadow-2xl shadow-[#d8010c]/20 border-2 border-[#d8010c]/30' 
                  : 'bg-gradient-to-br from-white to-gray-50/50 shadow-xl hover:shadow-2xl border border-gray-200/60 hover:border-[#d8010c]/40'
                }
              `}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient Overlay */}
              <div className={`
                absolute inset-0 opacity-0 transition-opacity duration-500
                ${isSelected ? 'opacity-100' : 'group-hover:opacity-50'}
                bg-gradient-to-r from-[#d8010c]/5 to-transparent
              `} />

              {/* Selection Indicator */}
              <div className="absolute top-6 right-6 z-20">
                <div className={`
                  transition-all duration-300 transform
                  ${isSelected ? 'scale-110' : 'group-hover:scale-105'}
                `}>
                  {isSelected ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#d8010c] rounded-full animate-ping opacity-20"></div>
                      <CheckmarkIcon />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white/80 backdrop-blur-sm 
                                  transition-all duration-300 group-hover:border-[#d8010c]/60 group-hover:bg-white group-hover:scale-110" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 space-y-6">
                {/* Header with modern typography */}
                <div className="space-y-2">
                  <h3 className={`
                    text-2xl font-bold transition-colors duration-300
                    ${isSelected ? 'text-[#d8010c]' : 'text-[#1c1c1c] group-hover:text-[#d8010c]'}
                  `}>
                    {option.title}
                  </h3>
                  <div className={`
                    h-1 w-12 rounded-full transition-all duration-500
                    ${isSelected ? 'bg-gradient-to-r from-[#d8010c] to-[#d8010c]/60 w-20' : 'bg-gray-300 group-hover:bg-[#d8010c]/60 group-hover:w-16'}
                  `} />
                </div>

                {/* Modern InfoBox */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <InfoBox
                    title="Maggiori informazioni"
                    content={option.description}
                    isOpen={isInfoBoxOpen}
                    onToggle={(isOpen) => toggleInfoBox(option.id, isOpen)}
                  />
                </div>

                {/* Premium Features List */}
                <div className="space-y-4">
                  {option.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-start gap-4 group/feature animate-fade-in"
                      style={{ animationDelay: `${(index * 150) + (featureIndex * 100)}ms` }}
                    >
                      <div className={`
                        flex-shrink-0 w-3 h-3 rounded-full mt-1.5 transition-all duration-300
                        ${isSelected 
                          ? 'bg-gradient-to-r from-[#d8010c] to-[#d8010c]/80 shadow-lg shadow-[#d8010c]/30' 
                          : 'bg-gradient-to-r from-gray-400 to-gray-500 group-hover:from-[#d8010c] group-hover:to-[#d8010c]/80'
                        }
                        group/feature-hover:scale-125 group/feature-hover:shadow-lg
                      `} />
                      <span className={`
                        text-sm font-medium leading-relaxed transition-colors duration-300
                        ${isSelected 
                          ? 'text-gray-800' 
                          : 'text-gray-700 group-hover:text-gray-800'
                        }
                      `}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern bottom accent */}
              <div className={`
                absolute bottom-0 left-0 right-0 h-1 transition-all duration-500
                ${isSelected 
                  ? 'bg-gradient-to-r from-[#d8010c] via-[#d8010c]/80 to-[#d8010c]' 
                  : 'bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:from-[#d8010c]/50 group-hover:via-[#d8010c]/80 group-hover:to-[#d8010c]/50'
                }
              `} />
            </div>
          );
        })}
      </div>

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};