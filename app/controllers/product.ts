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
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      const { error: imageDeletionError } = await supabase
        .storage
        .from("Images")
        .remove([fileName]);
      if (imageDeletionError) {
        console.error("Failed to delete image:", imageDeletionError);
        throw imageDeletionError;
      }
    }
  }
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return { success: true };
};

export const updateProduct = async (id: string) => {
  const { error } = await supabase
    .from("product")
    .update("")
    .eq("id", id)
  if (error) throw error
}

