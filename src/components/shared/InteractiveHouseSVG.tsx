
import { useState } from "react";
import { IsometricPreview } from "./IsometricPreview";
import { DevicePicker } from "./DevicePicker";
import { Badge } from "@/components/ui/badge";

interface Props {
  selectedFunctions: string[];
  onFunctionToggle?: (functionId: string) => void;
}

const devicesConfig = [
  {
    id: 'luci',
    label: 'Luci Smart',
    icon: '💡',
    description: 'Regola scenari e intensità',
    price: 'da €150'
  },
  {
    id: 'tapparelle',
    label: 'Tapparelle',
    icon: '↕️',
    description: 'Apertura/chiusura automatica',
    price: 'da €300'
  },
  {
    id: 'clima',
    label: 'Clima KNX',
    icon: '🌡',
    description: 'Gestisci temperatura KNX',
    price: 'da €450'
  },
  {
    id: 'videocitofono',
    label: 'Videocitofono',
    icon: '📷',
    description: 'Rispondi da app',
    price: 'da €200'
  },
  {
    id: 'audio',
    label: 'Audio Multi-room',
    icon: '🔈',
    description: 'Musica multi-room',
    price: 'da €350'
  },
  {
    id: 'prese',
    label: 'Prese Smart',
    icon: '🔌',
    description: 'Controllo elettrodomestici',
    price: 'da €80'
  },
  {
    id: 'sicurezza',
    label: 'Sicurezza',
    icon: '🛡',
    description: 'Allarmi e sensori',
    price: 'da €250'
  }
];

export const InteractiveHouseSVG = ({ selectedFunctions, onFunctionToggle }: Props) => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  
  // Converti selectedFunctions in deviceStates
  const deviceStates = devicesConfig.reduce((acc, device) => {
    acc[device.id] = {
      active: selectedFunctions.includes(device.id),
      level: 50 // valore default per slider
    };
    return acc;
  }, {} as Record<string, { active: boolean; level?: number }>);

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDevice(selectedDevice === deviceId ? null : deviceId);
  };

  const handleDeviceToggle = (deviceId: string) => {
    if (onFunctionToggle) {
      onFunctionToggle(deviceId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con badge e titolo */}
      <div className="flex items-center gap-4 mb-6">
        <Badge 
          className="bg-[#d90429] text-white px-3 py-1 text-sm font-semibold"
          style={{ fontFamily: 'system-ui', fontWeight: 600 }}
        >
          Impianto elettrico
        </Badge>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            🏠
          </div>
          <h2 
            className="text-2xl font-semibold text-gray-900"
            style={{ fontFamily: 'system-ui', fontWeight: 600 }}
          >
            Soggiorno Smart
          </h2>
        </div>
      </div>

      {/* Layout principale: 65% preview + 35% picker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview isometrico - 65% */}
        <div className="lg:col-span-2">
          <IsometricPreview 
            activeDevice={selectedDevice}
            deviceStates={deviceStates}
          />
        </div>

        {/* Device picker - 35% */}
        <div className="lg:col-span-1">
          <DevicePicker
            devices={devicesConfig}
            selectedDevice={selectedDevice}
            deviceStates={deviceStates}
            onSelect={handleDeviceSelect}
            onToggle={handleDeviceToggle}
          />
        </div>
      </div>

      {/* Riepilogo funzioni attive (mobile friendly) */}
      {selectedFunctions.length > 0 && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 
            className="text-lg font-semibold mb-3 text-gray-900"
            style={{ fontFamily: 'system-ui', fontWeight: 600 }}
          >
            Configurazione Attuale
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedFunctions.map(funcId => {
              const device = devicesConfig.find(d => d.id === funcId);
              if (!device) return null;
              
              return (
                <div
                  key={funcId}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-[#fffbe5] border border-[#ffc400] rounded-lg"
                >
                  <span className="text-sm">{device.icon}</span>
                  <span 
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: 'system-ui', fontWeight: 400 }}
                  >
                    {device.label}
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full bg-[#22c55e]"
                    title="Attivo"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
