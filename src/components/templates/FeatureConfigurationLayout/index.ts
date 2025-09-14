// Main component export
export { FeatureConfigurationLayout } from './FeatureConfigurationLayout';

// Types export for backward compatibility
export type {
  FeatureConfigurationLayoutProps,
  ConfigurableFeature,
  ConfigurationOption,
  InputField,
} from './types';

// Individual component exports for advanced usage
export { FeatureCard } from './components/FeatureCard';
export { AdvancedOptions } from './components/AdvancedOptions';
export { SelectionIndicator } from './components/SelectionIndicator';
export { FeatureImage } from './components/FeatureImage';
export { FeatureContent } from './components/FeatureContent';

// Utility exports
export { getFeatureImage } from './utils/imageMapping';
export { useFeatureConfiguration } from './hooks/useFeatureConfiguration';