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

const Cart = () => {
  const router = useRouter()
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
        <div className="h-[85%] bg-white py-5 px-20 ">
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
