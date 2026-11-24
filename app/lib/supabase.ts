import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (typeof supabaseUrl !== 'string' || supabaseUrl.length === 0) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL belum diatur di file .env.local')
}

if (typeof supabaseKey !== 'string' || supabaseKey.length === 0) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum diatur di file .env.local',
  )
}

if (supabaseKey.startsWith('sb_secret_')) {
  throw new Error(
    'Gunakan publishable/anon key pada NEXT_PUBLIC_SUPABASE_*; secret key hanya boleh digunakan di server.',
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)