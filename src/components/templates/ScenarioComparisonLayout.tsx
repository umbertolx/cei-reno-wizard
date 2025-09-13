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
      {/* Scenario Options - Clean Horizontal Layout with Equal Heights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {options.map((option) => {
          const isSelected = selectedValue === option.id;
          const isInfoBoxOpen = openInfoBoxes[option.id] || false;
          
          return (
            <div key={option.id} className="space-y-3 h-full">
              {/* Card */}
              <div
                onClick={() => onSelectionChange(option.id)}
                className={`
                  relative rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden h-full flex flex-col
                  ${isSelected 
                    ? 'bg-[#d8010c]/5 border-[#d8010c]' 
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:bg-[#d8010c]/5'
                  }
                `}
                style={{ minHeight: '300px' }}
              >
                {/* Selection Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  {isSelected ? (
                    <CheckmarkIcon />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white transition-all duration-200" />
                  )}
                </div>

                {/* Content */}
                <div className="p-8 pr-16 space-y-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-[#1c1c1c] leading-tight">
                      {option.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-[#d8010c] rounded-full"></div>
                  </div>

                  {/* Features with Bullet Points - Takes remaining space */}
                  <div className="space-y-4 flex-1">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d8010c] mt-2.5"></div>
                        <span className="text-base text-[#1c1c1c] opacity-85 font-medium leading-relaxed">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* InfoBox - Outside card, below with spacing */}
              <div className="mt-2">
                <InfoBox
                  title="Maggiori informazioni"
                  content={option.description}
                  isOpen={isInfoBoxOpen}
                  onToggle={(isOpen) => toggleInfoBox(option.id, isOpen)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};