import { Bell, ShoppingCart } from "lucide-react"
import Header from "./components/Header"
import { Input } from "./components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './components/ui/select'
import { ModeToggle } from "./components/mode-toggle"

const App = () => {
  return (
    <div>
      <Header />
      <div className="px-5 py-1 flex justify-betweeen items-center border-b">
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
      </div>
    </div>
  )
}

export default App
