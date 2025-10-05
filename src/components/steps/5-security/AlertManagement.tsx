import { MultipleSelectionLayout, SelectableItem } from '@/components/templates';
import { QuestionStepLayout, QuestionOption } from '@/components/templates';
import { useState } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const AlertManagement = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const tipoAvviso = formData.moduloSicurezza?.tipoAvviso || [];
  const connessioneCasa = formData.moduloSicurezza?.connessioneCasa;
  const hasDomotica = formData.moduloSicurezza?.hasDomotica;
  const [step, setStep] = useState<'avviso' | 'connessione'>('avviso');

  const items: SelectableItem[] = [
    {
      id: 'app',
      label: 'Notifica sull\'app',
      description: 'Ricevi avvisi sul tuo smartphone'
    },
    {
      id: 'sirena',
      label: 'Sirena sonora',
      description: 'Allarme acustico in caso di intrusione'
    }
  ];

  const handleAvvisoChange = (selected: string[]) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        tipoAvviso: selected
      }
    });
  };

  const handleAvvisoNext = () => {
    // Se ha scelto "app" E non ha domotica, chiedi connessione
    if (tipoAvviso.includes('app') && !hasDomotica) {
      setStep('connessione');
    } else {
      onNext();
    }
  };

  // Step 1: Tipo di avviso
  if (step === 'avviso') {
    return (
      <MultipleSelectionLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Come vuoi essere avvisato?"
        description="Scegli come ricevere gli avvisi in caso di movimento o intrusione"
        items={items}
        selectedItems={tipoAvviso}
        onSelectionChange={handleAvvisoChange}
        minSelections={1}
        showSelectAllButton={false}
        onBack={onBack}
        onNext={handleAvvisoNext}
      />
    );
  }

  // Step 2: Connessione (solo se app && !domotica)
  if (step === 'connessione') {
    const options: QuestionOption[] = [
      {
        id: 'wifi-lan',
        label: 'Sì, Wi-Fi o LAN',
        description: 'La casa è già connessa a Internet'
      },
      {
        id: '4g-dedicato',
        label: 'No, userò 4G dedicato',
        description: 'Modulo 4G per connessione indipendente'
      }
    ];

    const handleConnessioneChange = (value: string) => {
      updateFormData({
        moduloSicurezza: {
          ...formData.moduloSicurezza,
          connessioneCasa: value
        }
      });
    };

    return (
      <QuestionStepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Connessione Internet"
        description="La casa è già connessa a Internet?"
        options={options}
        selectedValue={connessioneCasa || ''}
        onSelectionChange={handleConnessioneChange}
        onBack={() => setStep('avviso')}
        onNext={onNext}
      />
    );
  }

  return null;
};
