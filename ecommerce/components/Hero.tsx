"use client"
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ShoppingBagIcon } from "@phosphor-icons/react"

const Hero = () => {
  return (
    <main className="w-full flex justify-between mt-10 h-3/4">
      <div className="flex flex-col justify-center">
        <div className="pl-20">
          <h1 className="text-5xl font-extrabold mb-2">Discover Your Perfect Products</h1>
          <p className="text-gray-500 w-4/5 mb-5 dark:text-gray-400">
            We bring you the best quality products at unbeatable prices.
            Your satisfaction is our priority.
          </p>
        </div>
        <Card className="ml-20 w-3/5">
          <CardContent>
            <p className="text-center">Browse our wide range of categories and enjoy exclusive offers every week. Fast shipping and easy returns make shopping effortless.</p>
            <div className="mt-5 flex justify-center w-full gap-5">
              <Button>Learn More <ArrowRightIcon size={32} /></Button>
              <Button variant="outline">Shop Now  <ShoppingBagIcon size={32} /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="pr-20">
        <Image src="/hero.png" alt="hero-img" width={400} height={400} />
      </div>
    </main>
  )
}

export default Hero
