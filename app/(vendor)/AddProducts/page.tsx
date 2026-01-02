"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/app/schema/productSchema";

const AddProducts = () => {
  const router = useRouter();
  const supabase = createClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
    },
  });

  const category = watch("category");

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: false,
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        toast.error("You must be logged in as a vendor");
        router.push("/login");
        return;
      }

      let imageUrl: string | null = null;
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("Images")
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from("Images").getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const price = Number(data.price);
      const stock = Number(data.stock);
      console.log(price, stock)
      const { error: insertError } = await supabase.from("products").insert({
        vendor_id: user.id,
        name: data.name,
        description: data.description || null,
        price,
        stock,
        category: data.category,
        image_url: imageUrl,
      });

      if (insertError) throw insertError;

      toast.success("Product added successfully!");
      router.push("/VendorProduct");
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast.error(error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="h-fit w-[90vw] border rounded-lg flex gap-5 justify-between py-5">
        <div className="h-full w-full">
          <div className="p-5 flex justify-between">
            <h1 className="text-xl font-quater">Add Products</h1>
            <Button onClick={() => router.push("/VendorProduct")}>Back</Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-10 pb-10 font-primary flex flex-col gap-5">
            <div>
              <label htmlFor="name">Name Of Product</label>
              <Input {...register("name")} placeholder="e.g. Fresh Red Apples" />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="description">Note About The Product</label>
              <Textarea {...register("description")} placeholder="Describe your product..." rows={4} />
            </div>

            <div className="flex gap-5">
              <div className="flex-1">
                <label htmlFor="price">Price (in Dollar)</label>
                <Input {...register("price")} type="number" step="0.01" placeholder="9.99" />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
              </div>
              <div className="flex-1">
                <label htmlFor="stock">Available In Stock</label>
                <Input {...register("stock")} type="number" placeholder="50" />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
              </div>
            </div>
          </form>
        </div>

        {/* Right Side - Image, Category, Buttons */}
        <div className="w-full flex flex-col gap-5 px-5 h-fit">
          <div className="w-full mt-10">
            <div className="border p-5 rounded">
              <h1 className="font-primary text-gray-400">Select Image For Product</h1>
              <div>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed p-6 rounded-md text-center cursor-pointer h-1/2"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the image here…</p>
                  ) : (
                    <p>Drag & drop an image here, or click to select</p>
                  )}
                </div>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="mt-4 w-48 h-48 object-cover rounded-md mx-auto"
                    alt="Product preview"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="border p-5 font-primary rounded-lg">
              <h1 className="text-lg mb-3">Category</h1>
              <Select
                value={category || ""}
                onValueChange={(value) => setValue("category", value, { shouldValidate: true })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div className="flex items-center gap-5 mt-10 justify-end">
              <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
                {loading ? "Adding..." : "Submit"}
              </Button>
              <Button variant="outline" onClick={() => router.push("/VendorProduct")}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProducts;
