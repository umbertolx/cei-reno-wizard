import { FormData } from "../../Configuratore";
import { StepLayout } from "../../templates";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export const DettagliImpiantoEsistente = ({ formData, updateFormData, onNext, onBack }: Props) => {
  const potenzaImpianto = formData.moduloFotovoltaico?.potenzaImpianto || "";
  const annoInstallazione = formData.moduloFotovoltaico?.annoInstallazione || "";
  const hasBatteria = formData.moduloFotovoltaico?.hasBatteria || "";

  const handleFieldChange = (fieldId: string, value: any) => {
    if (fieldId === 'potenzaImpianto') {
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          potenzaImpianto: value 
        } 
      });
    } else if (fieldId === 'annoInstallazione') {
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          annoInstallazione: value 
        } 
      });
    } else if (fieldId === 'hasBatteria') {
      updateFormData({ 
        moduloFotovoltaico: { 
          ...formData.moduloFotovoltaico, 
          hasBatteria: value 
        } 
      });
    }
  };

  const validateForm = () => {
    return !!(potenzaImpianto && annoInstallazione && hasBatteria);
  };

  const sections = [
    {
      id: 'potenza-section',
      title: 'Potenza impianto',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Perché è importante?</strong> Conoscere la potenza attuale ci permette di calcolare l'ampliamento ottimale e verificare la compatibilità con l'inverter esistente.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Inserisci la potenza in kWp (per esempio 3 kWp...)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              placeholder="3.0"
              value={potenzaImpianto}
              onChange={(e) => handleFieldChange('potenzaImpianto', e.target.value)}
              className="w-full px-3 py-2 text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8010c] focus:border-transparent"
            />
          </div>
        </div>
      )
    },
    {
      id: 'anno-section',
      title: 'Anno di installazione',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Perché è importante?</strong> L'età dell'impianto influenza la tecnologia disponibile e gli incentivi applicabili per l'ampliamento.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: "prima-2015", label: "Prima del 2015" },
              { id: "2015-2020", label: "Tra il 2015 e il 2020" },
              { id: "dopo-2020", label: "Dopo il 2020" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleFieldChange('annoInstallazione', option.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  annoInstallazione === option.id
                    ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c]'
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'batteria-section',
      title: 'Batteria di accumulo',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Perché è importante?</strong> Se hai già una batteria, possiamo ottimizzare l'ampliamento per massimizzare l'autoconsumo. Senza batteria, potremmo consigliarti di aggiungerne una.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: "si", label: "Sì" },
              { id: "no", label: "No" }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleFieldChange('hasBatteria', option.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  hasBatteria === option.id
                    ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c]'
                    : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                }`}
              >
                <div className="font-semibold">{option.label}</div>
              </button>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <StepLayout
      badge="Ampliamento fotovoltaico"
      title="Dettagli impianto"
      onNext={onNext}
      onBack={onBack}
      isNextDisabled={!validateForm()}
    >
      <div className="space-y-6">
        {/* Potenza impianto */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Potenza impianto
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Perché è importante?</strong> Conoscere la potenza attuale ci permette di calcolare l'ampliamento ottimale e verificare la compatibilità con l'inverter esistente.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Inserisci la potenza in kWp (per esempio 3 kWp...)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="3.0"
                  value={potenzaImpianto}
                  onChange={(e) => handleFieldChange('potenzaImpianto', e.target.value)}
                  className="w-full px-3 py-2 text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d8010c] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Anno di installazione */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Anno di installazione
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Perché è importante?</strong> L'età dell'impianto influenza la tecnologia disponibile e gli incentivi applicabili per l'ampliamento.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: "prima-2015", label: "Prima del 2015" },
                  { id: "2015-2020", label: "Tra il 2015 e il 2020" },
                  { id: "dopo-2020", label: "Dopo il 2020" }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleFieldChange('annoInstallazione', option.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      annoInstallazione === option.id
                        ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c]'
                        : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Batteria di accumulo */}
        <div>
          <h2 className="text-xl font-medium text-[#1c1c1c] mb-4">
            Batteria di accumulo
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Perché è importante?</strong> Se hai già una batteria, possiamo ottimizzare l'ampliamento per massimizzare l'autoconsumo. Senza batteria, potremmo consigliarti di aggiungerne una.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: "si", label: "Sì" },
                  { id: "no", label: "No" }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleFieldChange('hasBatteria', option.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      hasBatteria === option.id
                        ? 'bg-[#d8010c]/5 border-[#d8010c] text-[#1c1c1c]'
                        : 'bg-white border-gray-200 hover:border-[#d8010c] hover:shadow-sm'
                    }`}
                  >
                    <div className="font-semibold">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StepLayout>
  );
};