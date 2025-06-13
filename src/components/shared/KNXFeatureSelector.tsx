
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

type FeatureOption = {
  id: string;
  label: string;
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

  const handleSkip = () => {
    onComplete(feature.id, { active: false });
  };

  const handleContinue = () => {
    onComplete(feature.id, { 
      active: true,
      option: selectedOption 
    });
  };

  return (
    <div className="space-y-8">
      {/* Feature Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="space-y-6">
          {/* Feature Title and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#1c1c1c]">
              {feature.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Action Buttons */}
          {!isActivated && (
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleActivate}
                className="flex-1 bg-[#d8010c] hover:bg-[#b8000a] text-white py-4 text-lg rounded-xl"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Attiva
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-1 py-4 text-lg rounded-xl border-gray-300"
              >
                Salta questa funzione
              </Button>
            </div>
          )}

          {/* Advanced Options */}
          {isActivated && feature.advancedOption && (
            <div className="border-t border-gray-200 pt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-[#1c1c1c]">
                  {feature.advancedOption.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.advancedOption.description}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {feature.advancedOption.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={option.id}
                      checked={selectedOption === option.id}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedOption(option.id);
                        }
                      }}
                    />
                    <label 
                      htmlFor={option.id}
                      className="text-lg text-gray-700 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
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
            <ArrowLeft className="w-4 h-4" />
            Indietro
          </Button>
        </div>
      )}
    </div>
  );
};
