import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const fetchProducts = async () => {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("vendor_id", user.id)

  if (error) throw error;
  return data
}

export const deleteProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
  if (error) throw error
}

export const updateProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("product")
    .update("")
    .eq("id", id)
  if (error) throw error
}


