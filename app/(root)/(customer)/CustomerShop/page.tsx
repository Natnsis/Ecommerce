import Cheader from "@/components/Cheader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const CustomerShop = () => {
  return (
    <section>
      <Cheader />
      <div className="grid grid-cols-5 gap-5 px-5">
        <div className="col-span-1 border p-5 rounded h-fit">
          <h1 className="text-xl font-secondary-extrabold">Categories</h1>
          <div className="flex justify-between font-primary items-center">
            <h1>
              Filter by:
            </h1>
            <Button variant="link">Clear All</Button>
          </div>

          <div className="py-3">
            <h1 className="font-secondary-extrabold text-lg mb-1">Types</h1>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5">
            <h1 className="font-secondary-extrabold text-lg pb-1">Price</h1>
            <div className="flex gap-2 font-primary">
              <input type="radio" name="price" />
              <h1>0-499$</h1>
            </div>

            <div className="flex gap-2 font-primary">
              <input type="radio" name="price" />
              <h1>500-999$</h1>
            </div>

            <div className="flex gap-2 font-primary">
              <input type="radio" name="price" />
              <h1>1000-4999$</h1>
            </div>

            <div className="flex gap-2 font-primary">
              <input type="radio" name="price" />
              <h1>10000-50000$</h1>
            </div>

            <div className="flex gap-2 font-primary">
              <input type="radio" name="price" />
              <h1>&gt;50000$</h1>
            </div>
          </div>
        </div>
        <div className="col-span-4 border p-5 rounded">
          <div>
            <Input placeholder="search for products..." />
          </div>
          <div className="mt-5 p-5 grid grid-cols-4 gap-5 h-[75vh]">
            <div className="h-62 shadow rounded-lg">
              <img src="/cloths/cloth1.jpg" className="h-40 w-full cover rounded-t-lg" />
              <div className="p-2">
                <h1 className="font-quater text-lg">Essential Men's tshirt</h1>
                <p className="font-secondary-bold text-red-400 text-end text-lg">400$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerShop
