import { landingProducts } from "@/assets/constants"
import { Button } from "./ui/button"

const ForYou = () => {
  return (
    <div>
      <div className="flex justify-between px-25">
        <div>
          <h1 className="font-quater text-lg">Todays For You!</h1>
        </div>
        <div className="flex gap-5">
          <Button>Best Sold</Button>
          <Button variant="outline">Special Discount</Button>
          <Button variant="outline">Coverted Products</Button>
          <Button variant="outline">Official Store</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 mt-5 px-25">
        {landingProducts.map((p, index) => (
          <div key={index} className="h-60 m-5 border rounded-lg">
            <img src={p.img} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ForYou
