"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent
} from "@/components/ui/select"

import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, productType } from "@/app/schemas/product.schema"

import { getProductWithId, updateProduct } from "@/app/conrollers/product.controller"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const CATEGORIES = [
  "electronics",
  "fashion",
  "furniture",
  "sport",
  "stationary",
  "toys",
  "health",
  "authomotive"
]

const DEFAULT_PRODUCT_IMAGE = "https://via.nplaceholder.com/600x600"

const Page = () => {
  const router = useRouter()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<productType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      market: 0,
      stock: 0,
      category: "",
      description: "",
      image: undefined // 👈 image stays untouched
    }
  })

  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductWithId(id as string),
    enabled: !!id
  })

  // Populate form once product is fetched
  useEffect(() => {
    if (!data) return

    reset({
      name: data.name,
      price: data.price,
      market: data.market,
      stock: data.stock,
      category: data.category,
      description: data.description,
      image: undefined // 👈 never preload image
    })
  }, [data, reset])

  const onSubmit = async (formData: productType) => {
    try {
      setIsLoading(true)
      await updateProduct(Number(id), formData)
      toast("Updated successfully")
      router.back()
    } catch (error) {
      toast("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="p-5">
      <Button onClick={() => router.back()} className="mb-5">
        <ArrowLeftIcon />
        <span>Back</span>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* LEFT */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <Label>Name</Label>
                <Input placeholder={data?.name || "Product name"} {...register("name")} />
                {errors.name && <p className="text-[#E7000A]">{errors.name.message}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    placeholder={data?.price?.toString() || "0"}
                    {...register("price", { valueAsNumber: true })}
                  />
                  {errors.price && <p className="text-[#E7000A]">{errors.price.message}</p>}
                </div>

                <div>
                  <Label>Market Price</Label>
                  <Input
                    type="number"
                    placeholder={data?.market?.toString() || "0"}
                    {...register("market", { valueAsNumber: true })}
                  />
                  {errors.market && <p className="text-[#E7000A]">{errors.market.message}</p>}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    placeholder={data?.stock?.toString() || "1"}
                    {...register("stock", { valueAsNumber: true })}
                  />
                  {errors.stock && <p className="text-[#E7000A]">{errors.stock.message}</p>}
                </div>

                <div className="w-1/2">
                  <Label>Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map(c => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && <p className="text-[#E7000A]">{errors.category.message}</p>}
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder={data?.description || "Product description"}
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-[#E7000A]">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <div className="p-6 border-2 border-dashed rounded-lg bg-muted/30 flex justify-center">
                <Image
                  src={data?.url || DEFAULT_PRODUCT_IMAGE}
                  alt="Product Image"
                  width={160}
                  height={160}
                  className="rounded-md object-cover"
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                <PlusIcon />
                {isLoading ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default Page
