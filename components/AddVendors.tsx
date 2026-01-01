"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const AddVendors = () => {
  const router = useRouter()
  const supabase = createClient();
  const [url, setUrl] = useState(null)
  const [image, setImage] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(false)

  //TODO:i add vendor with image
  const signUpVendors = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast("both passwords are not the same")
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
  }

  console.log(image)
  //FIXME: fix the typeing error
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setUrl(URL.createObjectURL(file))
    setImage(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  })

  console.log(image)
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
                <Input
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>

              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 flex gap-5 w-full">
              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Confirm</label>
                <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 flex gap-5 w-full">
            </div>

            <h1 className="font-primary text-gray-400 mt-5">Personal Data</h1>
            <div className="mt-2 flex gap-5 w-full">
              <div className="w-full">
                <label className="font-primary" htmlFor="fName">P.No</label>
                <Input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="w-full">
                <label className="font-primary" htmlFor="fName">Address</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-5">
              <h1 className="font-primary text-gray-400 mt-5 mb-2">What the Vendor Sells</h1>
              <div className="flex gap-10">
                <Select onValueChange={(value) => setCategory(value)}>
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
                <Button onClick={signUpVendors}>Submit</Button>
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
