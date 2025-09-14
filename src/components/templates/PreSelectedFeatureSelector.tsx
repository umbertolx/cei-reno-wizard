/**
 * Enhanced multi-step wizard layout with InfoBox support and StepLayout integration
 */

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode, useState } from "react";
import { StepLayout, type StepLayoutProps } from "./StepLayout";
import { InfoBox, type InfoBoxType } from "@/components/shared/InfoBox";

export type PreSelectedFeatureSelectorProps = Partial<Omit<StepLayoutProps, 'children'>> & {
  children: ReactNode;
  className?: string;
  infoBox?: InfoBoxType;
};

export const PreSelectedFeatureSelector = ({
  children,
  className = "",
  infoBox,
  badge,
  title,
  description,
  showNavigation = false,
  ...stepProps
}: PreSelectedFeatureSelectorProps) => {
  const [isInfoBoxOpen, setIsInfoBoxOpen] = useState(false);

  // Backward compatibility: if no badge/title, use minimal layout
  if (!badge && !title) {
    return (
      <Card className={`w-full max-w-4xl rounded-[20px] shadow-lg overflow-hidden min-h-0 ${className}`}>
        <CardContent className="p-3 sm:p-4 md:p-5">
          <div className="flex flex-col min-h-0 space-y-2">
            {infoBox && (
              <InfoBox 
                {...infoBox} 
                isOpen={isInfoBoxOpen}
                onToggle={setIsInfoBoxOpen}
              />
            )}
            {children}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Enhanced layout with StepLayout
  return (
    <Card className={`w-full max-w-4xl rounded-[20px] shadow-lg overflow-hidden min-h-0 ${className}`}>
      <CardContent className="p-3 sm:p-4 md:p-5">
        <StepLayout
          badge={badge}
          title={title!}
          description={description}
          showNavigation={showNavigation}
          {...stepProps}
        >
          {infoBox && (
            <InfoBox 
              {...infoBox} 
              isOpen={isInfoBoxOpen}
              onToggle={setIsInfoBoxOpen}
            />
          )}
          <div className="flex flex-col min-h-0 space-y-2">
            {children}
          </div>
        </StepLayout>
      </CardContent>
    </Card>
  );
};