"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeftIcon, PlusIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { Select, SelectTrigger, SelectItem, SelectValue, SelectContent } from "@/components/ui/select"

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Toys & Games",
  "Beauty",
  "Sports",
];

const page = () => {
  const router = useRouter()
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
            <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Product name" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" type="number" placeholder="0.00" min="0" step="0.01" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketPrice">Market Price</Label>
                    <Input id="marketPrice" type="number" placeholder="0.00" min="0" step="0.01" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue="">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us more about the product..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div
                  className="flex flex-col items-center justify-center 
                  p-6 border-2 border-dashed rounded-lg bg-muted/30 
                  hover:bg-muted/50 transition-colors">
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2 text-center"
                  >
                    <div className="text-sm font-medium">Upload Image</div>
                    <div className="text-xs text-muted-foreground">
                      Click to browse or drag & drop
                    </div>
                    <Input
                      id="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                    />
                  </Label>
                </div>

                <Button className="w-full">
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
