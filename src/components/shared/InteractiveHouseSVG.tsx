
import { useMemo } from "react";

type Props = {
  selectedFunctions: string[];
};

export const InteractiveHouseSVG = ({ selectedFunctions }: Props) => {
  const isSelected = (functionKey: string) => selectedFunctions.includes(functionKey);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto drop-shadow-2xl"
      >
        {/* Definitions for realistic gradients and effects */}
        <defs>
          {/* Realistic wall materials */}
          <linearGradient id="exteriorWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f4" />
            <stop offset="50%" stopColor="#e7e5e4" />
            <stop offset="100%" stopColor="#d6d3d1" />
          </linearGradient>
          
          <linearGradient id="interiorWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fafaf9" />
            <stop offset="100%" stopColor="#f5f5f4" />
          </linearGradient>
          
          {/* Modern flooring */}
          <linearGradient id="modernFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b7355" />
            <stop offset="50%" stopColor="#a0845c" />
            <stop offset="100%" stopColor="#6b5b47" />
          </linearGradient>
          
          {/* Luxury roof material */}
          <linearGradient id="roofMaterial" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          
          {/* Glass reflections */}
          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bfdbfe" />
            <stop offset="50%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          
          {/* Premium light glow effects */}
          <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="warmLight" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Shadow effects */}
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.2"/>
          </filter>
          
          {/* Wood texture pattern */}
          <pattern id="woodTexture" patternUnits="userSpaceOnUse" width="20" height="4">
            <rect width="20" height="4" fill="#8b7355"/>
            <line x1="0" y1="2" x2="20" y2="2" stroke="#6b5b47" strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* Background landscape */}
        <rect x="0" y="500" width="800" height="100" fill="#22c55e" opacity="0.3" />
        <circle cx="700" cy="100" r="40" fill="#fbbf24" opacity="0.7" />
        
        {/* House foundation and base */}
        <rect x="100" y="480" width="600" height="30" fill="#78716c" stroke="#57534e" strokeWidth="2" rx="4" />
        <rect x="90" y="470" width="620" height="15" fill="#a8a29e" stroke="#78716c" strokeWidth="1" rx="2" />
        
        {/* Main house structure with modern architecture */}
        
        {/* Exterior walls with depth */}
        <polygon points="120,180 680,180 680,480 120,480" fill="url(#exteriorWall)" stroke="#a8a29e" strokeWidth="3" filter="url(#dropShadow)" />
        
        {/* Side perspective wall for 3D effect */}
        <polygon points="680,180 720,140 720,440 680,480" fill="url(#exteriorWall)" stroke="#a8a29e" strokeWidth="2" />
        
        {/* Modern slanted roof */}
        <polygon points="100,180 400,80 700,140 680,180 120,180" fill="url(#roofMaterial)" stroke="#1f2937" strokeWidth="3" />
        <polygon points="400,80 700,140 740,100 440,40" fill="#1f2937" stroke="#111827" strokeWidth="2" />
        
        {/* Roof details - solar panels */}
        <rect x="450" y="95" width="180" height="35" fill="#1e293b" stroke="#0f172a" strokeWidth="1" rx="2" opacity="0.8" />
        <rect x="455" y="100" width="170" height="25" fill="#0f172a" rx="1" />
        <g stroke="#334155" strokeWidth="0.5">
          {Array.from({length: 6}, (_, i) => (
            <line key={i} x1={460 + i * 27} y1="100" x2={460 + i * 27} y2="125" />
          ))}
        </g>
        
        {/* Floor divisions - 3 levels with realistic proportions */}
        
        {/* Ground floor - Soggiorno e Cucina */}
        <rect x="125" y="360" width="550" height="115" fill="url(#modernFloor)" />
        <polygon points="675,360 715,320 715,435 675,475" fill="#6b5b47" />
        
        {/* First floor - Camere */}
        <rect x="125" y="240" width="550" height="115" fill="url(#modernFloor)" />
        <polygon points="675,240 715,200 715,315 675,355" fill="#6b5b47" />
        
        {/* Attic/Mansarda */}
        <rect x="125" y="185" width="550" height="50" fill="url(#modernFloor)" />
        <polygon points="675,185 715,145 715,195 675,235" fill="#6b5b47" />
        
        {/* Interior room divisions */}
        <line x1="400" y1="185" x2="400" y2="475" stroke="#d6d3d1" strokeWidth="3" />
        <line x1="400" y1="185" x2="440" y2="145" stroke="#d6d3d1" strokeWidth="2" />
        
        {/* Modern large windows with realistic frames */}
        
        {/* Ground floor panoramic windows */}
        <g>
          {/* Living room large window */}
          <rect x="140" y="380" width="100" height="70" fill="url(#glassReflection)" stroke="#374151" strokeWidth="3" rx="4" filter="url(#dropShadow)" />
          <rect x="145" y="385" width="90" height="60" fill="#bfdbfe" opacity="0.3" rx="2" />
          <line x1="190" y1="380" x2="190" y2="450" stroke="#374151" strokeWidth="2" />
          <line x1="140" y1="415" x2="240" y2="415" stroke="#374151" strokeWidth="2" />
          
          {/* Kitchen window */}
          <rect x="520" y="380" width="100" height="70" fill="url(#glassReflection)" stroke="#374151" strokeWidth="3" rx="4" filter="url(#dropShadow)" />
          <rect x="525" y="385" width="90" height="60" fill="#bfdbfe" opacity="0.3" rx="2" />
          <line x1="570" y1="380" x2="570" y2="450" stroke="#374151" strokeWidth="2" />
        </g>
        
        {/* First floor bedroom windows */}
        <g>
          <rect x="160" y="260" width="80" height="60" fill="url(#glassReflection)" stroke="#374151" strokeWidth="3" rx="4" />
          <rect x="540" y="260" width="80" height="60" fill="url(#glassReflection)" stroke="#374151" strokeWidth="3" rx="4" />
        </g>
        
        {/* Attic windows */}
        <g>
          <rect x="200" y="195" width="60" height="35" fill="url(#glassReflection)" stroke="#374151" strokeWidth="2" rx="3" />
          <rect x="500" y="195" width="60" height="35" fill="url(#glassReflection)" stroke="#374151" strokeWidth="2" rx="3" />
        </g>

        {/* TAPPARELLE - Premium motorized blinds */}
        <g className={`transition-all duration-500 ${isSelected('tapparelle') ? 'opacity-100' : 'opacity-70'}`}>
          {/* Ground floor living room blinds */}
          <rect x="135" y="375" width="110" height="80" 
                fill={isSelected('tapparelle') ? '#3b82f6' : '#e5e7eb'} 
                opacity="0.9" stroke="#374151" strokeWidth="2" rx="4" 
                filter={isSelected('tapparelle') ? "url(#premiumGlow)" : ""} />
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#9ca3af'} strokeWidth="1">
            {Array.from({length: 16}, (_, i) => (
              <line key={i} x1="140" y1={380 + i * 4.5} x2="240" y2={380 + i * 4.5} />
            ))}
          </g>
          
          {/* Kitchen blinds */}
          <rect x="515" y="375" width="110" height="80" 
                fill={isSelected('tapparelle') ? '#3b82f6' : '#e5e7eb'} 
                opacity="0.9" stroke="#374151" strokeWidth="2" rx="4" 
                filter={isSelected('tapparelle') ? "url(#premiumGlow)" : ""} />
          <g stroke={isSelected('tapparelle') ? '#1e40af' : '#9ca3af'} strokeWidth="1">
            {Array.from({length: 16}, (_, i) => (
              <line key={i} x1="520" y1={380 + i * 4.5} x2="620" y2={380 + i * 4.5} />
            ))}
          </g>
          
          {/* Motor controls */}
          {isSelected('tapparelle') && (
            <>
              <rect x="230" y="365" width="20" height="10" fill="#22c55e" rx="2" className="animate-pulse" />
              <rect x="610" y="365" width="20" height="10" fill="#22c55e" rx="2" className="animate-pulse" />
            </>
          )}
        </g>

        {/* TENDE - Luxury interior curtains */}
        <g className={`transition-all duration-500 ${isSelected('tende') ? 'opacity-100' : 'opacity-60'}`}>
          {/* Living room curtains */}
          <path d="M150 390 Q170 380 190 390 Q210 380 230 390 L230 440 Q210 450 190 440 Q170 450 150 440 Z" 
                fill={isSelected('tende') ? '#8b5cf6' : '#f3f4f6'} 
                stroke={isSelected('tende') ? '#7c3aed' : '#d1d5db'} 
                strokeWidth="2" opacity="0.8" />
          
          {/* Kitchen curtains */}
          <path d="M530 390 Q550 380 570 390 Q590 380 610 390 L610 440 Q590 450 570 440 Q550 450 530 440 Z" 
                fill={isSelected('tende') ? '#8b5cf6' : '#f3f4f6'} 
                stroke={isSelected('tende') ? '#7c3aed' : '#d1d5db'} 
                strokeWidth="2" opacity="0.8" />
          
          {/* Curtain rails */}
          <line x1="145" y1="385" x2="235" y2="385" stroke="#6b7280" strokeWidth="3" />
          <line x1="525" y1="385" x2="615" y2="385" stroke="#6b7280" strokeWidth="3" />
        </g>

        {/* LUCI - Designer ceiling lights and ambient lighting */}
        <g>
          {/* Ground floor - Modern pendant lights */}
          <g>
            {/* Living room chandelier */}
            <circle cx="260" cy="420" r="12" 
                    fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                    stroke="#374151" strokeWidth="2"
                    filter={isSelected('luci') ? "url(#warmLight)" : ""} />
            <circle cx="260" cy="420" r="8" 
                    fill={isSelected('luci') ? '#ffffff' : '#e5e7eb'} opacity="0.9" />
            {isSelected('luci') && (
              <circle cx="260" cy="420" r="35" fill="#fbbf24" opacity="0.2" className="animate-pulse" />
            )}
            
            {/* Kitchen pendant lights */}
            <ellipse cx="520" cy="420" rx="25" ry="8" 
                     fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                     stroke="#374151" strokeWidth="2"
                     filter={isSelected('luci') ? "url(#warmLight)" : ""} />
            {isSelected('luci') && (
              <ellipse cx="520" cy="420" rx="40" ry="15" fill="#fbbf24" opacity="0.15" className="animate-pulse" />
            )}
          </g>
          
          {/* First floor - Recessed ceiling lights */}
          <g>
            <circle cx="260" cy="300" r="8" 
                    fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                    stroke="#374151" strokeWidth="1.5"
                    filter={isSelected('luci') ? "url(#warmLight)" : ""} />
            <circle cx="540" cy="300" r="8" 
                    fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                    stroke="#374151" strokeWidth="1.5"
                    filter={isSelected('luci') ? "url(#warmLight)" : ""} />
          </g>
          
          {/* Attic - Skylight style */}
          <rect x="360" y="195" width="80" height="15" 
                fill={isSelected('luci') ? '#fbbf24' : '#f3f4f6'} 
                stroke="#374151" strokeWidth="2" rx="7"
                filter={isSelected('luci') ? "url(#warmLight)" : ""} />
        </g>

        {/* PORTA DI INGRESSO - Modern entrance with smart features */}
        <g>
          {/* Main door frame */}
          <rect x="340" y="390" width="80" height="85" 
                fill="#92400e" stroke="#451a03" strokeWidth="3" rx="6" filter="url(#dropShadow)" />
          
          {/* Door panels */}
          <rect x="345" y="395" width="30" height="75" 
                fill="#a16207" stroke="#92400e" strokeWidth="1" rx="3" />
          <rect x="385" y="395" width="30" height="75" 
                fill="#a16207" stroke="#92400e" strokeWidth="1" rx="3" />
          
          {/* Modern handle */}
          <rect x="405" y="430" width="8" height="20" fill="#374151" rx="4" />
          
          {/* Glass panel */}
          <rect x="350" y="400" width="20" height="30" fill="url(#glassReflection)" rx="2" />
          
          {/* VIDEOCITOFONO - Premium intercom system */}
          <rect x="430" y="410" width="20" height="30" 
                fill={isSelected('videocitofono') ? '#ef4444' : '#6b7280'} 
                stroke="#374151" strokeWidth="2" rx="4"
                filter={isSelected('videocitofono') ? "url(#premiumGlow)" : ""} />
          
          {/* Camera lens */}
          <circle cx="440" cy="420" r="4" 
                  fill={isSelected('videocitofono') ? '#ffffff' : '#d1d5db'} />
          <circle cx="440" cy="420" r="2" 
                  fill={isSelected('videocitofono') ? '#1f2937' : '#9ca3af'} />
          
          {/* Screen */}
          <rect x="433" y="428" width="14" height="8" 
                fill={isSelected('videocitofono') ? '#22c55e' : '#9ca3af'} rx="2" />
          
          {/* Smart lock indicator */}
          {isSelected('videocitofono') && (
            <circle cx="440" cy="450" r="3" fill="#22c55e" className="animate-pulse" />
          )}
        </g>

        {/* AUDIO - High-end sound system */}
        <g>
          {/* Living room tower speakers */}
          <rect x="180" y="440" width="20" height="25" 
                fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                stroke="#374151" strokeWidth="2" rx="6"
                filter={isSelected('audio') ? "url(#premiumGlow)" : ""} />
          
          {/* Speaker drivers */}
          <circle cx="190" cy="450" r="5" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          <circle cx="190" cy="450" r="2" 
                  fill={isSelected('audio') ? '#10b981' : '#6b7280'} />
          <circle cx="190" cy="458" r="3" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          
          {/* Kitchen ceiling speakers */}
          <circle cx="560" cy="370" r="8" 
                  fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1.5"
                  filter={isSelected('audio') ? "url(#premiumGlow)" : ""} />
          <circle cx="560" cy="370" r="4" 
                  fill={isSelected('audio') ? '#ffffff' : '#9ca3af'} />
          
          {/* Bedroom speakers */}
          <rect x="200" y="250" width="15" height="15" 
                fill={isSelected('audio') ? '#10b981' : '#d1d5db'} 
                stroke="#374151" strokeWidth="1" rx="3"
                filter={isSelected('audio') ? "url(#premiumGlow)" : ""} />
          
          {/* Sound waves when active */}
          {isSelected('audio') && (
            <>
              <path d="M210 450 Q220 445 210 460" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.6" className="animate-pulse" />
              <path d="M215 448 Q225 443 215 463" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.4" className="animate-pulse" />
            </>
          )}
        </g>

        {/* CLIMA - Modern HVAC system */}
        <g>
          {/* Ground floor - Designer radiators */}
          <rect x="130" y="460" width="60" height="12" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="2" rx="6" 
                filter={isSelected('clima') ? "url(#premiumGlow)" : ""} />
          <g stroke={isSelected('clima') ? '#ea580c' : '#9ca3af'} strokeWidth="1">
            {Array.from({length: 10}, (_, i) => (
              <line key={i} x1={135 + i * 5} y1="460" x2={135 + i * 5} y2="472" />
            ))}
          </g>
          
          {/* Kitchen radiator */}
          <rect x="580" y="460" width="60" height="12" 
                fill={isSelected('clima') ? '#f97316' : '#d1d5db'} 
                stroke="#374151" strokeWidth="2" rx="6" />
          
          {/* Air conditioning unit */}
          <rect x="600" y="350" width="40" height="15" 
                fill={isSelected('clima') ? '#ffffff' : '#f3f4f6'} 
                stroke={isSelected('clima') ? '#22c55e' : '#9ca3af'} 
                strokeWidth="2" rx="4"
                filter={isSelected('clima') ? "url(#premiumGlow)" : ""} />
          
          {/* Thermostat */}
          <circle cx="300" cy="400" r="8" 
                  fill={isSelected('clima') ? '#ffffff' : '#f3f4f6'} 
                  stroke={isSelected('clima') ? '#f97316' : '#9ca3af'} 
                  strokeWidth="2" />
          
          {/* Heat visualization */}
          {isSelected('clima') && (
            <>
              <path d="M160 455 Q165 450 170 455 Q175 450 180 455" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.8" className="animate-pulse" />
              <path d="M157 453 Q162 448 167 453 Q172 448 177 453" stroke="#f97316" strokeWidth="1.5" fill="none" opacity="0.6" className="animate-pulse" />
            </>
          )}
        </g>

        {/* PRESE SMART - Smart appliances and outlets */}
        <g>
          {/* Smart refrigerator */}
          <rect x="460" y="400" width="35" height="60" 
                fill={isSelected('prese') ? '#ffffff' : '#f3f4f6'} 
                stroke={isSelected('prese') ? '#22c55e' : '#9ca3af'} 
                strokeWidth={isSelected('prese') ? "3" : "2"} rx="6"
                filter={isSelected('prese') ? "url(#premiumGlow)" : ""} />
          
          {/* Fridge compartments */}
          <rect x="463" y="405" width="29" height="25" 
                fill={isSelected('prese') ? '#dbeafe' : '#f9fafb'} rx="2" />
          <rect x="463" y="435" width="29" height="22" 
                fill={isSelected('prese') ? '#dbeafe' : '#f9fafb'} rx="2" />
          
          {/* Smart display */}
          <rect x="468" y="410" width="19" height="8" 
                fill={isSelected('prese') ? '#3b82f6' : '#d1d5db'} rx="1" />
          
          {/* Smart TV */}
          <rect x="420" y="270" width="50" height="30" 
                fill={isSelected('prese') ? '#1f2937' : '#9ca3af'} 
                stroke={isSelected('prese') ? '#22c55e' : '#6b7280'} 
                strokeWidth="2" rx="4" />
          
          {/* TV screen */}
          {isSelected('prese') && (
            <rect x="423" y="273" width="44" height="24" fill="#3b82f6" opacity="0.7" rx="2" />
          )}
          
          {/* Smart washing machine */}
          <rect x="130" y="420" width="25" height="30" 
                fill={isSelected('prese') ? '#ffffff' : '#f3f4f6'} 
                stroke={isSelected('prese') ? '#22c55e' : '#9ca3af'} 
                strokeWidth="2" rx="4" />
          <circle cx="142" cy="435" r="8" 
                  fill={isSelected('prese') ? '#dbeafe' : '#f9fafb'} 
                  stroke="#9ca3af" strokeWidth="1" />
          
          {/* WiFi indicators */}
          {isSelected('prese') && (
            <>
              <circle cx="485" cy="395" r="3" fill="#22c55e" opacity="0.8" className="animate-pulse" />
              <circle cx="460" cy="265" r="2" fill="#22c55e" opacity="0.6" className="animate-pulse" />
            </>
          )}
        </g>

        {/* SICUREZZA - Advanced security system */}
        <g>
          {/* Main entrance camera */}
          <circle cx="320" cy="380" r="8" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="2"
                  filter={isSelected('sicurezza') ? "url(#premiumGlow)" : ""} />
          <circle cx="320" cy="380" r="4" 
                  fill={isSelected('sicurezza') ? '#ffffff' : '#9ca3af'} />
          <circle cx="320" cy="380" r="2" 
                  fill={isSelected('sicurezza') ? '#1f2937' : '#6b7280'} />
          
          {/* Corner security cameras */}
          <circle cx="650" cy="190" r="6" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1.5"
                  filter={isSelected('sicurezza') ? "url(#premiumGlow)" : ""} />
          
          <circle cx="150" cy="250" r="5" 
                  fill={isSelected('sicurezza') ? '#dc2626' : '#d1d5db'} 
                  stroke="#374151" strokeWidth="1.5" />
          
          {/* Motion sensors */}
          <rect x="250" y="375" width="8" height="6" 
                fill={isSelected('sicurezza') ? '#fbbf24' : '#e5e7eb'} 
                rx="3" stroke="#374151" strokeWidth="1" />
          
          <rect x="500" y="255" width="6" height="8" 
                fill={isSelected('sicurezza') ? '#fbbf24' : '#e5e7eb'} 
                rx="3" stroke="#374151" strokeWidth="1" />
          
          {/* Security status indicators */}
          {isSelected('sicurezza') && (
            <>
              <circle cx="320" cy="380" r="15" fill="#dc2626" opacity="0.2" className="animate-pulse" />
              <circle cx="650" cy="190" r="12" fill="#dc2626" opacity="0.15" className="animate-pulse" />
              <text x="280" y="370" fontSize="8" fill="#dc2626" fontWeight="600">REC</text>
            </>
          )}
        </g>

        {/* Elegant room labels with better typography */}
        <g fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600">
          <text x="260" y="340" fontSize="14" fill="#374151" textAnchor="middle">Soggiorno</text>
          <text x="540" y="340" fontSize="14" fill="#374151" textAnchor="middle">Cucina</text>
          <text x="260" y="220" fontSize="12" fill="#374151" textAnchor="middle">Camera da Letto</text>
          <text x="540" y="220" fontSize="12" fill="#374151" textAnchor="middle">Bagno</text>
          <text x="400" y="175" fontSize="11" fill="#374151" textAnchor="middle">Mansarda</text>
        </g>

        {/* Smart home network visualization */}
        {selectedFunctions.length > 1 && (
          <g opacity="0.6">
            {/* Central smart hub */}
            <rect x="390" y="325" width="20" height="15" fill="#22c55e" rx="3" className="animate-pulse" />
            <text x="400" y="335" fontSize="6" fill="#ffffff" textAnchor="middle" fontWeight="700">HUB</text>
            
            {/* Network connections */}
            <g stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,4" className="animate-pulse">
              <line x1="400" y1="332" x2="260" y2="420" />
              <line x1="400" y1="332" x2="540" y2="420" />
              <line x1="400" y1="332" x2="440" y2="420" />
              <line x1="400" y1="332" x2="320" y2="380" />
              <line x1="400" y1="332" x2="480" y2="430" />
            </g>
            
            {/* Data transmission indicators */}
            <circle cx="400" cy="332" r="8" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.4">
              <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Enhanced modern legend */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="180" height="120" fill="white" stroke="#e2e8f0" strokeWidth="2" rx="12" fillOpacity="0.98" filter="url(#dropShadow)" />
          
          {/* Legend header */}
          <rect x="0" y="0" width="180" height="35" fill="#3b82f6" rx="12" />
          <rect x="0" y="25" width="180" height="10" fill="#3b82f6" />
          <text x="90" y="22" fontSize="14" fill="white" textAnchor="middle" fontWeight="700">Smart Home</text>
          
          {/* Status indicators */}
          <circle cx="20" cy="50" r="5" fill="#22c55e" />
          <text x="35" y="55" fontSize="10" fill="#374151" fontWeight="600">Funzione attiva</text>
          
          <circle cx="20" cy="68" r="5" fill="#d1d5db" />
          <text x="35" y="73" fontSize="10" fill="#374151" fontWeight="600">Funzione inattiva</text>
          
          <line x1="20" y1="85" x2="35" y2="85" stroke="#22c55e" strokeWidth="2" strokeDasharray="3,3" />
          <text x="45" y="90" fontSize="9" fill="#6b7280" fontWeight="500">Rete domotica</text>
          
          <text x="20" y="105" fontSize="9" fill="#6b7280" fontWeight="500">Tocca le funzioni per vedere</text>
          <text x="20" y="115" fontSize="9" fill="#6b7280" fontWeight="500">l'integrazione in tempo reale</text>
        </g>
      </svg>
    </div>
  );
};
