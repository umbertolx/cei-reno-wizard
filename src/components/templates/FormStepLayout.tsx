import { ReactNode } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';

export type FormSection = {
  id: string;
  title?: string;
  content: ReactNode;
  className?: string;
};

export type FormStepLayoutProps = Omit<StepLayoutProps, 'children'> & {
  sections: FormSection[];
  validationFn?: () => boolean;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
};

export const FormStepLayout = ({
  sections,
  validationFn,
  showProgress = false,
  currentStep,
  totalSteps,
  onNext,
  ...stepProps
}: FormStepLayoutProps) => {
  const isFormValid = validationFn ? validationFn() : true;

  const handleSubmit = () => {
    if (isFormValid && onNext) {
      onNext();
    }
  };

  return (
    <StepLayout
      {...stepProps}
      onNext={handleSubmit}
      isNextDisabled={!isFormValid}
    >
      {/* Progress Indicator */}
      {showProgress && currentStep !== undefined && totalSteps !== undefined && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Passaggio {currentStep} di {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#d8010c] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Form Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className={section.className}>
            {section.title && (
              <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
                {section.title}
              </h2>
            )}
            <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
              {section.content}
            </div>
          </div>
        ))}
      </div>
    </StepLayout>
  );
};