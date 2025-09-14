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
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
};

// Internal state and handlers types
export type FeatureState = {
  isActivated: boolean;
  isCompleted: boolean;
  selectedOption: string;
  inputValue: number;
  multipleInputValues: Record<string, number>;
};

export type FeatureHandlers = {
  handleCardClick: () => void;
  handleActivate: () => void;
  handleDeactivate: () => void;
  handleContinue: () => void;
  handleOptionSelect: (optionId: string) => void;
  handleMultipleInputChange: (inputId: string, value: number) => void;
  handleMultipleSliderChange: (inputId: string, values: number[]) => void;
  handleSingleSliderChange: (values: number[]) => void;
  setInputValue: (value: number) => void;
};