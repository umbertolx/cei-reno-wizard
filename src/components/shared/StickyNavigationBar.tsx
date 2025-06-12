
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

export type StickyNavigationBarProps = {
  onBack: () => void;
  onNext: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  isNextDisabled?: boolean;
  className?: string;
};

export const StickyNavigationBar = ({
  onBack,
  onNext,
  nextButtonText = "Avanti",
  backButtonText = "Indietro",
  isNextDisabled = false,
  className = ""
}: StickyNavigationBarProps) => {
  return (
    <div className={`sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-8 ${className}`}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex-1 h-12 text-base font-medium border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {backButtonText}
        </Button>
        
        <Button 
          onClick={onNext}
          disabled={isNextDisabled}
          className="
            flex-1 h-12
            text-base font-medium
            bg-[#d8010c] hover:bg-[#b8000a]
            text-white 
            rounded-lg 
            flex items-center justify-center gap-2
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg
          "
        >
          <span>{nextButtonText}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
