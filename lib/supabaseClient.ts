import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Test = {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export type Question = {
  id: string
  test_id: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: "A" | "B" | "C" | "D"
  created_at: string
}

export type TestAttempt = {
  id: string
  test_id: string
  student_name: string
  answers: Record<string, string>
  score: number
  total_questions: number
  completed_at: string
}
