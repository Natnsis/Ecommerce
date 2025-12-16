"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
const Chero = () => {
  const router = useRouter();
  return (
    <div className="h-[40vh] slider flex items-center">
      <div className="text-white p-5 flex flex-col gap-5">
        <p className="font-secondary-extrabold text-2xl text-white ">
          find anything you want throughout countless vendors we connect
        </p>
        <div className="flex gap-5 flex-col">
          <h1 className="text-white font-quater mt-5 text-3xl w-[40vw] py-5 leading-relaxed">
            Shop Bigger, And Easiser, Vast Categories and Easy Payments, All In One Place
          </h1>
          <Button className="w-1/4 bg-white text-black font-quater text-sm" variant="ghost" onClick={() => router.push('/CustomerShop')}>Shop Now</Button>
        </div>
      </div>
    </div>
  )
}

export default Chero
