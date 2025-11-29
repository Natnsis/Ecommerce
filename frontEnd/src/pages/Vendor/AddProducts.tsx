import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { useNavigate } from "react-router-dom"

const AddProducts = () => {
  const navigate = useNavigate()

  const [image, setImage] = useState(null)

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0]
    setImage(URL.createObjectURL(file))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  })
  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <div className="h-fit w-[90vw] border rounded-lg flex gap-5 justify-between py-5">

        {/*left side*/}
        <div className="h-full w-full">
          <div className="p-5 flex justify-between">
            <h1 className="text-xl font-quater">Add Products</h1>
            <Button onClick={() => navigate('/vproduct')}>Back</Button>
          </div>
          <div className="px-10 pb-10 font-primary flex flex-col gap-5">
            <div>
              <label htmlFor="name">Name Of Product</label>
              <Input className="" name="name" />
            </div>

            <div>
              <label htmlFor="name">Note About The Product</label>
              <Textarea className="" name="name" />
            </div>

            <div className="flex gap-5">
              <div>
                <label htmlFor="name">Price (in Dollar)</label>
                <Input className="" name="name" type="number" />
              </div>


              <div>
                <label htmlFor="name">Available In Stock</label>
                <Input className="" name="name" type="number" />
              </div>
            </div>

          </div>
        </div>

        {/* right side */}
        <div className="w-full flex flex-col gap-5 px-5 h-fit">
          <div className="w-full mt-10" >
            <div className="border p-5 rounded col-span-2 mt-5 h-fit rounded">
              <h1 className="font-primary text-gray-400">Select Image For Product</h1>
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
          <div className="w-full">
            <div className="border p-5 font-primary rounded-lg">
              <h1 className="text-lg mb-3">Category</h1>
              <Select>
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
            </div>

            <div className="flex items-center gap-5 mt-10 justify-end">
              <Button>Submit</Button>
              <Button variant="outline">Cacel</Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default AddProducts
