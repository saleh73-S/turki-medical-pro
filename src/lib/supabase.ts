// Future configuration boundary only. This module deliberately creates no Supabase client
// and makes no network requests. Add integration only after explicit approval.
export type SupabaseFrontendConfig = { url: string; anonKey: string }

export function getSupabaseFrontendConfig(): SupabaseFrontendConfig | null {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  return { url, anonKey }
}
