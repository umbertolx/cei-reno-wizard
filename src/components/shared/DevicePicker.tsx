
interface Device {
  id: string;
  label: string;
  icon: string;
  description: string;
  price?: string;
}

interface DevicePickerProps {
  devices: Device[];
  selectedDevice: string | null;
  deviceStates: Record<string, { active: boolean; level?: number }>;
  onSelect: (deviceId: string) => void;
  onToggle: (deviceId: string) => void;
}

export const DevicePicker = ({ 
  devices, 
  selectedDevice, 
  deviceStates, 
  onSelect, 
  onToggle 
}: DevicePickerProps) => {
  const isActive = (deviceId: string) => deviceStates[deviceId]?.active || false;

  return (
    <div className="space-y-4">
      <h3 
        className="text-lg font-semibold text-gray-900 mb-4"
        style={{ fontFamily: 'system-ui', fontWeight: 600 }}
      >
        Configurazione Dispositivi
      </h3>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto snap-y snap-mandatory">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`
              relative p-4 rounded-lg border cursor-pointer transition-all duration-200 snap-start
              ${selectedDevice === device.id 
                ? 'border-2 border-[#ffc400] bg-[#fffbe5] shadow-lg' 
                : 'border border-[#cbd5e1] bg-white hover:shadow-md hover:border-gray-300'
              }
            `}
            onClick={() => onSelect(device.id)}
            style={{ height: '80px' }}
          >
            {/* Contenuto principale */}
            <div className="flex items-center gap-3 h-full">
              {/* Icona device */}
              <div 
                className={`
                  flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg
                  transition-all duration-200
                  ${isActive(device.id) 
                    ? 'bg-[#ffc400] text-gray-900 shadow-md' 
                    : 'bg-[#f1f5f9] text-gray-600'
                  }
                `}
              >
                {device.icon}
              </div>
              
              {/* Informazioni device */}
              <div className="flex-1 min-w-0">
                <h4 
                  className="text-sm font-semibold text-gray-900 truncate"
                  style={{ fontFamily: 'system-ui', fontWeight: 600 }}
                >
                  {device.label}
                </h4>
                <p 
                  className="text-xs text-gray-500 truncate mt-1"
                  style={{ fontFamily: 'system-ui', fontWeight: 400 }}
                >
                  {device.description}
                </p>
                {device.price && (
                  <p 
                    className="text-xs text-[#d90429] font-semibold mt-1"
                    style={{ fontFamily: 'system-ui', fontWeight: 600 }}
                  >
                    {device.price}
                  </p>
                )}
              </div>

              {/* Indicatore stato */}
              <div className="flex-shrink-0">
                <div 
                  className={`
                    w-3 h-3 rounded-full transition-all duration-200
                    ${isActive(device.id) ? 'bg-[#22c55e]' : 'bg-[#d1d5db]'}
                  `}
                />
              </div>
            </div>

            {/* CTA footer (solo se selezionato) */}
            {selectedDevice === device.id && (
              <div className="absolute bottom-0 left-0 right-0 border-t border-[#ffc400] bg-[#fffbe5] p-2 rounded-b-lg">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(device.id);
                  }}
                  className={`
                    w-full px-3 py-1 rounded text-xs font-semibold transition-colors duration-200
                    ${isActive(device.id)
                      ? 'bg-[#d90429] text-white hover:bg-[#b91c3c]'
                      : 'bg-[#ffc400] text-gray-900 hover:bg-[#fbbf24]'
                    }
                  `}
                  style={{ fontFamily: 'system-ui', fontWeight: 600 }}
                >
                  {isActive(device.id) ? 'Disattiva' : 'Attiva'}
                </button>
              </div>
            )}

            {/* Effetto glow se attivo e selezionato */}
            {selectedDevice === device.id && isActive(device.id) && (
              <div 
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  boxShadow: '0 0 20px rgba(255, 196, 0, 0.3)'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Statistiche configurazione */}
      <div className="mt-4 p-3 bg-[#f8fafc] rounded-lg border border-[#cbd5e1]">
        <div className="flex justify-between items-center text-sm">
          <span 
            className="text-gray-600"
            style={{ fontFamily: 'system-ui', fontWeight: 400 }}
          >
            Dispositivi attivi:
          </span>
          <span 
            className="font-semibold text-[#d90429]"
            style={{ fontFamily: 'system-ui', fontWeight: 600 }}
          >
            {Object.values(deviceStates).filter(state => state.active).length}/{devices.length}
          </span>
        </div>
      </div>
    </div>
  );
};
