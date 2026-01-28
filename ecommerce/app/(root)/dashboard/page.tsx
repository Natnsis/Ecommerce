"use client"
import InnerHeader from "@/components/InnerHeader"
import Profile from "@/components/Profile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeartIcon, ShoppingBagIcon, StarIcon } from "@phosphor-icons/react"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { products } from "@/lib/constant"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { useUser } from "../context/user"

const dashboard = () => {
  const router = useRouter()
  const { data: user } = useUser()
  if (!user) {
    console.log("No user")
    return
  }
  console.log(user.id)
  console.log(user.email)
  return (
    <section className="p-5 w-full">
      <div className="flex justify-between items-center w-full">
        <InnerHeader />
        <div className="flex gap-2">
          <Input className="w-[30vw]" placeholder="search for products..." />
          <Button>
            <HeartIcon />
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard/cart")}>
            <ShoppingBagIcon />
          </Button>
          <ModeToggle />
          <Profile />
        </div>
      </div>

      <main className="flex w-full">
        <aside className="mt-2">
          <div className="my-3">
            <h1 className="mb-1">Category</h1>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Electronics</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Fashion</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Home & Living</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Sports & Outdoors</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Books & Stationery</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Toys & Kids</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Health & Wellness</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Personal Care</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600 dark:text-gray-300">Automotive</p>
            </div>
            <Separator className="mt-3" />
          </div>

          <div className="my-3">
            <h1 className="mb-1">Price</h1>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600 dark:text-gray-300">$0 - $50</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600 dark:text-gray-300">$50 - $100</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600 dark:text-gray-300">$100 - $150</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600 dark:text-gray-300">over $150</p>
            </div>
            <div className="flex items-center gap-1 mt-3 w-[10vw]">
              <div className="">
                <Input defaultValue={0} className="text-center" type="number" />
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">Min</p>
              </div>
              <p>-</p>
              <div>
                <Input defaultValue={0} className="text-center" type="number" />
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">Max</p>
              </div>
            </div>
            <Separator className="mt-3" />
          </div>

          <div className="my-3">
            <h1 className="mb-1">Rating</h1>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="select rating level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5" className="flex justify-center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </SelectItem>
                <SelectItem value="4" className="flex justify-center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </SelectItem>
                <SelectItem value="3" className="flex justify-center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </SelectItem>
                <SelectItem value="2" className="flex justify-center">
                  <StarIcon />
                  <StarIcon />
                </SelectItem>
                <SelectItem value="1" className="flex justify-center">
                  <StarIcon />
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </aside>
        <section className="w-full p-5 border-t ml-10">
          <h1 className="text-xl font-bold">Recommended</h1>
          <div className="flex justify-between items-center mt-5">
            <div className="flex gap-2">
              <Button>All Products</Button>
              <Button variant="outline">Hot</Button>
              <Button variant="outline">Rare</Button>
              <Button variant="outline">Hobby</Button>
            </div>
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pftt">Newest</SelectItem>
                <SelectItem value="heeh1">Cheapest</SelectItem>
                <SelectItem value="heeh">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-5 gap-3 mt-5 overflow-y-auto max-h-[80vh]">
            {products.map((p, index) => (
              <div className="border-b" key={index} onClick={() => router.push(`/dashboard/${p.id}`)}>
                <div className="border bg-gray-50 rounded-lg h-[30vh] overflow-hidden">
                  <div className="flex justify-end p-3"><HeartIcon size={20} /></div>
                  <Image
                    src={p.img}
                    alt="product-img"
                    width={200}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="border-x p-2">
                  <h1 className="font-bold">{p.title}</h1>
                  <div className="flex gap-1 items-center">
                    <StarIcon size={16} className="color-amber-900" color="#f6d32d" weight="fill" />
                    <p className="text-sm">{p.rating} <span className="text-gray-700 dark:text-gray-300">({p.reviews} reviews)</span></p>
                  </div>
                  <div className="flex justify-between mr-5">
                    <div className="text-sm flex gap-3">
                      <s>${p.former}</s>
                      <p className="text-gray-700 dark:text-gray-300">${p.price}</p>
                    </div>
                    <ShoppingBagIcon size={25} color="#E7000A" weight="fill" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </section>
  )
}

export default dashboard 
