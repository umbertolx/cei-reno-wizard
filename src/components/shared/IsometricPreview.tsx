
interface DeviceState {
  active: boolean;
  level?: number; // per dimmer luci, posizione tapparelle, temperatura
}

interface IsometricPreviewProps {
  activeDevice: string | null;
  deviceStates: Record<string, DeviceState>;
}

export const IsometricPreview = ({ activeDevice, deviceStates }: IsometricPreviewProps) => {
  const isActive = (deviceId: string) => deviceStates[deviceId]?.active || false;
  const getLevel = (deviceId: string) => deviceStates[deviceId]?.level || 0;

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-6">
      <svg viewBox="0 0 800 600" className="w-full h-auto">
        {/* Definizioni per effetti */}
        <defs>
          {/* Glow effect per device attivi */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Gradiente per pavimento */}
          <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          
          {/* Gradiente per pareti */}
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        {/* Stanza isometrica base */}
        <g transform="translate(100, 150)">
          {/* Pavimento */}
          <path
            d="M 0 300 L 200 200 L 600 200 L 400 300 Z"
            fill="url(#floorGradient)"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Parete sinistra */}
          <path
            d="M 0 100 L 0 300 L 200 200 L 200 0 Z"
            fill="url(#wallGradient)"
            stroke="#cbd5e1"
            strokeWidth="1"
          />
          
          {/* Parete destra */}
          <path
            d="M 200 0 L 200 200 L 600 200 L 600 0 Z"
            fill="url(#wallGradient)"
            stroke="#cbd5e1"
            strokeWidth="1"
          />

          {/* Dispositivi posizionati nella stanza */}
          
          {/* LUCI - Plafoniera centrale */}
          <g transform="translate(300, 80)">
            <circle
              cx="0"
              cy="0"
              r="16"
              fill={isActive('luci') ? '#ffc400' : '#d1d5db'}
              stroke={activeDevice === 'luci' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'luci' ? '2' : '1.5'}
              filter={isActive('luci') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200"
              style={{
                transform: activeDevice === 'luci' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="5" textAnchor="middle" fontSize="14" className="pointer-events-none">💡</text>
            
            {/* Cono di luce quando attivo */}
            {isActive('luci') && (
              <ellipse
                cx="0"
                cy="120"
                rx="80"
                ry="40"
                fill="#ffc400"
                opacity="0.2"
                className="animate-pulse"
              />
            )}
          </g>

          {/* TAPPARELLE - Finestra destra */}
          <g transform="translate(520, 120)">
            <rect
              x="-30"
              y="0"
              width="60"
              height="120"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="1"
            />
            
            {/* Tapparella animata */}
            <rect
              x="-28"
              y="2"
              width="56"
              height={isActive('tapparelle') ? getLevel('tapparelle') || 60 : 0}
              fill="#64748b"
              className="transition-all duration-400"
            >
              {isActive('tapparelle') && (
                <animate
                  attributeName="height"
                  values="0;60;60"
                  dur="400ms"
                  fill="freeze"
                />
              )}
            </rect>
            
            <circle
              cx="0"
              cy="-20"
              r="12"
              fill={isActive('tapparelle') ? '#3b82f6' : '#d1d5db'}
              stroke={activeDevice === 'tapparelle' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'tapparelle' ? '2' : '1.5'}
              filter={isActive('tapparelle') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200"
              style={{
                transform: activeDevice === 'tapparelle' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-15" textAnchor="middle" fontSize="12" className="pointer-events-none">↕️</text>
          </g>

          {/* CLIMA - Unità a parete */}
          <g transform="translate(150, 100)">
            <rect
              x="-25"
              y="0"
              width="50"
              height="20"
              fill="#f1f5f9"
              stroke="#94a3b8"
              strokeWidth="1"
              rx="4"
            />
            
            <circle
              cx="0"
              cy="-15"
              r="12"
              fill={isActive('clima') ? '#0ea5e9' : '#d1d5db'}
              stroke={activeDevice === 'clima' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'clima' ? '2' : '1.5'}
              filter={isActive('clima') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200"
              style={{
                transform: activeDevice === 'clima' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-10" textAnchor="middle" fontSize="12" className="pointer-events-none">🌡</text>
            
            {/* Display temperatura quando attivo */}
            {isActive('clima') && (
              <text
                x="0"
                y="35"
                textAnchor="middle"
                fontSize="10"
                fill="#0ea5e9"
                fontWeight="600"
                style={{ fontFamily: 'system-ui' }}
              >
                22°C
              </text>
            )}
          </g>

          {/* VIDEOCITOFONO - Ingresso */}
          <g transform="translate(80, 180)">
            <rect
              x="-8"
              y="0"
              width="16"
              height="24"
              fill="#f8fafc"
              stroke="#94a3b8"
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
              className="transition-all duration-200"
              style={{
                transform: activeDevice === 'videocitofono' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-10" textAnchor="middle" fontSize="12" className="pointer-events-none">📷</text>
            
            {/* LED attivo */}
            {isActive('videocitofono') && (
              <circle
                cx="0"
                cy="12"
                r="2"
                fill="#ef4444"
                className="animate-pulse"
              />
            )}
          </g>

          {/* AUDIO - Speakers */}
          <g transform="translate(400, 140)">
            <circle
              cx="0"
              cy="0"
              r="12"
              fill={isActive('audio') ? '#10b981' : '#d1d5db'}
              stroke={activeDevice === 'audio' ? '#d90429' : '#94a3b8'}
              strokeWidth={activeDevice === 'audio' ? '2' : '1.5'}
              filter={isActive('audio') ? 'url(#glow)' : 'none'}
              className="transition-all duration-200"
              style={{
                transform: activeDevice === 'audio' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="4" textAnchor="middle" fontSize="12" className="pointer-events-none">🔈</text>
            
            {/* Onde sonore quando attivo */}
            {isActive('audio') && (
              <g>
                <circle cx="0" cy="0" r="20" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.6">
                  <animate attributeName="r" values="20;40;20" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="0" cy="0" r="30" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4">
                  <animate attributeName="r" values="30;50;30" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
                </circle>
              </g>
            )}
          </g>

          {/* PRESE - TV area */}
          <g transform="translate(450, 200)">
            <rect
              x="-20"
              y="0"
              width="40"
              height="25"
              fill="#1f2937"
              stroke="#94a3b8"
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
              className="transition-all duration-200"
              style={{
                transform: activeDevice === 'prese' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <text x="0" y="-10" textAnchor="middle" fontSize="12" className="pointer-events-none">🔌</text>
            
            {/* LED verde sulla TV quando attivo */}
            {isActive('prese') && (
              <circle
                cx="15"
                cy="10"
                r="2"
                fill="#22c55e"
                className="animate-pulse"
              />
            )}
          </g>

          {/* SICUREZZA - Camera di sicurezza */}
          <g transform="translate(500, 80)">
            <ellipse
              cx="0"
              cy="0"
              rx="8"
              ry="6"
              fill="#f8fafc"
              stroke="#94a3b8"
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
              className="transition-all duration-200"
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
                r="15"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                opacity="0.8"
                className="animate-pulse"
              />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
