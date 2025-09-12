import { ReactNode, useState } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { InfoBox } from '@/components/shared/QuestionWithOptions';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type QuestionOption = {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type QuestionStepLayoutProps = Omit<StepLayoutProps, 'children' | 'isNextDisabled'> & {
  options: QuestionOption[];
  selectedValue: string | string[];
  onSelectionChange: (value: string | string[]) => void;
  multiSelect?: boolean;
  infoBox?: InfoBox;
  conditionalContent?: ReactNode;
};

export const QuestionStepLayout = ({
  options,
  selectedValue,
  onSelectionChange,
  multiSelect = false,
  infoBox,
  conditionalContent,
  onNext,
  ...stepProps
}: QuestionStepLayoutProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : [];
      const newValues = currentValues.includes(optionId)
        ? currentValues.filter(id => id !== optionId)
        : [...currentValues, optionId];
      onSelectionChange(newValues);
    } else {
      onSelectionChange(optionId);
    }
  };

  const isSelected = (optionId: string) => {
    return Array.isArray(selectedValue) 
      ? selectedValue.includes(optionId)
      : selectedValue === optionId;
  };

  const isFormValid = () => {
    return Array.isArray(selectedValue) 
      ? selectedValue.length > 0
      : selectedValue !== "";
  };

  const handleSubmit = () => {
    if (isFormValid() && onNext) {
      onNext();
    }
  };

  return (
    <StepLayout
      {...stepProps}
      onNext={handleSubmit}
      isNextDisabled={!isFormValid()}
    >
      {/* Info Box */}
      {infoBox && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="font-medium text-blue-900">{infoBox.title}</h3>
            {isInfoOpen ? (
              <ChevronUp className="h-4 w-4 text-blue-700 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-4 w-4 text-blue-700 flex-shrink-0" />
            )}
          </button>
          
          {isInfoOpen && (
            <div className="mt-3 text-sm text-blue-800 leading-relaxed">
              {infoBox.content}
            </div>
          )}
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !option.disabled && handleOptionClick(option.id)}
            disabled={option.disabled}
            className={`
              w-full p-4 rounded-xl border text-left transition-all duration-200
              ${isSelected(option.id)
                ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c]'
                : option.disabled
                ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white border-gray-200 hover:border-[#d8010c] hover:bg-[#d8010c]/5'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-base mb-1">{option.label}</div>
                {option.description && (
                  <div className="text-sm opacity-70">{option.description}</div>
                )}
              </div>
              
              {isSelected(option.id) && (
                <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center flex-shrink-0 ml-3">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Conditional Content */}
      {conditionalContent}
    </StepLayout>
  );
};