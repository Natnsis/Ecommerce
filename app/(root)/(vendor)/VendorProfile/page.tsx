import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Vheader from "@/components/Vheader"
import { Trash } from "lucide-react"

const VendorProfile = () => {
  return (
    <section>
      <Vheader />
      <div className="p-5 flex justify-center items-center">
        <div className="border h-full rounded-lg p-5 flex flex-col gap-2 font-primary">
          <p className="font-priamry">Profile Picture</p>
          <div className="flex items-center gap-10">
            <img src="/automotive.jpg" className="w-15 h-15 rounded-full" />
            <div className="flex gap-2">
              <Button>Change Picture</Button>
              <Button variant="destructive" size="icon"><Trash /></Button>
            </div>
          </div>
          <div className="flex gap-5">
            <div>
              <label htmlFor="fName">First Name</label>
              <Input name="fName" />
            </div>

            <div>
              <label htmlFor="lName">Last Name</label>
              <Input name="lName" />
            </div>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Input name="password" />
          </div>

          <div>
            <label>Phone No.</label>
            <Input />
          </div>

          <div className="flex gap-5">
            <div>
              <label>Address</label>
              <Input />
            </div>

            <div>
              <label>Category</label>
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
          </div>

          <div>
            <label>Bio</label>
            <Textarea />
          </div>
          <div className="flex justify-end gap-5">
            <Button>
              Submit
            </Button>

            <Button variant="outline">
              Cancel
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default VendorProfile
