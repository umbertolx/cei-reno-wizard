import { QuestionStepLayout, QuestionOption } from '@/components/templates';
import { InfoBoxType } from '@/components/shared/InfoBox';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const IndoorPetsFriendly = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const animaliDomestici = formData.moduloSicurezza?.ambientiInterni?.animaliDomestici;
  
  const options: QuestionOption[] = [
    {
      id: 'si',
      label: 'Sì, ho animali domestici',
      description: 'Useremo sensori adatti ai movimenti degli animali'
    },
    {
      id: 'no',
      label: 'No, non ho animali',
      description: 'Sensori standard per rilevamento movimento'
    }
  ];

  const handleSelection = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          animaliDomestici: value === 'si'
        }
      }
    });
  };

  const infoBox: InfoBoxType = {
    title: 'Sensori pet-friendly',
    content: 'I sensori per animali domestici sono calibrati per ignorare movimenti fino a 25kg, riducendo i falsi allarmi mantenendo alta la sicurezza.'
  };

  const currentValue = animaliDomestici === true ? 'si' : animaliDomestici === false ? 'no' : '';

  return (
    <QuestionStepLayout
      badge="[MODULO 3] Impianto di sicurezza"
      title="Hai animali domestici in casa?"
      description="È importante saperlo per scegliere i sensori più adatti"
      options={options}
      selectedValue={currentValue}
      onSelectionChange={handleSelection}
      infoBox={infoBox}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
