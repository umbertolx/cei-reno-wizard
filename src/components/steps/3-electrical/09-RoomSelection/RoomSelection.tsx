import { useState, useEffect } from "react";
import { FormData } from "../../../Configuratore";
import { MultipleSelectionLayout } from "../../../templates";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const RoomSelection = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [ambientiSelezionati, setAmbientiSelezionati] = useState<string[]>(
    formData.moduloElettrico?.ambientiSelezionati || []
  );

  const generaAmbienti = () => {
    const composizione = formData.composizione || formData.informazioniGenerali?.composizione;
    const ambienti = [];

    // Soggiorno/Living sempre presente
    ambienti.push("Soggiorno/Living");

    // Cucina sempre presente
    ambienti.push("Cucina");

    // Camere da letto - usa cameraDoppia e cameraSingola
    if (composizione?.cameraDoppia) {
      const numCamere = composizione.cameraDoppia;
      for (let i = 1; i <= numCamere; i++) {
        if (i === 1) {
          ambienti.push("Camera da letto principale");
        } else {
          ambienti.push(`Camera doppia ${i}`);
        }
      }
    }

    if (composizione?.cameraSingola) {
      const numCamere = composizione.cameraSingola;
      for (let i = 1; i <= numCamere; i++) {
        ambienti.push(`Camera singola ${i}`);
      }
    }

    // Bagni
    if (composizione?.bagno) {
      const numBagni = composizione.bagno;
      for (let i = 1; i <= numBagni; i++) {
        if (i === 1) {
          ambienti.push("Bagno principale");
        } else {
          ambienti.push(`Bagno ${i}`);
        }
      }
    }

    return ambienti;
  };

  const handleSelectionChange = (selected: string[]) => {
    setAmbientiSelezionati(selected);
  };

  const handleNext = () => {
    if (ambientiSelezionati.length === 0) {
      alert("Seleziona almeno un ambiente per continuare");
      return;
    }

    updateFormData({
      moduloElettrico: {
        ...formData.moduloElettrico,
        ambientiSelezionati
      }
    });
    onNext();
  };

  useEffect(() => {
    updateFormData({
      moduloElettrico: {
        ...formData.moduloElettrico,
        ambientiSelezionati
      }
    });
  }, [ambientiSelezionati]);

  const ambienti = generaAmbienti();
  const items = ambienti.map(ambiente => ({
    id: ambiente,
    label: ambiente,
    description: `Lavori elettrici per ${ambiente.toLowerCase()}`
  }));

  return (
    <MultipleSelectionLayout
      badge="Impianto elettrico"
      title="In quali ambienti vuoi intervenire?"
      description="Seleziona tutti gli ambienti dove desideri effettuare lavori elettrici"
      items={items}
      selectedItems={ambientiSelezionati}
      onSelectionChange={handleSelectionChange}
      onNext={handleNext}
      onBack={onBack}
    />
  );
};