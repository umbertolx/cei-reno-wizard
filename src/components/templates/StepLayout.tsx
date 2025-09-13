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
    <div className={`space-y-6 md:space-y-8 ${className}`}>
      {/* Badge */}
      {badge && <ModuleBadge>{badge}</ModuleBadge>}

      {/* Header */}
      <div className="space-y-2 md:space-y-3">
        {icon && (
          <div className="flex items-center gap-4 px-3 md:px-0">
            <div className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 flex items-center justify-center">
              <img 
                src={icon} 
                alt={iconAlt || "Step icon"} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">{title}</h1>
              {description && (
                <p className="text-xs md:text-base text-[#1c1c1c] opacity-70 hidden sm:block">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        
        {!icon && (
          <div className="text-center md:text-left px-3 md:px-0">
            <h1 className="text-[24px] md:text-[36px] font-bold text-[#1c1c1c] leading-[1.05]">
              {title}
            </h1>
            {description && (
              <p className="text-sm md:text-base text-gray-600 mt-2">
                {description}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {children}
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
  );
};