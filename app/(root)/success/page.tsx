"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircleIcon } from "@phosphor-icons/react";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6">
      <CheckCircleIcon size={64} className="text-green-500" />

      <h1 className="text-2xl font-bold">
        Payment Successful 🎉
      </h1>

      <p className="text-muted-foreground text-center max-w-md">
        Thank you for your payment. Your order has been processed successfully.
      </p>

      <div className="flex gap-4">
        <Button onClick={() => router.push("/dashboard")}>
          Go Home
        </Button>

        <Button variant="outline" onClick={() => router.push("/order")}>
          View Orders
        </Button>
      </div>
    </main>
  );
}
