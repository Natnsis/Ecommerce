import { Linkedin, Send, Twitter } from "lucide-react"
import { Button } from "./ui/button"

const Footer = () => {
  return (
    <footer className="bg-gray-800 h-60 p-5 text-white flex flex-col justify-between">
      <div className="flex gap-10">
        <div className="pl-10 pt-5 w-[40vw] flex flex-col justify-between">
          <div>
            <h1 className="font-quater font-extrabold text-xl">Gebeya</h1>
            <p className="text-md font-primary">"lets shop beyond boundaries"</p>
          </div>
          <div className="flex gap-5">
            <Button size="icon">
              <Linkedin />
            </Button>
            <Button size="icon">
              <Twitter />
            </Button>
            <Button size="icon">
              <Send />
            </Button>
          </div>
        </div>

        <div className="flex justify-between w-full px-20">
          <div className="flex flex-col">
            <h1 className="font-secondary-regular">Gebeya</h1>
            <Button variant="ghost" className="font-primary mt-2">About Gebeya</Button>
            <Button variant="ghost" className="font-primary mt-2">Developers</Button>
            <Button variant="ghost" className="font-primary mt-2">Adminstration</Button>
          </div>

          <div className="flex flex-col">
            <h1 className="font-secondary-regular">Buy</h1>
            <Button variant="ghost" className="font-primary mt-2">Discounts</Button>
            <Button variant="ghost" className="font-primary mt-2">Recent Added</Button>
            <Button variant="ghost" className="font-primary mt-2">Buy one + 1</Button>
          </div>

          <div className="flex flex-col">
            <h1 className="font-secondary-regular">Guide & Help</h1>
            <Button variant="ghost" className="font-primary mt-2">Teams and Support</Button>
            <Button variant="ghost" className="font-primary mt-2">Privacy</Button>
          </div>
        </div>
      </div>

      <p className="text-center font-primary text-sm">
        Designed and Developed by Orca-Dev with ❤️ &copy; 2025
      </p>
    </footer>
  )
}

export default Footer
