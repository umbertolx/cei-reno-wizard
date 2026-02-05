import { Lead } from "@/types/lead";
import { PropertyDataSection } from "./sections/PropertyDataSection";
import { ConfigurationSection } from "./sections/ConfigurationSection";
import { EconomicAnalysisSection } from "./sections/EconomicAnalysisSection";
import { CommercialInfoSection } from "./sections/CommercialInfoSection";
import { ClientNotesSection } from "./sections/ClientNotesSection";
import { Separator } from "@/components/ui/separator";

interface LeadCardExpandedContentProps {
  lead: Lead;
}

export const LeadCardExpandedContent = ({ lead }: LeadCardExpandedContentProps) => {
  return (
    <div className="space-y-4 pt-4">
      {/* Informazioni Immobile */}
      <PropertyDataSection lead={lead} />
      
      <Separator />
      
      {/* Configurazione Tecnica (Moduli) */}
      <ConfigurationSection lead={lead} />
      
      <Separator />
      
      {/* Analisi Economica */}
      <EconomicAnalysisSection lead={lead} />
      
      <Separator />
      
      {/* Cronologia e Stato */}
      <CommercialInfoSection lead={lead} />
      
      {/* Note (se presenti) */}
      <ClientNotesSection lead={lead} />
    </div>
  );
};
