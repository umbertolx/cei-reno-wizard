import { QuestionStepLayout, QuestionOption } from '@/components/templates';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const OutdoorGarden = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const [superficieGiardino, setSuperficieGiardino] = useState(
    formData.moduloSicurezza?.spaziEsterni?.superficieGiardino || 100
  );
  const [numeroIngressi, setNumeroIngressi] = useState(
    formData.moduloSicurezza?.spaziEsterni?.numeroIngressi || 1
  );
  
  const copertura = formData.moduloSicurezza?.spaziEsterni?.copertura || '';
  const connessione = formData.moduloSicurezza?.spaziEsterni?.connessioneInternet || '';

  const coperturaOptions: QuestionOption[] = [
    {
      id: 'solo-ingressi',
      label: 'Solo ingressi principali',
      description: 'Proteggi cancelli e punti di accesso'
    },
    {
      id: 'tutto-perimetro',
      label: 'Tutto il perimetro',
      description: 'Protezione completa del confine del giardino'
    }
  ];

  const connessioneOptions: QuestionOption[] = [
    {
      id: 'wifi',
      label: 'Sì, arriva il Wi-Fi',
      description: 'Utilizzeremo la tua connessione esistente'
    },
    {
      id: '4g-dedicato',
      label: 'No, serve connessione 4G dedicata',
      description: 'Installeremo un modulo di connessione separato'
    }
  ];

  const handleCoperturaChange = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          superficieGiardino,
          copertura: value,
          numeroIngressi: value === 'solo-ingressi' ? numeroIngressi : undefined
        }
      }
    });
  };

  const handleIngressiChange = (value: number) => {
    setNumeroIngressi(value);
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          numeroIngressi: value
        }
      }
    });
  };

  const handleConnessioneChange = (value: string) => {
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          connessioneInternet: value
        }
      }
    });
  };

  const handleSuperficieChange = (value: number) => {
    setSuperficieGiardino(value);
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: {
          ...formData.moduloSicurezza?.spaziEsterni,
          superficieGiardino: value
        }
      }
    });
  };

  // Step 1: Superficie
  if (!formData.moduloSicurezza?.spaziEsterni?.superficieGiardino) {
    const superficieContent = (
      <Card className="p-6">
        <div className="space-y-4">
          <Label htmlFor="superficie-giardino">Superficie giardino (m²)</Label>
          <Input
            id="superficie-giardino"
            type="number"
            min={20}
            max={2000}
            value={superficieGiardino}
            onChange={(e) => setSuperficieGiardino(Number(e.target.value))}
          />
        </div>
      </Card>
    );

    return (
      <QuestionStepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Superficie del giardino"
        description="Quanti m² misura il giardino o cortile?"
        options={[]}
        selectedValue=""
        onSelectionChange={() => {}}
        conditionalContent={superficieContent}
        onBack={onBack}
        onNext={() => handleSuperficieChange(superficieGiardino)}
      />
    );
  }

  // Step 2: Tipo copertura
  if (!copertura) {
    const conditionalContent = (
      <div className="mt-6 animate-fade-in">
        <Card className="p-6">
          <div className="space-y-4">
            <Label htmlFor="numero-ingressi">Quanti ingressi o cancelli?</Label>
            <Slider
              id="numero-ingressi"
              min={1}
              max={5}
              step={1}
              value={[numeroIngressi]}
              onValueChange={([value]) => handleIngressiChange(value)}
              className="mt-3"
            />
            <div className="text-sm text-muted-foreground text-right">
              {numeroIngressi} {numeroIngressi === 1 ? 'ingresso' : 'ingressi'}
            </div>
          </div>
        </Card>
      </div>
    );

    return (
      <QuestionStepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Tipo di protezione"
        description="Vuoi proteggere tutto il perimetro o solo gli ingressi?"
        options={coperturaOptions}
        selectedValue={copertura}
        onSelectionChange={handleCoperturaChange}
        conditionalContent={copertura === 'solo-ingressi' ? conditionalContent : undefined}
        onBack={onBack}
        onNext={onNext}
      />
    );
  }

  // Step 3: Connessione Internet
  return (
    <QuestionStepLayout
      badge="[MODULO 3] Impianto di sicurezza"
      title="Connessione Internet"
      description="La connessione Internet arriva anche in giardino?"
      options={connessioneOptions}
      selectedValue={connessione}
      onSelectionChange={handleConnessioneChange}
      onBack={onBack}
      onNext={onNext}
    />
  );
};
