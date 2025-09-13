import { ReactNode, useState } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { InfoBox, InfoBoxType } from '@/components/shared/InfoBox';
import { CheckmarkIcon } from '@/components/ui/checkmark-icon';

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
  infoBox?: InfoBoxType;
  conditionalContent?: ReactNode;
  summaryContent?: ReactNode;
};

export const QuestionStepLayout = ({
  options,
  selectedValue,
  onSelectionChange,
  multiSelect = false,
  infoBox,
  conditionalContent,
  summaryContent,
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
      {/* Summary Content */}
      {summaryContent && (
        <div className="mb-6">
          {summaryContent}
        </div>
      )}

      {/* Info Box */}
      {infoBox && (
        <div className="mb-6">
          <InfoBox 
            title={infoBox.title}
            content={infoBox.content}
            isOpen={isInfoOpen}
            onToggle={setIsInfoOpen}
          />
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
                <div className="flex-shrink-0 ml-3">
                  <CheckmarkIcon />
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