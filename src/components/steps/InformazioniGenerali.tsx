
import { useState } from "react";
import { FormData } from "../Configuratore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Home, Ruler, MapPin, Building, ChevronDown } from "lucide-react";

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
    
    if (!formData.indirizzo || !formData.citta || !formData.cap) {
      toast({
        title: "Attenzione",
        description: "Inserisci l'indirizzo completo",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.piano) {
      toast({
        title: "Attenzione",
        description: "Seleziona il piano dell'abitazione",
        variant: "destructive",
      });
      return false;
    }
    
    const { cucina, camera, bagno, soggiorno, altro } = formData.composizione;
    if (cucina + camera + bagno + soggiorno + altro === 0) {
      toast({
        title: "Attenzione",
        description: "Inserisci la composizione dell'abitazione",
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
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <Home className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Tipologia abitazione</h2>
        </div>
        
        <RadioGroup 
          value={formData.tipologiaAbitazione} 
          onValueChange={(value) => updateFormData({ tipologiaAbitazione: value })}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-[#f4f4f4]">
            <RadioGroupItem value="appartamento" id="appartamento" />
            <Label htmlFor="appartamento" className="cursor-pointer text-lg">Appartamento</Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-[#f4f4f4]">
            <RadioGroupItem value="casa indipendente" id="casa" />
            <Label htmlFor="casa" className="cursor-pointer text-lg">Casa indipendente</Label>
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
            placeholder="Inserisci i metri quadri (anche approssimativi)"
            value={formData.superficie || ""}
            onChange={(e) => updateFormData({ superficie: parseInt(e.target.value) || 0 })}
            className="text-lg p-6 rounded-lg"
          />
          <p className="text-sm text-[#1c1c1c] opacity-60">Va bene anche una stima approssimativa</p>
        </div>
      </div>

      {/* Indirizzo */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <MapPin className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Indirizzo</h2>
        </div>
        
        <div className="flex flex-col gap-2 relative">
          <Input
            placeholder="Via, numero civico"
            value={formData.indirizzo}
            onChange={(e) => handleSearchAddress(e.target.value)}
            className="text-lg p-6 rounded-lg"
          />
          
          {showSuggestions && suggestedLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {suggestedLocations.map((location, index) => (
                <div 
                  key={index} 
                  className="p-3 hover:bg-[#f4f4f4] cursor-pointer border-b last:border-b-0"
                  onClick={() => selectLocation(location)}
                >
                  {location}
                </div>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <Input
              placeholder="Città"
              value={formData.citta}
              onChange={(e) => updateFormData({ citta: e.target.value })}
              className="text-lg p-6 rounded-lg"
            />
            <Input
              placeholder="CAP"
              value={formData.cap}
              onChange={(e) => updateFormData({ cap: e.target.value })}
              className="text-lg p-6 rounded-lg"
            />
            <Input
              placeholder="Regione"
              value={formData.regione}
              onChange={(e) => updateFormData({ regione: e.target.value })}
              className="text-lg p-6 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Piano */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <Building className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Piano dell'abitazione</h2>
        </div>
        
        <RadioGroup 
          value={formData.piano} 
          onValueChange={(value) => updateFormData({ piano: value })}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {["Terra", "Rialzato", "Primo", "Secondo", "Terzo", "Quarto", "Quinto o superiore"].map((piano) => (
            <div key={piano} className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-[#f4f4f4]">
              <RadioGroupItem value={piano.toLowerCase()} id={piano.toLowerCase()} />
              <Label htmlFor={piano.toLowerCase()} className="cursor-pointer">{piano}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Composizione */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="icon-cei flex items-center justify-center w-[75px] h-[75px] rounded-full bg-[rgba(216,121,122,0.2)]">
            <Home className="h-8 w-8 text-[#1c1c1c]" />
          </div>
          <h2 className="ml-4 text-xl md:text-2xl font-medium text-[#1c1c1c]">Composizione interna</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'cucina', label: 'Cucina' },
            { key: 'camera', label: 'Camere da letto' },
            { key: 'bagno', label: 'Bagni' },
            { key: 'soggiorno', label: 'Soggiorni' },
            { key: 'altro', label: 'Altri locali' }
          ].map((item) => (
            <div key={item.key} className="flex flex-col space-y-2">
              <Label htmlFor={item.key} className="text-lg">{item.label}</Label>
              <div className="flex items-center border rounded-lg">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-xl h-12 px-6"
                  onClick={() => handleChangeComposizione(
                    item.key as keyof FormData['composizione'], 
                    Math.max(0, (formData.composizione[item.key as keyof FormData['composizione']] || 0) - 1)
                  )}
                >
                  -
                </Button>
                <div className="flex-1 text-center text-lg">
                  {formData.composizione[item.key as keyof FormData['composizione']] || 0}
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="text-xl h-12 px-6"
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
        className="w-full p-6 text-lg bg-[#fbe12e] hover:bg-[#d8010c] text-[#1c1c1c] hover:text-white rounded-xl flex items-center justify-center gap-2 mt-6 transition-all duration-300 focus:bg-[#d8010c] focus:text-white active:bg-[#d8010c] active:text-white"
      >
        Continua e calcola il preventivo
        <ChevronDown className="h-5 w-5 transform rotate-[-90deg]" />
      </Button>
    </div>
  );
};
