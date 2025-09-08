import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNavigationBar } from "@/components/shared/StickyNavigationBar";
import { FormData } from "@/components/Configuratore";
import { useState } from "react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const SuperficieEffettivaTetto = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const currentValue = formData.moduloFotovoltaico?.superficieEffettiva || "";
  const [superficiePersonalizzata, setSuperficiePersonalizzata] = useState(currentValue);

  const handleSuperficieChange = (value: string) => {
    setSuperficiePersonalizzata(value);
    updateFormData({
      moduloFotovoltaico: {
        ...formData.moduloFotovoltaico,
        superficieEffettiva: value
      }
    });
  };

  const handleNext = () => {
    if (!superficiePersonalizzata?.trim()) return;
    onNext();
  };

  const isFormValid = superficiePersonalizzata?.trim() && Number(superficiePersonalizzata) > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="pb-20 md:pb-8">
        {/* Badge */}
        <div className="flex justify-center mb-6 md:mb-8">
          <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white border-gray-200">
            Impianto fotovoltaico
          </Badge>
        </div>

        {/* Header con icona */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/4d476208-9875-4160-a9cd-6af03be67b0b.png"
              alt="Casa"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1c1c1c] mb-4">
            Quanti metri quadri di tetto puoi destinare ai pannelli solari?
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Inserisci la superficie effettiva che puoi dedicare all'impianto fotovoltaico. Questo ci aiuterà a dimensionare correttamente il tuo sistema.
          </p>
        </div>

        <div className="px-4">
          {/* Info Box */}
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Superficie disponibile</p>
                  <p>Considera solo le aree del tetto libere da ostacoli come camini, antenne o lucernari. La superficie inserita sarà utilizzata per calcolare la potenza ottimale del tuo impianto.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Campo input */}
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label htmlFor="superficie-effettiva" className="text-base font-medium text-[#1c1c1c]">
                    Superficie disponibile (mq)
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="superficie-effettiva"
                      type="number"
                      placeholder="Es. 35"
                      value={superficiePersonalizzata}
                      onChange={(e) => handleSuperficieChange(e.target.value)}
                      className="flex-1 text-lg"
                      min="1"
                      max="500"
                    />
                    <span className="text-gray-500 font-medium">mq</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Inserisci un valore tra 1 e 500 mq
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Pulsanti di navigazione */}
      <StickyNavigationBar
        onBack={onBack}
        onNext={handleNext}
        nextButtonText="Continua"
        backButtonText="Indietro"
        isNextDisabled={!isFormValid}
      />
    </div>
  );
};