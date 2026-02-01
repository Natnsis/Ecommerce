import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const addTransaction = async (
  userId: string | null,
  amount: number | null,
) => {
  try {
    const payload: any = {};
    if (amount !== undefined) payload.amount = amount;
    if (userId) payload.user_id = userId;

    const { error } = await supabase.from("transaction").insert(payload);
    if (error) throw error;
    return { message: "Transaction recorded" };
  } catch (err) {
    console.error("addTransaction error", err);
    throw err;
  }
};
