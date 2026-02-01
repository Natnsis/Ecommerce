import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type cartType = {
  product_id: number;
  user_id: string;
  quantity: number;
  sum: number;
};

export const AddToCart = async (data: cartType) => {
  try {
    const { product_id, user_id, quantity, sum } = data;
    const { error: cartError } = await supabase.from("cart").insert({
      product_id,
      user_id,
      quantity,
      sum,
    });
    if (cartError) throw cartError;
  } catch (error) {
    throw error;
  }
};

export const deleteCart = async (id: number) => {
  try {
    const { error: cartError } = await supabase
      .from("cart")
      .delete()
      .eq("id", id);
    if (cartError) throw cartError;
  } catch (error) {
    throw error;
  }
};

export const getCartById = async (userId: string) => {
  try {
    const { data: carts, error: cartError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId);
    if (cartError) throw cartError;
    return carts;
  } catch (error) {
    throw error;
  }
};

/*
export const deleteAllCartByUser = async (userId: string) => {
  try {
    const { error: cartError } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userId);

    if (cartError) throw cartError;
  } catch (error) {
    throw error;
  }
};
*/
