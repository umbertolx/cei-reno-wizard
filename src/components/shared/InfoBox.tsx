import { useState, ReactNode } from "react";
import { Plus } from "lucide-react";

export type InfoBoxType = {
  title: string;
  content: ReactNode;
};

type InfoBoxProps = InfoBoxType & {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
};

export const InfoBox = ({ title, content, isOpen, onToggle }: InfoBoxProps) => {
  return (
    <div className={`border-2 border-dashed border-[#d8010c] rounded-xl overflow-hidden hover:bg-gray-100 transition-colors ${
      isOpen ? 'bg-transparent' : 'bg-transparent'
    }`}>
      <button
        onClick={() => onToggle(!isOpen)}
        className="w-full flex items-center justify-between p-3 text-left bg-transparent hover:bg-gray-50/50 transition-colors rounded-lg"
      >
        <span className="font-medium text-[#1c1c1c] uppercase">{title}</span>
        <Plus 
          className={`h-5 w-5 text-[#d8010c] flex-shrink-0 font-bold transition-transform ${
            isOpen ? 'rotate-45' : ''
          }`} 
          strokeWidth={3}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          <div className="text-sm text-gray-700 leading-relaxed bg-transparent">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};