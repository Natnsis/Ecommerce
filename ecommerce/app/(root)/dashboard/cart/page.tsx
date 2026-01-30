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
import { useQuery } from "@tanstack/react-query";
import { getCartById } from "@/app/conrollers/cart.controller";

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
            <Button variant="secondary" className="bg-green-200">
              <CurrencyDollarSimpleIcon />
              Cashout
            </Button>
          </div>
        </div>

        <div className="h-[85%] bg-white py-5 px-20 md:px-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-3">No.</TableHead>
                <TableHead>Img</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>QTY.</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="pl-3">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>
                  <Button variant="outline">
                    <XIcon />
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="pl-3">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>
                  <Button variant="outline">
                    <XIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  )
}

export default Cart
