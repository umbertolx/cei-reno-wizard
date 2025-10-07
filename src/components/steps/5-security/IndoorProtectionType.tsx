import { useEffect } from 'react';
import { ScenarioComparisonLayout, ScenarioOption } from '@/components/templates';
import motionOnlyImage from '@/assets/security-motion-sensor-coverage.jpg';
import windowSensorsImage from '@/assets/security-window-sensors.jpg';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const IndoorProtectionType = ({ formData, updateFormData, onNext, onBack }: Props) => {
  // Change to single string instead of array
  const tipoProtezione = formData.moduloSicurezza?.ambientiInterni?.tipoProtezione || '';

  // Preselect first option by default
  useEffect(() => {
    if (!tipoProtezione) {
      updateFormData({
        moduloSicurezza: {
          ...formData.moduloSicurezza,
          ambientiInterni: {
            ...formData.moduloSicurezza?.ambientiInterni,
            tipoProtezione: 'solo-movimento'
          }
        }
      });
    }
  }, []);

  const handleSelection = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          tipoProtezione: value,
          // Reset finestre config se non selezioni 'anche-finestre'
          finestrePerAmbiente: value === 'anche-finestre' 
            ? formData.moduloSicurezza?.ambientiInterni?.finestrePerAmbiente 
            : undefined
        }
      }
    });
  };

  const options: ScenarioOption[] = [
    {
      id: 'solo-movimento',
      title: 'Sensori volumetrici a infrarossi',
      description: (
        <div className="space-y-4">
          <img 
            src={motionOnlyImage} 
            alt="Sensori volumetrici a infrarossi" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="space-y-3 text-sm">
            <p className="font-medium text-[#1c1c1c]">Rilevamento movimento interno</p>
            <p className="text-[#1c1c1c]/80">
              I sensori volumetrici a infrarossi rilevano presenze all'interno degli ambienti quando il sistema 
              è attivo. Ideali per proteggere la casa quando sei fuori o durante la notte.
            </p>
            <p className="text-[#1c1c1c]/80">
              Questi sensori sono discreti, si installano a parete e coprono ampie aree. 
              Possono essere configurati per ignorare animali domestici fino a 25kg.
            </p>
          </div>
        </div>
      ),
      features: [
        { text: 'Sensori di movimento a infrarossi' },
        { text: 'Copertura fino a 12 metri' },
        { text: 'Immuni agli animali domestici' },
        { text: 'Installazione discreta' }
      ]
    },
    {
      id: 'anche-finestre',
      title: 'Sensori volumetrici + sensori apertura finestre',
      description: (
        <div className="space-y-4">
          <img 
            src={windowSensorsImage} 
            alt="Sensori finestre" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="space-y-3 text-sm">
            <p className="font-medium text-[#1c1c1c]">Protezione completa con sensori di apertura</p>
            <p className="text-[#1c1c1c]/80">
              Oltre ai sensori volumetrici, aggiungi protezione su finestre e porte esterne. 
              I sensori magnetici rilevano ogni apertura non autorizzata, attivando immediatamente l'allarme.
            </p>
            <p className="text-[#1c1c1c]/80">
              Questa soluzione offre una protezione a più livelli: rilevi sia chi entra 
              che chi cerca di aprire un accesso. Ideale per una sicurezza completa dell'abitazione.
            </p>
          </div>
        </div>
      ),
      features: [
        { text: 'Sensori magnetici su finestre' },
        { text: 'Protezione porte esterne' },
        { text: 'Allarme immediato all\'apertura' },
        { text: 'Doppio livello di sicurezza' }
      ]
    }
  ];

  return (
    <ScenarioComparisonLayout
      badge="Impianto di sicurezza"
      title="Vuoi che l'impianto rilevi solo il movimento o anche l'apertura di porte e finestre?"
      description="Scegli il livello di protezione per gli ambienti interni"
      options={options}
      selectedValue={tipoProtezione}
      onSelectionChange={handleSelection}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
