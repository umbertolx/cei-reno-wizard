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

export const OutdoorCameras = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const telecamereEsterne = formData.moduloSicurezza?.spaziEsterni?.telecamereEsterne;
  const modalita = formData.moduloSicurezza?.spaziEsterni?.modalitaTelecamereEsterne;
  const [riconoscimentoAI, setRiconoscimentoAI] = useState(
    formData.moduloSicurezza?.spaziEsterni?.riconoscimentoAI || false
  );

  const mainOptions: QuestionOption[] = [
    {
      id: 'si',
      label: 'Sì, voglio telecamere esterne',
      description: 'Videosorveglianza degli spazi esterni'
    },
    {
      id: 'no',
      label: 'No, solo sensori',
      description: 'Nessuna telecamera all\'esterno'
    }
  ];

  const modeOptions: QuestionOption[] = [
    {
      id: 'solo-diretta',
      label: 'Solo visualizzazione in diretta',
      description: 'Controlla le immagini in tempo reale'
    },
    {
      id: 'anche-registrazione',
      label: 'Anche registrazione',
      description: 'Salva le immagini per consultarle in seguito'
    }
  ];

  const handleMainSelection = (value: string) => {
    const hasCameras = value === 'si';
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          telecamereEsterne: hasCameras,
          ...((!hasCameras) && {
            modalitaTelecamereEsterne: undefined,
            riconoscimentoAI: false
          })
        }
      }
    });
  };

  const handleModeSelection = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          modalitaTelecamereEsterne: value
        }
      }
    });
  };

  const handleAIToggle = (enabled: boolean) => {
    setRiconoscimentoAI(enabled);
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          riconoscimentoAI: enabled
        }
      }
    });
  };

  const currentMainValue = telecamereEsterne === true ? 'si' : telecamereEsterne === false ? 'no' : '';

  // Step 2: Modalità registrazione
  if (telecamereEsterne === true && !modalita) {
    const aiContent = (
      <div className="mt-6 animate-fade-in">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="ai-recognition" className="font-medium cursor-pointer">
                Riconoscimento intelligente (AI)
              </Label>
              <p className="text-sm text-muted-foreground">
                Identifica persone, animali e veicoli automaticamente
              </p>
            </div>
            <Switch
              id="ai-recognition"
              checked={riconoscimentoAI}
              onCheckedChange={handleAIToggle}
            />
          </div>
        </Card>
      </div>
    );

    return (
      <QuestionStepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Modalità di utilizzo"
        description="Vuoi solo visualizzare in diretta o anche registrare?"
        options={modeOptions}
        selectedValue={modalita || ''}
        onSelectionChange={handleModeSelection}
        conditionalContent={aiContent}
        onBack={onBack}
        onNext={onNext}
      />
    );
  }

  // Step 1: Vuoi telecamere?
  return (
    <QuestionStepLayout
      badge="[MODULO 3] Impianto di sicurezza"
      title="Telecamere esterne"
      description="Vuoi aggiungere telecamere di sorveglianza per l'esterno?"
      options={mainOptions}
      selectedValue={currentMainValue}
      onSelectionChange={handleMainSelection}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
