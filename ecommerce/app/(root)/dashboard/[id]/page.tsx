"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ShoppingBagOpenIcon, StarIcon } from "@phosphor-icons/react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getProductWithId } from "@/app/conrollers/product.controller"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { AddToCart } from "@/app/conrollers/cart.controller"
import { useUser } from "../../context/user"

const detail = () => {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [userId, setUserId] = useState("")
  const { id } = useParams()
  const [carting, setCarting] = useState(false)
  const { data: user, isLoading } = useUser()
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductWithId(Number(id)),
    enabled: !!id
  });

  useEffect(() => {
    if (!isLoading && user) {
      setUserId(user.id)
    } else if (!isLoading && !user) {
      console.log("No user found");
    }
  }, [user, isLoading]);

  const addToCart = async () => {
    try {
      if (productLoading) {
        toast.loading('Wait a bit');
        return;
      }
      if (!user?.id) {
        toast.error("User data not found");
        return;
      }
      if (!product) {
        console.error("Product object is missing");
        return;
      }
      setCarting(true)
      await AddToCart({
        product_id: product.id,
        user_id: user?.id!,
        quantity,
        sum: product.price * quantity
      })
      toast.success("product added to cart")
      setCarting(false)
    } catch (error) {
      console.error("Add to Cart Error:", error);
      throw error
    }
  };

  return (
    <main className="h-screen p-5">
      <Button onClick={() => router.back()}>
        <ArrowLeftIcon size={20} />
        <p>Go back</p>
      </Button>
      <section className="flex gap-5 h-[90vh] mt-10">
        <div className="bg-white p-10 w-1/2 h-[80vh] flex items-center justify-center">
          <img
            src={product?.url ? product?.url : "/product-placeholder.png"}
            alt="product-img"
            width={400}
            height={500}
            className="max-h-full w-auto object-contain"
          />
        </div>
        <div className="p-10 w-1/2 flex flex-col justify-center gap-3">
          <h1 className="text-5xl font-extrabold mb-2">
            {product?.name ? product?.name : "Product Name"}
          </h1>
          <div className="flex gap-2 items-center">
            <StarIcon color="#f6d32d" weight="fill" size={30} />
            <p className="text-lg font-bold">5</p>
            <p className="text-gray-700 dark:text-gray-300">(based on {product?.reviews} reviews)</p>
          </div>
          <p className="text-gray-600 text-sm dark:text-gray-300">
            {product?.description ? product?.description : "the product description will be here-"}
          </p>
          <div>
            <p>${product?.price ? product?.price : "1234-"}/product</p>
          </div>
          <div className="flex gap-5">
            <Input placeholder="Quantity"
              className="w-2/5"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
            <Button
              className="w-3/5"
              onClick={addToCart}
              disabled={carting}>
              {carting ? "Adding to Cart..." : "Add to cart"}
              <ShoppingBagOpenIcon size={44} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default detail 
