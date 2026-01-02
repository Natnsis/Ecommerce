"use client"
import { fetchProducts } from "@/app/controllers/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

export function MyProductsTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })

  if (error) {
    console.error(error)
  }
  if (isLoading) return <p>Loading...</p>
  console.log(data)

  return (
    <div className="mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">No.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="w-[50px]">Added Day</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data!.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img
                  src={item.image_url}
                  alt="product-img"
                  width={35}
                  height={40}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell className="w-[50px]">{item.created_at}</TableCell>
              <TableCell className="flex items-center gap-5">
                <Button variant="secondary"><Pencil /></Button>
                <Button variant="destructive"><Trash /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
