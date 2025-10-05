import { StepLayout } from '@/components/templates';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const IndoorWindowsSelection = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const ambientiSelezionati = formData.moduloSicurezza?.ambientiInterni?.ambientiSelezionati || [];
  const finestrePerAmbiente = formData.moduloSicurezza?.ambientiInterni?.finestrePerAmbiente || {};
  
  const [windowsConfig, setWindowsConfig] = useState<Record<string, number>>(finestrePerAmbiente);

  useEffect(() => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          finestrePerAmbiente: windowsConfig
        }
      }
    });
  }, [windowsConfig]);

  const handleWindowsChange = (ambiente: string, value: number) => {
    setWindowsConfig(prev => ({
      ...prev,
      [ambiente]: Math.max(0, value)
    }));
  };

  const totalWindows = Object.values(windowsConfig).reduce((sum, count) => sum + (count || 0), 0);
  const isFormValid = totalWindows > 0;

  return (
    <StepLayout
      badge="Impianto di sicurezza"
      title="Quante finestre per stanza?"
      description="Indica il numero di finestre da proteggere in ogni ambiente"
      onBack={onBack}
      onNext={onNext}
      isNextDisabled={!isFormValid}
    >
      <div className="space-y-3">
        {ambientiSelezionati.map((ambiente: string) => {
          const windowCount = windowsConfig[ambiente] || 0;
          const hasWindows = windowCount > 0;
          
          return (
            <div
              key={ambiente}
              className={`
                flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-300
                ${hasWindows 
                  ? 'bg-[#d8010c]/5 border-[#d8010c]' 
                  : 'bg-white border-gray-200'
                }
              `}
            >
              <div className="flex items-center gap-3 flex-1">
                {hasWindows && (
                  <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <span className="font-medium text-base">{ambiente}</span>
              </div>
              
              <Input
                type="number"
                min={0}
                max={20}
                value={windowCount}
                onChange={(e) => handleWindowsChange(ambiente, parseInt(e.target.value) || 0)}
                className="w-20 text-center"
                placeholder="0"
              />
            </div>
          );
        })}

        {totalWindows > 0 && (
          <div className="text-sm font-medium px-3 py-1.5 rounded-lg border bg-[#d8010c]/5 text-[#d8010c] border-[#d8010c]/20 text-center mt-4">
            Totale: {totalWindows} {totalWindows === 1 ? 'finestra' : 'finestre'}
          </div>
        )}
      </div>
    </StepLayout>
  );
};
