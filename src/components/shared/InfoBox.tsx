import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export type InfoBoxType = {
  title: string;
  content: string;
};

type InfoBoxProps = InfoBoxType & {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
};

export const InfoBox = ({ title, content, isOpen, onToggle }: InfoBoxProps) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => onToggle(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-[#1c1c1c]">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 pt-0">
          <div className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};