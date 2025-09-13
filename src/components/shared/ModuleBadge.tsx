type ModuleBadgeProps = {
  children: string;
};

export const ModuleBadge = ({ children }: ModuleBadgeProps) => {
  return (
    <div className="flex justify-start md:justify-center px-3 md:px-0">
      <div className="bg-[#d8010c] text-white px-3 py-1.5 md:px-6 md:py-3 rounded-full text-sm font-medium">
        {children}
      </div>
    </div>
  );
};