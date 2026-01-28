"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, XIcon, CurrencyDollarSimpleIcon } from "@phosphor-icons/react";
import { useQueries, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../../context/user";
import { getCartById } from "@/app/conrollers/cart.controller";
import { getProductWithId } from "@/app/conrollers/product.controller";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
}

export default function Cart() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useUser();
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    if (!isUserLoading && user?.id) {
      setUserId(user.id);
    }
  }, [user, isUserLoading]);

  const { data: cart, isLoading: isCartLoading } = useQuery<CartItem[]>({
    queryKey: ["cart", userId],
    queryFn: () => getCartById(userId),
    enabled: !!userId,
  });

  const productQueries = useQueries({
    queries: (cart ?? []).map((item) => ({
      queryKey: ["product", item.product_id],
      queryFn: () => getProductWithId(item.product_id),
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!item.product_id,
    })),
  });

  const cartWithProducts = useMemo(() => {
    if (!cart) return [];

    return cart.map((item, index) => {
      const productQuery = productQueries[index];
      return {
        cartItem: item,
        product: productQuery.data as Product | undefined,
        isLoading: productQuery.isLoading,
        isError: productQuery.isError,
      };
    });
  }, [cart, productQueries]);

  const isLoading = isUserLoading || isCartLoading || productQueries.some((q) => q.isLoading);

  return (
    <main className="min-h-screen p-5 md:p-8">
      <div className="mb-6">
        <Button onClick={() => router.back()}>
          <ArrowLeftIcon size={20} className="mr-2" />
          Go Back
        </Button>
      </div>

      <section className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold">Your Cart</h1>

          <Button
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
            disabled={isLoading || !cart?.length}
          >
            <CurrencyDollarSimpleIcon size={20} />
            Checkout
          </Button>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-500">
            Loading your cart...
          </div>
        ) : !cart || cart.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => router.back()}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border">
            <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 font-medium text-gray-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Action</div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto divide-y">
              {cartWithProducts.map(({ cartItem, product, isLoading: productLoading }) => (
                <div
                  key={cartItem.id}
                  className="grid grid-cols-12 items-center gap-4 px-6 py-4 hover:bg-gray-50"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    {productLoading || !product ? (
                      <div className="h-24 w-24 animate-pulse rounded bg-gray-200" />
                    ) : (
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={product.url}
                          alt={product.name || "Product image"}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    )}

                    <div>
                      {productLoading || !product ? (
                        <div className="space-y-2">
                          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                        </div>
                      ) : (
                        <>
                          <p className="font-medium">{product.name}</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 text-center font-medium">
                    {cartItem.quantity || 1}
                  </div>

                  <div className="col-span-2 text-center font-medium">
                    {productLoading || !product ? (
                      <div className="inline-block h-5 w-16 animate-pulse rounded bg-gray-200" />
                    ) : (
                      `$${(product.price * (cartItem.quantity || 1)).toFixed(2)}`
                    )}
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700">
                      <XIcon size={20} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
