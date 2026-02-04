import { useUser } from "@/app/(root)/context/user";
import { getProducts } from "@/app/conrollers/product.controller";
import { fetchTransactionById } from "@/app/conrollers/transaction.controller";
import { getCustomersCount } from "@/app/conrollers/users.controller";
import { Card, CardContent } from "@/components/ui/card";
import { HandbagSimpleIcon, InvoiceIcon, UserIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query";

const Counts = () => {
  const { data: user } = useUser();
  const { data: userCount, error: countError } = useQuery({
    queryKey: ['user-count'],
    queryFn: getCustomersCount
  });
  if (countError) throw countError

  const { data: orderCount, error: orderError } = useQuery({
    queryKey: ['order-count', user?.id],
    queryFn: () => fetchTransactionById(user?.id!),
    enabled: !!user?.id
  });

  const { data: productCount, error: productError } = useQuery({
    queryKey: ['product-count'],
    queryFn: getProducts
  })

  console.log(productCount?.length);

  return (
    <div className="flex-col flex gap-5 w-full mt-5 md:flex-row">
      <Card className="w-full">
        <CardContent>
          <div className="flex gap-5">
            <div className="bg-[#FF6666] rounded-lg p-2">
              <HandbagSimpleIcon size={32} color="white" weight="fill" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{orderCount?.length}</h1>
              <p className="text-gray-700">Total Order</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent>
          <div className="flex gap-5">
            <div className="bg-[#FF6666] rounded-lg p-2">
              <UserIcon size={32} color="white" weight="fill" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userCount}</h1>
              <p className="text-gray-700">Number Of Customers</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent>
          <div className="flex gap-5">
            <div className="bg-[#FF6666] rounded-lg p-2">
              <InvoiceIcon size={32} color="white" weight="fill" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{productCount?.length}</h1>
              <p className="text-gray-700">Number Of Products</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Counts
