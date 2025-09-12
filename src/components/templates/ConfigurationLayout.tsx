import { ReactNode } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ConfigurableItem = {
  id: string;
  name: string;
  description: string;
  icon?: ReactNode;
  selected: boolean;
  hasAdvancedOptions?: boolean;
  isActivated?: boolean;
};

export type AdvancedOption = {
  id: string;
  type: 'input' | 'select' | 'slider';
  label: string;
  value: any;
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  placeholder?: string;
};

export type ConfigurationLayoutProps = Omit<StepLayoutProps, 'children' | 'isNextDisabled'> & {
  standardItems?: ConfigurableItem[];
  advancedItems?: ConfigurableItem[];
  onStandardItemToggle?: (itemId: string) => void;
  onAdvancedItemClick?: (itemId: string) => void;
  onAdvancedItemContinue?: (itemId: string) => void;
  advancedOptions?: Record<string, AdvancedOption[]>;
  onAdvancedOptionChange?: (itemId: string, optionId: string, value: any) => void;
  renderAdvancedOption?: (itemId: string, option: AdvancedOption) => ReactNode;
  sections?: Array<{
    id: string;
    title: string;
    description?: string;
    items: string[];
  }>;
  additionalContent?: ReactNode;
};

export const ConfigurationLayout = ({
  standardItems = [],
  advancedItems = [],
  onStandardItemToggle,
  onAdvancedItemClick,
  onAdvancedItemContinue,
  advancedOptions = {},
  onAdvancedOptionChange,
  renderAdvancedOption,
  sections,
  additionalContent,
  onNext,
  ...stepProps
}: ConfigurationLayoutProps) => {

  const handleSubmit = () => {
    if (onNext) {
      onNext();
    }
  };

  const renderStandardItem = (item: ConfigurableItem) => (
    <div
      key={item.id}
      onClick={() => onStandardItemToggle?.(item.id)}
      className={`
        rounded-xl transition-all duration-300 border cursor-pointer p-4
        ${item.selected 
          ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
          : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {item.icon}
          <div className="font-semibold text-base text-[#1c1c1c]">
            {item.name}
          </div>
        </div>
        {item.selected && (
          <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center ml-3">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );

  const renderAdvancedItem = (item: ConfigurableItem) => {
    const isActivated = item.isActivated || false;
    const isCompleted = item.selected;
    const itemOptions = advancedOptions[item.id] || [];
    
    return (
      <div key={item.id} className="space-y-6">
        {/* Feature Card */}
        <div 
          className={`
            rounded-2xl shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative
            ${isCompleted
              ? 'border border-[#d8010c] bg-[#d8010c]/5' 
              : isActivated
              ? 'border border-[#d8010c] bg-[#d8010c]/5'
              : 'bg-white border border-gray-200 hover:border-[#d8010c] hover:shadow-md'
            }
          `}
          onClick={() => onAdvancedItemClick?.(item.id)}
        >
          {/* Selection Indicator */}
          <div className="absolute top-4 right-4 z-10">
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2
              ${(isActivated || isCompleted)
                ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                : 'border-gray-300 bg-white hover:border-gray-400'
              }
            `}>
              {(isActivated || isCompleted) && <Check className="h-4 w-4 text-white" />}
            </div>
          </div>

          <div className="space-y-0">
            {/* Feature Content */}
            <div className={`
              p-6 pr-12
              ${isActivated && !isCompleted
                ? 'bg-white rounded-t-2xl' 
                : 'rounded-2xl'
              }
            `}>
              <div className="flex items-start gap-4">
                {item.icon && (
                  <div className="flex-shrink-0 w-8 h-8 text-gray-600">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            {isActivated && !isCompleted && item.hasAdvancedOptions && itemOptions.length > 0 && (
              <div className="border-t border-gray-200 space-y-4 bg-white px-6 pb-6 rounded-b-2xl">
                <div className="pt-4 space-y-3">
                  <h4 className="text-base font-semibold text-[#1c1c1c]">
                    Personalizza le impostazioni
                  </h4>
                </div>

                {/* Render Options */}
                <div className="space-y-4">
                  {itemOptions.map((option) => (
                    <div key={option.id}>
                      {renderAdvancedOption ? 
                        renderAdvancedOption(item.id, option) :
                        <div className="text-sm text-gray-600">
                          {option.label}: {String(option.value)}
                        </div>
                      }
                    </div>
                  ))}
                </div>

                {/* Continue Button */}
                {onAdvancedItemContinue && (
                  <div className="pt-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdvancedItemContinue(item.id);
                      }}
                      className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white"
                    >
                      Conferma impostazioni
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <StepLayout
      {...stepProps}
      onNext={handleSubmit}
    >
      {/* Render by sections if provided */}
      {sections ? (
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-[#1c1c1c]">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="text-sm text-gray-600">
                    {section.description}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.items.map((itemId) => {
                  const standardItem = standardItems.find(item => item.id === itemId);
                  const advancedItem = advancedItems.find(item => item.id === itemId);
                  
                  if (standardItem) return renderStandardItem(standardItem);
                  if (advancedItem) return renderAdvancedItem(advancedItem);
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Standard Items */}
          {standardItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {standardItems.map(renderStandardItem)}
            </div>
          )}

          {/* Advanced Items */}
          {advancedItems.length > 0 && (
            <div className="space-y-6">
              {advancedItems.map(renderAdvancedItem)}
            </div>
          )}
        </div>
      )}

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};