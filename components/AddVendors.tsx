"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"
import { useDropzone } from "react-dropzone"

const AddVendors = () => {
  const router = useRouter()
  const [image, setImage] = useState(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  })
  return (
    <section className="h-screen w-screen p-10">
      <div className="border rounded-lg p-5 h-full">
        <div className="flex justify-between">
          <h1 className="font-quater text-xl">Add Vendors</h1>
          <Button onClick={() => router.push('/AdminDashboard')}>Go Back</Button>
        </div>
        <div className="grid grid-cols-5 gap-5 w-full justify-between">
          <div className="col-span-3 px-5 rounded">
            <h1 className="font-primary text-gray-400">fill out the following fields</h1>
            <div className="mt-5 flex gap-5 w-full">
              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Full Name</label>
                <Input name="fName" />
              </div>
              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Email</label>
                <Input name="fName" type="email" />
              </div>
            </div>
            <div className="mt-5 flex gap-5 w-full">
              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Password</label>
                <Input name="fName" type="password" />
              </div>

              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Confirm</label>
                <Input name="fName" type="password" />
              </div>
            </div>

            <div className="mt-5 flex gap-5 w-full">
            </div>

            <h1 className="font-primary text-gray-400 mt-5">Personal Data</h1>
            <div className="mt-2 flex gap-5 w-full">
              <div className="w-full">
                <label className="font-primary" htmlFor="fName">P.No</label>
                <Input name="fName" type="number" />
              </div>

              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Address</label>
                <Input name="fName" type="password" />
              </div>
            </div>

            <div className="mt-5">

              <h1 className="font-primary text-gray-400 mt-5 mb-2">What the Vendor Sells</h1>
              <div className="flex gap-10">
                <Select>
                  <SelectTrigger className="w-[180px]">
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
                <Button>Submit</Button>
              </div>
            </div>
          </div>
          <div className="border p-5 rounded col-span-2 mt-5 h-fit rounded">
            <h1 className="font-primary text-gray-400">Select Image For Profile Picture</h1>
            <div>
              <div
                {...getRootProps()}
                className="border-2 border-dashed p-6 rounded-md text-center cursor-pointer h-1/2"
              >
                <input {...getInputProps()} />

                {isDragActive
                  ? <p>Drop the image here…</p>
                  : <p>Drag & drop an image here, or click to select</p>}
              </div>
              {image && (
                <img
                  src={image}
                  className="mt-4 w-48 h-48 object-cover rounded-md"
                  alt="preview"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddVendors
