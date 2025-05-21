
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

type IndirizzoFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectLocation: (location: string) => void;
};

export const IndirizzoField = ({ value, onChange, onSelectLocation }: IndirizzoFieldProps) => {
  const [suggestedLocations, setSuggestedLocations] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchAddress = (query: string) => {
    onChange(query);
    
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

  return (
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
          value={value}
          onChange={(e) => handleSearchAddress(e.target.value)}
          className="text-lg p-6 rounded-lg"
        />
        
        {showSuggestions && suggestedLocations.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {suggestedLocations.map((location, index) => (
              <div 
                key={index} 
                className="p-3 hover:bg-[#fbe12e] hover:text-black cursor-pointer border-b last:border-b-0"
                onClick={() => {
                  onSelectLocation(location);
                  setShowSuggestions(false);
                }}
              >
                {location}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
