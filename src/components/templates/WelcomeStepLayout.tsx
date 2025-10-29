import { ReactNode, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export type ExampleProject = {
  title: string;
  minPrice: number;
  maxPrice: number;
  deductionText?: string;
  features: Array<{
    label: string;
    column?: 'left' | 'right';
  }>;
};

export type SelectableModule = {
  id: string;
  name: string;
  description: string;
  disabled?: boolean;
};

export type WelcomeStepLayoutProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  animatedWords?: string[];
  exampleProject?: ExampleProject;
  modules: SelectableModule[];
  selectedModules: string[];
  onModuleToggle: (moduleId: string) => void;
  onStart: (selectedModules: string[]) => void;
  ctaText?: string;
  minSelections?: number;
  maxSelections?: number;
  className?: string;
};

export const WelcomeStepLayout = ({
  badge,
  title,
  subtitle,
  animatedWords = [],
  exampleProject,
  modules,
  selectedModules,
  onModuleToggle,
  onStart,
  ctaText = "Inizia ora",
  minSelections = 1,
  maxSelections = 4,
  className = ""
}: WelcomeStepLayoutProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (animatedWords.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex(prev => (prev + 1) % animatedWords.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  const handleModuleToggle = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module?.disabled) return;

    // Don't allow deselection if it's the last selected module
    if (selectedModules.includes(moduleId) && selectedModules.length === minSelections) {
      return;
    }

    // Don't allow selection if max limit reached
    if (!selectedModules.includes(moduleId) && selectedModules.length >= maxSelections) {
      return;
    }

    onModuleToggle(moduleId);
  };

  const isModuleDisabled = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (module?.disabled) return true;
    
    const isSelected = selectedModules.includes(moduleId);
    const isLastSelected = isSelected && selectedModules.length === minSelections;
    const isMaxReached = !isSelected && selectedModules.length >= maxSelections;
    
    return isLastSelected || isMaxReached;
  };

  return (
    <div className={`space-y-6 pb-32 ${className}`}>
      {/* Badge */}
      {badge && (
        <div className="flex justify-start px-3 md:px-0">
          <div className="bg-[#d8010c] text-white px-4 py-2 rounded-full text-sm font-medium">
            {badge}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="space-y-2 px-3 md:px-0">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
          <span>{title}</span>
          {animatedWords.length > 0 && (
            <span className={`text-[#d8010c] transition-all duration-700 ease-in-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}>
              {' '}{animatedWords[currentWordIndex]}
            </span>
          )}
        </h1>
        <div className="w-full h-px bg-gray-200"></div>
        {subtitle && (
          <p className="text-sm md:text-base text-[#1c1c1c] opacity-75">
            {subtitle}
          </p>
        )}
      </div>

      {/* Example Project */}
      {exampleProject && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mx-3 md:mx-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Sparkles className="h-4 w-4 text-green-700 flex-shrink-0" />
              <div>
                <div className="text-xs text-green-700 font-medium">
                  {exampleProject.title}
                </div>
                <div className="text-lg font-bold text-gray-900">
                  €{exampleProject.minPrice.toLocaleString()} - €{exampleProject.maxPrice.toLocaleString()}
                </div>
              </div>
            </div>
            {exampleProject.deductionText && (
              <div className="text-xs text-green-700 font-semibold flex-shrink-0">
                {exampleProject.deductionText}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Module Selection */}
      <div className="space-y-4">
        <div className="px-3 md:px-0">
          <h2 className="text-lg font-medium text-[#1c1c1c] mb-1">
            Seleziona gli impianti
          </h2>
          <p className="text-sm text-gray-600">
            Puoi selezionare da {minSelections} a {maxSelections} impianti
          </p>
        </div>
        
        <div className="space-y-3 px-3 md:px-0">
          {modules.map(module => {
            const isSelected = selectedModules.includes(module.id);
            const isDisabled = isModuleDisabled(module.id);
            
            return (
              <button
                key={module.id} 
                onClick={() => handleModuleToggle(module.id)}
                disabled={isDisabled}
                className={`
                  w-full p-4 rounded-xl transition-all duration-200 border text-left
                  ${isSelected 
                    ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c]' 
                    : isDisabled 
                    ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50' 
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:bg-[#d8010c]/5'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-base mb-1">
                      {module.name}
                    </div>
                    <div className="text-sm opacity-70">
                      {module.description}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <Button 
            onClick={() => onStart(selectedModules)} 
            disabled={selectedModules.length === 0} 
            className="
              w-full h-12
              text-base font-medium
              bg-[#d8010c] hover:bg-[#b8000a]
              text-white 
              rounded-lg 
              flex items-center justify-center gap-2
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg
            "
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};