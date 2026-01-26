"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()
  return (
    <main className="p-5">
      <Button onClick={() => router.back()}>
        <ArrowLeftIcon />
        <p>Back</p>
      </Button>
      <section className="h-[90vh]">
        <div className="h-full w-full flex items-center justify-center">
          blah blah
        </div>
      </section>
    </main>
  )
}

export default page
