"use client"
import InnerHeader from "@/components/InnerHeader"
import Profile from "@/components/Profile"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const order = () => {
  return (
    <main className="p-5">
      <div className="flex justify-between items-center">
        <InnerHeader />
        <Profile />
      </div>
      <section className="px-20 pt-10">
        <h1 className="text-4xl">Ordered Summary</h1>
        <div className="h-[75vh] p-5">
          <div className="h-[75vh] p-5">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  )
}

export default order 
