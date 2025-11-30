import { Button } from "./ui/button"

const CFooter = () => {
  return (
    <section className="mt-10 bg-gray-700 text-white ">
      <div className="p-5 pl-10 flex justify-between items-center">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <h1 className="font-quater text-lg">Gebeya</h1>
            <p className="font-primary text-sm">Everything You Need, All in One Place</p>
          </div>
          <Button>Go To Top</Button>
        </div>

        <div className="flex flex-col gap-1">
          <Button variant="ghost">About Us</Button>
          <Button variant="ghost">Careers</Button>
          <Button variant="ghost">Blog/News</Button>
          <Button variant="ghost">Press & Media</Button>
        </div>

        <div className="flex flex-col gap-1">
          <Button variant="ghost">Terms And Conditons</Button>
          <Button variant="ghost">Privacy Policy</Button>
          <Button variant="ghost">Cookie Policy</Button>
          <Button variant="ghost">Disclaimer</Button>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-secondary-extrabold">Social Media</h1>
          <Button variant="ghost">Telegram</Button>
          <Button variant="ghost">Linked In</Button>
        </div>
      </div>
      <p className="text-center font-primary">
        Designed and Developed by Orca-dev with ❤️ &copy; 2025
      </p>
    </section>
  )
}

export default CFooter
