
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Home, Ruler, MapPin, ChevronDown } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
};

export const InformazioniGenerali = ({ formData, updateFormData, onNext }: Props) => {
  const [suggestedLocations, setSuggestedLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const validateForm = () => {
    if (!formData.tipologiaAbitazione) {
      toast({
        title: "Attenzione",
        description: "Seleziona la tipologia di abitazione",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.superficie || formData.superficie <= 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci una superficie valida",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.indirizzo) {
      toast({
        title: "Attenzione",
        description: "Inserisci l'indirizzo dell'immobile",
        variant: "destructive",
      });
      return false;
    }
    
    const { cucina, camera, bagno, soggiorno, altro } = formData.composizione;
    if (cucina + camera + bagno + soggiorno + altro === 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci la suddivisione degli spazi",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSearchAddress = (query: string) => {
    updateFormData({ indirizzo: query });
    
    if (query.length > 3) {
      // Simulazione di richiesta API per autocompletamento indirizzi
      const mockResults = [
        `${query}, Milano, 20100, Lombardia`,
        `${query}, Roma, 00100, Lazio`,
        `${query}, Napoli, 80100, Campania`,
      ];
      setSuggestedLocations(mockResults);
      setShowSuggestions(true);
    } else {
      setSuggestedLocations([]);
      setShowSuggestions(false);
    }
  };

  const selectLocation = (location: string) => {
    const [indirizzo, citta, cap, regione] = location.split(", ");
    updateFormData({
      indirizzo,
      citta,
      cap,
      regione
    });
    setShowSuggestions(false);
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleChangeComposizione = (tipo: keyof FormData['composizione'], value: number) => {
    updateFormData({
      composizione: {
        ...formData.composizione,
        [tipo]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-5xl font-medium text-[#1c1c1c]">Configuratore Ristrutturazioni</h1>
        <p className="text-lg md:text-xl text-[#1c1c1c] opacity-80">Informazioni generali sulla tua abitazione</p>
      </div>

      {/* Tipologia abitazione */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-[#1F67A3] text-lg font-semibold flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFB800] text-white mr-2">
              ✦
            </span>
            Che tipo di immobile stai ristrutturando?
          </div>
        </div>
        <p className="text-sm text-[#6B7280]">Seleziona il tipo di abitazione per cui vuoi progettare l'impianto elettrico</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            className={`flex flex-col items-center border rounded-lg p-6 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors ${formData.tipologiaAbitazione === 'appartamento' ? 'bg-[#d8010c] text-white border-[#d8010c]' : 'bg-white border-[#E5E7EB]'}`}
            onClick={() => updateFormData({ tipologiaAbitazione: 'appartamento' })}
          >
            <div className={`mb-3 text-[#1F67A3] ${formData.tipologiaAbitazione === 'appartamento' ? 'text-white' : ''} ${formData.tipologiaAbitazione !== 'appartamento' && 'hover:bg-[#fbe12e]:text-black'}`}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                <rect x="6" y="6" width="4" height="4" fill="currentColor"/>
                <rect x="14" y="6" width="4" height="4" fill="currentColor"/>
                <rect x="6" y="14" width="4" height="4" fill="currentColor"/>
                <rect x="14" y="14" width="4" height="4" fill="currentColor"/>
              </svg>
            </div>
            <span className={`font-medium text-lg ${formData.tipologiaAbitazione === 'appartamento' ? 'text-white' : 'text-[#1c1c1c]'} ${formData.tipologiaAbitazione !== 'appartamento' && 'hover:bg-[#fbe12e]:text-black'}`}>Appartamento</span>
            <span className={`text-sm ${formData.tipologiaAbitazione === 'appartamento' ? 'text-white' : 'text-[#6B7280]'} ${formData.tipologiaAbitazione !== 'appartamento' && 'hover:bg-[#fbe12e]:text-black'}`}>Condomini, residence, attici</span>
          </div>
          
          <div 
            className={`flex flex-col items-center border rounded-lg p-6 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors ${formData.tipologiaAbitazione === 'casa indipendente' ? 'bg-[#d8010c] text-white border-[#d8010c]' : 'bg-white border-[#E5E7EB]'}`}
            onClick={() => updateFormData({ tipologiaAbitazione: 'casa indipendente' })}
          >
            <div className={`mb-3 text-[#1F67A3] ${formData.tipologiaAbitazione === 'casa indipendente' ? 'text-white' : ''} ${formData.tipologiaAbitazione !== 'casa indipendente' && 'hover:bg-[#fbe12e]:text-black'}`}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21V8L12 2L21 8V21H3Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 21V12H15V21" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span className={`font-medium text-lg ${formData.tipologiaAbitazione === 'casa indipendente' ? 'text-white' : 'text-[#1c1c1c]'} ${formData.tipologiaAbitazione !== 'casa indipendente' && 'hover:bg-[#fbe12e]:text-black'}`}>Casa indipendente</span>
            <span className={`text-sm ${formData.tipologiaAbitazione === 'casa indipendente' ? 'text-white' : 'text-[#6B7280]'} ${formData.tipologiaAbitazione !== 'casa indipendente' && 'hover:bg-[#fbe12e]:text-black'}`}>Ville, villette a schiera</span>
          </div>
        </div>
      </div>

      {/* Superficie */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-[#1F67A3] text-lg font-semibold flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFB800] text-white mr-2">
              ✦
            </span>
            Superficie in mq
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Es. 80"
              value={formData.superficie || ""}
              onChange={(e) => updateFormData({ superficie: parseInt(e.target.value) || 0 })}
              className="text-lg p-6 rounded-lg w-28"
            />
            <span className="text-lg">mq</span>
          </div>
          <p className="text-sm text-[#6B7280]">Inserisci una stima approssimativa se non hai una misura precisa.</p>
        </div>
      </div>

      {/* Indirizzo */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-[#1F67A3] text-lg font-semibold flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFB800] text-white mr-2">
              ✦
            </span>
            Indirizzo dell'immobile
          </div>
        </div>
        
        <div className="flex flex-col gap-2 relative">
          <Input
            placeholder="Via, numero civico, città"
            value={formData.indirizzo}
            onChange={(e) => handleSearchAddress(e.target.value)}
            className="text-lg p-6 rounded-lg"
          />
          
          {showSuggestions && suggestedLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {suggestedLocations.map((location, index) => (
                <div 
                  key={index} 
                  className="p-3 hover:bg-[#fbe12e] hover:text-black cursor-pointer border-b last:border-b-0"
                  onClick={() => selectLocation(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suddivisione degli spazi */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-[#1F67A3] text-lg font-semibold flex items-center">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFB800] text-white mr-2">
              ✦
            </span>
            Suddivisione degli spazi
          </div>
          <div className="text-sm text-[#1F67A3]">
            Totale: {Object.values(formData.composizione).reduce((a, b) => a + b, 0)} stanze
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          {[
            { key: 'soggiorno', label: 'Sala/Living', description: 'Soggiorno, sala da pranzo o spazi living aperti' },
            { key: 'cucina', label: 'Cucina', description: 'Cucina o angolo cottura' },
            { key: 'camera', label: 'Camera doppia', description: 'Camera matrimoniale o camera principale' },
            { key: 'altro', label: 'Camera singola', description: 'Camera singola, studio o camera ospiti' },
            { key: 'bagno', label: 'Bagno', description: 'Bagno completo o di servizio' },
            { key: 'altro', label: 'Altro', description: 'Altri spazi come corridoi, ripostigli, etc.' }
          ].map((item, index) => (
            <div key={`${item.key}-${index}`} className="flex items-center justify-between border-b border-[#E5E7EB] py-3">
              <div className="flex items-center gap-3">
                {index === 0 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1F67A3]">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 12H21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {index === 1 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1F67A3]">
                    <path d="M6 19L6 9C6 7.34315 7.34315 6 9 6L15 6C16.6569 6 18 7.34315 18 9V19" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 19L20 19" stroke="currentColor" strokeWidth="2"/>
                    <path d="M11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13V19H11V13Z" fill="currentColor"/>
                  </svg>
                )}
                {index === 2 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1F67A3]">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="7" cy="15" r="1" fill="currentColor"/>
                  </svg>
                )}
                {index === 3 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1F67A3]">
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="7" cy="15" r="1" fill="currentColor"/>
                  </svg>
                )}
                {index === 4 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1F67A3]">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 16C8 14.3431 9.34315 13 11 13H13C14.6569 13 16 14.3431 16 16V21H8V16Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {index === 5 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#1F67A3]">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                <div>
                  <div className="font-medium text-[#1c1c1c]">{item.label}</div>
                  <div className="text-xs text-[#6B7280]">{item.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-8 h-8 rounded-full border border-[#E5E7EB] p-0 text-xl flex items-center justify-center hover:bg-[#fbe12e] hover:text-black"
                  onClick={() => handleChangeComposizione(
                    item.key as keyof FormData['composizione'], 
                    Math.max(0, (formData.composizione[item.key as keyof FormData['composizione']] || 0) - 1)
                  )}
                >
                  -
                </Button>
                <div className="w-5 text-center">
                  {formData.composizione[item.key as keyof FormData['composizione']] || 0}
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-8 h-8 rounded-full border border-[#E5E7EB] p-0 text-xl flex items-center justify-center hover:bg-[#fbe12e] hover:text-black"
                  onClick={() => handleChangeComposizione(
                    item.key as keyof FormData['composizione'], 
                    (formData.composizione[item.key as keyof FormData['composizione']] || 0) + 1
                  )}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pulsante Continua */}
      <Button 
        onClick={handleSubmit}
        className="w-full p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-black hover:text-white rounded-xl flex items-center justify-center gap-2 mt-6 transition-all duration-300 focus:bg-[#d8010c] focus:text-white active:bg-[#d8010c] active:text-white"
      >
        Continua e calcola il preventivo
        <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
      </Button>
    </div>
  );
};
