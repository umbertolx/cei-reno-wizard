
import { Lead } from "@/data/mockLeads";
import { PropertyDataSection } from "./sections/PropertyDataSection";
import { ConfigurationSection } from "./sections/ConfigurationSection";
import { EconomicAnalysisSection } from "./sections/EconomicAnalysisSection";
import { CommercialInfoSection } from "./sections/CommercialInfoSection";
import { ClientNotesSection } from "./sections/ClientNotesSection";

interface LeadCardExpandedContentProps {
  lead: Lead;
}

export const LeadCardExpandedContent = ({ lead }: LeadCardExpandedContentProps) => {
  return (
    <div className="space-y-6">
      <PropertyDataSection lead={lead} />
      <ConfigurationSection lead={lead} />
      <EconomicAnalysisSection lead={lead} />
      <CommercialInfoSection lead={lead} />
      <ClientNotesSection lead={lead} />
    </div>
  );
};
