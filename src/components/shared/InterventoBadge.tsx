type InterventoBadgeProps = {
  children: string;
  selected?: boolean;
};

export const InterventoBadge = ({ children, selected = false }: InterventoBadgeProps) => {
  return (
    <span className={`
      px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all duration-200
      ${selected 
        ? 'bg-foreground text-background border-foreground' 
        : 'bg-transparent text-foreground border-foreground/30 hover:border-foreground/50'
      }
    `}>
      {children}
    </span>
  );
};