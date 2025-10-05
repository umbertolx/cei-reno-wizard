import { MultipleSelectionLayout } from '@/components/templates';
import { useState, useEffect } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const IndoorEnvironments = ({ formData, updateFormData, onNext, onBack }: Props) => {
  // Pesca le stanze dal modulo informazioni generali
  const composizione = formData.informazioniGenerali?.composizione || {};
  
  // Stanze consigliate per default (tipicamente a rischio)
  const recommendedRooms = ['Soggiorno', 'Cucina', 'Camera matrimoniale', 'Camera singola'];
  
  // Genera la lista degli ambienti dalla composizione
  const generaAmbienti = (): string[] => {
    const ambienti: string[] = [];

    if (composizione.soggiorno > 0) {
      for (let i = 1; i <= composizione.soggiorno; i++) {
        ambienti.push(composizione.soggiorno === 1 ? "Soggiorno" : `Soggiorno ${i}`);
      }
    }

    if (composizione.cucina > 0) {
      ambienti.push("Cucina");
    }

    if (composizione.cameraDoppia > 0) {
      for (let i = 1; i <= composizione.cameraDoppia; i++) {
        ambienti.push(composizione.cameraDoppia === 1 ? "Camera matrimoniale" : `Camera matrimoniale ${i}`);
      }
    }

    if (composizione.cameraSingola > 0) {
      for (let i = 1; i <= composizione.cameraSingola; i++) {
        ambienti.push(composizione.cameraSingola === 1 ? "Camera singola" : `Camera singola ${i}`);
      }
    }

    if (composizione.bagno > 0) {
      for (let i = 1; i <= composizione.bagno; i++) {
        ambienti.push(composizione.bagno === 1 ? "Bagno" : `Bagno ${i}`);
      }
    }

    if (composizione.altro > 0) {
      for (let i = 1; i <= composizione.altro; i++) {
        ambienti.push(composizione.altro === 1 ? "Altro ambiente" : `Altro ambiente ${i}`);
      }
    }

    return ambienti;
  };

  const ambientiDisponibili = generaAmbienti();
  
  // Calcola le stanze consigliate disponibili
  const recommendedAvailable = ambientiDisponibili.filter(ambiente => 
    recommendedRooms.some(rec => ambiente.includes(rec))
  );
  
  // Inizializza con le stanze già selezionate o con quelle consigliate
  const [selectedRooms, setSelectedRooms] = useState<string[]>(
    formData.moduloSicurezza?.ambientiInterni?.ambientiSelezionati || recommendedAvailable
  );
  
  // Aggiorna formData con la selezione iniziale al primo mount se non esiste già
  useEffect(() => {
    if (!formData.moduloSicurezza?.ambientiInterni?.ambientiSelezionati && recommendedAvailable.length > 0) {
      updateFormData({
        moduloSicurezza: {
          ...formData.moduloSicurezza,
          ambientiInterni: {
            ...formData.moduloSicurezza?.ambientiInterni,
            ambientiSelezionati: recommendedAvailable
          }
        }
      });
      setSelectedRooms(recommendedAvailable);
    }
  }, []);

  const handleSelectionChange = (selectedItems: string[]) => {
    setSelectedRooms(selectedItems);
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          ambientiSelezionati: selectedItems
        }
      }
    });
  };

  const items = ambientiDisponibili.map(ambiente => ({
    id: ambiente,
    label: ambiente,
    description: recommendedRooms.some(rec => ambiente.includes(rec)) ? 'Consigliato' : undefined
  }));

  return (
    <MultipleSelectionLayout
      badge="[MODULO 3] Impianto di sicurezza"
      title="Quali ambienti vuoi mettere in sicurezza?"
      description="Seleziona le stanze che vuoi proteggere con l'impianto di sicurezza"
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
