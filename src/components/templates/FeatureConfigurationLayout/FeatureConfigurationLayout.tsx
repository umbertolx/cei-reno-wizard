import { StepLayout } from "../StepLayout";
import { FeatureConfigurationLayoutProps } from "./types";
import { useFeatureConfiguration } from "./hooks/useFeatureConfiguration";
import { getFeatureImage } from "./utils/imageMapping";
import { FeatureCard } from "./components/FeatureCard";

/**
 * Refactored FeatureConfigurationLayout component
 * Eliminated code duplication and improved maintainability
 */
export const FeatureConfigurationLayout = ({
  feature, 
  onComplete, 
  badge, 
  title, 
  description, 
  onBack, 
  onNext, 
  isNextDisabled 
}: FeatureConfigurationLayoutProps) => {
  // Extract all logic into custom hook
  const { state, handlers, computed } = useFeatureConfiguration(
    feature,
    onComplete,
    getFeatureImage
  );

  const { hasCompletedFeatures, canContinue, featureImage } = computed;

  // If used as standalone component (with badge, title, etc), use StepLayout
  if (badge || title || description || onBack || onNext) {
    return (
      <StepLayout
        badge={badge}
        title={title}
        description={description}
        onBack={onBack}
        onNext={onNext}
        isNextDisabled={isNextDisabled || !hasCompletedFeatures}
      >
        <div className="space-y-6">
          <FeatureCard
            feature={feature}
            state={state}
            handlers={handlers}
            canContinue={canContinue}
            featureImage={featureImage}
          />
        </div>
      </StepLayout>
    );
  }

  // Otherwise, render only the feature card without StepLayout
  return (
    <div className="space-y-6">
      <FeatureCard
        feature={feature}
        state={state}
        handlers={handlers}
        canContinue={canContinue}
        featureImage={featureImage}
      />
    </div>
  );
};
