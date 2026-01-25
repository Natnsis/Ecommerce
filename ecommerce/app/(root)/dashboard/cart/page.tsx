"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, XIcon, CurrencyDollarSimpleIcon } from "@phosphor-icons/react"
import Image from "next/image";
import { useRouter } from "next/navigation";
const cart = () => {
  const router = useRouter()
  return (
    <main className="p-5">
      <div>
        <Button onClick={() => router.back()}>
          <ArrowLeftIcon />
          <p>Go Back</p>
        </Button>
      </div>
      <section className="px-60 py-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button variant="outline" className="text-[#2ec27e]">checkout <CurrencyDollarSimpleIcon color="#2ec27e" /></Button>
        </div>
        <div>
          <table className="w-full mt-10">
            <thead>
              <tr className="w-full">
                <th className="w-4/9 text-start text-gray-500">Product</th>
                <th className="w-2/9 text-center text-gray-500">QTY</th>
                <th className="w-2/9 text-center text-gray-500">Price</th>
                <th className="w-1/9"></th>
              </tr>
            </thead>
          </table>

          <div className="h-[70vh] overflow-y-auto">
            <table className="w-full">
              <tbody>
                <tr>
                  <td>
                    <Image src="/products/book1.png" alt="image" width={200} height={600} />
                  </td>
                  <td className="w-2/9 text-center">1</td>
                  <td className="w-2/9 text-center">$20</td>
                  <td className="w-1/9 text-center"><XIcon /></td>
                </tr>

                <tr>
                  <td>
                    <Image src="/products/book1.png" alt="image" width={200} height={600} />
                  </td>
                  <td className="w-2/9 text-center">1</td>
                  <td className="w-2/9 text-center">$20</td>
                  <td className="w-1/9 text-center"><XIcon /></td>
                </tr>

                <tr>
                  <td>
                    <Image src="/products/book1.png" alt="image" width={200} height={600} />
                  </td>
                  <td className="text-center">1</td>
                  <td className="text-center">$20</td>
                  <td className="text-center"><XIcon /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

export default cart 
