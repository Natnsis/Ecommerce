"use client"

import { fetchTransactionById } from "@/app/conrollers/transaction.controller"
import { getProductWithId } from "@/app/conrollers/product.controller"
import InnerHeader from "@/components/InnerHeader"
import Profile from "@/components/Profile"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQueries, useQuery } from "@tanstack/react-query"
import { useUser } from "../context/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Order = () => {
  const { data: user } = useUser()
  const {
    data: transactions = [],
    isLoading: transactionsLoading,
    error: transactionError,
  } = useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: () => fetchTransactionById(user!.id),
    enabled: !!user?.id,
  })
  if (transactionError) throw transactionError
  const productQueries = useQueries({
    queries: transactions.map((t) => ({
      queryKey: ["product", t.product_id],
      queryFn: () => getProductWithId(t.product_id),
      enabled: !!t.product_id,
    })),
  })

  const productMap = productQueries.reduce<Record<string, any>>((acc, q, i) => {
    const productId = transactions[i]?.product_id
    if (productId && q.data) {
      acc[productId] = q.data
    }
    return acc
  }, {})

  const transactionWithProducts = transactions.map((t) => ({
    ...t,
    product: productMap[t.product_id],
  }))

  return (
    <main className="p-5">
      <div className="flex justify-between items-center">
        <InnerHeader />
        <Profile />
      </div>

      <section className="px-20 pt-10">
        <h1 className="text-4xl">Ordered Summary</h1>

        <div className="h-[75vh] p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactionsLoading && (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              )}

              {transactionWithProducts.map((t, index) => (
                <TableRow key={t.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{t.product?.name ?? "Loading..."}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={t.product?.url ?? "https://github.com/shadcn.png"} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{t.product?.price ?? "-"}</TableCell>
                  <TableCell>{t.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  )
}

export default Order
