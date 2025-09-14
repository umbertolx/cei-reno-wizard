import { SelectionIndicator } from "./SelectionIndicator";

type FeatureContentProps = {
  title: string;
  description: string;
  isSelected: boolean;
  isMobile?: boolean;
};

/**
 * Feature content component (title + description)
 * Responsive typography and layout
 */
export const FeatureContent = ({ 
  title, 
  description, 
  isSelected, 
  isMobile = false 
}: FeatureContentProps) => {
  if (isMobile) {
    return (
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-[#1c1c1c]">
          {title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-w-0 flex flex-col justify-center">
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xl font-semibold text-[#1c1c1c]">
          {title}
        </h2>
        {/* Selection Indicator - Desktop only */}
        <SelectionIndicator 
          isSelected={isSelected} 
          className="flex-shrink-0 ml-4"
        />
      </div>
      <p className="text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};