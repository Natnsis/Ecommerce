"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function FinalizePaymentPage() {
  const router = useRouter();
  const { id: sessionId } = useParams<{ id: string }>();

  useEffect(() => {
    if (!sessionId) return;

    const finalize = async () => {
      try {
        const res = await fetch("/api/finalize-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        console.log("API response:", data);
        console.log("DEBUG DATA:", data.debug);

        router.replace("/success");
      } catch (err) {
        console.error(err);
        router.replace("/dashboard/cart");
      }
    };

    finalize();
  }, [sessionId]);

  return <p>Finalizing payment…</p>;
}
