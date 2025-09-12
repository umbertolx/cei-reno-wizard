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
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-[#fbe12e] hover:border-[3px] transition-all duration-300">
            <div className="p-4 md:p-6">
              {/* Header section */}
              <div className="text-center mb-4">
                {estimate.subtitle && (
                  <div className="text-sm text-gray-500 mb-1 font-medium p-1">
                    {estimate.subtitle}
                  </div>
                )}
                <div className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 p-1">
                  {formatPrice(estimate.min, estimate.currency)} - {formatPrice(estimate.max, estimate.currency)}
                </div>
                
                {/* Tax deductions */}
                {estimate.deductions && (
                  <div className="text-sm md:text-base text-green-700 font-semibold mb-3 p-1">
                    {estimate.deductions.label}: {formatPrice(estimate.deductions.amount, estimate.currency)}
                    {estimate.deductions.percentage && ` (${estimate.deductions.percentage}%)`}
                  </div>
                )}
              </div>

              {/* Features */}
              {estimate.features && estimate.features.length > 0 && (
                <div className="border-t border-gray-200 pt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {estimate.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          feature.included 
                            ? 'bg-green-100' 
                            : 'bg-gray-100'
                        }`}>
                          {feature.included && (
                            <Check className="h-2.5 w-2.5 text-green-600" />
                          )}
                        </div>
                        <span className={`text-sm ${
                          feature.included 
                            ? 'text-gray-700' 
                            : 'text-gray-400'
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
            <div
              key={card.id}
              className={`
                bg-white border border-gray-200 rounded-xl p-4 md:p-6
                ${card.highlight ? 'border-[#d8010c] bg-[#d8010c]/5' : ''}
              `}
            >
              {card.title && (
                <h3 className="text-lg font-medium text-[#1c1c1c] mb-4">
                  {card.title}
                </h3>
              )}
              {card.content}
            </div>
          ))}
        </div>
      )}

      {/* CTA Message */}
      {(ctaText || ctaSubtext) && (
        <div className="bg-white border-dashed border-2 border-[#d8010c] p-4 rounded-xl text-center shadow-sm">
          {ctaText && (
            <p className="text-md text-[#1c1c1c] font-medium uppercase">
              {ctaText}
            </p>
          )}
          {ctaSubtext && (
            <p className="text-sm text-[#1c1c1c] opacity-70 mt-2">
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