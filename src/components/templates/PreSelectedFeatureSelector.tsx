/**
 * Multi-step wizard layout with responsive card container
 */

import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

export type PreSelectedFeatureSelectorProps = {
  children: ReactNode;
  className?: string;
};

export const PreSelectedFeatureSelector = ({
  children,
  className = ""
}: PreSelectedFeatureSelectorProps) => {
  return (
    <Card className={`w-full max-w-4xl rounded-[20px] shadow-lg overflow-hidden min-h-0 ${className}`}>
      <CardContent className="p-3 sm:p-4 md:p-5">
        <div className="flex flex-col min-h-0 space-y-2">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};