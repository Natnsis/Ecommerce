"use client"
import { products } from "@/lib/constant"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ShoppingBagOpenIcon, StarIcon } from "@phosphor-icons/react"
import { useParams, useRouter } from "next/navigation"
import Image from 'next/image'
import { Input } from "@/components/ui/input"

const detail = () => {
  const router = useRouter()
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id));
  return (
    <main className="h-screen p-5">
      <Button onClick={() => router.back()}>
        <ArrowLeftIcon size={20} />
        <p>Go back</p>
      </Button>
      <section className="flex gap-5 h-[90vh] mt-10">
        <div className="bg-white p-10 w-1/2 h-[80vh] flex items-center justify-center">
          <Image
            src={product?.img!}
            alt="product-img"
            width={400}
            height={500}
            className="max-h-full w-auto object-contain"
          />
        </div>
        <div className="p-10 w-1/2 flex flex-col justify-center gap-3">
          <h1 className="text-5xl font-extrabold mb-2">{product?.title}</h1>
          <div className="flex gap-2 items-center">
            <StarIcon color="#f6d32d" weight="fill" size={30} />
            <p className="text-lg font-bold">{product?.rating}</p>
            <p className="text-gray-700 dark:text-gray-300">(based on {product?.reviews} reviews)</p>
          </div>
          <p className="text-gray-600 text-sm dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div>
            <p>${product?.price}/product</p>
          </div>
          <div className="flex gap-5">
            <Input placeholder="Quantity" className="w-1/5" type="number" />
            <Button className="w-4/5">Add to cart <ShoppingBagOpenIcon size={44} /></Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default detail 
