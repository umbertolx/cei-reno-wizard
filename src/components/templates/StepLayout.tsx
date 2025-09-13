import { ReactNode } from 'react';
import { StickyNavigationBar } from '@/components/shared/StickyNavigationBar';
import { ModuleBadge } from '@/components/shared/ModuleBadge';

export type StepLayoutProps = {
  badge?: string;
  title: string;
  description?: string;
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
      <div className="px-3 md:px-0">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1c1c1c] leading-tight">
            {title}
          </h1>
          <div className="w-full h-px bg-gray-200"></div>
          {description && (
            <p className="text-sm md:text-base text-[#1c1c1c] opacity-75 mt-3">
              {description}
            </p>
          )}
        </div>
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