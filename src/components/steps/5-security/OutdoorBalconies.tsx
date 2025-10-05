import { StepLayout } from '@/components/templates';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useState, useEffect } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const OutdoorBalconies = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [numeroTerrazzi, setNumeroTerrazzi] = useState(
    formData.moduloSicurezza?.spaziEsterni?.numeroTerrazzi || 1
  );
  const [superficie, setSuperficie] = useState(
    formData.moduloSicurezza?.spaziEsterni?.superficieTerrazzi || 20
  );

  useEffect(() => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          numeroTerrazzi,
          superficieTerrazzi: superficie
        }
      }
    });
  }, [numeroTerrazzi, superficie]);

  const isFormValid = numeroTerrazzi >= 1 && superficie >= 5;

  return (
    <StepLayout
      badge="Impianto di sicurezza"
      title="Dettagli terrazzi e balconi"
      description="Indica le caratteristiche degli spazi esterni da proteggere"
      onBack={onBack}
      onNext={onNext}
      isNextDisabled={!isFormValid}
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="numero-terrazzi">Quanti terrazzi o balconi vuoi includere?</Label>
              <Slider
                id="numero-terrazzi"
                min={1}
                max={5}
                step={1}
                value={[numeroTerrazzi]}
                onValueChange={([value]) => setNumeroTerrazzi(value)}
                className="mt-3"
              />
              <div className="text-sm text-muted-foreground mt-2 text-right">
                {numeroTerrazzi} {numeroTerrazzi === 1 ? 'terrazzo' : 'terrazzi'}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="superficie-terrazzi">
                Superficie totale da proteggere (m²)
              </Label>
              <Input
                id="superficie-terrazzi"
                type="number"
                min={5}
                max={200}
                value={superficie}
                onChange={(e) => setSuperficie(Number(e.target.value))}
                className="mt-3"
              />
              <div className="text-sm text-muted-foreground mt-2">
                Indica una stima approssimativa della superficie totale
              </div>
            </div>
          </div>
        </Card>
      </div>
    </StepLayout>
  );
};
