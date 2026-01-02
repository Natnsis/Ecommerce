"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorInputs, vendorType } from "@/app/schema/vendorSchema";

const AddVendors = () => {
  const router = useRouter();
  const supabase = createClient();
  const [url, setUrl] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<vendorType>({
    resolver: zodResolver(vendorInputs),
  });

  const category = watch("category");

  const signUpVendors = async (data: vendorType) => {
    setLoading(true);
    try {
      console.log("Form Data Submitted:", {
        ...data,
        profileImage: image ? image.name : null,
        imageFile: image,
      });

      // TODO: Upload image to Supabase Storage + save vendor data
      // Example:
      // if (image) {
      //   const { data: uploadData, error } = await supabase.storage
      //     .from('vendor-images')
      //     .upload(`public/${image.name}`, image);
      // }

      toast.success("Vendor added successfully!");
    } catch (error) {
      console.error("Error adding vendor:", error);
      toast.error("Failed to add vendor");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setUrl(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: false,
  });

  return (
    <section className="h-screen w-screen p-10">
      <div className="border rounded-lg p-5 h-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-quater text-xl">Add Vendors</h1>
          <Button onClick={() => router.push("/AdminDashboard")} variant="outline">
            Go Back
          </Button>
        </div>

        <form onSubmit={handleSubmit(signUpVendors)} className="grid grid-cols-5 gap-5">
          <div className="col-span-3 px-5">
            <h1 className="font-primary text-gray-400 mb-4">
              Fill out the following fields
            </h1>

            {/* Full Name & Email */}
            <div className="flex gap-5 mb-5">
              <div className="w-full">
                <label className="font-primary block mb-1">Full Name</label>
                <Input {...register("fullName")} placeholder="John Doe" />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>
              <div className="w-full">
                <label className="font-primary block mb-1">Email</label>
                <Input {...register("email")} type="email" placeholder="john@example.com" />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="flex gap-5 mb-5">
              <div className="w-full">
                <label className="font-primary block mb-1">Password</label>
                <Input type="password" {...register("password")} />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <div className="w-full">
                <label className="font-primary block mb-1">Confirm Password</label>
                <Input type="password" {...register("confirm")} />
                {errors.confirm && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirm.message}</p>
                )}
              </div>
            </div>

            {/* Personal Data */}
            <h1 className="font-primary text-gray-400 mt-8 mb-3">Personal Data</h1>
            <div className="flex gap-5 mb-5">
              <div className="w-full">
                <label className="font-primary block mb-1">Phone Number</label>
                <Input type="tel" {...register("phone")} placeholder="+1234567890" />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div className="w-full">
                <label className="font-primary block mb-1">Address</label>
                <Input {...register("adress")} placeholder="123 Main St, City" />
                {errors.adress && (
                  <p className="text-red-500 text-sm mt-1">{errors.adress.message}</p>
                )}
              </div>
            </div>

            {/* Category Selection */}
            <h1 className="font-primary text-gray-400 mt-8 mb-3">
              What the Vendor Sells
            </h1>
            <div className="flex gap-6 items-end">
              <div>
                <label className="font-primary block mb-1">Category</label>
                <Select
                  value={category}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>

              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Vendor"}
              </Button>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="border p-6 rounded-lg col-span-2 h-fit">
            <h1 className="font-primary text-gray-400 mb-4">
              Select Image For Profile Picture
            </h1>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer transition hover:border-gray-400"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-gray-600">Drop the image here...</p>
              ) : (
                <p className="text-gray-500">
                  Drag & drop an image here, or click to select
                </p>
              )}
            </div>

            {url && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={url}
                  alt="Profile preview"
                  className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg border-4 border-white"
                />
                <p className="text-sm text-gray-500 mt-2">{image?.name}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddVendors;
