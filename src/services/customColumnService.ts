
import { supabase } from "@/integrations/supabase/client";

export interface DatabaseCustomColumn {
  id: string;
  label: string;
  color: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const fetchCustomColumns = async (): Promise<DatabaseCustomColumn[]> => {
  console.log("📥 Fetching custom columns from database");

  try {
    const { data, error } = await supabase
      .from('custom_columns')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error("❌ Error fetching custom columns:", error);
      throw new Error(`Errore nel recuperare le colonne personalizzate: ${error.message}`);
    }

    console.log(`✅ Fetched ${data?.length || 0} custom columns from database`);
    return data || [];
  } catch (error) {
    console.error("💥 Critical error in fetchCustomColumns:", error);
    throw error;
  }
};

export const saveCustomColumn = async (column: {
  label: string;
  color: string;
  display_order: number;
}): Promise<string> => {
  console.log("💾 Saving custom column to database:", column);

  try {
    const { data, error } = await supabase
      .from('custom_columns')
      .insert({
        label: column.label,
        color: column.color,
        display_order: column.display_order,
      })
      .select('id')
      .single();

    if (error) {
      console.error("❌ Error saving custom column:", error);
      throw new Error(`Errore nel salvare la colonna personalizzata: ${error.message}`);
    }

    console.log("✅ Custom column saved successfully with ID:", data.id);
    return data.id;
  } catch (error) {
    console.error("💥 Critical error in saveCustomColumn:", error);
    throw error;
  }
};

export const updateCustomColumn = async (
  id: string,
  updates: Partial<{ label: string; color: string; display_order: number }>
): Promise<void> => {
  console.log("🔄 Updating custom column:", { id, updates });

  try {
    const { error } = await supabase
      .from('custom_columns')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error("❌ Error updating custom column:", error);
      throw new Error(`Errore nell'aggiornare la colonna personalizzata: ${error.message}`);
    }

    console.log("✅ Custom column updated successfully");
  } catch (error) {
    console.error("💥 Critical error in updateCustomColumn:", error);
    throw error;
  }
};

export const deleteCustomColumn = async (id: string): Promise<void> => {
  console.log("🗑️ Deleting custom column:", id);

  try {
    const { error } = await supabase
      .from('custom_columns')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("❌ Error deleting custom column:", error);
      throw new Error(`Errore nell'eliminare la colonna personalizzata: ${error.message}`);
    }

    console.log("✅ Custom column deleted successfully");
  } catch (error) {
    console.error("💥 Critical error in deleteCustomColumn:", error);
    throw error;
  }
};
