"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "@/app/conrollers/product.controller";

export function ProductsTable() {
  const queryClient = useQueryClient();
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>No.</TableHead>
          <TableHead>Profile</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Market</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((p, index) => (
          <TableRow key={p.id}>
            <TableCell>{index + 1}</TableCell>

            <TableCell>
              <Avatar>
                <AvatarImage src={p.url} />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>
            </TableCell>

            <TableCell>{p.name}</TableCell>
            <TableCell>{p.price}</TableCell>
            <TableCell>{p.market}</TableCell>

            <TableCell className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <PencilSimpleIcon />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => deleteMutation.mutate(p.id)}
                disabled={deleteMutation.isPending}
              >
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
