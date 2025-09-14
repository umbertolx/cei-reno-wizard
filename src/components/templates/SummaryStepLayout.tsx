import { ReactNode } from 'react';
import { StepLayout, StepLayoutProps } from './StepLayout';
import { Check } from 'lucide-react';

export type SummaryCard = {
  id: string;
  title: string;
  content: ReactNode;
  highlight?: boolean;
  expandable?: boolean;
  defaultExpanded?: boolean;
};

export type EstimateData = {
  min: number;
  max: number;
  currency?: string;
  subtitle?: string;
  deductions?: {
    label: string;
    amount: number;
    percentage?: number;
  };
  features?: Array<{
    label: string;
    included: boolean;
  }>;
};

export type SummaryStepLayoutProps = Omit<StepLayoutProps, 'children'> & {
  estimate?: EstimateData;
  summaryCards?: SummaryCard[];
  additionalContent?: ReactNode;
  ctaText?: string;
  ctaSubtext?: string;
};

export const SummaryStepLayout = ({
  estimate,
  summaryCards = [],
  additionalContent,
  ctaText,
  ctaSubtext,
  ...stepProps
}: SummaryStepLayoutProps) => {
  const formatPrice = (price: number, currency = '€') => {
    return `${currency}${price.toLocaleString()}`;
  };

  return (
    <StepLayout {...stepProps}>
      {/* Estimate Box */}
      {estimate && (
        <div className="relative max-w-full md:max-w-3xl md:mx-auto mb-6 md:mb-12 px-3 md:px-0">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden hover:border-accent hover:border-[3px] transition-all duration-300">
            <div className="p-4 md:p-6">
              {/* Header section */}
              <div className="text-center mb-4">
                {estimate.subtitle && (
                  <div className="text-xs text-muted-foreground mb-1 font-medium p-1">
                    {estimate.subtitle}
                  </div>
                )}
                <div className="text-2xl md:text-5xl font-bold text-foreground mb-2 p-1">
                  {formatPrice(estimate.min, estimate.currency)} - {formatPrice(estimate.max, estimate.currency)}
                </div>
                
                {/* Tax deductions */}
                {estimate.deductions && (
                  <div className="text-sm md:text-base text-emerald-700 font-semibold mb-3 p-1">
                    {estimate.deductions.label}: {formatPrice(estimate.deductions.amount, estimate.currency)}
                    {estimate.deductions.percentage && ` (${estimate.deductions.percentage}%)`}
                  </div>
                )}
              </div>

              {/* Features */}
              {estimate.features && estimate.features.length > 0 && (
                <div className="border-t border-border pt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {estimate.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          feature.included 
                            ? 'bg-emerald-100' 
                            : 'bg-muted'
                        }`}>
                          {feature.included && (
                            <Check className="h-2.5 w-2.5 text-emerald-600" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          feature.included 
                            ? 'text-foreground' 
                            : 'text-muted-foreground'
                        }`}>
                          {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      {summaryCards.length > 0 && (
        <div className="space-y-4">
          {summaryCards.map((card) => (
            <div key={card.id}>
              {card.title && (
                <h2 className="text-xl font-medium text-foreground mb-4">
                  {card.title}
                </h2>
              )}
              <div
                className={`
                  p-4 md:p-6
                  ${card.highlight ? 'bg-primary/5' : ''}
                `}
              >
                {card.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Message */}
      {(ctaText || ctaSubtext) && (
        <div className="bg-card border-dashed border-2 border-primary p-4 rounded-xl text-center shadow-sm">
          {ctaText && (
            <p className="text-md text-foreground font-medium uppercase">
              {ctaText}
            </p>
          )}
          {ctaSubtext && (
            <p className="text-sm text-muted-foreground mt-2">
              {ctaSubtext}
            </p>
          )}
        </div>
      )}

      {/* Additional Content */}
      {additionalContent}
    </StepLayout>
  );
};