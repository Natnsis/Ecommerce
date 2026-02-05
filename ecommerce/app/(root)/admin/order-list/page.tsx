"use client"
import { getAllTransaction } from "@/app/conrollers/transaction.controller"
import { OrdersTable } from "@/components/OrdersTable"
import Sidebar from "@/components/Sidebar"
import { useQuery } from "@tanstack/react-query"

const orderList = () => {
  const { data: orders, error: orderErrors } = useQuery({
    queryKey: ['overall-order'],
    queryFn: getAllTransaction
  })


  return (
    <main className="grid grid-cols-8 h-screen">
      <Sidebar pageName="order-list" />
      <section className="px-5 col-span-7 p-5">
        <h1 className="text-4xl">Orders</h1>
        <p className="text-sm text-gray-700 mt-2 dark:text-gray-500">
          List of orders done by customers
        </p>
        <div>
          <OrdersTable />
        </div>
      </section>
    </main>
  )
}

export default orderList
