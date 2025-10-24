import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function queryDatabase(query: string, params: any[] = []): Promise<any> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("supabaseUrl and supabaseAnonKey are required.");
  }
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ query, params }),
    });

    if (!response.ok) {
      throw new Error("Database query failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("supabaseUrl and supabaseAnonKey are required.");
  }
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

