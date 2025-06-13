
interface DeviceState {
  active: boolean;
  level?: number;
}

interface IsometricPreviewProps {
  activeDevice: string | null;
  deviceStates: Record<string, DeviceState>;
}

export const IsometricPreview = ({ activeDevice, deviceStates }: IsometricPreviewProps) => {
  const isActive = (deviceId: string) => deviceStates[deviceId]?.active || false;
  const getLevel = (deviceId: string) => deviceStates[deviceId]?.level || 50;

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
      <svg viewBox="0 0 800 500" className="w-full h-auto">
        {/* Definizioni per effetti glow */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        {/* Stanza isometrica base - clean e minimal */}
        <g transform="translate(100, 80)">
          {/* Pavimento */}
          <path
            d="M 0 320 L 180 240 L 580 240 L 400 320 Z"
            fill="url(#floorGradient)"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Parete sinistra */}
          <path
            d="M 0 120 L 0 320 L 180 240 L 180 40 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          
          {/* Parete destra */}
          <path
            d="M 180 40 L 180 240 L 580 240 L 580 40 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Hub centrale - solo se ci sono dispositivi attivi */}
          {Object.values(deviceStates).some(state => state.active) && (
            <circle
              cx="290"
              cy="180"
              r="8"
              fill="#22c55e"
              stroke="#16a34a"
              strokeWidth="1"
              opacity="0.8"
            />
          )}

          {/* LUCI - Plafoniera centrale */}
          <g transform="translate(290, 100)">
            <circle
              cx="0"
              cy="0"
              r="16"
              fill={isActive('luci') ? '#ffc400' : '#d1d5db'}
              stroke={activeDevice === 'luci' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'luci' ? '2' : '1.5'}
              filter={isActive('luci') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200 cursor-pointer"
              style={{
                transform: activeDevice === 'luci' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="5" textAnchor="middle" fontSize="14" className="pointer-events-none">💡</text>
            
            {/* Cono di luce quando attivo */}
            {isActive('luci') && (
              <ellipse
                cx="0"
                cy="80"
                rx="60"
                ry="30"
                fill="#ffc400"
                opacity="0.15"
              />
            )}

            {/* Linea al hub se attivo */}
            {isActive('luci') && Object.values(deviceStates).filter(s => s.active).length > 1 && (
              <line
                x1="0"
                y1="16"
                x2="0"
                y2="80"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />
            )}
          </g>

          {/* TAPPARELLE - Finestra destra */}
          <g transform="translate(500, 120)">
            <rect
              x="-25"
              y="0"
              width="50"
              height="100"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="2"
              rx="4"
            />
            
            {/* Tapparella animata */}
            <rect
              x="-23"
              y="2"
              width="46"
              height={isActive('tapparelle') ? getLevel('tapparelle') * 0.96 : 0}
              fill="#64748b"
              className="transition-all duration-400"
            />
            
            <circle
              cx="0"
              cy="-20"
              r="12"
              fill={isActive('tapparelle') ? '#3b82f6' : '#d1d5db'}
              stroke={activeDevice === 'tapparelle' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'tapparelle' ? '2' : '1.5'}
              filter={isActive('tapparelle') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200 cursor-pointer"
              style={{
                transform: activeDevice === 'tapparelle' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-15" textAnchor="middle" fontSize="12" className="pointer-events-none">↕️</text>

            {/* Linea al hub se attivo */}
            {isActive('tapparelle') && Object.values(deviceStates).filter(s => s.active).length > 1 && (
              <line
                x1="-12"
                y1="-8"
                x2="-210"
                y2="60"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />
            )}
          </g>

          {/* CLIMA - Unità a parete */}
          <g transform="translate(140, 110)">
            <rect
              x="-20"
              y="0"
              width="40"
              height="15"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1"
              rx="3"
            />
            
            <circle
              cx="0"
              cy="-15"
              r="12"
              fill={isActive('clima') ? '#0ea5e9' : '#d1d5db'}
              stroke={activeDevice === 'clima' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'clima' ? '2' : '1.5'}
              filter={isActive('clima') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200 cursor-pointer"
              style={{
                transform: activeDevice === 'clima' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-10" textAnchor="middle" fontSize="12" className="pointer-events-none">🌡</text>
            
            {/* Display temperatura quando attivo */}
            {isActive('clima') && (
              <text
                x="0"
                y="30"
                textAnchor="middle"
                fontSize="10"
                fill="#0ea5e9"
                fontWeight="600"
                style={{ fontFamily: 'system-ui' }}
              >
                22°C
              </text>
            )}

            {/* Linea al hub se attivo */}
            {isActive('clima') && Object.values(deviceStates).filter(s => s.active).length > 1 && (
              <line
                x1="12"
                y1="-3"
                x2="150"
                y2="70"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />
            )}
          </g>

          {/* VIDEOCITOFONO - Ingresso */}
          <g transform="translate(70, 200)">
            <rect
              x="-6"
              y="0"
              width="12"
              height="20"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1"
              rx="2"
            />
            
            <circle
              cx="0"
              cy="-15"
              r="12"
              fill={isActive('videocitofono') ? '#22c55e' : '#d1d5db'}
              stroke={activeDevice === 'videocitofono' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'videocitofono' ? '2' : '1.5'}
              filter={isActive('videocitofono') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200 cursor-pointer"
              style={{
                transform: activeDevice === 'videocitofono' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-10" textAnchor="middle" fontSize="12" className="pointer-events-none">📷</text>
            
            {/* LED attivo */}
            {isActive('videocitofono') && (
              <circle
                cx="0"
                cy="10"
                r="2"
                fill="#ef4444"
                className="animate-pulse"
              />
            )}

            {/* Linea al hub se attivo */}
            {isActive('videocitofono') && Object.values(deviceStates).filter(s => s.active).length > 1 && (
              <line
                x1="12"
                y1="-3"
                x2="220"
                y2="-20"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />
            )}
          </g>

          {/* AUDIO - Speaker */}
          <g transform="translate(380, 150)">
            <circle
              cx="0"
              cy="0"
              r="12"
              fill={isActive('audio') ? '#10b981' : '#d1d5db'}
              stroke={activeDevice === 'audio' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'audio' ? '2' : '1.5'}
              filter={isActive('audio') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200 cursor-pointer"
              style={{
                transform: activeDevice === 'audio' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="4" textAnchor="middle" fontSize="12" className="pointer-events-none">🔈</text>
            
            {/* Onde sonore quando attivo */}
            {isActive('audio') && (
              <g>
                <circle cx="0" cy="0" r="18" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.6">
                  <animate attributeName="r" values="18;30;18" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="0" cy="0" r="24" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="24;36;24" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                </circle>
              </g>
            )}

            {/* Linea al hub se attivo */}
            {isActive('audio') && Object.values(deviceStates).filter(s => s.active).length > 1 && (
              <line
                x1="-12"
                y1="12"
                x2="-90"
                y2="30"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />
            )}
          </g>

          {/* PRESE - TV area */}
          <g transform="translate(440, 220)">
            <rect
              x="-15"
              y="0"
              width="30"
              height="20"
              fill="#1f2937"
              stroke="#cbd5e1"
              strokeWidth="1"
              rx="2"
            />
            
            <circle
              cx="0"
              cy="-15"
              r="12"
              fill={isActive('prese') ? '#f97316' : '#d1d5db'}
              stroke={activeDevice === 'prese' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'prese' ? '2' : '1.5'}
              filter={isActive('prese') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200 cursor-pointer"
              style={{
                transform: activeDevice === 'prese' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-10" textAnchor="middle" fontSize="12" className="pointer-events-none">🔌</text>
            
            {/* LED verde sulla TV quando attivo */}
            {isActive('prese') && (
              <circle
                cx="10"
                cy="8"
                r="2"
                fill="#22c55e"
                className="animate-pulse"
              />
            )}

            {/* Linea al hub se attivo */}
            {isActive('prese') && Object.values(deviceStates).filter(s => s.active).length > 1 && (
              <line
                x1="-12"
                y1="-3"
                x2="-150"
                y2="-40"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />
            )}
          </g>

          {/* SICUREZZA - Camera */}
          <g transform="translate(480, 90)">
            <ellipse
              cx="0"
              cy="0"
              rx="8"
              ry="6"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            
            <circle
              cx="0"
              cy="-20"
              r="12"
              fill={isActive('sicurezza') ? '#ef4444' : '#d1d5db'}
              stroke={activeDevice === 'sicurezza' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'sicurezza' ? '2' : '1.5'}
              filter={isActive('sicurezza') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200 cursor-pointer"
              style={{
                transform: activeDevice === 'sicurezza' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-15" textAnchor="middle" fontSize="12" className="pointer-events-none">🛡</text>
            
            {/* Ring luminoso attorno alla camera quando attivo */}
            {isActive('sicurezza') && (
              <circle
                cx="0"
                cy="0"
                r="12"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                opacity="0.8"
                className="animate-pulse"
              />
            )}

            {/* Linea al hub se attivo */}
            {isActive('sicurezza') && Object.values(deviceStates).filter(s => s.active).length > 1 && (
              <line
                x1="-12"
                y1="-8"
                x2="-190"
                y2="90"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.6"
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
