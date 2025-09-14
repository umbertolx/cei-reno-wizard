import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ConfigurableFeature, FeatureState, FeatureHandlers } from "../types";
import { InputFieldComponent } from "./input-fields/InputField";
import { SliderField } from "./input-fields/SliderField";
import { MultipleInputs } from "./input-fields/MultipleInputs";
import { OptionsList } from "./input-fields/OptionsList";

type AdvancedOptionsProps = {
  feature: ConfigurableFeature;
  state: FeatureState;
  handlers: FeatureHandlers;
  canContinue: boolean;
  isVisible: boolean;
};

/**
 * Advanced options panel component
 * Handles different types of advanced configurations
 */
export const AdvancedOptions = ({
  feature,
  state,
  handlers,
  canContinue,
  isVisible
}: AdvancedOptionsProps) => {
  if (!isVisible || !feature.advancedOption) {
    return null;
  }

  const { advancedOption } = feature;
  const { inputValue, multipleInputValues, selectedOption } = state;
  const { 
    handleContinue, 
    handleOptionSelect, 
    handleMultipleSliderChange,
    handleSingleSliderChange,
    setInputValue
  } = handlers;

  return (
    <div className="space-y-4 bg-white px-6 pb-6 rounded-b-2xl">
      <div className="pt-4 space-y-3">
        <h3 className="text-base md:text-lg font-semibold text-[#1c1c1c]">
          {advancedOption.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
          {advancedOption.description}
        </p>
      </div>

      {/* Single Input Field */}
      {advancedOption.requiresInput && (
        <>
          {advancedOption.useSlider ? (
            <SliderField
              id={`${feature.id}-input`}
              label={advancedOption.inputLabel || ""}
              value={inputValue}
              onChange={handleSingleSliderChange}
              min={advancedOption.inputMin}
              max={advancedOption.inputMax}
            />
          ) : (
            <InputFieldComponent
              id={`${feature.id}-input`}
              label={advancedOption.inputLabel || ""}
              value={inputValue}
              onChange={setInputValue}
              type={advancedOption.inputType}
              min={advancedOption.inputMin}
              max={advancedOption.inputMax}
              placeholder={advancedOption.inputPlaceholder}
            />
          )}
        </>
      )}

      {/* Multiple Input Fields */}
      {advancedOption.requiresMultipleInputs && advancedOption.inputs && (
        <MultipleInputs
          inputs={advancedOption.inputs}
          values={multipleInputValues}
          onInputChange={handleMultipleSliderChange}
          featureId={feature.id}
        />
      )}

      {/* Options Comparison */}
      {advancedOption.options && (
        <OptionsList
          options={advancedOption.options}
          selectedOption={selectedOption}
          onOptionSelect={handleOptionSelect}
        />
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
  );
};