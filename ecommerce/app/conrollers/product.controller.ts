import { createClient } from "@/lib/supabase/client"
import { productType } from "../schemas/product.schema"

export const addProduct = async (data: productType) => {
  try {
    const supabase = createClient();
    const { name, price, market, category, description, image } = data;
    if (!image) throw new Error("No image provided");
    const fileExt = image.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    const { error: dbError } = await supabase.from("products").insert({
      name,
      price,
      market,
      category,
      description,
      url: publicUrlData.publicUrl,
    });

    if (dbError) throw dbError;
    return { message: "Product added successfully" };

  } catch (error) {
    console.error(error);
    throw error;
  }
};


