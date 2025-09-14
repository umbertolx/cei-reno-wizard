import { CheckmarkIcon } from "@/components/ui/checkmark-icon";

type SelectionIndicatorProps = {
  isSelected: boolean;
  className?: string;
};

/**
 * Reusable selection indicator component
 * Shows checkmark when selected, empty circle when not
 */
export const SelectionIndicator = ({ isSelected, className = "" }: SelectionIndicatorProps) => {
  if (isSelected) {
    return (
      <div className={className}>
        <CheckmarkIcon />
      </div>
    );
  }

  return (
    <div 
      className={`w-5 h-5 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200 ${className}`}
    />
  );
};