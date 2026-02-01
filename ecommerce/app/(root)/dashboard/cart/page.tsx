"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, CurrencyDollarSimpleIcon, XIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect } from "react";
import { useUser } from "../../context/user";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCart, getCartById } from "@/app/conrollers/cart.controller";
import { getProductWithId } from "@/app/conrollers/product.controller";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const Cart = () => {
  const router = useRouter()
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && user) {
      console.log("User ID:", user.id);
      console.log("User Email:", user.email);
    } else if (!isLoading && !user) {
      console.log("No user found");
    }
  }, [user, isLoading]);

  const userId = user?.id

  const { data: carts, error: cartError } = useQuery({
    queryKey: ['carts', userId],
    queryFn: () => getCartById(userId!),
    enabled: !!userId
  })

  if (cartError) throw cartError

  const productQueries = useQueries({
    queries: (carts ?? []).map(cart => ({
      queryKey: ['nested-product', cart.product_id],
      queryFn: () => getProductWithId(cart.product_id),
      enabled: !!cart.product_id
    }))
  })

  const cartsWithProducts = carts?.map((cart, index) => ({
    ...cart,
    product: productQueries[index]?.data,
  }));

  const queryClient = useQueryClient()

  const deleteCartMutation = useMutation({
    mutationFn: (id: number) => deleteCart(id),
    onSuccess: () => queryClient.invalidateQueries({
      predicate: query => query.queryKey[0] === 'carts'
    })
  })

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carts: cartsWithProducts?.map(c => ({
            id: c.id,
            product_id: c.product_id,
            quantity: c.quantity,
            sum: c.sum,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create payment");
      }

      return res.json();
    },
    onSuccess: (data) => {
      router.push(`/checkout?clientSecret=${data.clientSecret}`);
    },
  });

  return (
    <main className="p-5 space-y-5">
      <header className="flex justify-start">
        <Button onClick={() => router.back()}>
          <ArrowLeftIcon />
          Go back
        </Button>
      </header>

      <section className="h-[86vh] p-5 space-y-5">
        <div className="h-[10%] flex justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">
              Your Cart
            </h1>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              className="dark:text-green-200 text-green-600"
              disabled={!cartsWithProducts?.length || checkoutMutation.isPending}
              onClick={() => checkoutMutation.mutate()}
            >
              <CurrencyDollarSimpleIcon />
              {checkoutMutation.isPending ? "Processing..." : "Cashout"}
            </Button>
          </div>
        </div>

        <div className="h-[85%] py-5 px-20 md:px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead>Img</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>QTY.</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartsWithProducts?.map((c, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={c.product?.url} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{c.product?.name}</TableCell>
                  <TableCell>{c.quantity}</TableCell>
                  <TableCell>{c.sum}</TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline">
                          <XIcon />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to delete the cart item?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete data
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteCartMutation.mutate(c.id)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  )
}

export default Cart
