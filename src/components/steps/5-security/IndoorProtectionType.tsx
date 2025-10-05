import { QuestionStepLayout, QuestionOption } from '@/components/templates';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

const getRoomLabel = (roomType: string) => {
  const labels: Record<string, string> = {
    soggiorno: 'Soggiorno',
    cucina: 'Cucina',
    cameraDoppia: 'Camera Doppia',
    cameraSingola: 'Camera Singola',
    bagno: 'Bagno',
    altro: 'Altro'
  };
  return labels[roomType] || roomType;
};

export const IndoorProtectionType = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const tipoProtezione = formData.moduloSicurezza?.ambientiInterni?.tipoProtezione || '';
  const ambientiSelezionati = formData.moduloSicurezza?.ambientiInterni?.ambientiSelezionati || [];
  const finestrePerAmbiente = formData.moduloSicurezza?.ambientiInterni?.finestrePerAmbiente || {};

  const [windowsConfig, setWindowsConfig] = useState<Record<string, boolean>>(finestrePerAmbiente);

  const options: QuestionOption[] = [
    {
      id: 'solo-movimento',
      label: 'Solo movimento',
      description: 'Rileva presenze all\'interno degli ambienti'
    },
    {
      id: 'anche-finestre',
      label: 'Anche finestre e porte esterne',
      description: 'Sensori di apertura oltre al rilevamento movimento'
    }
  ];

  const handleSelection = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          tipoProtezione: value
        }
      }
    });
  };

  const handleWindowToggle = (roomType: string, enabled: boolean) => {
    const newConfig = { ...windowsConfig, [roomType]: enabled };
    setWindowsConfig(newConfig);
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          finestrePerAmbiente: newConfig
        }
      }
    });
  };

  const conditionalContent = tipoProtezione === 'anche-finestre' && (
    <div className="mt-6 space-y-4 animate-fade-in">
      <div className="p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-medium mb-3">
          Seleziona gli ambienti con finestre da proteggere:
        </h4>
        <div className="space-y-3">
          {ambientiSelezionati.map((room: string) => (
            <Card key={room} className="p-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={`window-${room}`} className="font-medium cursor-pointer">
                  {getRoomLabel(room)}
                </Label>
                <Switch
                  id={`window-${room}`}
                  checked={windowsConfig[room] || false}
                  onCheckedChange={(checked) => handleWindowToggle(room, checked)}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <QuestionStepLayout
      badge="[MODULO 3] Impianto di sicurezza"
      title="Tipo di protezione interna"
      description="Vuoi rilevare solo il movimento o anche aperture di finestre e porte?"
      options={options}
      selectedValue={tipoProtezione}
      onSelectionChange={handleSelection}
      conditionalContent={conditionalContent}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
