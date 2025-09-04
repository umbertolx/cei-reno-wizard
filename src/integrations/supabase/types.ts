export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      custom_columns: {
        Row: {
          color: string
          created_at: string
          display_order: number
          id: string
          label: string
          updated_at: string
        }
        Insert: {
          color: string
          created_at?: string
          display_order?: number
          id?: string
          label: string
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          display_order?: number
          id?: string
          label?: string
          updated_at?: string
        }
        Relationships: []
      }
      estimates: {
        Row: {
          average_price: number
          breakdown: Json
          calculated_at: string | null
          configuration_snapshot: Json
          deductions: Json | null
          id: string
          lead_id: string | null
          max_price: number
          min_price: number
          modulo_type: string | null
          parent_lead_id: string | null
        }
        Insert: {
          average_price: number
          breakdown?: Json
          calculated_at?: string | null
          configuration_snapshot?: Json
          deductions?: Json | null
          id?: string
          lead_id?: string | null
          max_price: number
          min_price: number
          modulo_type?: string | null
          parent_lead_id?: string | null
        }
        Update: {
          average_price?: number
          breakdown?: Json
          calculated_at?: string | null
          configuration_snapshot?: Json
          deductions?: Json | null
          id?: string
          lead_id?: string | null
          max_price?: number
          min_price?: number
          modulo_type?: string | null
          parent_lead_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estimates_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_parent_lead_id_fkey"
            columns: ["parent_lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          accetto_termini: boolean | null
          cap: string
          citta: string
          cognome: string
          composizione: Json
          configurazione_tecnica: Json | null
          data_creazione: string | null
          data_richiesta_sopralluogo: string | null
          data_ultimo_contatto: string | null
          email: string
          id: string
          indirizzo: string
          informazioni_generali: Json | null
          moduli_selezionati: string[] | null
          modulo_elettrico: Json | null
          modulo_fotovoltaico: Json | null
          nome: string
          note: string | null
          orario_sopralluogo: string | null
          piano: string
          regione: string
          stato: string | null
          stima_dettagli: Json | null
          stima_finale: Json | null
          stima_max: number | null
          stima_media: number | null
          stima_min: number | null
          superficie: number
          telefono: string
          tipo_proprieta: string | null
          tipologia_abitazione: string
        }
        Insert: {
          accetto_termini?: boolean | null
          cap: string
          citta: string
          cognome: string
          composizione?: Json
          configurazione_tecnica?: Json | null
          data_creazione?: string | null
          data_richiesta_sopralluogo?: string | null
          data_ultimo_contatto?: string | null
          email: string
          id?: string
          indirizzo: string
          informazioni_generali?: Json | null
          moduli_selezionati?: string[] | null
          modulo_elettrico?: Json | null
          modulo_fotovoltaico?: Json | null
          nome: string
          note?: string | null
          orario_sopralluogo?: string | null
          piano: string
          regione: string
          stato?: string | null
          stima_dettagli?: Json | null
          stima_finale?: Json | null
          stima_max?: number | null
          stima_media?: number | null
          stima_min?: number | null
          superficie: number
          telefono: string
          tipo_proprieta?: string | null
          tipologia_abitazione: string
        }
        Update: {
          accetto_termini?: boolean | null
          cap?: string
          citta?: string
          cognome?: string
          composizione?: Json
          configurazione_tecnica?: Json | null
          data_creazione?: string | null
          data_richiesta_sopralluogo?: string | null
          data_ultimo_contatto?: string | null
          email?: string
          id?: string
          indirizzo?: string
          informazioni_generali?: Json | null
          moduli_selezionati?: string[] | null
          modulo_elettrico?: Json | null
          modulo_fotovoltaico?: Json | null
          nome?: string
          note?: string | null
          orario_sopralluogo?: string | null
          piano?: string
          regione?: string
          stato?: string | null
          stima_dettagli?: Json | null
          stima_finale?: Json | null
          stima_max?: number | null
          stima_media?: number | null
          stima_min?: number | null
          superficie?: number
          telefono?: string
          tipo_proprieta?: string | null
          tipologia_abitazione?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
