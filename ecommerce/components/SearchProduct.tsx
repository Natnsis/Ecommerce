"use client"
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card";

const SearchProduct = () => {
  return (
    <div>
      <div className="flex gap-10 w-full">
        <div className='flex gap-1 w-1/2'>
          <Input placeholder='Search for product...' />
          <Button>
            <MagnifyingGlassIcon size={32} />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Fruits</SelectItem>
              <SelectItem value="light">Vegitables</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">All</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Fruits</SelectItem>
              <SelectItem value="light">Vegitables</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">All</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="">
              <SelectValue placeholder="Favo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Fruits</SelectItem>
              <SelectItem value="light">Vegitables</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex w-full items-center mt-5">
        <div className="flex w-full gap-5 justify-center">
          <Card className="w-6/10">
            <CardContent>
              hehe
            </CardContent>
          </Card>
          <Card className="w-3/10">
            <CardContent>
              hehe
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
