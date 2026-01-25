import Image from "next/image"
import { Button } from "@/components/ui/button"

const InnerHeader = () => {
  return (
    <header className="flex items-center gap-30">
      <div className="flex gap-1 items-center">
        <Image src="/gebeya-logo.png" alt="logo" width={50} height={100} />
        <h1 className="text-xl font-bold">Gebeya</h1>
      </div>
      <nav className="flex gap-5">
        <Button variant="link">Home</Button>
        <Button variant="link">Sale</Button>
        <Button variant="link">Man</Button>
        <Button variant="link">Woman</Button>
        <Button variant="link">Kids</Button>
      </nav>
    </header>
  )
}

export default InnerHeader
