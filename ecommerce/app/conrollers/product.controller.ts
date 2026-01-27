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

export const getProduct = async () => {
  try {
    const supabase = createClient();
    const { data: products, error: productsError } = await supabase.from("products")
      .select("*")
    if (productsError) throw productsError;
    return products
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getProductWithId = async (id: string) => {
  try {
    const supabase = createClient();
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .filter("id", "eq", id)
      .maybeSingle();
    if (productError) throw productError
    return product
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteProduct = async (id: string) => {
  try {
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("products")
      .delete()
      .eq("id", id)
    if (deleteError) throw deleteError
  } catch (error) {
    console.log(error)
  }
}

export const updateProduct = async (id: string, data: Partial<productType>) => {
  try {
    const supabase = createClient();
    const { name, price, market, category, description } = data;

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        market,
        category,
        description,
      })
      .eq("id", id);

    if (error) throw error;

    return { message: "Product updated successfully" };
  } catch (error: any) {
    console.error("Update error:", error);
    throw error;
  }
};
