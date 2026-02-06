"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
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
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useState, useMemo } from "react";

export function ProductsTable() {
  const queryClient = useQueryClient();
  const router = useRouter()
  const [search, setSearch] = useState("")

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = useMemo(() => {
    if (!search.trim()) return products
    const q = search.toLowerCase()

    return products.filter(p =>
      p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)
    )
  }, [products, search])

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <div className="w-1/2 md:mb-5 mb-0">
        <Input
          placeholder="search for product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table className="w-100vw">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Market</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredProducts.map((p, index) => (
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
              <TableCell>{p.stock}</TableCell>

              <TableCell className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/admin/add-product/${p.id}`)}
                >
                  <PencilSimpleIcon />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="destructive"
                    >
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete the product?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(p.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
