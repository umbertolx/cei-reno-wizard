type FeatureImageProps = {
  src: string;
  alt: string;
  featureId: string;
  className?: string;
};

/**
 * Feature image component with special positioning for videocitofono
 */
export const FeatureImage = ({ src, alt, featureId, className = "" }: FeatureImageProps) => {
  return (
    <img 
      src={src} 
      alt={alt}
      className={`object-cover rounded-xl ${className}`}
      style={{
        objectPosition: featureId === 'videocitofono' ? 'center top' : 'center'
      }}
    />
  );
};