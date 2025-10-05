import { MultipleSelectionLayout } from '@/components/templates';
import { useState, useEffect } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const IndoorWindowsSelection = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const ambientiSelezionati = formData.moduloSicurezza?.ambientiInterni?.ambientiSelezionati || [];
  const finestrePerAmbiente = formData.moduloSicurezza?.ambientiInterni?.finestrePerAmbiente || [];
  
  const [selectedRooms, setSelectedRooms] = useState<string[]>(finestrePerAmbiente);

  useEffect(() => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          finestrePerAmbiente: selectedRooms
        }
      }
    });
  }, [selectedRooms]);

  const handleSelectionChange = (selectedItems: string[]) => {
    setSelectedRooms(selectedItems);
  };

  const items = ambientiSelezionati.map((ambiente: string) => ({
    id: ambiente,
    label: ambiente,
    description: undefined
  }));

  return (
    <MultipleSelectionLayout
      badge="Impianto di sicurezza"
      title="Quali ambienti hanno finestre da proteggere?"
      description="Seleziona le stanze in cui vuoi installare sensori sulle finestre"
      items={items}
      selectedItems={selectedRooms}
      onSelectionChange={handleSelectionChange}
      minSelections={1}
      showSelectAllButton={true}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
