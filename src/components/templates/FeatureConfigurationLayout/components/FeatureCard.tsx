import { ConfigurableFeature, FeatureState, FeatureHandlers } from "../types";
import { FeatureImage } from "./FeatureImage";
import { FeatureContent } from "./FeatureContent";
import { SelectionIndicator } from "./SelectionIndicator";
import { AdvancedOptions } from "./AdvancedOptions";

type FeatureCardProps = {
  feature: ConfigurableFeature;
  state: FeatureState;
  handlers: FeatureHandlers;
  canContinue: boolean;
  featureImage: string;
  className?: string;
};

/**
 * Main feature card component with responsive layout
 * Eliminates code duplication between mobile and desktop
 */
export const FeatureCard = ({
  feature,
  state,
  handlers,
  canContinue,
  featureImage,
  className = ""
}: FeatureCardProps) => {
  const { isActivated, isCompleted } = state;
  const { handleCardClick } = handlers;

  const cardClasses = `
    rounded-2xl shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative
    ${isCompleted
      ? 'border border-[#d8010c] bg-[#d8010c]/5' 
      : isActivated
      ? 'border border-[#d8010c] bg-[#d8010c]/5'
      : 'bg-white border border-gray-200 hover:border-[#d8010c] hover:shadow-md'
    }
    ${className}
  `;

  const contentContainerClasses = `
    p-6 md:p-0
    ${isActivated && !isCompleted
      ? 'bg-white rounded-t-2xl' 
      : 'rounded-2xl'
    }
  `;

  const isSelected = isActivated || isCompleted;
  const showAdvancedOptions = isActivated && !isCompleted && !!feature.advancedOption;

  return (
    <div className={cardClasses} onClick={handleCardClick}>
      {/* Selection Indicator - Mobile: top right */}
      <div className="md:hidden absolute top-4 right-4 z-10">
        <SelectionIndicator isSelected={isSelected} />
      </div>

      <div className="space-y-0">
        {/* Feature Title and Description */}
        <div className={contentContainerClasses}>
          {/* Mobile Layout - Image full width on top */}
          <div className="md:hidden space-y-4">
            {/* Feature Image - Full width */}
            <div className="w-full">
              <FeatureImage
                src={featureImage}
                alt={feature.title}
                featureId={feature.id}
                className="w-full h-32"
              />
            </div>
            
            {/* Content below image */}
            <FeatureContent
              title={feature.title}
              description={feature.description}
              isSelected={isSelected}
              isMobile={true}
            />
          </div>

          {/* Desktop Layout - Side by side with perfectly centered image */}
          <div className="hidden md:flex gap-6 p-6">
            {/* Feature Image Container - Fixed height matching content */}
            <div className="flex-shrink-0 flex items-center justify-center h-32">
              <FeatureImage
                src={featureImage}
                alt={feature.title}
                featureId={feature.id}
                className="w-32 h-32"
              />
            </div>
            
            {/* Content Container - Matching height */}
            <FeatureContent
              title={feature.title}
              description={feature.description}
              isSelected={isSelected}
              isMobile={false}
            />
          </div>
        </div>

        {/* Advanced Options */}
        <AdvancedOptions
          feature={feature}
          state={state}
          handlers={handlers}
          canContinue={canContinue}
          isVisible={showAdvancedOptions}
        />
      </div>
    </div>
  );
};