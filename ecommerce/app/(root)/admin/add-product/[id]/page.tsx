"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react"
import { useParams, useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, productType } from "@/app/schemas/product.schema"
import { useState } from "react"
import Image from "next/image"
import { getProductWithId, updateProduct } from "@/app/conrollers/product.controller"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

const CATEGORIES = [
  "electronics",
  "fashion",
  "furniture",
  "sport",
  "stationary",
  "toys",
  "health",
  "authomotive"
];

const page = () => {
  const router = useRouter()
  const { id } = useParams()
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      market: 0,
      category: "",
      description: "",
      image: undefined
    }
  });

  const { data, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async ({ queryKey }) => {
      const [, productId] = queryKey
      return getProductWithId(productId as string)
    },
  })

  const DEFAULT_PRODUCT_IMAGE = "https://via.nplaceholder.com/600x600"

  const onSubmit = async (id: number, data: productType) => {
    try {
      setIsLoading(true)
      await updateProduct(id, data);
      setIsLoading(false)
      toast("Uploaded Succesfully")
    } catch (error) {
      throw error
    }
  }

  return (
    <main className="p-5">
      <Button onClick={() => router.back()}>
        <ArrowLeftIcon />
        <p>Back</p>
      </Button>
      <section className="h-[90vh] p-5">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Update Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder={data ? data.name : "product name"}
                    {...register("name")}
                  />
                  {errors.name && (<p className="text-[#E7000A]">{errors.name.message}</p>)}
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder={data ? data.price : "0.0"}
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && (<p className="text-[#E7000A]">{errors.price.message}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketPrice">Market Price</Label>
                    <Input
                      id="marketPrice"
                      type="number"
                      placeholder={data ? data.market : "0.0"}
                      {...register("market", { valueAsNumber: true })} />
                    {errors.market && (<p className="text-[#E7000A]">{errors.market.message}</p>)}
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="space-y-2 w-1/2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder={data ? data.stock : "1"}
                      min="0"
                      step="0.01"
                      {...register("stock", { valueAsNumber: true })} />
                    {errors.stock && (<p className="text-[#E7000A]">{errors.stock.message}</p>)}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          defaultValue=""
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (<p className="text-[#E7000A]">{errors.category.message}</p>)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder={data ? data.description : "this is a product description"}
                    className="min-h-[100px]"
                    {...register("description")}
                  />
                  {errors.description && (<p className="text-[#E7000A]">{errors.description.message}</p>)}
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="flex flex-col items-center justify-center 
                  p-6 border-2 border-dashed rounded-lg bg-muted/30 
                  hover:bg-muted/50 transition-colors">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <Label
                        className="cursor-pointer flex flex-col items-center gap-2 text-center"
                      >
                        <Image
                          src={data ? data.url : DEFAULT_PRODUCT_IMAGE}
                          alt="Preview"
                          width={160}
                          height={160}
                          className="rounded-md object-cover"
                        />
                      </Label>
                    )}
                  />
                </div>

                <Button className="w-full" type="submit" disabled={isLoading}>
                  <PlusIcon />
                  {isLoading ? "updating..." : "Update Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default page
