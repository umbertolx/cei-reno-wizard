
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Loader } from "@googlemaps/js-api-loader";

type IndirizzoFieldProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectLocation: (location: string) => void;
};

// L'API key dovrebbe essere gestita in modo sicuro tramite variabili d'ambiente
// Per questioni di esempio, la definiamo qui
// In produzione, sarebbe meglio utilizzare Supabase per gestire questa chiave
const GOOGLE_MAPS_API_KEY = "INSERISCI_QUI_API_KEY_GOOGLE_MAPS";

export const IndirizzoField = ({ value, onChange, onSelectLocation }: IndirizzoFieldProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "INSERISCI_QUI_API_KEY_GOOGLE_MAPS") {
      setError("API key di Google Maps non configurata");
      return;
    }

    setIsLoading(true);
    const initGoogleMaps = async () => {
      try {
        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["places"]
        });

        await loader.load();
        
        if (inputRef.current) {
          // Crea l'autocomplete con opzioni specifiche per l'Italia
          const options = {
            componentRestrictions: { country: "it" },
            fields: ["address_components", "formatted_address", "geometry", "name"],
            types: ["address"]
          };
          
          autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, options);
          
          // Gestisci l'evento di selezione di un indirizzo
          autocompleteRef.current.addListener("place_changed", () => {
            const place = autocompleteRef.current?.getPlace();
            
            if (place && place.formatted_address) {
              // Estrae componenti dell'indirizzo
              let citta = "";
              let cap = "";
              let regione = "";
              
              place.address_components?.forEach((component) => {
                if (component.types.includes("locality")) {
                  citta = component.long_name;
                }
                if (component.types.includes("postal_code")) {
                  cap = component.long_name;
                }
                if (component.types.includes("administrative_area_level_1")) {
                  regione = component.long_name;
                }
              });
              
              // Formatta l'indirizzo nel formato richiesto
              const formattedAddress = place.formatted_address;
              onChange(formattedAddress);
              
              // Crea stringa formattata con le componenti dell'indirizzo
              const locationString = `${formattedAddress}`;
              onSelectLocation(locationString);
            }
          });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Errore nel caricamento di Google Maps API:", error);
        setError("Impossibile caricare Google Maps");
        setIsLoading(false);
      }
    };

    initGoogleMaps();
    
    // Pulizia al dismount del componente
    return () => {
      if (autocompleteRef.current && window.google) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange, onSelectLocation]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-[100px] h-[100px] flex-shrink-0 flex items-center justify-center">
          <img 
            src="/lovable-uploads/14822282-293b-4be9-93a5-cbc34e07f6c6.png" 
            alt="Location map icon" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-medium text-[#1c1c1c]">Indirizzo dell'immobile</h2>
          <p className="text-base text-[#1c1c1c] opacity-80">Inserisci il tuo indirizzo per iniziare a digitare e seleziona dai suggerimenti</p>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 relative">
        <Input
          ref={inputRef}
          placeholder="Via, numero civico, città"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`text-lg p-6 rounded-lg ${isLoading ? 'bg-gray-50' : ''}`}
          disabled={isLoading}
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-5 w-5 border-2 border-[#d8010c] border-t-transparent rounded-full"></div>
          </div>
        )}
        
        {error && (
          <p className="text-sm text-red-500 mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};
