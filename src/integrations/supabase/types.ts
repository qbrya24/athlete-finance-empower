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
      education_lessons: {
        Row: {
          content: string
          description: string
          duration: string
          id: number
          module_id: number
          order_index: number
          title: string
          video_url: string | null
        }
        Insert: {
          content: string
          description: string
          duration: string
          id: number
          module_id: number
          order_index: number
          title: string
          video_url?: string | null
        }
        Update: {
          content?: string
          description?: string
          duration?: string
          id?: number
          module_id?: number
          order_index?: number
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "education_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      education_modules: {
        Row: {
          description: string
          duration: string
          id: number
          learning_objectives: string[]
          lessons_count: number
          order_index: number
          title: string
        }
        Insert: {
          description: string
          duration: string
          id: number
          learning_objectives: string[]
          lessons_count: number
          order_index: number
          title: string
        }
        Update: {
          description?: string
          duration?: string
          id?: number
          learning_objectives?: string[]
          lessons_count?: number
          order_index?: number
          title?: string
        }
        Relationships: []
      }
      education_quizzes: {
        Row: {
          correct_option: number
          created_at: string | null
          explanation: string | null
          id: number
          lesson_id: number | null
          options: Json
          question: string
          updated_at: string | null
        }
        Insert: {
          correct_option: number
          created_at?: string | null
          explanation?: string | null
          id?: number
          lesson_id?: number | null
          options: Json
          question: string
          updated_at?: string | null
        }
        Update: {
          correct_option?: number
          created_at?: string | null
          explanation?: string | null
          id?: number
          lesson_id?: number | null
          options?: Json
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "education_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          financial_literacy_score: number | null
          id: string
          investor_profiles: Json | null
          investor_score: number | null
          name: string | null
          phone: string | null
          primary_investor_profile: string | null
          saver_score: number | null
          secondary_investor_profile: string | null
          spender_score: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          financial_literacy_score?: number | null
          id: string
          investor_profiles?: Json | null
          investor_score?: number | null
          name?: string | null
          phone?: string | null
          primary_investor_profile?: string | null
          saver_score?: number | null
          secondary_investor_profile?: string | null
          spender_score?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          financial_literacy_score?: number | null
          id?: string
          investor_profiles?: Json | null
          investor_score?: number | null
          name?: string | null
          phone?: string | null
          primary_investor_profile?: string | null
          saver_score?: number | null
          secondary_investor_profile?: string | null
          spender_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      questionnaire_responses: {
        Row: {
          created_at: string
          id: string
          question_id: number
          response: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: number
          response: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: number
          response?: string
          user_id?: string
        }
        Relationships: []
      }
      user_education_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          last_lesson_id: number | null
          module_id: number
          progress: number | null
          started_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_lesson_id?: number | null
          module_id: number
          progress?: number | null
          started_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          last_lesson_id?: number | null
          module_id?: number
          progress?: number | null
          started_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_financial_data: {
        Row: {
          cash_on_hand: number | null
          created_at: string | null
          emergency_fund_current: number | null
          emergency_fund_goal: number | null
          id: string
          investments_change: number | null
          investments_total: number | null
          net_worth: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cash_on_hand?: number | null
          created_at?: string | null
          emergency_fund_current?: number | null
          emergency_fund_goal?: number | null
          id?: string
          investments_change?: number | null
          investments_total?: number | null
          net_worth?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cash_on_hand?: number | null
          created_at?: string | null
          emergency_fund_current?: number | null
          emergency_fund_goal?: number | null
          id?: string
          investments_change?: number | null
          investments_total?: number | null
          net_worth?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: number
          lesson_id: number | null
          score: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: number
          lesson_id?: number | null
          score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: number
          lesson_id?: number | null
          score?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "education_lessons"
            referencedColumns: ["id"]
          },
        ]
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
