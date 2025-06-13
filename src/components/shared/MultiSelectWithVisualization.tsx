
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  children?: React.ReactNode;
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
  const handleOptionToggle = (optionId: string) => {
    if (selectedValues.includes(optionId)) {
      onSelectionChange(selectedValues.filter(id => id !== optionId));
    } else {
      onSelectionChange([...selectedValues, optionId]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with consistent styling */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-sm font-medium text-gray-600 bg-gray-50 border-gray-200 px-3 py-1">
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

        {/* Right side - Options with consistent styling */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Seleziona le funzioni che ti interessano:
          </h3>
          
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionToggle(option.id)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-sm ${
                  selectedValues.includes(option.id)
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-gray-900 mb-1">
                      {option.label}
                    </h4>
                    {option.description && (
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    )}
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedValues.includes(option.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedValues.includes(option.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation with consistent button styling */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          {backButtonText}
        </Button>
        
        <Button
          onClick={onNext}
          disabled={selectedValues.length === 0}
          className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {nextButtonText}
        </Button>
      </div>
    </div>
  );
};
