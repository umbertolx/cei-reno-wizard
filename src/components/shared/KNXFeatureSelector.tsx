import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Lightbulb, Blinds, Thermometer } from "lucide-react";

type FeatureOption = {
  id: string;
  label: string;
  description?: string;
};

type Feature = {
  id: string;
  title: string;
  description: string;
  advancedOption?: {
    title: string;
    description: string;
    options: FeatureOption[];
  };
};

type Props = {
  feature: Feature;
  onComplete: (featureId: string, config: any) => void;
};

export const KNXFeatureSelector = ({ feature, onComplete }: Props) => {
  const [isActivated, setIsActivated] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('standard');

  const handleActivate = () => {
    if (!isCompleted) {
      setIsActivated(true);
    }
  };

  const handleDeactivate = () => {
    if (!isCompleted) {
      setIsActivated(false);
    }
  };

  const handleCardClick = () => {
    if (isCompleted) {
      // Se è completata, deseleziona
      setIsCompleted(false);
      setIsActivated(false);
      onComplete(feature.id, { active: false });
    } else if (!isActivated) {
      handleActivate();
    } else {
      handleDeactivate();
    }
  };

  const handleContinue = () => {
    setIsCompleted(true);
    setIsActivated(false); // Collassa le sotto-opzioni
    onComplete(feature.id, { 
      active: true,
      option: selectedOption 
    });
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  // Get the appropriate icon for the feature
  const getFeatureIcon = () => {
    switch (feature.id) {
      case 'luci':
        return <Lightbulb className="w-8 h-8 text-[#d8010c]" />;
      case 'tapparelle':
        return <Blinds className="w-8 h-8 text-[#d8010c]" />;
      case 'clima':
        return <Thermometer className="w-8 h-8 text-[#d8010c]" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Feature Card */}
      <div 
        className={`
          rounded-2xl shadow-sm transition-all duration-300 cursor-pointer overflow-hidden
          ${isCompleted
            ? 'border border-[#d8010c] bg-[#d8010c]/5' 
            : isActivated
            ? 'border border-[#d8010c] bg-[#d8010c]/5'
            : 'bg-white border border-gray-200 hover:border-[#d8010c] hover:shadow-md'
          }
        `}
        onClick={handleCardClick}
      >
        <div className="space-y-0">
          {/* Feature Title and Description */}
          <div 
            className={`
              space-y-3 p-6 
              ${isActivated && !isCompleted
                ? 'bg-white rounded-t-2xl' 
                : 'rounded-2xl'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Feature Icon */}
                <div className="flex-shrink-0">
                  {getFeatureIcon()}
                </div>
                <h2 className="text-xl font-semibold text-[#1c1c1c]">
                  {feature.title}
                </h2>
              </div>
              {/* Selection Indicator - Always visible */}
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
            <p className="text-base text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Advanced Options */}
          {isActivated && !isCompleted && feature.advancedOption && (
            <div className="border-t border-gray-200 space-y-4 bg-white px-6 pb-6 rounded-b-2xl">
              <div className="pt-4 space-y-3">
                <h3 className="text-lg font-semibold text-[#1c1c1c]">
                  {feature.advancedOption.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.advancedOption.description}
                </p>
              </div>

              {/* Options Comparison */}
              <div className="space-y-3">
                {feature.advancedOption.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  
                  return (
                    <div
                      key={option.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect(option.id);
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
                          <div className="font-semibold text-sm text-[#1c1c1c] mb-1">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-xs text-gray-600">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {/* Selection Indicator - Always visible */}
                        <div className={`
                          w-6 h-6 rounded-full flex items-center justify-center ml-3 transition-all duration-200 border-2
                          ${isSelected 
                            ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                          }
                        `}>
                          {isSelected && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="pt-3">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white py-3 text-base rounded-xl"
                >
                  <span>Continua</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
