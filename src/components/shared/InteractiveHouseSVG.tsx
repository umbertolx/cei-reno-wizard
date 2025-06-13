
import { useMemo } from "react";

type Props = {
  selectedFunctions: string[];
};

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  // Map functions to their indicator positions and colors
  const functionIndicators = useMemo(() => ({
    'luci': [
      { x: 120, y: 180, room: 'soggiorno' },
      { x: 280, y: 180, room: 'cucina' },
      { x: 120, y: 100, room: 'camera' },
      { x: 280, y: 100, room: 'bagno' },
    ],
    'tapparelle': [
      { x: 80, y: 160, room: 'finestra soggiorno' },
      { x: 160, y: 160, room: 'finestra soggiorno 2' },
      { x: 80, y: 80, room: 'finestra camera' },
      { x: 240, y: 160, room: 'finestra cucina' },
    ],
    'tende': [
      { x: 90, y: 170, room: 'tenda soggiorno' },
      { x: 90, y: 90, room: 'tenda camera' },
    ],
    'videocitofono': [
      { x: 50, y: 200, room: 'ingresso' },
    ],
    'audio': [
      { x: 140, y: 160, room: 'audio soggiorno' },
      { x: 140, y: 80, room: 'audio camera' },
    ],
    'clima': [
      { x: 200, y: 140, room: 'clima centrale' },
    ],
    'prese': [
      { x: 100, y: 200, room: 'presa soggiorno' },
      { x: 260, y: 200, room: 'presa cucina' },
      { x: 100, y: 120, room: 'presa camera' },
      { x: 300, y: 120, room: 'presa bagno' },
    ],
    'sicurezza': [
      { x: 60, y: 180, room: 'sensore ingresso' },
      { x: 180, y: 60, room: 'sensore generale' },
    ],
  }), []);

  const getIndicatorColor = (functionKey: string) => {
    return selectedFunctions.includes(functionKey) ? '#22c55e' : '#d1d5db';
  };

  const getIndicatorOpacity = (functionKey: string) => {
    return selectedFunctions.includes(functionKey) ? 1 : 0.4;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 350 250"
        className="w-full h-auto border border-gray-200 rounded-lg bg-gray-50"
      >
        {/* House structure */}
        <g>
          {/* Main house body */}
          <rect
            x="70"
            y="140"
            width="200"
            height="90"
            fill="#f8fafc"
            stroke="#334155"
            strokeWidth="2"
          />
          
          {/* Roof */}
          <polygon
            points="60,140 170,60 280,140"
            fill="#64748b"
            stroke="#334155"
            strokeWidth="2"
          />
          
          {/* Door */}
          <rect
            x="80"
            y="190"
            width="25"
            height="40"
            fill="#8b5cf6"
            stroke="#334155"
            strokeWidth="1"
          />
          
          {/* Windows */}
          <rect x="120" y="150" width="30" height="25" fill="#bfdbfe" stroke="#334155" strokeWidth="1" />
          <rect x="180" y="150" width="30" height="25" fill="#bfdbfe" stroke="#334155" strokeWidth="1" />
          <rect x="230" y="150" width="30" height="25" fill="#bfdbfe" stroke="#334155" strokeWidth="1" />
          <rect x="120" y="70" width="30" height="25" fill="#bfdbfe" stroke="#334155" strokeWidth="1" />
          
          {/* Room dividers */}
          <line x1="170" y1="140" x2="170" y2="230" stroke="#334155" strokeWidth="1" opacity="0.3" />
          <line x1="220" y1="140" x2="220" y2="230" stroke="#334155" strokeWidth="1" opacity="0.3" />
          <line x1="70" y1="120" x2="170" y2="120" stroke="#334155" strokeWidth="1" opacity="0.3" />
          
          {/* Room labels */}
          <text x="125" y="200" fontSize="10" fill="#64748b" textAnchor="middle">Soggiorno</text>
          <text x="195" y="200" fontSize="10" fill="#64748b" textAnchor="middle">Cucina</text>
          <text x="250" y="200" fontSize="10" fill="#64748b" textAnchor="middle">Bagno</text>
          <text x="125" y="110" fontSize="10" fill="#64748b" textAnchor="middle">Camera</text>
        </g>

        {/* Function indicators */}
        {Object.entries(functionIndicators).map(([functionKey, indicators]) =>
          indicators.map((indicator, index) => (
            <g key={`${functionKey}-${index}`}>
              <circle
                cx={indicator.x}
                cy={indicator.y}
                r="6"
                fill={getIndicatorColor(functionKey)}
                opacity={getIndicatorOpacity(functionKey)}
                className="transition-all duration-300"
              />
              {selectedFunctions.includes(functionKey) && (
                <circle
                  cx={indicator.x}
                  cy={indicator.y}
                  r="8"
                  fill="none"
                  stroke={getIndicatorColor(functionKey)}
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-ping"
                />
              )}
            </g>
          ))
        )}

        {/* Legend */}
        <g transform="translate(10, 10)">
          <rect x="0" y="0" width="120" height="80" fill="white" stroke="#e2e8f0" strokeWidth="1" rx="4" />
          <text x="60" y="15" fontSize="10" fill="#374151" textAnchor="middle" fontWeight="bold">Legenda</text>
          
          <circle cx="10" cy="25" r="4" fill="#22c55e" />
          <text x="20" y="29" fontSize="8" fill="#374151">Funzione attiva</text>
          
          <circle cx="10" cy="40" r="4" fill="#d1d5db" opacity="0.4" />
          <text x="20" y="44" fontSize="8" fill="#374151">Non selezionata</text>
          
          <text x="10" y="60" fontSize="8" fill="#6b7280">Seleziona le funzioni</text>
          <text x="10" y="70" fontSize="8" fill="#6b7280">per vedere gli indicatori</text>
        </g>
      </svg>
    </div>
  );
};
