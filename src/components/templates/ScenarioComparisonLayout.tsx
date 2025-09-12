import { ReactNode } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { Check } from 'lucide-react';

export type ScenarioOption = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features: Array<{
    icon: React.ComponentType<any>;
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
  
  const handleSubmit = () => {
    if (selectedValue && onNext) {
      onNext();
    }
  };

  const isFormValid = () => selectedValue !== "";

  return (
    <StepLayout
      {...stepProps}
      onNext={handleSubmit}
      isNextDisabled={!isFormValid()}
    >
      {/* Scenario Options */}
      <div className="space-y-6">
        {options.map((option) => {
          const isSelected = selectedValue === option.id;
          
          return (
            <div
              key={option.id}
              onClick={() => onSelectionChange(option.id)}
              className={`
                relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${isSelected 
                  ? 'border-[#d8010c] bg-[#d8010c]/5 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-[#d8010c] hover:shadow-md'
                }
              `}
            >
              {/* Selection Indicator */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2
                  ${isSelected
                    ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                    : 'border-gray-300 bg-white'
                  }
                `}>
                  {isSelected && <Check className="h-4 w-4 text-white" />}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pr-12">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-[#1c1c1c] mb-1">
                    {option.title}
                  </h3>
                  {option.subtitle && (
                    <p className="text-sm font-medium text-[#d8010c]">
                      {option.subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {option.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 text-[#d8010c]">
                        <feature.icon />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">
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

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};