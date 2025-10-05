import { useState, useEffect } from 'react';
import { StepLayout } from '@/components/templates';
import { InfoBox } from '@/components/shared/InfoBox';
import { Check } from 'lucide-react';
import indoorImage from '@/assets/security-indoor-protection.jpg';
import outdoorImage from '@/assets/security-outdoor-protection.jpg';

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
  
  const [openInfoBoxes, setOpenInfoBoxes] = useState<{ [key: string]: boolean }>({});
  
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

  const selectedZones = formData.moduloSicurezza?.zoneProtette || [];

  const handleZoneToggle = (zoneId: string) => {
    const isSelected = selectedZones.includes(zoneId);
    const newZones = isSelected
      ? selectedZones.filter((z: string) => z !== zoneId)
      : [...selectedZones, zoneId];
    
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        zoneProtette: newZones
      }
    });
  };

  const toggleInfoBox = (zoneId: string, isOpen: boolean) => {
    setOpenInfoBoxes(prev => ({
      ...prev,
      [zoneId]: isOpen
    }));
  };

  const getContextualDescription = () => {
    if (hasPredisposizione) {
      return "Il tuo impianto elettrico è già predisposto per l'antifurto. Scegli quali zone proteggere.";
    }
    if (hasDomotica) {
      const sistema = tipoDomotica === 'knx' ? 'KNX' : 'BTicino';
      return `L'impianto di sicurezza sarà integrato con il tuo sistema ${sistema}. Scegli quali zone proteggere.`;
    }
    return "Scegli quali zone della casa vuoi includere nella protezione.";
  };

  const zones = [
    {
      id: 'interni',
      title: 'Ambienti interni',
      image: indoorImage,
      description: 'Proteggi le stanze della casa',
      infoContent: (
        <div className="space-y-4">
          <img 
            src={indoorImage} 
            alt="Protezione ambienti interni" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="space-y-3 text-sm">
            <p className="font-medium text-[#1c1c1c]">Sicurezza all'interno della tua casa</p>
            <p className="text-[#1c1c1c]/80">
              La protezione degli ambienti interni include sensori di movimento installati nelle stanze principali 
              come soggiorno, cucina, camere da letto e corridoi. Questi sensori rilevano qualsiasi presenza 
              all'interno dell'abitazione quando il sistema è attivo.
            </p>
            <p className="text-[#1c1c1c]/80">
              Puoi anche aggiungere sensori su finestre e porte per rilevare aperture non autorizzate. 
              Il sistema può essere personalizzato con telecamere interne e sensori pet-friendly 
              se hai animali domestici.
            </p>
          </div>
        </div>
      ),
      features: [
        'Sensori di movimento nelle stanze',
        'Rilevamento apertura finestre e porte',
        'Telecamere interne opzionali',
        'Compatibile con animali domestici'
      ]
    },
    {
      id: 'esterni',
      title: 'Spazi esterni',
      image: outdoorImage,
      description: 'Terrazzi, balconi, giardino o cortile',
      infoContent: (
        <div className="space-y-4">
          <img 
            src={outdoorImage} 
            alt="Protezione spazi esterni" 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="space-y-3 text-sm">
            <p className="font-medium text-[#1c1c1c]">Protezione perimetrale esterna</p>
            <p className="text-[#1c1c1c]/80">
              La protezione degli spazi esterni include sensori perimetrali per terrazzi, balconi, 
              giardini e cortili. I sensori rilevano movimenti sospetti prima ancora che qualcuno 
              possa avvicinarsi agli accessi dell'abitazione.
            </p>
            <p className="text-[#1c1c1c]/80">
              Le telecamere esterne con visione notturna e intelligenza artificiale possono distinguere 
              tra persone, animali e veicoli, riducendo i falsi allarmi. Il sistema può proteggere 
              l'intero perimetro o concentrarsi sui punti di accesso principali.
            </p>
          </div>
        </div>
      ),
      features: [
        'Sensori perimetrali esterni',
        'Telecamere con visione notturna',
        'Riconoscimento intelligente AI',
        'Protezione ingressi e cancelli'
      ]
    }
  ];

  const isFormValid = selectedZones.length > 0;

  return (
    <StepLayout
      badge="Impianto di sicurezza"
      title="Cosa vuoi proteggere?"
      description={getContextualDescription()}
      onBack={onBack}
      onNext={onNext}
      isNextDisabled={!isFormValid}
    >
      <div className="space-y-6">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {zones.map((zone) => {
            const isSelected = selectedZones.includes(zone.id);
            const isInfoBoxOpen = openInfoBoxes[zone.id] || false;
            
            return (
              <div key={zone.id} className="space-y-3">
                <div
                  onClick={() => handleZoneToggle(zone.id)}
                  className={`
                    relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                    ${isSelected 
                      ? 'bg-[#d8010c]/5 border-[#d8010c] shadow-sm' 
                      : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }
                  `}
                >
                  <div className="absolute top-4 right-4 z-10">
                    {isSelected && (
                      <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="p-6 pr-12">
                    <div className="space-y-2 mb-4">
                      <h3 className="text-xl font-semibold text-[#1c1c1c]">
                        {zone.title}
                      </h3>
                      <div className="w-8 h-0.5 bg-[#d8010c] rounded-full"></div>
                    </div>

                    <div className="space-y-3">
                      {zone.features.map((feature, index) => (
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
                  content={zone.infoContent}
                  isOpen={isInfoBoxOpen}
                  onToggle={(isOpen) => toggleInfoBox(zone.id, isOpen)}
                />
              </div>
            );
          })}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-6 items-stretch">
          {zones.map((zone) => {
            const isSelected = selectedZones.includes(zone.id);
            
            return (
              <div
                key={zone.id}
                onClick={() => handleZoneToggle(zone.id)}
                className={`
                  relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${isSelected 
                    ? 'bg-[#d8010c]/5 border-[#d8010c] shadow-sm' 
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                  }
                `}
              >
                <div className="absolute top-4 right-4 z-10">
                  {isSelected && (
                    <div className="w-5 h-5 bg-[#d8010c] rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="p-8 pr-16">
                  <div className="space-y-2 mb-6">
                    <h3 className="text-2xl font-semibold text-[#1c1c1c]">
                      {zone.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-[#d8010c] rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    {zone.features.map((feature, index) => (
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
          {zones.map((zone) => {
            const isInfoBoxOpen = openInfoBoxes[zone.id] || false;
            
            return (
              <div key={`info-${zone.id}`}>
                <InfoBox
                  title="Maggiori informazioni"
                  content={zone.infoContent}
                  isOpen={isInfoBoxOpen}
                  onToggle={(isOpen) => toggleInfoBox(zone.id, isOpen)}
                />
              </div>
            );
          })}
        </div>

        {selectedZones.length > 0 && (
          <div className="text-center text-sm text-[#1c1c1c]/70 bg-[#d8010c]/5 rounded-lg p-3">
            {selectedZones.length === 1 ? '1 zona selezionata' : `${selectedZones.length} zone selezionate`}
          </div>
        )}
      </div>
    </StepLayout>
  );
};
