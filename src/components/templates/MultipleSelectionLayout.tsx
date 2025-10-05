import { ReactNode, useState } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export type SelectableItem = {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type MultipleSelectionLayoutProps = Omit<StepLayoutProps, 'children' | 'isNextDisabled'> & {
  items: SelectableItem[];
  selectedItems: string[];
  onSelectionChange: (selectedItems: string[]) => void;
  showSelectAllButton?: boolean;
  selectAllText?: string;
  deselectAllText?: string;
  selectionCountText?: (selected: number, total: number) => string;
  minSelections?: number;
  maxSelections?: number;
  additionalContent?: ReactNode;
};

export const MultipleSelectionLayout = ({
  items,
  selectedItems,
  onSelectionChange,
  showSelectAllButton = true,
  selectAllText = "Seleziona tutti",
  deselectAllText = "Deseleziona tutti",
  selectionCountText = (selected, total) => `${selected} di ${total}`,
  minSelections = 0,
  maxSelections,
  additionalContent,
  onNext,
  ...stepProps
}: MultipleSelectionLayoutProps) => {

  const allSelected = selectedItems.length === items.length;
  const hasMinSelections = selectedItems.length >= minSelections;
  const hasMaxSelections = maxSelections ? selectedItems.length >= maxSelections : false;

  const handleItemToggle = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item?.disabled) return;

    const isSelected = selectedItems.includes(itemId);
    
    // Don't allow deselection if it would go below minimum
    if (isSelected && selectedItems.length <= minSelections) {
      return;
    }

    // Don't allow selection if it would exceed maximum
    if (!isSelected && maxSelections && selectedItems.length >= maxSelections) {
      return;
    }

    const newSelection = isSelected
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    
    onSelectionChange(newSelection);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all (but keep minimum if required)
      const minimumItems = minSelections > 0 ? items.slice(0, minSelections).map(item => item.id) : [];
      onSelectionChange(minimumItems);
    } else {
      // Select all (up to maximum if specified)
      const allItems = items.map(item => item.id);
      const itemsToSelect = maxSelections ? allItems.slice(0, maxSelections) : allItems;
      onSelectionChange(itemsToSelect);
    }
  };

  const handleSubmit = () => {
    if (hasMinSelections && onNext) {
      onNext();
    }
  };

  const isItemDisabled = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item?.disabled) return true;
    
    const isSelected = selectedItems.includes(itemId);
    const wouldBeBelowMin = isSelected && selectedItems.length <= minSelections;
    const wouldExceedMax = !isSelected && maxSelections && selectedItems.length >= maxSelections;
    
    return wouldBeBelowMin || wouldExceedMax;
  };

  return (
    <StepLayout
      {...stepProps}
      onNext={handleSubmit}
      isNextDisabled={!hasMinSelections}
    >
      {/* Selection Counter */}
      <div className="flex items-center justify-between mb-4">
        {showSelectAllButton && (
          <Button
            variant="outline"
            onClick={handleSelectAll}
            className="border-[#d8010c] text-[#d8010c] hover:bg-[#d8010c]/5"
          >
            {allSelected ? deselectAllText : selectAllText}
          </Button>
        )}
        
        {selectedItems.length > 0 && (
          <div className="text-xs md:text-sm font-medium px-2 py-1 md:px-3 md:py-1.5 rounded-lg border bg-[#d8010c]/5 text-[#d8010c] border-[#d8010c]/20">
            {selectionCountText(selectedItems.length, items.length)}
          </div>
        )}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          const isDisabled = isItemDisabled(item.id);
          
          return (
            <div
              key={item.id}
              onClick={() => !isDisabled && handleItemToggle(item.id)}
              className={`
                rounded-lg transition-all duration-300 border cursor-pointer p-3 min-h-[80px]
                ${isSelected 
                  ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                  : isDisabled
                  ? 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-xs opacity-70">
                      {item.description}
                    </div>
                  )}
                </div>
                
                {isSelected && !isDisabled && (
                  <div className="w-4 h-4 bg-[#d8010c] rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};
