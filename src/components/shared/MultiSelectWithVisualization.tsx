
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { StickyNavigationBar } from "./StickyNavigationBar";

export type SelectableOption = {
  id: string;
  label: string;
  description?: string;
  visualizationKey?: string;
};

type Props = {
  badge: string;
  icon: string;
  iconAlt: string;
  title: string;
  description?: string;
  options: SelectableOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  children?: React.ReactNode; // For the SVG visualization
};

export const MultiSelectWithVisualization = ({
  badge,
  icon,
  iconAlt,
  title,
  description,
  options,
  selectedValues,
  onSelectionChange,
  onNext,
  onBack,
  nextButtonText = "Continua",
  backButtonText = "Indietro",
  children
}: Props) => {
  const handleOptionChange = (optionId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedValues, optionId]);
    } else {
      onSelectionChange(selectedValues.filter(id => id !== optionId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-sm font-medium text-gray-600 bg-gray-50 border-gray-200">
          {badge}
        </Badge>
        
        <div className="flex items-center justify-center gap-3">
          <img src={icon} alt={iconAlt} className="w-8 h-8" />
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {title}
          </h1>
        </div>
        
        {description && (
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Visualization */}
        <div className="flex justify-center items-center">
          {children}
        </div>

        {/* Right side - Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Seleziona le funzioni che ti interessano:
          </h3>
          
          <div className="space-y-3">
            {options.map((option) => (
              <div
                key={option.id}
                className="flex items-start space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Checkbox
                  id={option.id}
                  checked={selectedValues.includes(option.id)}
                  onCheckedChange={(checked) => handleOptionChange(option.id, !!checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor={option.id}
                    className="text-base font-medium text-gray-900 cursor-pointer"
                  >
                    {option.label}
                  </label>
                  {option.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <StickyNavigationBar
        onBack={onBack}
        onNext={onNext}
        nextButtonText={nextButtonText}
        backButtonText={backButtonText}
        isNextDisabled={selectedValues.length === 0}
      />
    </div>
  );
};
