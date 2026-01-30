import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Profile from "./Profile"

const InnerHeader = () => {
  const router = useRouter()
  return (
    <header className="flex items-center gap-30">
      <div className="flex gap-1 items-center">
        <Image src="/gebeya-logo.png" alt="logo" width={50} height={100} />
        <h1 className="text-xl font-bold">Gebeya</h1>
      </div>
      <nav className="flex gap-5">
        <Button variant="link" onClick={() => router.push("/dashboard")}>Home</Button>
        <Button variant="link" onClick={() => router.push("/order")}>Order</Button>
      </nav>
    </header>
  )
}

export default InnerHeader
