import { ReactNode } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export type InputField = {
  id: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'select' | 'button-group' | 'separator';
  label?: string;
  placeholder?: string;
  value?: any;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: any) => boolean;
  errorMessage?: string;
  description?: string;
  fullWidth?: boolean;
};

export type InputSection = {
  id: string;
  title?: string;
  description?: string;  
  fields: InputField[];
  className?: string;
};

export type InputFormLayoutProps = Omit<StepLayoutProps, 'children' | 'isNextDisabled'> & {
  sections: InputSection[];
  onFieldChange: (fieldId: string, value: any) => void;
  onFieldBlur?: (fieldId: string) => void;
  customValidation?: () => boolean;
  showFieldErrors?: boolean;
  additionalContent?: ReactNode;
};

export const InputFormLayout = ({
  sections,
  onFieldChange,
  onFieldBlur,
  customValidation,
  showFieldErrors = false,
  additionalContent,
  onNext,
  ...stepProps
}: InputFormLayoutProps) => {

  const validateField = (field: InputField): boolean => {
    if (!field.required && !field.value) return true;
    if (field.required && !field.value) return false;
    if (field.validation) return field.validation(field.value);
    return true;
  };

  const isFormValid = (): boolean => {
    if (customValidation) return customValidation();
    
    return sections.every(section => 
      section.fields.every(field => validateField(field))
    );
  };

  const handleSubmit = () => {
    if (isFormValid() && onNext) {
      onNext();
    }
  };

  const renderField = (field: InputField) => {
    const isValid = validateField(field);
    const showError = showFieldErrors && !isValid;

    switch (field.type) {
      case 'separator':
        return (
          <div key={field.id} className={field.fullWidth ? "col-span-full" : ""}>
            <Separator className="my-4" />
            {field.label && (
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-500 font-medium">{field.label}</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
            )}
          </div>
        );

      case 'button-group':
        return (
          <div key={field.id} className={`space-y-2 ${field.fullWidth ? "col-span-full" : ""}`}>
            {field.label && (
              <Label className="text-sm font-medium text-[#1c1c1c]">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-xs text-gray-600">{field.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {field.options?.map((option) => {
                const isSelected = field.value === option.value;
                
                return (
                  <div
                    key={option.value}
                    onClick={() => !field.disabled && onFieldChange(field.id, option.value)}
                    className={`
                      rounded-xl transition-all duration-300 border cursor-pointer p-3
                      ${isSelected 
                        ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                        : field.disabled
                        ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">
                          {option.label}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {showError && field.errorMessage && (
              <p className="text-xs text-red-600">{field.errorMessage}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className={`space-y-2 ${field.fullWidth ? "col-span-full" : ""}`}>
            {field.label && (
              <Label className="text-sm font-medium text-[#1c1c1c]">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-xs text-gray-600">{field.description}</p>
            )}
            <Select
              value={field.value || ""}
              onValueChange={(value) => onFieldChange(field.id, value)}
              disabled={field.disabled}
            >
              <SelectTrigger className={showError ? "border-red-500" : ""}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showError && field.errorMessage && (
              <p className="text-xs text-red-600">{field.errorMessage}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.id} className={`space-y-2 ${field.fullWidth ? "col-span-full" : ""}`}>
            {field.label && (
              <Label className="text-sm font-medium text-[#1c1c1c]">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            )}
            {field.description && (
              <p className="text-xs text-gray-600">{field.description}</p>
            )}
            <Input
              type={field.type}
              placeholder={field.placeholder}
              value={field.value || ""}
              onChange={(e) => onFieldChange(field.id, e.target.value)}
              onBlur={() => onFieldBlur?.(field.id)}
              disabled={field.disabled}
              min={field.min}
              max={field.max}
              step={field.step}
              required={field.required}
              className={showError ? "border-red-500" : ""}
            />
            {showError && field.errorMessage && (
              <p className="text-xs text-red-600">{field.errorMessage}</p>
            )}
          </div>
        );
    }
  };

  return (
    <StepLayout
      {...stepProps}
      onNext={handleSubmit}
      isNextDisabled={!isFormValid()}
    >
      {/* Form Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className={section.className}>
            {section.title && (
              <div className="space-y-2 mb-6">
                <h3 className="text-lg font-semibold text-[#1c1c1c]">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map(renderField)}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};