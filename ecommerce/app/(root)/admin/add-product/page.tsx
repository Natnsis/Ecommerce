"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, productType } from "@/app/schemas/product.schema"
import { useState } from "react"
import Image from "next/image"

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
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, control, formState: { errors } } = useForm({
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

  const onSubmit = (data: productType) => {
    console.log(data)
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
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Product name" {...register("name")} />
                  {errors.name && (<p className="text-[#E7000A]">{errors.name.message}</p>)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && (<p className="text-[#E7000A]">{errors.price.message}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketPrice">Market Price</Label>
                    <Input
                      id="marketPrice"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      {...register("market", { valueAsNumber: true })} />
                    {errors.market && (<p className="text-[#E7000A]">{errors.market.message}</p>)}
                  </div>
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

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us more about the product..."
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
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-2 text-center"
                      >
                        <div className="text-sm font-medium">Upload Image</div>
                        <div className="text-xs text-muted-foreground">
                          Click to browse or drag & drop
                        </div>
                        {preview && (
                          <Image
                            src={preview}
                            alt="Preview"
                            width={160}
                            height={160}
                            className="rounded-md object-cover"
                          />
                        )}
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            field.onChange(file);
                            setPreview(URL.createObjectURL(file));
                          }}
                        />
                      </Label>
                    )}
                  />
                  {errors.image && (<p className="text-[#E7000A]">{errors.image.message}</p>)}
                </div>

                <Button className="w-full" type="submit">
                  <PlusIcon />
                  Save Product
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
