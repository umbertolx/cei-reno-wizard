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
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {ambientiSelezionati.map((ambiente: string) => {
            const windowCount = windowsConfig[ambiente] || 0;
            const hasWindows = windowCount > 0;
            
            return (
              <div
                key={ambiente}
                className={`
                  rounded-xl transition-all duration-300 border p-4
                  ${hasWindows 
                    ? 'bg-[#d8010c]/5 border-[#d8010c] shadow-sm' 
                    : 'bg-white border-gray-200'
                  }
                `}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-base">
                      {ambiente}
                    </Label>
                    {hasWindows && (
                      <div className="w-4 h-4 bg-[#d8010c] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <Input
                    type="number"
                    min={0}
                    max={20}
                    value={windowCount}
                    onChange={(e) => handleWindowsChange(ambiente, parseInt(e.target.value) || 0)}
                    className="text-center font-medium"
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    N° finestre
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {totalWindows > 0 && (
          <div className="text-sm font-medium px-3 py-1.5 rounded-lg border bg-[#d8010c]/5 text-[#d8010c] border-[#d8010c]/20 text-center">
            Totale: {totalWindows} {totalWindows === 1 ? 'finestra' : 'finestre'}
          </div>
        )}
      </div>
    </StepLayout>
  );
};
