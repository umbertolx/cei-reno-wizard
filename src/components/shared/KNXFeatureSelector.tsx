
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    options?: FeatureOption[];
    requiresInput?: boolean;
    inputType?: string;
    inputPlaceholder?: string;
    inputLabel?: string;
    inputMin?: number;
    inputMax?: number;
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
  const [inputValue, setInputValue] = useState<number>(0);

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
    } else if (!feature.advancedOption) {
      // Se non ha opzioni avanzate, seleziona direttamente
      setIsCompleted(true);
      onComplete(feature.id, { active: true });
    } else if (!isActivated) {
      handleActivate();
    } else {
      handleDeactivate();
    }
  };

  const handleContinue = () => {
    setIsCompleted(true);
    setIsActivated(false); // Collassa le sotto-opzioni
    
    const config: { active: boolean; inputValue?: number; option?: string } = { active: true };
    
    if (feature.advancedOption?.requiresInput) {
      config.inputValue = inputValue;
    } else if (feature.advancedOption?.options) {
      config.option = selectedOption;
    }
    
    onComplete(feature.id, config);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  // Get feature image
  const getFeatureImage = () => {
    switch (feature.id) {
      case 'luci':
        return "/lovable-uploads/e6632418-100a-4695-b616-b643ef13304c.png";
      case 'tapparelle':
        return "/lovable-uploads/fe24b59f-57ea-4463-a1da-970fbfe1242c.png";
      case 'clima':
        return "/lovable-uploads/c995d44b-5a6b-49b1-8300-513cbd07f544.png";
      case 'audio':
        return "/lovable-uploads/64f1fc05-9f90-4bc3-98ce-609171969f34.png";
      case 'videocitofono':
        return "/lovable-uploads/f5e5fded-c7de-4125-a941-5f1b7848216b.png";
      case 'supervisor':
        return "/lovable-uploads/7c632c46-64c6-454b-b98d-2306abb92ecb.png";
      case 'prese':
        return "/lovable-uploads/d56be5f7-57a6-4791-b896-09863446c8b8.png";
      default:
        return "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop";
    }
  };

  const featureImage = getFeatureImage();

  // Validation for continue button
  const canContinue = !feature.advancedOption?.requiresInput || inputValue > 0;

  return (
    <div className="space-y-6">
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
        onClick={handleCardClick}
      >
        {/* Selection Indicator - Mobile: top right */}
        <div className="md:hidden absolute top-4 right-4 z-10">
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
          {/* Feature Title and Description */}
          <div 
            className={`
              p-6 md:p-0
              ${isActivated && !isCompleted
                ? 'bg-white rounded-t-2xl' 
                : 'rounded-2xl'
              }
            `}
          >
            {/* Mobile Layout - Image full width on top */}
            <div className="md:hidden space-y-4">
              {/* Feature Image - Full width */}
              <div className="w-full">
                <img 
                  src={featureImage} 
                  alt={feature.title}
                  className="w-full h-32 object-cover rounded-xl"
                  style={{
                    objectPosition: feature.id === 'videocitofono' ? 'center top' : 'center'
                  }}
                />
              </div>
              
              {/* Content below image */}
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-[#1c1c1c]">
                  {feature.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>

            {/* Desktop Layout - Side by side with perfectly centered image */}
            <div className="hidden md:flex gap-6 p-6">
              {/* Feature Image Container - Fixed height matching content */}
              <div className="flex-shrink-0 flex items-center justify-center h-32">
                <img 
                  src={featureImage} 
                  alt={feature.title}
                  className="w-32 h-32 object-cover rounded-xl"
                  style={{
                    objectPosition: feature.id === 'videocitofono' ? 'center top' : 'center'
                  }}
                />
              </div>
              
              {/* Content Container - Matching height */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-semibold text-[#1c1c1c]">
                    {feature.title}
                  </h2>
                  {/* Selection Indicator - Desktop only */}
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2 flex-shrink-0 ml-4
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
            </div>
          </div>

          {/* Advanced Options */}
          {isActivated && !isCompleted && feature.advancedOption && (
            <div className="border-t border-gray-200 space-y-4 bg-white px-6 pb-6 rounded-b-2xl">
              <div className="pt-4 space-y-3">
                <h3 className="text-base md:text-lg font-semibold text-[#1c1c1c]">
                  {feature.advancedOption.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {feature.advancedOption.description}
                </p>
              </div>

              {/* Input Field - for features that require input */}
              {feature.advancedOption.requiresInput && (
                <div className="space-y-2">
                  <Label htmlFor={`${feature.id}-input`} className="text-sm font-medium text-[#1c1c1c]">
                    {feature.advancedOption.inputLabel}
                  </Label>
                  <Input
                    id={`${feature.id}-input`}
                    type={feature.advancedOption.inputType || "text"}
                    min={feature.advancedOption.inputMin}
                    max={feature.advancedOption.inputMax}
                    value={inputValue || ""}
                    onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
                    placeholder={feature.advancedOption.inputPlaceholder}
                    className="text-sm h-10"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* Options Comparison - for features with multiple options */}
              {feature.advancedOption.options && (
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
              )}

              {/* Continue Button */}
              <div className="pt-3">
                <Button
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className="w-full bg-[#d8010c] hover:bg-[#b8000a] text-white py-3 text-sm md:text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Continua</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
