import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

const DiscoverCards = () => {
  return (
    <div className="mt-10">
      <div className="grid grid-cols-4 gap-5 px-5">
        <Card className="px-3 h-fit">
          <div className="text-center">Most Loved Travel Essentials</div>
          <div className="grid grid-cols-2 p-2">
            <img src="/travel/travel1.jpg" className="h-40 w-40" />
            <img src="/travel/travel2.jpg" className="h-40 w-40" />
            <img src="/travel/travel3.jpg" className="h-40 w-40" />
            <img src="/travel/travel4.jpg" className="h-40 w-40" />
          </div>
          <div className="flex justify-end"><Button>Discover More<ArrowUpRight /></Button></div>
        </Card>

        <Card className="px-3 h-fit">
          <div className="text-center">Elivate your electronics</div>
          <div className="grid grid-cols-2 p-2">
            <img src="/electronics/electron1.jpg" className="h-40 w-40" />
            <img src="/electronics/electron2.jpg" className="h-40 w-40" />
            <img src="/electronics/electron3.jpg" className="h-40 w-40" />
            <img src="/electronics/electron4.jpg" className="h-40 w-40" />
          </div>
          <div className="flex justify-end"><Button>Discover More<ArrowUpRight /></Button></div>
        </Card>

        <Card className="px-3 h-fit">
          <div className="text-center">Gaming Merchendize</div>
          <div className="grid grid-cols-2 p-2">
            <img src="/gaming/gaming1.jpg" className="h-40 w-40" />
            <img src="/gaming/gaming2.jpg" className="h-40 w-40" />
            <img src="/gaming/gaming3.jpg" className="h-40 w-40" />
            <img src="/gaming/gaming4.jpg" className="h-40 w-40" />
          </div>
          <div className="flex justify-end"><Button>Discover More<ArrowUpRight /></Button></div>
        </Card>

        <Card className="px-3 h-fit">
          <div className="text-center">Deals on Fasion</div>
          <div className="grid grid-cols-2 p-2">
            <img src="/cloths/cloth1.jpg" className="h-40 w-40" />
            <img src="/cloths/cloth2.jpg" className="h-40 w-40" />
            <img src="/cloths/cloth3.jpg" className="h-40 w-40" />
            <img src="/cloths/cloth4.jpg" className="h-40 w-40" />
          </div>
          <div className="flex justify-end"><Button>Discover More<ArrowUpRight /></Button></div>
        </Card>

      </div>
    </div>
  )
}

export default DiscoverCards
