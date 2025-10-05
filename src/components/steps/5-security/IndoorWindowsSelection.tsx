import { StepLayout } from '@/components/templates';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      [ambiente]: value
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ambientiSelezionati.map((ambiente: string) => (
            <Card key={ambiente} className="p-6">
              <div className="space-y-4">
                <Label htmlFor={`windows-${ambiente}`} className="text-base font-semibold">
                  {ambiente}
                </Label>
                <Input
                  id={`windows-${ambiente}`}
                  type="number"
                  min={0}
                  max={20}
                  value={windowsConfig[ambiente] || 0}
                  onChange={(e) => handleWindowsChange(ambiente, parseInt(e.target.value) || 0)}
                  className="text-center text-lg font-medium"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Numero finestre
                </p>
              </div>
            </Card>
          ))}
        </div>

        {totalWindows > 0 && (
          <div className="text-center text-sm bg-[#d8010c]/5 rounded-lg p-4 border border-[#d8010c]/20">
            <span className="font-semibold text-[#d8010c]">
              Totale: {totalWindows} {totalWindows === 1 ? 'finestra' : 'finestre'} da proteggere
            </span>
          </div>
        )}
      </div>
    </StepLayout>
  );
};
