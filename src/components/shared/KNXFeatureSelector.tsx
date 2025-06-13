import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Lightbulb } from "lucide-react";

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
          rounded-2xl border-2 p-8 shadow-lg cursor-pointer transition-all duration-300
          ${isActivated 
            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-blue-100' 
            : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-gray-50'
          }
        `}
        onClick={!isActivated ? handleActivate : undefined}
      >
        <div className="space-y-6">
          {/* Feature Title and Description */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                  ${isActivated 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold text-[#1c1c1c]">
                  {feature.title}
                </h2>
              </div>
              {isActivated && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Advanced Options */}
          {isActivated && feature.advancedOption && (
            <div className="border-t border-blue-200 pt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#1c1c1c] flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {feature.advancedOption.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.advancedOption.description}
                </p>
              </div>

              {/* Options Comparison */}
              <div className="grid gap-4">
                {feature.advancedOption.options.map((option, index) => {
                  const isSelected = selectedOption === option.id;
                  const isStandard = option.id === 'standard';
                  
                  return (
                    <div
                      key={option.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOptionSelect(option.id);
                      }}
                      className={`
                        rounded-xl transition-all duration-300 border-2 cursor-pointer p-5
                        ${isSelected 
                          ? (isStandard 
                              ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-400 shadow-emerald-100' 
                              : 'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-400 shadow-purple-100'
                            )
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`
                            w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                            ${isSelected 
                              ? (isStandard 
                                  ? 'bg-emerald-500 text-white' 
                                  : 'bg-purple-500 text-white'
                                )
                              : 'bg-gray-100 text-gray-500'
                            }
                          `}>
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
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
                        </div>
                        {isSelected && (
                          <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center ml-3 shadow-sm
                            ${isStandard ? 'bg-emerald-500' : 'bg-purple-500'}
                          `}>
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Continue Button */}
              <div className="pt-4">
                <Button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg rounded-xl shadow-lg"
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
            className="flex items-center gap-2 px-6 py-3 text-base border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Indietro
          </Button>
        </div>
      )}
    </div>
  );
};
