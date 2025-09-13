import { ReactNode } from 'react';
import { StickyNavigationBar } from '@/components/shared/StickyNavigationBar';
import { ModuleBadge } from '@/components/shared/ModuleBadge';

export type StepLayoutProps = {
  badge?: string;
  title: string;
  description?: string;
  icon?: string;
  iconAlt?: string;
  children: ReactNode;
  onBack?: () => void;
  onNext?: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  isNextDisabled?: boolean;
  showNavigation?: boolean;
  className?: string;
};

export const StepLayout = ({
  badge,
  title,
  description,
  icon,
  iconAlt,
  children,
  onBack,
  onNext,
  nextButtonText = "Avanti",
  backButtonText = "Indietro", 
  isNextDisabled = false,
  showNavigation = true,
  className = ""
}: StepLayoutProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Badge */}
        {badge && <ModuleBadge>{badge}</ModuleBadge>}

        {/* Header con design coerente */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-4 px-3 md:px-0">
            {icon && (
              <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
                <img 
                  src={icon} 
                  alt={iconAlt || "Step icon"} 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">
                {title}
              </h1>
              {description && (
                <p className="text-base text-[#1c1c1c] opacity-80 hidden md:block mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Descrizione mobile - solo se non c'è icona */}
          {!icon && description && (
            <p className="text-sm text-[#1c1c1c] opacity-80 md:hidden px-3">
              {description}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 space-y-6">
            {children}
          </div>
        </div>

        {/* Navigation */}
        {showNavigation && onBack && onNext && (
          <StickyNavigationBar
            onBack={onBack}
            onNext={onNext}
            nextButtonText={nextButtonText}
            backButtonText={backButtonText}
            isNextDisabled={isNextDisabled}
          />
        )}
      </div>
    </div>
  );
};