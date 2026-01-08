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

export const deleteProduct = async (id: string, imageUrl?: string) => {
  const supabase = createClient();
  if (imageUrl) {
    const pathSegments = imageUrl.split("Images/");
    const filePath = pathSegments.length > 1 ? pathSegments[1] : null;
    if (filePath) {
      const { error: storageError } = await supabase
        .storage
        .from("Images")
        .remove([filePath]);
      if (storageError) {
        console.error("Storage cleanup failed:", storageError.message);
      }
    }
  }
  const { error: dbError } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (dbError) {
    console.error("Database deletion failed:", dbError.message);
    throw new Error(`Failed to delete product: ${dbError.message}`);
  }

  return { success: true };
};

export const updateProduct = async (id: string) => {
  const { error } = await supabase
    .from("product")
    .update("")
    .eq("id", id)
  if (error) throw error
}

