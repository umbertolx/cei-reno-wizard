import { useState, useEffect } from 'react';
import { StepLayout } from '@/components/templates';
import { InfoBox } from '@/components/shared/InfoBox';
import { Check } from 'lucide-react';
import motionOnlyImage from '@/assets/security-motion-only.jpg';
import windowSensorsImage from '@/assets/security-window-sensors.jpg';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const IndoorProtectionType = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const tipoProtezione = formData.moduloSicurezza?.ambientiInterni?.tipoProtezione || [];
  const [openInfoBoxes, setOpenInfoBoxes] = useState<{ [key: string]: boolean }>({});

  // Preselect first option by default
  useEffect(() => {
    if (!Array.isArray(tipoProtezione) || tipoProtezione.length === 0) {
      updateFormData({
        moduloSicurezza: {
          ...formData.moduloSicurezza,
          ambientiInterni: {
            ...formData.moduloSicurezza?.ambientiInterni,
            tipoProtezione: ['solo-movimento']
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
          tipoProtezione: [value],
          // Reset finestre config se non selezioni 'anche-finestre'
          finestrePerAmbiente: value === 'anche-finestre' 
            ? formData.moduloSicurezza?.ambientiInterni?.finestrePerAmbiente 
            : undefined
        }
      }
    });
  };

  const isSelected = (typeId: string) => {
    const currentSelection = Array.isArray(tipoProtezione) ? tipoProtezione : [];
    return currentSelection.includes(typeId);
  };

  const toggleInfoBox = (typeId: string, isOpen: boolean) => {
    setOpenInfoBoxes(prev => ({
      ...prev,
      [typeId]: isOpen
    }));
  };

  const protectionTypes = [
    {
      id: 'solo-movimento',
      title: 'Sensori volumetrici a infrarossi',
      image: motionOnlyImage,
      infoContent: (
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
        'Sensori di movimento a infrarossi',
        'Copertura fino a 12 metri',
        'Immuni agli animali domestici',
        'Installazione discreta'
      ]
    },
    {
      id: 'anche-finestre',
      title: 'Sensori volumetrici + sensori apertura finestre',
      image: windowSensorsImage,
      infoContent: (
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
        'Sensori magnetici su finestre',
        'Protezione porte esterne',
        'Allarme immediato all\'apertura',
        'Doppio livello di sicurezza'
      ]
    }
  ];

  const isFormValid = Array.isArray(tipoProtezione) && tipoProtezione.length > 0;

  return (
    <StepLayout
      badge="Impianto di sicurezza"
      title="Tipo di protezione interna"
      description="Scegli il livello di protezione per gli ambienti interni"
      onBack={onBack}
      onNext={onNext}
      isNextDisabled={!isFormValid}
    >
      <div className="space-y-6">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {protectionTypes.map((type) => {
            const isTypeSelected = isSelected(type.id);
            const isInfoBoxOpen = openInfoBoxes[type.id] || false;
            
            return (
              <div key={type.id} className="space-y-3">
                <div
                  onClick={() => handleSelection(type.id)}
                  className={`
                    relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                    ${isTypeSelected 
                      ? 'bg-[#d8010c]/5 border-[#d8010c] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }
                  `}
                >
                  <div className="absolute top-4 right-4 z-10">
                    {isTypeSelected && (
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 pr-12">
                    <div className="space-y-2 mb-4">
                      <h3 className="text-xl font-semibold text-[#1c1c1c]">
                        {type.title}
                      </h3>
                      <div className="w-8 h-0.5 bg-[#d8010c] rounded-full"></div>
                    </div>

                    <div className="space-y-3">
                      {type.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d8010c] mt-2"></div>
                          <span className="text-sm text-[#1c1c1c] opacity-85 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <InfoBox
                  title="Maggiori informazioni"
                  content={type.infoContent}
                  isOpen={isInfoBoxOpen}
                  onToggle={(isOpen) => toggleInfoBox(type.id, isOpen)}
                />
              </div>
            );
          })}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-6 items-stretch">
          {protectionTypes.map((type) => {
            const isTypeSelected = isSelected(type.id);
            
            return (
              <div
                key={type.id}
                onClick={() => handleSelection(type.id)}
                className={`
                  relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${isTypeSelected 
                    ? 'bg-[#d8010c]/5 border-[#d8010c] shadow-sm' 
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                  }
                `}
              >
                <div className="absolute top-4 right-4 z-10">
                  {isTypeSelected && (
                    <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="p-8 pr-16">
                  <div className="space-y-2 mb-6">
                    <h3 className="text-2xl font-semibold text-[#1c1c1c]">
                      {type.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-[#d8010c] rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#d8010c] mt-2.5"></div>
                        <span className="text-base text-[#1c1c1c] opacity-85 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop InfoBoxes Row */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {protectionTypes.map((type) => {
            const isInfoBoxOpen = openInfoBoxes[type.id] || false;
            
            return (
              <div key={`info-${type.id}`} className="h-full">
                <InfoBox
                  title="Maggiori informazioni"
                  content={type.infoContent}
                  isOpen={isInfoBoxOpen}
                  onToggle={(isOpen) => toggleInfoBox(type.id, isOpen)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </StepLayout>
  );
};
