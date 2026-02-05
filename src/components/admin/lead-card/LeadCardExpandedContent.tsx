import { Lead } from "@/types/lead";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { PropertyTableSection } from "./sections/PropertyTableSection";
import { ConfigurationSection } from "./sections/ConfigurationSection";
import { EconomicAnalysisSection } from "./sections/EconomicAnalysisSection";
import { ClientNotesSection } from "./sections/ClientNotesSection";

interface LeadCardExpandedContentProps {
  lead: Lead;
}

export const LeadCardExpandedContent = ({ lead }: LeadCardExpandedContentProps) => {
  return (
    <div className="space-y-4 pt-4 border-t border-border mt-4">
      {/* Sezione prioritaria: Contatti e Immobile side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ContactInfoSection lead={lead} />
        <PropertyTableSection lead={lead} />
      </div>
      
      {/* Configurazione Tecnica */}
      <ConfigurationSection lead={lead} />
      
      {/* Analisi Economica */}
      <EconomicAnalysisSection lead={lead} />
      
      {/* Note Cliente */}
      <ClientNotesSection lead={lead} />
    </div>
  );
};
