import { useState } from 'react';
import { StepLayout } from '@/components/templates';
import { QuestionOption } from '@/components/templates';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { CheckmarkIcon } from '@/components/ui/checkmark-icon';

type Props = {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export const OutdoorSpaces = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const spaziEsterni = formData.moduloSicurezza?.spaziEsterni || {};
  const [currentStep, setCurrentStep] = useState<'tipologia' | 'terrazzi' | 'giardino' | 'telecamere'>('tipologia');

  // Step 1: Tipologia spazi
  const tipologiaOptions = [
    { id: 'terrazzi', label: 'Terrazzi o balconi', description: 'Spazi esterni coperti o scoperti' },
    { id: 'giardino', label: 'Giardino o cortile', description: 'Area verde esterna' }
  ];

  const handleTipologiaToggle = (id: string) => {
    const current = spaziEsterni.tipologiaSpazi || [];
    const updated = current.includes(id) 
      ? current.filter((t: string) => t !== id)
      : [...current, id];
    
    updateFormData({
      moduloSicurezza: {
        ...formData.moduloSicurezza,
        spaziEsterni: { ...spaziEsterni, tipologiaSpazi: updated }
      }
    });
  };

  const handleNextFromTipologia = () => {
    const tipologie = spaziEsterni.tipologiaSpazi || [];
    if (tipologie.includes('terrazzi')) {
      setCurrentStep('terrazzi');
    } else if (tipologie.includes('giardino')) {
      setCurrentStep('giardino');
    }
  };

  // Step 2: Terrazzi
  const handleTerrazziNext = () => {
    if (spaziEsterni.tipologiaSpazi?.includes('giardino')) {
      setCurrentStep('giardino');
    } else {
      setCurrentStep('telecamere');
    }
  };

  // Step 3: Giardino
  const handleGiardinoNext = () => {
    setCurrentStep('telecamere');
  };

  // Step 4: Telecamere
  const handleFinalNext = () => {
    onNext();
  };

  const isFormValid = () => {
    const tipologie = spaziEsterni.tipologiaSpazi || [];
    if (tipologie.length === 0) return false;

    if (currentStep === 'terrazzi') {
      return spaziEsterni.numeroTerrazzi > 0 && spaziEsterni.superficieTerrazzi > 0;
    }
    if (currentStep === 'giardino') {
      return spaziEsterni.superficieGiardino > 0 && 
             spaziEsterni.copertura && 
             spaziEsterni.connessioneInternet &&
             (spaziEsterni.copertura === 'tutto-perimetro' || spaziEsterni.numeroIngressi > 0);
    }
    return true;
  };

  // RENDER: Step Tipologia
  if (currentStep === 'tipologia') {
    return (
      <StepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Spazi esterni da proteggere"
        description="Che tipo di spazi esterni vuoi includere nella protezione?"
        onBack={onBack}
        onNext={handleNextFromTipologia}
        isNextDisabled={!spaziEsterni.tipologiaSpazi?.length}
      >
        <div className="space-y-3">
          {tipologiaOptions.map((option) => {
            const isSelected = spaziEsterni.tipologiaSpazi?.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleTipologiaToggle(option.id)}
                className={`
                  w-full p-4 rounded-xl border text-left transition-all duration-200
                  ${isSelected
                    ? 'bg-primary/5 border-primary'
                    : 'bg-background border-border hover:border-primary/50'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-base mb-1">{option.label}</div>
                    <div className="text-sm opacity-70">{option.description}</div>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0 ml-3">
                      <CheckmarkIcon />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </StepLayout>
    );
  }

  // RENDER: Step Terrazzi
  if (currentStep === 'terrazzi') {
    return (
      <StepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Terrazzi e balconi"
        description="Dettagli sugli spazi esterni da proteggere"
        onBack={() => setCurrentStep('tipologia')}
        onNext={handleTerrazziNext}
        isNextDisabled={!isFormValid()}
      >
        <div className="space-y-6">
          {/* Numero terrazzi */}
          <div className="space-y-3">
            <Label>Quanti terrazzi o balconi vuoi includere?</Label>
            <Slider
              value={[spaziEsterni.numeroTerrazzi || 1]}
              onValueChange={([value]) => {
                updateFormData({
                  moduloSicurezza: {
                    ...formData.moduloSicurezza,
                    spaziEsterni: { ...spaziEsterni, numeroTerrazzi: value }
                  }
                });
              }}
              min={1}
              max={5}
              step={1}
            />
            <div className="text-center text-sm font-medium">
              {spaziEsterni.numeroTerrazzi || 1} {(spaziEsterni.numeroTerrazzi || 1) === 1 ? 'terrazzo' : 'terrazzi'}
            </div>
          </div>

          {/* Superficie */}
          <div className="space-y-3">
            <Label htmlFor="superficie-terrazzi">Superficie totale (m²)</Label>
            <Input
              id="superficie-terrazzi"
              type="number"
              min="1"
              value={spaziEsterni.superficieTerrazzi || ''}
              onChange={(e) => {
                updateFormData({
                  moduloSicurezza: {
                    ...formData.moduloSicurezza,
                    spaziEsterni: { ...spaziEsterni, superficieTerrazzi: parseInt(e.target.value) || 0 }
                  }
                });
              }}
              placeholder="Es: 20"
            />
          </div>
        </div>
      </StepLayout>
    );
  }

  // RENDER: Step Giardino
  if (currentStep === 'giardino') {
    return (
      <StepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Giardino o cortile"
        description="Configura la protezione per l'area verde esterna"
        onBack={() => {
          if (spaziEsterni.tipologiaSpazi?.includes('terrazzi')) {
            setCurrentStep('terrazzi');
          } else {
            setCurrentStep('tipologia');
          }
        }}
        onNext={handleGiardinoNext}
        isNextDisabled={!isFormValid()}
      >
        <div className="space-y-6">
          {/* Superficie giardino */}
          <div className="space-y-3">
            <Label htmlFor="superficie-giardino">Superficie del giardino (m²)</Label>
            <Input
              id="superficie-giardino"
              type="number"
              min="1"
              value={spaziEsterni.superficieGiardino || ''}
              onChange={(e) => {
                updateFormData({
                  moduloSicurezza: {
                    ...formData.moduloSicurezza,
                    spaziEsterni: { ...spaziEsterni, superficieGiardino: parseInt(e.target.value) || 0 }
                  }
                });
              }}
              placeholder="Es: 100"
            />
          </div>

          {/* Copertura */}
          <div className="space-y-3">
            <Label>Tipo di copertura</Label>
            <div className="space-y-2">
              {[
                { id: 'solo-ingressi', label: 'Solo ingressi principali', desc: 'Proteggi cancelli e porte' },
                { id: 'tutto-perimetro', label: 'Tutto il perimetro', desc: 'Protezione completa del confine' }
              ].map((opt) => (
                <Card
                  key={opt.id}
                  onClick={() => {
                    updateFormData({
                      moduloSicurezza: {
                        ...formData.moduloSicurezza,
                        spaziEsterni: { ...spaziEsterni, copertura: opt.id }
                      }
                    });
                  }}
                  className={`p-4 cursor-pointer transition-all ${
                    spaziEsterni.copertura === opt.id
                      ? 'bg-primary/5 border-primary'
                      : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.desc}</div>
                    </div>
                    {spaziEsterni.copertura === opt.id && <CheckmarkIcon />}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Numero ingressi (condizionale) */}
          {spaziEsterni.copertura === 'solo-ingressi' && (
            <div className="space-y-3 animate-fade-in">
              <Label>Quanti ingressi o cancelli?</Label>
              <Slider
                value={[spaziEsterni.numeroIngressi || 1]}
                onValueChange={([value]) => {
                  updateFormData({
                    moduloSicurezza: {
                      ...formData.moduloSicurezza,
                      spaziEsterni: { ...spaziEsterni, numeroIngressi: value }
                    }
                  });
                }}
                min={1}
                max={5}
                step={1}
              />
              <div className="text-center text-sm font-medium">
                {spaziEsterni.numeroIngressi || 1} {(spaziEsterni.numeroIngressi || 1) === 1 ? 'ingresso' : 'ingressi'}
              </div>
            </div>
          )}

          {/* Connessione Internet */}
          <div className="space-y-3">
            <Label>Connessione Internet in giardino</Label>
            <div className="space-y-2">
              {[
                { id: 'wifi', label: 'Sì, arriva il Wi-Fi', desc: 'Rete domestica esistente' },
                { id: '4g-dedicato', label: 'No, servirà una connessione 4G', desc: 'Modulo 4G dedicato' }
              ].map((opt) => (
                <Card
                  key={opt.id}
                  onClick={() => {
                    updateFormData({
                      moduloSicurezza: {
                        ...formData.moduloSicurezza,
                        spaziEsterni: { ...spaziEsterni, connessioneInternet: opt.id }
                      }
                    });
                  }}
                  className={`p-4 cursor-pointer transition-all ${
                    spaziEsterni.connessioneInternet === opt.id
                      ? 'bg-primary/5 border-primary'
                      : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.desc}</div>
                    </div>
                    {spaziEsterni.connessioneInternet === opt.id && <CheckmarkIcon />}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </StepLayout>
    );
  }

  // RENDER: Step Telecamere
  if (currentStep === 'telecamere') {
    return (
      <StepLayout
        badge="[MODULO 3] Impianto di sicurezza"
        title="Telecamere esterne"
        description="Vuoi aggiungere telecamere di sorveglianza per l'esterno?"
        onBack={() => {
          if (spaziEsterni.tipologiaSpazi?.includes('giardino')) {
            setCurrentStep('giardino');
          } else if (spaziEsterni.tipologiaSpazi?.includes('terrazzi')) {
            setCurrentStep('terrazzi');
          }
        }}
        onNext={handleFinalNext}
      >
        <div className="space-y-6">
          {/* Vuoi telecamere? */}
          <div className="space-y-3">
            <div className="space-y-2">
              {[
                { id: true, label: 'Sì, aggiungi telecamere esterne', desc: 'Videosorveglianza per gli spazi esterni' },
                { id: false, label: 'No, solo sensori', desc: 'Nessuna telecamera esterna' }
              ].map((opt) => (
                <Card
                  key={String(opt.id)}
                  onClick={() => {
                    updateFormData({
                      moduloSicurezza: {
                        ...formData.moduloSicurezza,
                        spaziEsterni: { 
                          ...spaziEsterni, 
                          telecamereEsterne: opt.id,
                          // Reset opzioni se disabilita
                          ...(!opt.id && { 
                            modalitaTelecamereEsterne: undefined,
                            riconoscimentoAI: undefined 
                          })
                        }
                      }
                    });
                  }}
                  className={`p-4 cursor-pointer transition-all ${
                    spaziEsterni.telecamereEsterne === opt.id
                      ? 'bg-primary/5 border-primary'
                      : 'hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-sm text-muted-foreground">{opt.desc}</div>
                    </div>
                    {spaziEsterni.telecamereEsterne === opt.id && <CheckmarkIcon />}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Opzioni telecamere (condizionale) */}
          {spaziEsterni.telecamereEsterne && (
            <div className="space-y-4 animate-fade-in">
              {/* Modalità registrazione */}
              <div className="space-y-3">
                <Label>Modalità di utilizzo</Label>
                <div className="space-y-2">
                  {[
                    { id: 'solo-diretta', label: 'Solo visualizzazione in diretta' },
                    { id: 'anche-registrazione', label: 'Anche registrazione' }
                  ].map((opt) => (
                    <Card
                      key={opt.id}
                      onClick={() => {
                        updateFormData({
                          moduloSicurezza: {
                            ...formData.moduloSicurezza,
                            spaziEsterni: { ...spaziEsterni, modalitaTelecamereEsterne: opt.id }
                          }
                        });
                      }}
                      className={`p-3 cursor-pointer transition-all ${
                        spaziEsterni.modalitaTelecamereEsterne === opt.id
                          ? 'bg-primary/5 border-primary'
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{opt.label}</span>
                        {spaziEsterni.modalitaTelecamereEsterne === opt.id && <CheckmarkIcon />}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Riconoscimento AI */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-recognition" className="cursor-pointer">
                      Riconoscimento intelligente
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Distingue persone, animali e veicoli
                    </p>
                  </div>
                  <Switch
                    id="ai-recognition"
                    checked={spaziEsterni.riconoscimentoAI || false}
                    onCheckedChange={(checked) => {
                      updateFormData({
                        moduloSicurezza: {
                          ...formData.moduloSicurezza,
                          spaziEsterni: { ...spaziEsterni, riconoscimentoAI: checked }
                        }
                      });
                    }}
                  />
                </div>
              </Card>
            </div>
          )}
        </div>
      </StepLayout>
    );
  }

  return null;
};
