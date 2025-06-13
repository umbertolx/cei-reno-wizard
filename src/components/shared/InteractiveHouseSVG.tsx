
import { InteractiveDevice } from "./InteractiveDevice";

interface Props {
  selectedFunctions: string[];
}

const deviceMapping = [
  { id: 'luci', x: 150, y: 120, icon: '💡', label: 'Luci' },
  { id: 'tapparelle', x: 300, y: 120, icon: '↕️', label: 'Tapparelle' },
  { id: 'clima', x: 450, y: 120, icon: '🌡', label: 'Clima' },
  { id: 'videocitofono', x: 600, y: 120, icon: '📷', label: 'Videocitofono' },
  { id: 'audio', x: 150, y: 220, icon: '🔈', label: 'Audio' },
  { id: 'prese', x: 300, y: 220, icon: '🔌', label: 'Prese Smart' },
  { id: 'sicurezza', x: 450, y: 220, icon: '🛡', label: 'Sicurezza' },
  { id: 'tende', x: 600, y: 220, icon: '↕️', label: 'Tende' }
];

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  const isSelected = (functionId: string) => selectedFunctions.includes(functionId);
  
  // Hub centrale per le linee di connessione
  const hubX = 400;
  const hubY = 320;
  
  // Calcola se mostrare le linee di connessione
  const showNetworkLines = selectedFunctions.length > 1;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Titolo */}
      <h2 
        className="text-2xl font-semibold text-center mb-6 text-gray-900"
        style={{ fontFamily: 'system-ui', fontWeight: 600 }}
      >
        Soggiorno Smart
      </h2>
      
      {/* SVG della pianta */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <svg viewBox="0 0 800 400" className="w-full h-auto">
          {/* Room outline */}
          <rect 
            x="40" 
            y="40" 
            width="720" 
            height="320"
            fill="#ffffff" 
            stroke="#cbd5e1" 
            strokeWidth="2"
            rx="8"
          />
          
          {/* Network lines (se più di un dispositivo è selezionato) */}
          {showNetworkLines && (
            <g>
              {/* Hub centrale */}
              <circle
                cx={hubX}
                cy={hubY}
                r="8"
                fill="#22c55e"
                opacity="0.8"
              />
              <text
                x={hubX}
                y={hubY + 25}
                textAnchor="middle"
                fontSize="10"
                fill="#16a34a"
                fontWeight="500"
                style={{ fontFamily: 'system-ui' }}
              >
                KNX Hub
              </text>
              
              {/* Linee di connessione */}
              {deviceMapping
                .filter(device => isSelected(device.id))
                .map(device => (
                  <line
                    key={`line-${device.id}`}
                    x1={device.x}
                    y1={device.y}
                    x2={hubX}
                    y2={hubY}
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    opacity="0.6"
                    className="transition-opacity duration-200"
                  />
                ))
              }
            </g>
          )}
          
          {/* Interactive devices */}
          {deviceMapping.map(device => (
            <InteractiveDevice
              key={device.id}
              id={device.id}
              x={device.x}
              y={device.y}
              icon={device.icon}
              label={device.label}
              active={isSelected(device.id)}
              onClick={() => {}} // La logica di click viene gestita dal componente padre
            />
          ))}
        </svg>
      </div>
      
      {/* Inventario funzioni selezionate */}
      {selectedFunctions.length > 0 && (
        <div className="mt-6">
          <h3 
            className="text-lg font-semibold mb-3 text-gray-900"
            style={{ fontFamily: 'system-ui', fontWeight: 600 }}
          >
            Funzioni Attive
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedFunctions.map(funcId => {
              const device = deviceMapping.find(d => d.id === funcId);
              if (!device) return null;
              
              return (
                <div
                  key={funcId}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <span className="text-sm">{device.icon}</span>
                  <span 
                    className="text-sm font-medium text-gray-700"
                    style={{ fontFamily: 'system-ui', fontWeight: 400 }}
                  >
                    {device.label}
                  </span>
                  <div 
                    className="w-2 h-2 rounded-full bg-yellow-400"
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
