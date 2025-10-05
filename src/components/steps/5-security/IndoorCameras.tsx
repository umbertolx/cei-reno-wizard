import { QuestionStepLayout, QuestionOption } from '@/components/templates';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const IndoorCameras = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const telecamereInterne = formData.moduloSicurezza?.ambientiInterni?.telecamereInterne;
  const modalita = formData.moduloSicurezza?.ambientiInterni?.modalitaTelecamereInterne;
  
  // Prima domanda: vuoi telecamere?
  const mainOptions: QuestionOption[] = [
    {
      id: 'si',
      label: 'Sì, voglio telecamere interne',
      description: 'Aggiungi la videosorveglianza agli ambienti'
    },
    {
      id: 'no',
      label: 'No, solo sensori di movimento',
      description: 'Nessuna telecamera all\'interno'
    }
  ];

  // Seconda domanda (condizionale): modalità registrazione
  const modeOptions: QuestionOption[] = [
    {
      id: 'solo-diretta',
      label: 'Solo visualizzazione in diretta',
      description: 'Controlla le immagini in tempo reale, senza registrazione'
    },
    {
      id: 'anche-registrazione',
      label: 'Anche registrazione',
      description: 'Salva le immagini per consultarle in seguito'
    }
  ];

  const handleMainSelection = (value: string) => {
    const hasCameras = value === 'si';
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          telecamereInterne: hasCameras,
          // Reset modalità se disabilita le telecamere
          ...((!hasCameras) && { modalitaTelecamereInterne: undefined })
        }
      }
    });
  };

  const handleModeSelection = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          modalitaTelecamereInterne: value
        }
      }
    });
  };

  const currentMainValue = telecamereInterne === true ? 'si' : telecamereInterne === false ? 'no' : '';

  // Se ha selezionato "sì" ma non ha ancora scelto la modalità, mostra la seconda domanda
  if (telecamereInterne === true && !modalita) {
    return (
      <QuestionStepLayout
        badge="Impianto di sicurezza"
        title="Modalità di utilizzo"
        description="Vuoi solo visualizzare in diretta o anche registrare le immagini?"
        options={modeOptions}
        selectedValue={modalita || ''}
        onSelectionChange={handleModeSelection}
        onBack={onBack}
        onNext={onNext}
      />
    );
  }

  return (
    <QuestionStepLayout
      badge="Impianto di sicurezza"
      title="Telecamere interne"
      description="Vuoi aggiungere telecamere all'interno della casa?"
      options={mainOptions}
      selectedValue={currentMainValue}
      onSelectionChange={handleMainSelection}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
