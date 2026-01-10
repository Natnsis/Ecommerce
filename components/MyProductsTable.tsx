"use client"
import { deleteProduct, fetchProducts } from "@/app/controllers/product";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Pencil, Trash, Loader2 } from "lucide-react";

export function MyProductsTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const mutation = useMutation({
    mutationFn: ({ id, url }: { id: string, url: string }) => deleteProduct(id, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (err) => {
      alert("Error deleting product: " + err.message);
    }
  });

  console.log(data);


  if (isLoading) return <p className="p-10 text-center">Loading...</p>;
  if (error) return <p>Error loading products.</p>;

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
            <TableHead className="w-[50px]">Added Date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <img src={item.image_url} alt={item.name} className="rounded-full w-10 h-10 object-cover" />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell className="whitespace-nowrap">
                {new Date(item.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex items-center gap-2 justify-center">
                <Button variant="secondary" size="icon">
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  disabled={mutation.isPending}
                  onClick={() => {
                    if (confirm("Delete this product?")) {
                      mutation.mutate({ id: item.id, url: item.image_url });
                    }
                  }}
                >
                  {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
