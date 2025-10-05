import { useEffect } from 'react';
import { MultipleSelectionLayout, SelectableItem } from '@/components/templates';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SecurityZoneSelection = ({ formData, updateFormData, onNext, onBack }: Props) => {
  // Step 0 - Rilevamento automatico del contesto (logica invisibile)
  // Eseguito ad ogni render per garantire che i dati siano sempre aggiornati
  const hasPredisposizione = formData.moduloElettrico?.interventiElettrici?.['predisposizione-antifurto'] === true;
  const hasDomotica = !!(formData.moduloElettrico?.knxConfig || formData.moduloElettrico?.bTicinoConfig);
  const tipoDomotica = formData.moduloElettrico?.tipoDomotica;
  
  // Aggiorna il contesto solo se è cambiato
  useEffect(() => {
    const currentContext = formData.moduloSicurezza;
    if (
      currentContext?.hasPredisposizione !== hasPredisposizione ||
      currentContext?.hasDomotica !== hasDomotica ||
      currentContext?.tipoDomotica !== tipoDomotica
    ) {
      updateFormData({
        moduloSicurezza: {
          ...formData.moduloSicurezza,
          hasPredisposizione,
          hasDomotica,
          tipoDomotica
        }
      });
    }
  }, [hasPredisposizione, hasDomotica, tipoDomotica]);

  const items: SelectableItem[] = [
    {
      id: 'interni',
      label: 'Ambienti interni',
      description: 'Proteggi le stanze della casa'
    },
    {
      id: 'esterni',
      label: 'Spazi esterni',
      description: 'Terrazzi, balconi, giardino o cortile'
    }
  ];

  const handleSelectionChange = (selected: string[]) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        zoneProtette: selected
      }
    });
  };

  const getContextualDescription = () => {
    if (formData.moduloSicurezza?.hasPredisposizione) {
      return "Il tuo impianto elettrico è già predisposto per l'antifurto. Scegli quali zone proteggere.";
    }
    if (formData.moduloSicurezza?.hasDomotica) {
      const sistema = formData.moduloSicurezza?.tipoDomotica === 'knx' ? 'KNX' : 'BTicino';
      return `L'impianto di sicurezza sarà integrato con il tuo sistema ${sistema}. Scegli quali zone proteggere.`;
    }
    return "Scegli quali zone della casa vuoi includere nella protezione.";
  };

  return (
    <MultipleSelectionLayout
      badge="Impianto di sicurezza"
      title="Cosa vuoi proteggere?"
      description={getContextualDescription()}
      items={items}
      selectedItems={formData.moduloSicurezza?.zoneProtette || []}
      onSelectionChange={handleSelectionChange}
      minSelections={1}
      showSelectAllButton={false}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
