import { Home, BedDouble, BedSingle, Bath, DoorOpen, Square } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PreSelectedFeatureSelector } from '@/components/templates';
import { useState, useEffect } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

const getRoomIcon = (roomType: string) => {
  switch(roomType) {
    case 'soggiorno': return Home;
    case 'cucina': return Square;
    case 'cameraDoppia': return BedDouble;
    case 'cameraSingola': return BedSingle;
    case 'bagno': return Bath;
    default: return DoorOpen;
  }
};

const getRoomLabel = (roomType: string, count: number) => {
  const labels: Record<string, string> = {
    soggiorno: 'Soggiorno',
    cucina: 'Cucina',
    cameraDoppia: 'Camera Doppia',
    cameraSingola: 'Camera Singola',
    bagno: 'Bagno',
    altro: 'Altro'
  };
  return count > 1 ? `${labels[roomType]} (${count})` : labels[roomType];
};

export const IndoorEnvironments = ({ formData, updateFormData, onNext, onBack }: Props) => {
  // Pesca le stanze dal modulo informazioni generali
  const availableRooms = formData.informazioniGenerali?.composizione || {};
  
  // Stanze consigliate per default (tipicamente a rischio)
  const recommendedRooms = ['soggiorno', 'cucina', 'cameraDoppia', 'cameraSingola'];
  
  // Calcola le stanze consigliate che sono disponibili (count > 0)
  const recommendedAvailable = Object.entries(availableRooms)
    .filter(([room, count]) => recommendedRooms.includes(room) && typeof count === 'number' && count > 0)
    .map(([room]) => room);
  
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
    }
  }, []);

  const handleToggleRoom = (roomType: string) => {
    const newSelection = selectedRooms.includes(roomType)
      ? selectedRooms.filter(r => r !== roomType)
      : [...selectedRooms, roomType];
    
    setSelectedRooms(newSelection);
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        ambientiInterni: {
          ...formData.moduloSicurezza?.ambientiInterni,
          ambientiSelezionati: newSelection
        }
      }
    });
  };

  const handleNext = () => {
    if (selectedRooms.length > 0) {
      onNext();
    }
  };

  const RoomIcon = ({ roomType }: { roomType: string }) => {
    const Icon = getRoomIcon(roomType);
    return <Icon className="w-5 h-5" />;
  };

  return (
    <PreSelectedFeatureSelector
      badge="[MODULO 3] Impianto di sicurezza"
      title="Quali ambienti vuoi mettere in sicurezza?"
      description="Le stanze più comuni sono già selezionate. Puoi modificare la selezione."
      onBack={onBack}
      onNext={handleNext}
      isNextDisabled={selectedRooms.length === 0}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.entries(availableRooms)
          .filter(([_, count]) => typeof count === 'number' && count > 0)
          .map(([roomType, count]) => {
            const isSelected = selectedRooms.includes(roomType);
            const isRecommended = recommendedRooms.includes(roomType);
            
            return (
              <Card
                key={roomType}
                onClick={() => handleToggleRoom(roomType)}
                className={`
                  p-4 cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'bg-primary/5 border-primary shadow-sm' 
                    : 'bg-background border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`
                    p-3 rounded-full transition-colors
                    ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    <RoomIcon roomType={roomType} />
                  </div>
                  <span className="text-sm font-medium">
                    {getRoomLabel(roomType, count as number)}
                  </span>
                  {isRecommended && !isSelected && (
                    <span className="text-xs text-muted-foreground">
                      (consigliato)
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
      </div>
    </PreSelectedFeatureSelector>
  );
};
