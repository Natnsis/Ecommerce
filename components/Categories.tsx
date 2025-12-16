import { landingCards } from "@/assets/style"

const Categories = () => {
  return (
    <div className="mt-10 px-15 border-y py-10 flex justify-between font-primary mb-10">
      <div>
        <img src="/electronics.jpg" className={landingCards} />
        <p className="text-center">Electonics</p>
      </div>
      <div>
        <img src="/cloths.jpg" className={landingCards} />
        <p className="text-center">Cloths</p>
      </div>
      <div>
        <img src="/construction.jpg" className={landingCards} />
        <p className="text-center">Tools</p>
      </div>
      <div>
        <img src="/beauty.jpg" className={landingCards} />
        <p className="text-center">Beauty</p>
      </div>
      <div>
        <img src="/food.jpg" className={landingCards} />
        <p className="text-center">Food</p>
      </div>
      <div>
        <img src="/automotive.jpg" className={landingCards} />
        <p className="text-center">Automotives</p>
      </div>
    </div>

  )
}

export default Categories
