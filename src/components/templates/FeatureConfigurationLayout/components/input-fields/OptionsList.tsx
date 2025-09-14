import { ConfigurationOption } from "../../types";
import { SelectionIndicator } from "../SelectionIndicator";

type OptionsListProps = {
  options: ConfigurationOption[];
  selectedOption: string;
  onOptionSelect: (optionId: string) => void;
};

/**
 * Options list component for multiple choice configurations
 */
export const OptionsList = ({
  options,
  selectedOption,
  onOptionSelect
}: OptionsListProps) => {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;
        
        return (
          <div
            key={option.id}
            onClick={(e) => {
              e.stopPropagation();
              onOptionSelect(option.id);
            }}
            className={`
              rounded-xl transition-all duration-300 border cursor-pointer p-3
              ${isSelected 
                ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs md:text-sm text-[#1c1c1c] mb-1">
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-xs text-gray-600">
                    {option.description}
                  </div>
                )}
              </div>
              {/* Selection Indicator - Always visible */}
              <SelectionIndicator 
                isSelected={isSelected} 
                className="ml-3"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};