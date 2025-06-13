
import { useMemo } from "react";

type Props = {
  selectedFunctions: string[];
};

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  // Map functions to their indicator positions and colors
  const functionIndicators = useMemo(() => ({
    'luci': [
      { x: 140, y: 190, room: 'luce soggiorno', size: 8 },
      { x: 260, y: 190, room: 'luce cucina', size: 8 },
      { x: 140, y: 110, room: 'luce camera matrimoniale', size: 8 },
      { x: 260, y: 110, room: 'luce camera singola', size: 8 },
      { x: 320, y: 150, room: 'luce bagno', size: 8 },
      { x: 200, y: 250, room: 'luce ingresso', size: 8 },
    ],
    'tapparelle': [
      { x: 110, y: 170, room: 'tapparella soggiorno sx', size: 6 },
      { x: 170, y: 170, room: 'tapparella soggiorno dx', size: 6 },
      { x: 110, y: 90, room: 'tapparella camera matrimoniale', size: 6 },
      { x: 230, y: 90, room: 'tapparella camera singola', size: 6 },
      { x: 230, y: 170, room: 'tapparella cucina', size: 6 },
    ],
    'tende': [
      { x: 125, y: 180, room: 'tenda soggiorno interna', size: 5 },
      { x: 125, y: 100, room: 'tenda camera matrimoniale', size: 5 },
      { x: 245, y: 180, room: 'tenda cucina', size: 5 },
    ],
    'videocitofono': [
      { x: 180, y: 270, room: 'videocitofono ingresso', size: 10 },
    ],
    'audio': [
      { x: 160, y: 205, room: 'diffusore soggiorno', size: 7 },
      { x: 160, y: 125, room: 'diffusore camera matrimoniale', size: 7 },
      { x: 280, y: 205, room: 'diffusore cucina', size: 7 },
      { x: 280, y: 125, room: 'diffusore camera singola', size: 7 },
    ],
    'clima': [
      { x: 200, y: 160, room: 'unità centrale clima', size: 12 },
      { x: 120, y: 140, room: 'termostato soggiorno', size: 6 },
      { x: 280, y: 140, room: 'split cucina', size: 8 },
    ],
    'prese': [
      { x: 120, y: 210, room: 'presa soggiorno 1', size: 4 },
      { x: 160, y: 175, room: 'presa soggiorno 2', size: 4 },
      { x: 240, y: 210, room: 'presa cucina 1', size: 4 },
      { x: 280, y: 175, room: 'presa cucina 2', size: 4 },
      { x: 120, y: 130, room: 'presa camera matrimoniale', size: 4 },
      { x: 240, y: 130, room: 'presa camera singola', size: 4 },
      { x: 340, y: 170, room: 'presa bagno', size: 4 },
    ],
    'sicurezza': [
      { x: 200, y: 280, room: 'sensore ingresso principale', size: 9 },
      { x: 90, y: 180, room: 'sensore movimento soggiorno', size: 7 },
      { x: 90, y: 100, room: 'sensore finestra camera', size: 7 },
      { x: 350, y: 120, room: 'sensore bagno', size: 7 },
      { x: 200, y: 70, room: 'sensore perimetrale superiore', size: 7 },
    ],
  }), []);

  const getIndicatorColor = (functionKey: string) => {
    const colors = {
      'luci': '#fbbf24', // yellow
      'tapparelle': '#3b82f6', // blue
      'tende': '#8b5cf6', // purple
      'videocitofono': '#ef4444', // red
      'audio': '#10b981', // emerald
      'clima': '#f97316', // orange
      'prese': '#6b7280', // gray
      'sicurezza': '#dc2626', // red
    };
    return selectedFunctions.includes(functionKey) ? colors[functionKey as keyof typeof colors] : '#d1d5db';
  };

  const getIndicatorOpacity = (functionKey: string) => {
    return selectedFunctions.includes(functionKey) ? 1 : 0.3;
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <svg
        viewBox="0 0 400 320"
        className="w-full h-auto border-2 border-gray-300 rounded-xl bg-gradient-to-b from-sky-100 to-green-50 shadow-lg"
      >
        {/* Background elements */}
        <defs>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <pattern id="brickPattern" patternUnits="userSpaceOnUse" width="20" height="10">
            <rect width="20" height="10" fill="#f1f5f9"/>
            <rect width="19" height="9" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Ground */}
        <rect x="0" y="290" width="400" height="30" fill="#22c55e" opacity="0.3" />

        {/* Main house structure */}
        <g>
          {/* Foundation */}
          <rect x="80" y="280" width="240" height="10" fill="#78716c" />
          
          {/* Main walls */}
          <rect
            x="90"
            y="150"
            width="220"
            height="130"
            fill="url(#wallGradient)"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          
          {/* Roof */}
          <polygon
            points="70,150 200,60 330,150"
            fill="url(#roofGradient)"
            stroke="#334155"
            strokeWidth="2"
          />
          
          {/* Roof details */}
          <polygon
            points="75,145 200,70 325,145"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Chimney */}
          <rect x="250" y="80" width="15" height="40" fill="#6b7280" stroke="#374151" strokeWidth="1" />
          <rect x="247" y="77" width="21" height="6" fill="#374151" />

          {/* Front door */}
          <rect
            x="180"
            y="230"
            width="40"
            height="50"
            fill="#92400e"
            stroke="#451a03"
            strokeWidth="2"
            rx="20"
          />
          <circle cx="210" cy="250" r="2" fill="#fbbf24" />
          <rect x="185" y="235" width="8" height="12" fill="#78716c" opacity="0.3" />

          {/* Windows with frames */}
          {/* Soggiorno windows */}
          <rect x="105" y="160" width="35" height="25" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
          <line x1="122.5" y1="160" x2="122.5" y2="185" stroke="#1e40af" strokeWidth="1" />
          <line x1="105" y1="172.5" x2="140" y2="172.5" stroke="#1e40af" strokeWidth="1" />
          
          <rect x="155" y="160" width="35" height="25" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
          <line x1="172.5" y1="160" x2="172.5" y2="185" stroke="#1e40af" strokeWidth="1" />
          <line x1="155" y1="172.5" x2="190" y2="172.5" stroke="#1e40af" strokeWidth="1" />

          {/* Cucina window */}
          <rect x="225" y="160" width="35" height="25" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
          <line x1="242.5" y1="160" x2="242.5" y2="185" stroke="#1e40af" strokeWidth="1" />
          <line x1="225" y1="172.5" x2="260" y2="172.5" stroke="#1e40af" strokeWidth="1" />

          {/* Upper floor windows */}
          <rect x="105" y="80" width="35" height="25" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
          <line x1="122.5" y1="80" x2="122.5" y2="105" stroke="#1e40af" strokeWidth="1" />
          <line x1="105" y1="92.5" x2="140" y2="92.5" stroke="#1e40af" strokeWidth="1" />

          <rect x="225" y="80" width="35" height="25" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
          <line x1="242.5" y1="80" x2="242.5" y2="105" stroke="#1e40af" strokeWidth="1" />
          <line x1="225" y1="92.5" x2="260" y2="92.5" stroke="#1e40af" strokeWidth="1" />

          {/* Bagno small window */}
          <rect x="275" y="160" width="20" height="15" fill="#bfdbfe" stroke="#1e40af" strokeWidth="1.5" />

          {/* Internal room divisions */}
          <line x1="200" y1="150" x2="200" y2="280" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="270" y1="150" x2="270" y2="230" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="90" y1="130" x2="200" y2="130" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="200" y1="130" x2="310" y2="130" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />

          {/* Room labels */}
          <text x="145" y="205" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="500">Soggiorno</text>
          <text x="235" y="205" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="500">Cucina</text>
          <text x="145" y="115" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="500">Camera</text>
          <text x="235" y="115" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="500">Camera</text>
          <text x="290" y="175" fontSize="9" fill="#374151" textAnchor="middle" fontWeight="500">Bagno</text>
          <text x="200" y="265" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="500">Ingresso</text>
        </g>

        {/* Function indicators */}
        {Object.entries(functionIndicators).map(([functionKey, indicators]) =>
          indicators.map((indicator, index) => (
            <g key={`${functionKey}-${index}`}>
              {/* Glow effect for active indicators */}
              {selectedFunctions.includes(functionKey) && (
                <circle
                  cx={indicator.x}
                  cy={indicator.y}
                  r={indicator.size + 3}
                  fill={getIndicatorColor(functionKey)}
                  opacity="0.3"
                  className="animate-pulse"
                />
              )}
              
              {/* Main indicator */}
              <circle
                cx={indicator.x}
                cy={indicator.y}
                r={indicator.size}
                fill={getIndicatorColor(functionKey)}
                opacity={getIndicatorOpacity(functionKey)}
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-500 ease-in-out"
              />
              
              {/* Pulsing ring for active indicators */}
              {selectedFunctions.includes(functionKey) && (
                <circle
                  cx={indicator.x}
                  cy={indicator.y}
                  r={indicator.size + 6}
                  fill="none"
                  stroke={getIndicatorColor(functionKey)}
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-ping"
                />
              )}

              {/* Small icon overlay for specific functions */}
              {functionKey === 'videocitofono' && selectedFunctions.includes(functionKey) && (
                <rect
                  x={indicator.x - 3}
                  y={indicator.y - 3}
                  width="6"
                  height="6"
                  fill="white"
                  rx="1"
                />
              )}
            </g>
          ))
        )}

        {/* Legend */}
        <g transform="translate(10, 10)">
          <rect x="0" y="0" width="140" height="100" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="6" fillOpacity="0.95" />
          <text x="70" y="15" fontSize="11" fill="#374151" textAnchor="middle" fontWeight="600">Legenda Smart Home</text>
          
          <circle cx="12" cy="25" r="5" fill="#22c55e" />
          <text x="22" y="29" fontSize="9" fill="#374151">Funzione attiva</text>
          
          <circle cx="12" cy="40" r="5" fill="#d1d5db" opacity="0.3" />
          <text x="22" y="44" fontSize="9" fill="#374151">Non selezionata</text>
          
          <text x="12" y="60" fontSize="8" fill="#6b7280">Seleziona le funzioni smart</text>
          <text x="12" y="72" fontSize="8" fill="#6b7280">per vedere l'integrazione</text>
          <text x="12" y="84" fontSize="8" fill="#6b7280">nella tua casa</text>
        </g>

        {/* Smart home connection lines (when multiple functions are selected) */}
        {selectedFunctions.length > 1 && (
          <g opacity="0.2">
            <line x1="200" y1="160" x2="140" y2="190" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="200" y1="160" x2="260" y2="190" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="200" y1="160" x2="140" y2="110" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="200" y1="160" x2="260" y2="110" stroke="#22c55e" strokeWidth="1" strokeDasharray="2,2" />
          </g>
        )}
      </svg>
    </div>
  );
};
