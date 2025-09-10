import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DatabaseLead } from "@/services/leadService";

interface UseLatestLeadReturn {
  lead: DatabaseLead | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useLatestLead = (email?: string): UseLatestLeadReturn => {
  const [lead, setLead] = useState<DatabaseLead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestLead = async () => {
    if (!email) {
      console.log("👤 No email provided, skipping lead fetch");
      return;
    }

    console.log("🔍 Fetching latest lead for email:", email);
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('leads')
        .select('*')
        .eq('email', email)
        .order('data_creazione', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (supabaseError) {
        console.error("❌ Error fetching latest lead:", supabaseError);
        setError(supabaseError.message);
        return;
      }

      if (data) {
        console.log("✅ Latest lead found:", data);
        // Map tipo_proprieta to utilizzoabitazione for TypeScript compatibility
        const mappedLead = {
          ...data,
          utilizzoabitazione: data.tipo_proprieta
        };
        setLead(mappedLead);
      } else {
        console.log("📭 No lead found for this email");
        setLead(null);
      }
    } catch (error) {
      console.error("💥 Critical error fetching latest lead:", error);
      setError(error instanceof Error ? error.message : 'Errore sconosciuto');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestLead();
  }, [email]);

  const refetch = () => {
    fetchLatestLead();
  };

  return {
    lead,
    isLoading,
    error,
    refetch
  };
};