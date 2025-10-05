import { MultipleSelectionLayout, SelectableItem } from '@/components/templates';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const AlertType = ({ formData, updateFormData, onNext, onBack }: Props) => {
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

  const handleSelectionChange = (selected: string[]) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        tipoAvviso: selected
      }
    });
  };

  return (
    <MultipleSelectionLayout
      badge="[MODULO 3] Impianto di sicurezza"
      title="Gestione avvisi"
      description="Come vuoi essere avvisato in caso di movimento o intrusione?"
      items={items}
      selectedItems={formData.moduloSicurezza?.tipoAvviso || []}
      onSelectionChange={handleSelectionChange}
      minSelections={1}
      showSelectAllButton={false}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
