export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      caythue: {
        Row: {
          id: number
          image_url: string | null
          name: string
          price: number | null
          unit: string | null
        }
        Insert: {
          id?: number
          image_url?: string | null
          name: string
          price?: number | null
          unit?: string | null
        }
        Update: {
          id?: number
          image_url?: string | null
          name?: string
          price?: number | null
          unit?: string | null
        }
        Relationships: []
      }
      dataname: {
        Row: {
          email: string | null
          maphanquyen: number | null
          matkhau: string
          taikhoan: string
          tien: number | null
          time: string | null
        }
        Insert: {
          email?: string | null
          maphanquyen?: number | null
          matkhau: string
          taikhoan: string
          tien?: number | null
          time?: string | null
        }
        Update: {
          email?: string | null
          maphanquyen?: number | null
          matkhau?: string
          taikhoan?: string
          tien?: number | null
          time?: string | null
        }
        Relationships: []
      }
      DVmienphi: {
        Row: {
          button_url: string | null
          id: number
          image_url: string | null
          name: string
          status: string | null
        }
        Insert: {
          button_url?: string | null
          id?: number
          image_url?: string | null
          name: string
          status?: string | null
        }
        Update: {
          button_url?: string | null
          id?: number
          image_url?: string | null
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          "chủ thể": string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          image_url2: string | null
          image_url3: string | null
          image_url4: string | null
          image_url5: string | null
          "khách hàng": string | null
          mk: string | null
          name: string
          "phương thức": string | null
          price: number
          tk: string | null
          tt: string | null
          updated_at: string
        }
        Insert: {
          category: string
          "chủ thể"?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          image_url2?: string | null
          image_url3?: string | null
          image_url4?: string | null
          image_url5?: string | null
          "khách hàng"?: string | null
          mk?: string | null
          name: string
          "phương thức"?: string | null
          price?: number
          tk?: string | null
          tt?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          "chủ thể"?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          image_url2?: string | null
          image_url3?: string | null
          image_url4?: string | null
          image_url5?: string | null
          "khách hàng"?: string | null
          mk?: string | null
          name?: string
          "phương thức"?: string | null
          price?: number
          tk?: string | null
          tt?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      purchase_history: {
        Row: {
          category: string
          created_at: string
          game_password: string
          game_username: string
          id: string
          product_id: string
          product_name: string
          product_price: number
          purchase_date: string
          purchase_method: string | null
          updated_at: string
          user_email: string
        }
        Insert: {
          category?: string
          created_at?: string
          game_password: string
          game_username: string
          id?: string
          product_id: string
          product_name: string
          product_price: number
          purchase_date?: string
          purchase_method?: string | null
          updated_at?: string
          user_email: string
        }
        Update: {
          category?: string
          created_at?: string
          game_password?: string
          game_username?: string
          id?: string
          product_id?: string
          product_name?: string
          product_price?: number
          purchase_date?: string
          purchase_method?: string | null
          updated_at?: string
          user_email?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      armor: {
        Args: { "": string }
        Returns: string
      }
      dearmor: {
        Args: { "": string }
        Returns: string
      }
      gen_random_bytes: {
        Args: { "": number }
        Returns: string
      }
      gen_random_uuid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      gen_salt: {
        Args: { "": string }
        Returns: string
      }
      get_user_by_email: {
        Args: { user_email: string }
        Returns: {
          taikhoan: string
          email: string
          maphanquyen: number
          tien: number
        }[]
      }
      pgp_armor_headers: {
        Args: { "": string }
        Returns: Record<string, unknown>[]
      }
      pgp_key_id: {
        Args: { "": string }
        Returns: string
      }
      verify_login: {
        Args: { user_email: string; user_password: string }
        Returns: {
          taikhoan: string
          email: string
          maphanquyen: number
          tien: number
        }[]
      }
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
