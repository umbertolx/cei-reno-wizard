import { ConfigurableFeature, InputField } from "../types";

/**
 * Validates if single input field has valid value
 */
export const validateSingleInput = (
  feature: ConfigurableFeature,
  inputValue: number
): boolean => {
  return !feature.advancedOption?.requiresInput || inputValue >= 1;
};

/**
 * Validates if multiple input fields have valid values
 */
export const validateMultipleInputs = (
  feature: ConfigurableFeature,
  multipleInputValues: Record<string, number>
): boolean => {
  if (!feature.advancedOption?.requiresMultipleInputs) {
    return true;
  }
  
  return feature.advancedOption.inputs?.some(input => 
    (multipleInputValues[input.id] || 1) >= 1
  ) ?? false;
};

/**
 * Combined validation for continue button
 */
export const canContinueValidation = (
  feature: ConfigurableFeature,
  inputValue: number,
  multipleInputValues: Record<string, number>
): boolean => {
  const singleInputValid = validateSingleInput(feature, inputValue);
  const multipleInputsValid = validateMultipleInputs(feature, multipleInputValues);
  
  return feature.advancedOption?.requiresMultipleInputs 
    ? multipleInputsValid 
    : singleInputValid;
};