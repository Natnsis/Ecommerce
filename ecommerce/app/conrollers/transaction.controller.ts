import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const addTransaction = async (
  userId: string | null,
  amount: number | null,
  productId?: number | null,
) => {
  try {
    const payload: any = {};
    if (amount !== undefined && amount !== null) payload.amount = amount;
    if (userId) payload.user_id = userId;
    if (productId !== undefined && productId !== null)
      payload.product_id = productId;

    const { error } = await supabase.from("transaction").insert(payload);
    if (error) throw error;
    return { message: "Transaction recorded" };
  } catch (err) {
    console.error("addTransaction error", err);
    throw err;
  }
};

export const fetchTransactionById = async (userId: string) => {
  try {
    const { data: transaction, error } = await supabase.from('transaction')
      .select("*")
      .eq('user_id', userId)
    if (error) throw error
    return transaction
  } catch (error) {
    throw error
  }
}
