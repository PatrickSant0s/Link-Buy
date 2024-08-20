import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xemmitbhfxuiagjsiqkq.supabase.co";
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
console.log({ supabaseUrl, supabaseKey });
export const supabase = createClient(supabaseUrl, supabaseKey);
