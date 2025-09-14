import { useState } from "react";
import { ConfigurableFeature, FeatureState, FeatureHandlers } from "../types";
import { canContinueValidation } from "../utils/validation";

type UseFeatureConfigurationReturn = {
  state: FeatureState;
  handlers: FeatureHandlers;
  computed: {
    canContinue: boolean;
    hasCompletedFeatures: boolean;
    featureImage: string;
  };
};

/**
 * Custom hook that manages all feature configuration logic
 */
export const useFeatureConfiguration = (
  feature: ConfigurableFeature,
  onComplete: (featureId: string, config: any) => void,
  getFeatureImageFn: (featureId: string, customImage?: string) => string
): UseFeatureConfigurationReturn => {
  // State management
  const [isActivated, setIsActivated] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('standard');
  const [inputValue, setInputValue] = useState<number>(1);
  const [multipleInputValues, setMultipleInputValues] = useState<Record<string, number>>({});

  // Handlers
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
      // If completed, deselect
      setIsCompleted(false);
      setIsActivated(false);
      onComplete(feature.id, { active: false });
    } else if (!feature.advancedOption) {
      // If no advanced options, select directly
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
    setIsActivated(false); // Collapse sub-options
    
    const config: { 
      active: boolean; 
      inputValue?: number; 
      multipleInputs?: Record<string, number>; 
      option?: string; 
    } = { active: true };
    
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

  // Computed values
  const canContinue = canContinueValidation(feature, inputValue, multipleInputValues);
  const hasCompletedFeatures = isCompleted;
  const featureImage = getFeatureImageFn(feature.id, feature.image);

  return {
    state: {
      isActivated,
      isCompleted,
      selectedOption,
      inputValue,
      multipleInputValues,
    },
    handlers: {
      handleCardClick,
      handleActivate,
      handleDeactivate,
      handleContinue,
      handleOptionSelect,
      handleMultipleInputChange,
      handleMultipleSliderChange,
      handleSingleSliderChange,
      setInputValue: (value: number) => setInputValue(Math.max(1, value)),
    },
    computed: {
      canContinue,
      hasCompletedFeatures,
      featureImage,
    },
  };
};