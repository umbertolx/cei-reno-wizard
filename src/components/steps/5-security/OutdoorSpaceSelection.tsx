import { MultipleSelectionLayout, SelectableItem } from '@/components/templates';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const OutdoorSpaceSelection = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const items: SelectableItem[] = [
    {
      id: 'terrazzi',
      label: 'Terrazzi o balconi',
      description: 'Proteggi gli spazi esterni rialzati'
    },
    {
      id: 'giardino',
      label: 'Giardino o cortile',
      description: 'Proteggi il perimetro o gli ingressi'
    }
  ];

  const handleSelectionChange = (selected: string[]) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          tipologiaSpazi: selected
        }
      }
    });
  };

  return (
    <MultipleSelectionLayout
      badge="Impianto di sicurezza"
      title="Tipologia spazi esterni"
      description="Che tipo di spazi esterni vuoi proteggere?"
      items={items}
      selectedItems={formData.moduloSicurezza?.spaziEsterni?.tipologiaSpazi || []}
      onSelectionChange={handleSelectionChange}
      minSelections={1}
      showSelectAllButton={false}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
