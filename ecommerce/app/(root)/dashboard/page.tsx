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

const dashboard = () => {
  return (
    <section className="p-5 w-full">
      <div className="flex justify-between items-center w-full">
        <InnerHeader />
        <div className="flex gap-2">
          <Input className="w-[30vw]" placeholder="search for products..." />
          <Button>
            <HeartIcon />
          </Button>
          <Button variant="outline">
            <ShoppingBagIcon />
          </Button>
          <Profile />
        </div>
      </div>

      <main className="flex w-full">
        <aside className="mt-2">
          <div className="my-3">
            <h1 className="mb-1">Category</h1>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Electronics</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Fashion</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Home & Living</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Sports & Outdoors</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Books & Stationery</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Toys & Kids</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Health & Wellness</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Personal Care</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="category" />
              <p className="text-sm text-gray-600">Automotive</p>
            </div>
            <Separator className="mt-3" />
          </div>

          <div className="my-3">
            <h1 className="mb-1">Price</h1>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600">$0 - $50</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600">$50 - $100</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600">$100 - $150</p>
            </div>
            <div className="flex gap-1 items-center">
              <input type="radio" className="accent-[#E7000A]" name="price" />
              <p className="text-sm text-gray-600">over $150</p>
            </div>
            <div className="flex items-center gap-1 mt-3 w-[10vw]">
              <div className="">
                <Input defaultValue={0} className="text-center" type="number" />
                <p className="text-center text-sm text-gray-600">Min</p>
              </div>
              <p>-</p>
              <div>
                <Input defaultValue={0} className="text-center" type="number" />
                <p className="text-center text-sm text-gray-600">Max</p>
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
              <Button variant="outline">Nike</Button>
              <Button variant="outline">Addidas</Button>
              <Button variant="outline">Pumma</Button>
              <Button variant="outline">Vans</Button>
              <Button variant="outline">Reebook</Button>
              <Button variant="outline">Converse</Button>
              <Button variant="outline">New Balance</Button>
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
        </section>
      </main>
    </section>
  )
}

export default dashboard 
