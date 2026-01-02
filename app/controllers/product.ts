import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
  if (error) throw error;
  return data
}
