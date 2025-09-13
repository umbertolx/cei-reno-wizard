import { useState, useEffect } from "react";
import { FormData } from "../../Configuratore";
import { MultipleSelectionLayout } from "../../templates/MultipleSelectionLayout";
import { toast } from "@/hooks/use-toast";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SelezioneAmbienti = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [ambientiSelezionati, setAmbientiSelezionati] = useState<string[]>(
    formData.ambientiSelezionati || []
  );

  // Genera la lista degli ambienti dalla composizione
  const generaAmbienti = (): string[] => {
    const ambienti: string[] = [];
    const composizione = formData.informazioniGenerali?.composizione || formData.composizione || {
      soggiorno: 0,
      cucina: 0,
      cameraDoppia: 0,
      cameraSingola: 0,
      bagno: 0,
      altro: 0
    };

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
  
  // Converti gli ambienti in SelectableItem format
  const selectableItems = ambientiDisponibili.map(ambiente => ({
    id: ambiente,
    label: ambiente,
    description: `Includi ${ambiente.toLowerCase()} nei lavori elettrici`,
    disabled: false
  }));

  const handleSelectionChange = (selectedItems: string[]) => {
    setAmbientiSelezionati(selectedItems);
  };

  const handleNext = () => {
    if (ambientiSelezionati.length === 0) {
      toast({
        title: "Attenzione",
        description: "Seleziona almeno un ambiente per continuare",
        variant: "destructive",
      });
      return;
    }

    updateFormData({ ambientiSelezionati });
    onNext();
  };

  // Aggiorna i dati quando cambiano le selezioni
  useEffect(() => {
    updateFormData({ ambientiSelezionati });
  }, [ambientiSelezionati, updateFormData]);

  return (
    <MultipleSelectionLayout
      badge="Impianto elettrico"
      title="Seleziona gli ambienti"
      description="In quali stanze vuoi intervenire con i lavori elettrici?"
      icon="/lovable-uploads/417ced15-f2dc-47e1-8b8c-d0faf5b9717e.png"
      items={selectableItems}
      selectedItems={ambientiSelezionati}
      onSelectionChange={handleSelectionChange}
      onNext={handleNext}
      onBack={onBack}
      minSelections={1}
      maxSelections={selectableItems.length}
      showSelectAllButton={true}
    />
  );
};