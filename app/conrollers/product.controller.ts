import { createClient } from "@/lib/supabase/client";
import { productType } from "../schemas/product.schema";

const supabase = createClient();

export const addProduct = async (data: productType) => {
  try {
    const { name, price, market, category, description, stock, image } = data;
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
      stock,
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

export const getProducts = async () => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");
    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(error.message);
    }
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductWithId = async (id: number) => {
  try {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("*")
      .filter("id", "eq", id)
      .maybeSingle();
    if (productError) throw productError;
    return product;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("url")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) throw fetchError;
    if (!product?.url) throw new Error("Image URL not found");

    const bucketName = "products";
    const filePath = product.url.split(
      `/storage/v1/object/public/${bucketName}/`,
    )[1];

    if (!filePath) {
      throw new Error("Invalid image URL format");
    }

    const { error: storageError } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (storageError) throw storageError;

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;
  } catch (error: any) {
    console.error("Delete product failed:", {
      message: error?.message,
      code: error?.code,
      details: error?.details,
      raw: error,
    });
  }
};

export const updateProduct = async (id: number, data: Partial<productType>) => {
  try {
    const { name, price, market, category, description, stock } = data;

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price,
        market,
        category,
        description,
        stock,
      })
      .eq("id", id);

    if (error) throw error;

    return { message: "Product updated successfully" };
  } catch (error: any) {
    console.error("Update error:", error);
    throw error;
  }
};

export const reduceQuantityOfProduct = async (
  items: { product_id: number; quantity: number }[],
) => {
  try {
    for (const it of items) {
      const { product_id, quantity } = it;

      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("id, stock")
        .eq("id", product_id)
        .maybeSingle();

      if (fetchError) {
        console.error("Failed to fetch product", product_id, fetchError);
        continue;
      }
      if (!product) {
        console.warn("Product not found for id", product_id);
        continue;
      }

      const currentStock = Number(product.stock) || 0;
      const newStock = Math.max(0, currentStock - (quantity || 0));

      const { error: updateError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", product_id);

      if (updateError) {
        console.error(
          "Failed to update product stock",
          product_id,
          updateError,
        );
      }
    }
  } catch (err) {
    console.error("reduceQuantityOfProduct error", err);
    throw err;
  }
};
