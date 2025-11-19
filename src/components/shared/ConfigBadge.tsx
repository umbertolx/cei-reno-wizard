import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

type ConfigBadgeProps = {
  icon: LucideIcon;
  label: string;
  variant?: "default" | "secondary" | "outline";
};

export const ConfigBadge = ({ icon: Icon, label, variant = "secondary" }: ConfigBadgeProps) => {
  return (
    <Badge variant={variant} className="px-3 py-1.5 text-sm font-medium gap-1.5">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
};
