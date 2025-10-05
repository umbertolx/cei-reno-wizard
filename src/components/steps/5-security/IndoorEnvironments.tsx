import { PreSelectedFeatureSelector } from '@/components/templates';
import { Card } from '@/components/ui/card';
import { Home, Users, Bed, Bath, Square } from 'lucide-react';
import { useState } from 'react';

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
    case 'cameraDoppia':
    case 'cameraSingola': return Bed;
    case 'bagno': return Bath;
    default: return Square;
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
  // Estrai le stanze dalla composizione
  const composizione = formData.informazioniGenerali?.composizione || {};
  
  // Stanze tipicamente a rischio (default selezionate)
  const riskyRooms = ['soggiorno', 'cucina', 'cameraDoppia', 'cameraSingola'];
  
  // Inizializza selezione se non esiste
  const initialSelection = formData.moduloSicurezza?.ambientiInterni?.ambientiSelezionati || 
    Object.entries(composizione)
      .filter(([room, count]) => typeof count === 'number' && count > 0 && riskyRooms.includes(room))
      .map(([room]) => room);

  const [selectedRooms, setSelectedRooms] = useState<string[]>(initialSelection);

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
        {Object.entries(composizione)
          .filter(([_, count]) => typeof count === 'number' && count > 0)
          .map(([roomType, count]) => {
            const isSelected = selectedRooms.includes(roomType);
            const isRisky = riskyRooms.includes(roomType);
            
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
                  {isRisky && !isSelected && (
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
