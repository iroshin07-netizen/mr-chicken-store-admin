 import { createClient } from "@supabase/supabase-js";

// Neeche double quotes (" ") ke andar apni Supabase keys paste karo
const url = "https://iodzvysskolmenthride.supabase.co";
const anonKey = "sb_publishable_WD4mZlxf-3opMgep3VdKgA_yxNSuGaU";

export const supabaseConfigured = Boolean(url && anonKey);
export const supabase = supabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;
