import { ArrowRightLeft, ShoppingBasket, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const VCards = () => {
  return (
    <div className="w-full flex justify-between gap-5">

      <div className="border mt-5 py-2 px-2 rounded-lg w-full">
        <div className="flex justify-between mb-3">
          <div>
            <h1 className="font-secondary-extrabold text-4xl">500</h1>
            <p className="font-primary text-sm">Total Users</p>
          </div>
          <Users />
        </div>
        <Badge variant="secondary">+5.9%</Badge>
      </div>

      <div className="border mt-5 py-2 px-2 rounded-lg w-full">
        <div className="flex justify-between mb-3">
          <div>
            <h1 className="font-secondary-extrabold text-4xl">50</h1>
            <p className="font-primary text-sm">Total Transactions</p>
          </div>
          <ArrowRightLeft />
        </div>
        <Badge variant="secondary">+9.3%</Badge>
      </div>


      <div className="border mt-5 py-2 px-2 rounded-lg w-full">
        <div className="flex justify-between mb-3">
          <div>
            <h1 className="font-secondary-extrabold text-4xl">324</h1>
            <p className="font-primary text-sm">Available Products</p>
          </div>
          <ShoppingBasket />
        </div>
        <Badge variant="secondary">+3.2%</Badge>
      </div>


      <div className="border mt-5 py-2 px-2 rounded-lg w-full">
        <div className="flex justify-between mb-3">
          <div>
            <h1 className="font-secondary-extrabold text-4xl">4.5</h1>
            <p className="font-primary text-sm">Rating</p>
          </div>
          <Star />
        </div>
        <Badge variant="secondary">Good</Badge>
      </div>

    </div>
  )
}

export default VCards
