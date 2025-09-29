import { ReactNode, useState } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { CheckmarkIcon } from '@/components/ui/checkmark-icon';
import { InfoBox } from '@/components/shared/InfoBox';

export type ScenarioOption = {
  id: string;
  title: string;
  description: ReactNode;
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
      {/* Scenario Options - Mobile: InfoBox under each card, Desktop: Separated rows */}
      <div className="space-y-6">
        {/* Mobile Layout - Cards with InfoBoxes inline */}
        <div className="md:hidden space-y-6">
          {options.map((option) => {
            const isSelected = selectedValue === option.id;
            const isInfoBoxOpen = openInfoBoxes[option.id] || false;
            
            return (
              <div key={option.id} className="space-y-3">
                {/* Card */}
                <div
                  onClick={() => onSelectionChange(option.id)}
                  className={`
                    relative rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden
                    ${isSelected 
                      ? 'bg-[#d8010c]/5 border-[#d8010c]' 
                      : 'bg-white border-gray-200 hover:border-[#d8010c] hover:bg-[#d8010c]/5'
                    }
                  `}
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
                  <div className="p-6 pr-12">
                    {/* Header */}
                    <div className="space-y-2 mb-4">
                      <h3 className="text-xl font-semibold text-[#1c1c1c] leading-tight">
                        {option.title}
                      </h3>
                      <div className="w-8 h-0.5 bg-[#d8010c] rounded-full"></div>
                    </div>

                    {/* Features with Bullet Points */}
                    <div className="space-y-3">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d8010c] mt-2"></div>
                          <span className="text-sm text-[#1c1c1c] opacity-85 font-medium leading-relaxed">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* InfoBox - Mobile: directly under each card */}
                <InfoBox
                  title="Maggiori informazioni"
                  content={option.description}
                  isOpen={isInfoBoxOpen}
                  onToggle={(isOpen) => toggleInfoBox(option.id, isOpen)}
                />
              </div>
            );
          })}
        </div>

        {/* Desktop Layout - Cards Row */}
        <div className="hidden md:grid grid-cols-2 gap-6 items-stretch">
          {options.map((option) => {
            const isSelected = selectedValue === option.id;
            
            return (
              <div
                key={option.id}
                onClick={() => onSelectionChange(option.id)}
                className={`
                  relative rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden
                  ${isSelected 
                    ? 'bg-[#d8010c]/5 border-[#d8010c]' 
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:bg-[#d8010c]/5'
                  }
                `}
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
                <div className="p-8 pr-16">
                  {/* Header */}
                  <div className="space-y-2 mb-6">
                    <h3 className="text-2xl font-semibold text-[#1c1c1c] leading-tight">
                      {option.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-[#d8010c] rounded-full"></div>
                  </div>

                  {/* Features with Bullet Points */}
                  <div className="space-y-4">
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
            );
          })}
        </div>

        {/* Desktop Layout - InfoBoxes Row */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {options.map((option) => {
            const isInfoBoxOpen = openInfoBoxes[option.id] || false;
            
            return (
              <div key={`info-${option.id}`}>
                <InfoBox
                  title="Maggiori informazioni"
                  content={option.description}
                  isOpen={isInfoBoxOpen}
                  onToggle={(isOpen) => toggleInfoBox(option.id, isOpen)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};