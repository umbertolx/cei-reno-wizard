
interface InteractiveDeviceProps {
  id: string;
  x: number;
  y: number;
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const InteractiveDevice = ({ 
  id, 
  x, 
  y, 
  icon, 
  label, 
  active, 
  onClick 
}: InteractiveDeviceProps) => {
  return (
    <g 
      className="cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110"
      onClick={onClick}
    >
      {/* Device circle */}
      <circle
        cx={x}
        cy={y}
        r="16"
        fill={active ? "#ffc400" : "#d1d5db"}
        stroke={active ? "#d90429" : "#94a3b8"}
        strokeWidth={active ? "2" : "1.5"}
        className="transition-all duration-200 ease-in-out"
      />
      
      {/* Icon */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="16"
        className="pointer-events-none select-none"
      >
        {icon}
      </text>
      
      {/* Label */}
      <text
        x={x}
        y={y + 35}
        textAnchor="middle"
        fontSize="12"
        fontWeight="400"
        fill="#374151"
        className="pointer-events-none select-none"
        style={{ fontFamily: 'system-ui' }}
      >
        {label}
      </text>
    </g>
  );
};
