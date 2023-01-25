export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chats: {
        Row: {
          chat: Json
          id: number
          inserted_at: string
          user_id: string
        }
        Insert: {
          chat: Json
          id?: number
          inserted_at?: string
          user_id: string
        }
        Update: {
          chat?: Json
          id?: number
          inserted_at?: string
          user_id?: string
        }
      }
      messages: {
        Row: {
          actor: string | null
          chat_id: string
          created_at: string | null
          id: number
          message: string | null
          user_id: string
        }
        Insert: {
          actor?: string | null
          chat_id: string
          created_at?: string | null
          id?: number
          message?: string | null
          user_id: string
        }
        Update: {
          actor?: string | null
          chat_id?: string
          created_at?: string | null
          id?: number
          message?: string | null
          user_id?: string
        }
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
  }
}
