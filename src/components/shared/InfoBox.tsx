import { useState } from "react";
import { Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export type InfoBoxProps = {
  title: string;
  content: string;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
};

export const InfoBox = ({ title, content, isOpen: externalIsOpen, onToggle }: InfoBoxProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const handleToggle = (newIsOpen: boolean) => {
    if (onToggle) {
      onToggle(newIsOpen);
    } else {
      setInternalIsOpen(newIsOpen);
    }
  };

  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={handleToggle}>
        <CollapsibleTrigger className="w-full">
          <div className="bg-transparent border-dashed border border-[#d8010c] rounded-xl p-4 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Plus className="h-5 w-5 flex-shrink-0" color="#d8010c" strokeWidth={3} />
                <span className="text-sm font-medium text-black text-left uppercase">
                  {title}
                </span>
              </div>
            </div>
            {isOpen && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-black text-left">
                  {content}
                </p>
              </div>
            )}
          </div>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
};