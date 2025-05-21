
/// <reference types="vite/client" />
/// <reference types="@googlemaps/js-api-loader" />

// Define types for Google Maps JavaScript API
interface Window {
  google: typeof google;
}

declare namespace google {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    class Map {
      constructor(mapDiv: HTMLElement, options?: MapOptions);
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      [key: string]: any;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    namespace places {
      class Autocomplete {
        constructor(inputField: HTMLInputElement, options?: AutocompleteOptions);
        addListener(event: string, handler: () => void): google.maps.MapsEventListener;
        getPlace(): google.maps.places.PlaceResult;
      }

      interface AutocompleteOptions {
        types?: string[];
        componentRestrictions?: {
          country: string | string[];
        };
        fields?: string[];
        [key: string]: any;
      }

      interface PlaceResult {
        address_components?: AddressComponent[];
        formatted_address?: string;
        geometry?: {
          location?: google.maps.LatLng;
          viewport?: google.maps.LatLngBounds;
        };
        name?: string;
        place_id?: string;
        [key: string]: any;
      }

      interface AddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
      }
    }

    interface MapsEventListener {
      remove(): void;
    }

    namespace event {
      function clearInstanceListeners(instance: object): void;
    }
  }
}
