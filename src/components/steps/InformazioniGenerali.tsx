
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Home, Ruler, MapPin, LayoutDashboard, Plus, Minus } from "lucide-react";

type Props = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
};

export const InformazioniGenerali = ({ formData, updateFormData, onNext }: Props) => {
  const [suggestedLocations, setSuggestedLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Calcola il totale delle stanze
  const totalRooms = Object.values(formData.composizione).reduce((sum, count) => sum + count, 0);
  
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
        description: "Inserisci l'indirizzo completo",
        variant: "destructive",
      });
      return false;
    }
    
    const { cucina, cameraDoppia, cameraSingola, soggiorno, bagno, altro } = formData.composizione;
    if (cucina + cameraDoppia + cameraSingola + soggiorno + bagno + altro === 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci almeno una stanza nella suddivisione degli spazi",
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
      indirizzo: location,
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
      </div>

      {/* Tipologia abitazione */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <Home className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Che tipo di immobile stai ristrutturando?</h2>
            <p className="text-base text-[#1c1c1c] opacity-80">Seleziona il tipo di abitazione per cui vuoi progettare l'impianto elettrico</p>
          </div>
        </div>
        
        <RadioGroup 
          value={formData.tipologiaAbitazione} 
          onValueChange={(value) => updateFormData({ tipologiaAbitazione: value })}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className={`flex flex-col items-start space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${formData.tipologiaAbitazione === 'appartamento' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
            <div className="flex items-center space-x-2 w-full">
              <RadioGroupItem 
                value="appartamento" 
                id="appartamento" 
                className={`${formData.tipologiaAbitazione === 'appartamento' ? 'text-white border-white' : ''} hover:bg-[#fbe12e]:text-black`} 
              />
              <Label 
                htmlFor="appartamento" 
                className={`cursor-pointer text-lg font-bold ${formData.tipologiaAbitazione === 'appartamento' ? 'text-white' : ''} hover:bg-[#fbe12e]:text-black`}
              >
                Appartamento
              </Label>
            </div>
            <p className={`pl-6 text-sm ${formData.tipologiaAbitazione === 'appartamento' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
              Condomini, residence, attici
            </p>
          </div>
          <div className={`flex flex-col items-start space-y-2 border rounded-lg p-4 cursor-pointer hover:bg-[#fbe12e] hover:text-black transition-colors flex-1 ${formData.tipologiaAbitazione === 'casa indipendente' ? 'bg-[#d8010c] text-white border-[#d8010c]' : ''}`}>
            <div className="flex items-center space-x-2 w-full">
              <RadioGroupItem 
                value="casa indipendente" 
                id="casa" 
                className={`${formData.tipologiaAbitazione === 'casa indipendente' ? 'text-white border-white' : ''} hover:bg-[#fbe12e]:text-black`} 
              />
              <Label 
                htmlFor="casa" 
                className={`cursor-pointer text-lg font-bold ${formData.tipologiaAbitazione === 'casa indipendente' ? 'text-white' : ''} hover:bg-[#fbe12e]:text-black`}
              >
                Casa indipendente
              </Label>
            </div>
            <p className={`pl-6 text-sm ${formData.tipologiaAbitazione === 'casa indipendente' ? 'text-white' : 'text-gray-600'} hover:bg-[#fbe12e]:text-black`}>
              Ville, villette a schiera
            </p>
          </div>
        </RadioGroup>
      </div>

      {/* Superficie */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <Ruler className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Superficie in mq</h2>
        </div>
        
        <div className="flex flex-col gap-2">
          <Input
            type="number"
            placeholder="Es. 80"
            value={formData.superficie || ""}
            onChange={(e) => updateFormData({ superficie: parseInt(e.target.value) || 0 })}
            className="text-lg p-6 rounded-lg"
          />
          <p className="text-sm text-[#1c1c1c] opacity-60">Inserisci una stima approssimativa se non hai una misura precisa.</p>
        </div>
      </div>

      {/* Indirizzo */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <MapPin className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Indirizzo dell'immobile</h2>
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
          <div className="flex items-center">
            <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
              <LayoutDashboard className="h-8 w-8 text-[#1c1c1c]" />
            </div>
            <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Suddivisione degli spazi</h2>
          </div>
          <div className="text-lg font-medium">
            Totale: {totalRooms} {totalRooms === 1 ? 'stanza' : 'stanze'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'soggiorno', label: 'Sala/Living', desc: 'Soggiorno, sala da pranzo o spazi living aperti' },
            { key: 'cucina', label: 'Cucina', desc: 'Cucina o angolo cottura' },
            { key: 'cameraDoppia', label: 'Camera doppia', desc: 'Camera matrimoniale o camera principale' },
            { key: 'cameraSingola', label: 'Camera singola', desc: 'Camera singola, studio o camera ospiti' },
            { key: 'bagno', label: 'Bagno', desc: 'Bagno completo o di servizio' },
            { key: 'altro', label: 'Altro', desc: 'Altri spazi come corridoi, ripostigli, etc.' }
          ].map((item) => (
            <div key={item.key} className="flex flex-col space-y-2">
              <div className="flex flex-col">
                <Label htmlFor={item.key} className="text-lg font-bold">{item.label}</Label>
                <span className="text-sm text-gray-500">{item.desc}</span>
              </div>
              <div className="flex items-center border rounded-lg hover:border-[#1c1c1c] transition-colors">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-xl h-12 px-6 hover:bg-[#fbe12e] hover:text-black"
                  onClick={() => handleChangeComposizione(
                    item.key as keyof FormData['composizione'], 
                    Math.max(0, (formData.composizione[item.key as keyof FormData['composizione']] || 0) - 1)
                  )}
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <div className="flex-1 text-center text-lg">
                  {formData.composizione[item.key as keyof FormData['composizione']] || 0}
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-xl h-12 px-6 hover:bg-[#fbe12e] hover:text-black"
                  onClick={() => handleChangeComposizione(
                    item.key as keyof FormData['composizione'], 
                    (formData.composizione[item.key as keyof FormData['composizione']] || 0) + 1
                  )}
                >
                  <Plus className="h-5 w-5" />
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
      </Button>
    </div>
  );
};
