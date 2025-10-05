import { QuestionStepLayout, QuestionOption } from '@/components/templates';
import { InfoBoxType } from '@/components/shared/InfoBox';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const AlertConnection = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const connessione = formData.moduloSicurezza?.connessioneCasa || '';
  
  const options: QuestionOption[] = [
    {
      id: 'wifi-lan',
      label: 'Sì, Wi-Fi o LAN',
      description: 'La casa ha già una connessione Internet'
    },
    {
      id: '4g-dedicato',
      label: 'No, userò 4G dedicato',
      description: 'Installeremo un modulo di connessione separato'
    }
  ];

  const handleSelection = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        connessioneCasa: value
      }
    });
  };

  const infoBox: InfoBoxType = {
    title: 'Connessione necessaria',
    content: 'Per ricevere notifiche sull\'app, il sistema di sicurezza deve essere connesso a Internet. Se non hai una connessione, includeremo un modulo 4G dedicato.'
  };

  return (
    <QuestionStepLayout
      badge="Impianto di sicurezza"
      title="Connessione Internet"
      description="La casa è già connessa a Internet?"
      options={options}
      selectedValue={connessione}
      onSelectionChange={handleSelection}
      infoBox={infoBox}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
