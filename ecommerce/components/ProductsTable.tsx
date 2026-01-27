import { getProducts } from "@/app/conrollers/product.controller"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"

export function ProductsTable() {
  const { data: products, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Market Price</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products && products.map((p, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Avatar>
                <AvatarImage src={p.url} />
                <AvatarFallback>pf</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.price}</TableCell>
            <TableCell>{p.market}</TableCell>
            <TableCell className="flex items-center gap-3">
              <Button variant="outline">
                <PencilSimpleIcon />
              </Button>
              <Button>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
