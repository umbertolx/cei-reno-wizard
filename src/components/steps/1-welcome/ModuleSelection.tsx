import { QuestionStepLayout, QuestionOption } from '@/components/templates';
import { FormData } from '@/components/Configuratore';

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const ModuleSelection = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const modules: QuestionOption[] = [
    {
      id: 'impianto-elettrico',
      label: 'Impianto elettrico',
      description: 'Rifacimento completo impianto'
    },
    {
      id: 'fotovoltaico',
      label: 'Impianto fotovoltaico',
      description: 'Pannelli solari e storage'
    },
    {
      id: 'sicurezza',
      label: 'Impianto di sicurezza',
      description: 'Allarmi e videosorveglianza'
    },
    {
      id: 'termotecnico',
      label: 'Impianto termotecnico',
      description: 'Riscaldamento e climatizzazione',
      disabled: true
    }
  ];

  const handleSelectionChange = (value: string | string[]) => {
    if (Array.isArray(value)) {
      updateFormData({ moduliSelezionati: value });
    }
  };

  return (
    <QuestionStepLayout
      badge="Impianti Civili"
      title="Seleziona gli impianti"
      description="Puoi selezionare da 1 a 4 impianti da configurare"
      options={modules}
      selectedValue={formData.moduliSelezionati || []}
      onSelectionChange={handleSelectionChange}
      multiSelect={true}
      onNext={onNext}
      onBack={onBack}
      nextButtonText="Avanti"
      backButtonText="Indietro"
    />
  );
};
