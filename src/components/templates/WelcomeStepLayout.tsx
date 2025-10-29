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
    <div className={`space-y-4 ${className}`}>
      {/* Badge */}
      {badge && (
        <div className="flex justify-center px-3 md:px-0">
          <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
            {badge}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="space-y-2 md:space-y-3">
        <h1 className="text-[28px] md:text-[40px] font-bold text-[#1c1c1c] leading-[1.05] text-left md:text-center p-1">
          <span className="block md:inline">{title}</span>
          {animatedWords.length > 0 && (
            <>
              <br className="hidden md:block" />
              <span className={`text-[#d8010c] transition-all duration-700 ease-in-out transform block md:inline ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}>
                {animatedWords[currentWordIndex]}
              </span>
            </>
          )}
        </h1>
        
        {subtitle && (
          <p className="text-sm md:text-base text-gray-600 max-w-2xl text-left md:text-center md:mx-auto leading-relaxed p-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Example Project */}
      {exampleProject && (
        <div className="relative max-w-full md:max-w-3xl md:mx-auto mb-6 md:mb-12 px-3 md:px-0">
          {/* Example badge */}
          <div className="flex justify-start md:justify-center mb-2">
            <div className="inline-flex items-center gap-1.5 bg-white text-[#1c1c1c] px-3 py-1.5 rounded-full text-sm font-medium border-2 border-black">
              <Sparkles className="h-3 w-3" />
              {exampleProject.title}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-[#fbe12e] hover:border-[3px] transition-all duration-300">
            <div className="p-4 md:p-6">
              {/* Header section */}
              <div className="text-center mb-4">
                <div className="text-xs text-gray-500 mb-1 font-medium p-1">
                  Budget stimato per questo progetto
                </div>
                <div className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 p-1">
                  €{exampleProject.minPrice.toLocaleString()} - €{exampleProject.maxPrice.toLocaleString()}
                </div>
                
                {exampleProject.deductionText && (
                  <div className="text-sm md:text-base text-green-700 font-semibold mb-3 p-1">
                    {exampleProject.deductionText}
                  </div>
                )}
              </div>

              {/* Project features */}
              <div className="border-t border-gray-200 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Left column */}
                  <div className="space-y-2">
                    {exampleProject.features
                      .filter(feature => !feature.column || feature.column === 'left')
                      .map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">{feature.label}</span>
                        </div>
                      ))}
                  </div>
                  
                  {/* Right column */}
                  <div className="space-y-2">
                    {exampleProject.features
                      .filter(feature => feature.column === 'right')
                      .map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="h-2.5 w-2.5 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">{feature.label}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module Selection */}
      <div className="max-w-4xl md:mx-auto">
        <div className="mb-4 md:mb-6 text-left md:text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1c1c1c] leading-[1.05] mb-1 md:mb-2 p-1">
            Seleziona gli impianti:
          </h2>
          <p className="text-sm md:text-base text-gray-600 p-1">
            Puoi selezionare da {minSelections} a {maxSelections} impianti
          </p>
        </div>
        
        <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 mb-6 md:mb-8">
          {modules.map(module => {
            const isSelected = selectedModules.includes(module.id);
            const isDisabled = isModuleDisabled(module.id);
            
            return (
              <div 
                key={module.id} 
                onClick={() => handleModuleToggle(module.id)}
                className={`
                  p-4 rounded-xl transition-all duration-300 border cursor-pointer
                  ${isSelected 
                    ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                    : isDisabled 
                    ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-50' 
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-semibold text-base text-[#1c1c1c] mb-0.5 p-1">
                      {module.name}
                    </div>
                    <div className="text-sm text-gray-600 hidden md:block p-1">
                      {module.description}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="ml-3 flex-shrink-0">
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <Button 
            onClick={() => onStart(selectedModules)} 
            disabled={selectedModules.length === 0} 
            className="
              w-full px-6 py-4 md:py-5
              text-base md:text-lg 
              bg-[#d8010c] hover:bg-[#b8000a]
              text-white 
              rounded-xl 
              flex items-center justify-center gap-2
              transition-all duration-300 
              shadow-sm hover:shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
              min-h-[48px]
            "
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};