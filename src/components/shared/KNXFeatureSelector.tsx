
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

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
  onBack: () => void;
};

export const KNXFeatureSelector = ({ feature, onComplete, onBack }: Props) => {
  const [isActivated, setIsActivated] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('standard');

  const handleActivate = () => {
    setIsActivated(true);
  };

  const handleDeactivate = () => {
    setIsActivated(false);
  };

  const handleContinue = () => {
    onComplete(feature.id, { 
      active: true,
      option: selectedOption 
    });
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="space-y-8">
      {/* Feature Card */}
      <div 
        className={`
          rounded-2xl shadow-sm cursor-pointer transition-all duration-300
          ${isActivated 
            ? 'border border-[#d8010c]' 
            : 'bg-white border border-gray-200 hover:border-[#d8010c] hover:shadow-md'
          }
        `}
        onClick={!isActivated ? handleActivate : handleDeactivate}
      >
        <div className="space-y-0">
          {/* Feature Title and Description */}
          <div 
            className={`
              space-y-4 p-8 
              ${isActivated 
                ? 'bg-white rounded-t-2xl' 
                : 'bg-white rounded-2xl'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#1c1c1c]">
                {feature.title}
              </h2>
              {/* Selection Indicator - Always visible */}
              <div className={`
                w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 border-2
                ${isActivated 
                  ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                  : 'border-gray-300 bg-white hover:border-gray-400'
                }
              `}>
                {isActivated && <Check className="h-3 w-3 text-white" />}
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Advanced Options */}
          {isActivated && feature.advancedOption && (
            <div className="border-t border-gray-200 space-y-6 bg-white px-8 pb-8 rounded-b-2xl">
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#1c1c1c]">
                  {feature.advancedOption.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.advancedOption.description}
                </p>
              </div>

              {/* Options Comparison */}
              <div className="space-y-4">
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
                        rounded-xl transition-all duration-300 border cursor-pointer p-4
                        ${isSelected 
                          ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c] shadow-sm' 
                          : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-base text-[#1c1c1c] mb-1">
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-sm text-gray-600">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {/* Selection Indicator - Always visible */}
                        <div className={`
                          w-5 h-5 rounded-full flex items-center justify-center ml-3 transition-all duration-200 border-2
                          ${isSelected 
                            ? 'bg-[#d8010c] border-[#d8010c] shadow-lg scale-110' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                          }
                        `}>
                          {isSelected && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="pt-4">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white py-4 text-lg rounded-xl"
                >
                  <span>Continua</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      {!isActivated && (
        <div className="flex justify-start">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 text-base border-gray-300"
          >
            <ArrowLeft className="w-4 w-4" />
            Indietro
          </Button>
        </div>
      )}
    </div>
  );
};
