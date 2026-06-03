import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

declare global {
  interface Window {
    __ENV__?: Record<string, string>
  }
}

function getEnvVar(key: string): string {
  const metaVal = import.meta.env[key as keyof ImportMeta['env']] as string | undefined
  if (metaVal) return metaVal
  const env = window.__ENV__ ?? {}
  return env[key] || ''
}

const SUPABASE_URL = getEnvVar('VITE_SUPABASE_URL')
const SUPABASE_PUBLISHABLE_KEY = getEnvVar('VITE_SUPABASE_PUBLISHABLE_KEY')

export const supabase = SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
  ? createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

export function getSupabase() {
  if (!supabase) {
    throw new Error('Supabase client not initialized. Check VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.')
  }
  return supabase
}
