export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
        }
        Relationships: [
          {
            foreignKeyName: "estimates_lead_id_fkey"
            columns: ["lead_id"]
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
          nome: string
          note: string | null
          orario_sopralluogo: string | null
          piano: string
          regione: string
          stato: string | null
          stima_dettagli: Json | null
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
          nome: string
          note?: string | null
          orario_sopralluogo?: string | null
          piano: string
          regione: string
          stato?: string | null
          stima_dettagli?: Json | null
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
          nome?: string
          note?: string | null
          orario_sopralluogo?: string | null
          piano?: string
          regione?: string
          stato?: string | null
          stima_dettagli?: Json | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
