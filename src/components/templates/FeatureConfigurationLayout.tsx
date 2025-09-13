import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import { CheckmarkIcon } from "@/components/ui/checkmark-icon";
import { StepLayout } from "./StepLayout";

export type ConfigurationOption = {
  id: string;
  label: string;
  description?: string;
};

export type InputField = {
  id: string;
  label: string;
  inputType: string;
  inputPlaceholder: string;
  inputMin: number;
  inputMax: number;
  useSlider?: boolean;
};

export type ConfigurableFeature = {
  id: string;
  title: string;
  description: string;
  image?: string;
  advancedOption?: {
    title: string;
    description: string;
    options?: ConfigurationOption[];
    requiresInput?: boolean;
    requiresMultipleInputs?: boolean;
    inputs?: InputField[];
    inputType?: string;
    inputPlaceholder?: string;
    inputLabel?: string;
    inputMin?: number;
    inputMax?: number;
    useSlider?: boolean;
  };
};

export type FeatureConfigurationLayoutProps = {
  feature: ConfigurableFeature;
  onComplete: (featureId: string, config: any) => void;
  badge?: string;
  title?: string;
  description?: string;
  icon?: string;
  iconAlt?: string;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
};

export const FeatureConfigurationLayout = ({ 
  feature, 
  onComplete, 
  badge, 
  title, 
  description, 
  icon, 
  iconAlt, 
  onBack, 
  onNext, 
  isNextDisabled 
}: FeatureConfigurationLayoutProps) => {
  const [isActivated, setIsActivated] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('standard');
  const [inputValue, setInputValue] = useState<number>(1);
  const [multipleInputValues, setMultipleInputValues] = useState<Record<string, number>>({});

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
    
    const config: { active: boolean; inputValue?: number; multipleInputs?: Record<string, number>; option?: string } = { active: true };
    
    if (feature.advancedOption?.requiresInput) {
      config.inputValue = inputValue;
    } else if (feature.advancedOption?.requiresMultipleInputs) {
      config.multipleInputs = multipleInputValues;
    } else if (feature.advancedOption?.options) {
      config.option = selectedOption;
    }
    
    onComplete(feature.id, config);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleMultipleInputChange = (inputId: string, value: number) => {
    setMultipleInputValues(prev => ({
      ...prev,
      [inputId]: Math.max(1, value) // Ensure minimum value is 1
    }));
  };

  const handleMultipleSliderChange = (inputId: string, values: number[]) => {
    setMultipleInputValues(prev => ({
      ...prev,
      [inputId]: values[0]
    }));
  };

  const handleSingleSliderChange = (values: number[]) => {
    setInputValue(values[0]);
  };

  // Get feature image - updated to use custom image if provided
  const getFeatureImage = () => {
    // If feature has a custom image, use that
    if (feature.image) {
      return feature.image;
    }
    
    // Otherwise use the default mapping
    switch (feature.id) {
      case 'luci':
        return "/lovable-uploads/e6632418-100a-4695-b616-b643ef13304c.png";
      case 'tapparelle':
        return "/lovable-uploads/fe24b59f-57ea-4463-a1da-970fbfe1242c.png";
      case 'tende':
        return "/lovable-uploads/c0a1f152-d988-470c-ace9-54e6b6cd8f71.png";
      case 'clima':
        return "/lovable-uploads/c995d44b-5a6b-49b1-8300-513cbd07f544.png";
      case 'audio':
        return "/lovable-uploads/d191ced0-069a-4f4c-8410-909ab7e51011.png";
      case 'videocitofono':
        return "/lovable-uploads/f5e5fded-c7de-4125-a941-5f1b7848216b.png";
      case 'sicurezza':
        return "/lovable-uploads/9d845369-d0e2-4422-a530-568c6698397b.png";
      case 'supervisor':
        return "/lovable-uploads/cce32257-443f-4688-901b-cd6e4dc8cb1d.png";
      case 'prese':
        return "/lovable-uploads/d56be5f7-57a6-4791-b896-09863446c8b8.png";
      default:
        return "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop";
    }
  };

  const featureImage = getFeatureImage();

  // Validation for continue button - ensure minimum value is 1
  const canContinue = !feature.advancedOption?.requiresInput || inputValue >= 1;
  
  // Validation for multiple inputs - ensure minimum value is 1
  const canContinueMultiple = !feature.advancedOption?.requiresMultipleInputs || 
    (feature.advancedOption.inputs && feature.advancedOption.inputs.some(input => 
      (multipleInputValues[input.id] || 1) >= 1
    ));

  const finalCanContinue = feature.advancedOption?.requiresMultipleInputs ? canContinueMultiple : canContinue;

  // Check if there are any completed features to enable navigation
  const hasCompletedFeatures = isCompleted;

  return (
    <StepLayout
      badge={badge}
      title={title}
      description={description}
      icon={icon}
      iconAlt={iconAlt}
      onBack={onBack}
      onNext={onNext}
      isNextDisabled={isNextDisabled || !hasCompletedFeatures}
    >
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
            {(isActivated || isCompleted) ? (
              <CheckmarkIcon />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200" />
            )}
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
                    {(isActivated || isCompleted) ? (
                      <div className="flex-shrink-0 ml-4">
                        <CheckmarkIcon />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 ml-4 w-5 h-5 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200" />
                    )}
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

                {/* Single Input Field - for features that require input */}
                {feature.advancedOption.requiresInput && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${feature.id}-input`} className="text-sm font-medium text-[#1c1c1c]">
                        {feature.advancedOption.inputLabel}
                      </Label>
                      <span className="text-sm font-bold text-[#d8010c]">
                        {inputValue || 1}
                      </span>
                    </div>
                    
                    {feature.advancedOption.useSlider ? (
                      <div className="space-y-2">
                        <Slider
                          value={[inputValue || 1]}
                          onValueChange={handleSingleSliderChange}
                          max={feature.advancedOption.inputMax || 20}
                          min={feature.advancedOption.inputMin || 1}
                          step={1}
                          className="py-2"
                          onClick={(e) => e.stopPropagation()}
                        />
                        
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{feature.advancedOption.inputMin || 1}</span>
                          <span>{feature.advancedOption.inputMax || 20}</span>
                        </div>
                      </div>
                    ) : (
                      <Input
                        id={`${feature.id}-input`}
                        type={feature.advancedOption.inputType || "number"}
                        min={feature.advancedOption.inputMin || 1}
                        max={feature.advancedOption.inputMax || 20}
                        value={inputValue || 1}
                        onChange={(e) => setInputValue(Math.max(1, parseInt(e.target.value) || 1))}
                        placeholder={feature.advancedOption.inputPlaceholder}
                        className="text-sm h-10"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                )}

                {/* Multiple Input Fields - for features that require multiple inputs */}
                {feature.advancedOption.requiresMultipleInputs && feature.advancedOption.inputs && (
                  <div className="space-y-4">
                    {feature.advancedOption.inputs.map((input) => (
                      <div key={input.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${feature.id}-${input.id}`} className="text-sm font-medium text-[#1c1c1c]">
                            {input.label}
                          </Label>
                          <span className="text-sm font-bold text-[#d8010c]">
                            {multipleInputValues[input.id] || 1}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <Slider
                            value={[multipleInputValues[input.id] || 1]}
                            onValueChange={(values) => handleMultipleSliderChange(input.id, values)}
                            max={20}
                            min={1}
                            step={1}
                            className="py-2"
                            onClick={(e) => e.stopPropagation()}
                          />
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>1</span>
                            <span>20</span>
                          </div>
                        </div>
                      </div>
                    ))}
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
                            {isSelected ? (
                              <div className="ml-3">
                                <CheckmarkIcon />
                              </div>
                            ) : (
                              <div className="ml-3 w-5 h-5 rounded-full border-2 border-gray-300 bg-white hover:border-gray-400 transition-all duration-200" />
                            )}
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
                    disabled={!finalCanContinue}
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
    </StepLayout>
  );
};
