"use client"
import InnerHeader from "@/components/InnerHeader"
import Profile from "@/components/Profile"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/constant"
import Image from "next/image"

const order = () => {
  return (
    <main className="p-5">
      <div className="flex justify-between items-center">
        <InnerHeader />
        <Profile />
      </div>
      <section className="px-20 pt-10">
        <h1 className="text-4xl">Ordered Summary</h1>
        <div className="h-[75vh] p-5">
          {products.map((p, index) => (
            <Card key={index} className="mb-5">
              <CardContent className="flex justify-between">
                <div className="flex gap-5">
                  <div className="bg-gray-200 p-3 rounded-lg h-20">
                    <Image src={p.img} width={100} height={50} alt="img" className="fill" />
                  </div>
                  <div>
                    <h1 className="text-lg">{p.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400">Forest Green</p>
                    <div className="flex gap-4">
                      <p>${p.price}</p>
                      <s>${p.former}</s>
                    </div>
                  </div>
                </div>
                <div>

                </div>
                <div className="flex items-end">
                  x1
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

export default order 
