"use client"
import { ProductsTable } from "@/components/ProductsTable";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { StackPlusIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const Products = () => {
  const router = useRouter()
  return (
    <main className="grid grid-cols-8 h-screen">
      <Sidebar pageName="products" />
      <section className="px-5 col-span-7 p-5">
        <h1 className="text-4xl">Products</h1>
        <div className="flex justify-between">
          <p className="text-sm text-gray-700 mt-2 dark:text-gray-500">
            List of products within the platform
          </p>
          <Button onClick={() => router.push("/admin/add-product")}>
            <StackPlusIcon />
            <p>Add Product</p>
          </Button>
        </div>
        <div className="mt-10 px-5 h-[70vh] overflow-y-auto">
          <ProductsTable />
        </div>
      </section>
    </main>
  )
}

export default Products
