import Categories from "@/components/Categories"
import Footer from "@/components/Footer"
import ForYou from "@/components/ForYou"
import Header from "@/components/Header"
import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, ShoppingCart } from "lucide-react"

const Page = () => {
  return (
    <div>
      <Header />
      <header className="px-5 py-1 flex justify-betweeen items-center border-b">
        <div className="flex gap-5 items-center mr-30">
          <h1 className="font-quater font-extrabold text-2xl">Gebeya</h1>
        </div>
        <div className="flex gap-1 w-full rounded-lg p-2 items-center">
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Products</SelectLabel>
                  <SelectItem value="appe">All</SelectItem>
                  <SelectItem value="apple">Cloths</SelectItem>
                  <SelectItem value="banana">Foods & Drinks</SelectItem>
                  <SelectItem value="blueberry">Electronics</SelectItem>
                  <SelectItem value="grapes">Automotives</SelectItem>
                  <SelectItem value="pineapple">Sport & Outdoor</SelectItem>
                  <SelectItem value="pineappl">Books</SelectItem>
                  <SelectItem value="pineapp">Kitchen</SelectItem>
                  <SelectItem value="pineaple">Skin Care</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full ml-5">
            <Input className="border-0 shadow-0 focus:outline-none focus:border-none" placeholder="Search for a product or brand name..." />
          </div>
        </div>
        <div className="flex gap-5 w-30 ml-5 items-center">
          <ModeToggle />
          <ShoppingCart />
          <Bell />
        </div>
      </header>
      <div className="flex px-20 pt-15 justify-between">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-secondary-medium">#Big Fasion Sale</h3>
          <div className="flex flex-col gap-10">
            <h1 className="text-5xl font-quater">Limited Time Offer!</h1>
            <h1 className="text-5xl font-quater">Upto 50% Off</h1>
          </div>
          <h2 className="text-2xl font-secondary mt-5">Redifine Your Everydary Style</h2>
        </div>
        <div>
          <img src="/home.jpg" className="h-[50vh] w-[40vw]" />
        </div>
      </div>
      <Categories />
      <ForYou />
      <Footer />
    </div >
  )
}

export default Page 
