import { bestSelling, landingProducts } from "@/assets/constants"
import { Button } from "./ui/button"

const ForYou = () => {
  return (
    <div>
      <div className="flex justify-between px-25">
        <div>
          <h1 className="font-quater text-lg">Todays For You!</h1>
        </div>
        <div className="flex gap-5">
          <Button>Best Sold</Button>
          <Button variant="outline">Special Discount</Button>
          <Button variant="outline">Coverted Products</Button>
          <Button variant="outline">Official Store</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 mt-5 px-25 border-b">
        {landingProducts.map((p, index) => (
          <div key={index} className="h-[40vh] m-5 border rounded-lg">
            <img src={p.img} className="w-full h-[25vh] rounded-lg" />
            <div className="px-5">
              <h1 className="font-secondary-extrabold">
                {p.title}
              </h1>
              <p className="font-primary">{p.type}</p>
              <p className="font-primary">Birr:<span className="text-red-400 font-secondary-extrobold">{p.price}</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="py-5">
        <h1 className="text-2xl font-secondary-extrabold text-center">
          Best Selling Store
        </h1>
        <div className="grid grid-cols-3 px-20 mt-5 w-full">
          <div className="h-[30vh] w-[20vw] col-span-1">
            <img src="/cloths.jpg" />
            <h1 className="text-secondary-bold text-lg capitalize">
              bell mall shop
            </h1>
          </div>
          <div className="grid grid-cols-2 w-full col-span-2 gap-10">
            {bestSelling.map((p, index) => (
              <div className="rounded-lg border p-5" key={index}>
                <div className="flex gap-5 items-center font-secondary-extrabold text-lg">
                  <img src={p.pfp} className="w-15 rounded-full" />
                  <div>
                    <h1>{p.name}</h1>
                    <p className="font-secondary text-sm">"{p.note}"</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5 mt-5">
                  {p.products.map((n, index) => (
                    <div key={index} className="col-span-1">
                      <img src={n.img} className="rounded-lg h-15 w-20" />
                      <p className="font-bold mt-2">Birr:{n.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-40">
        <div className="bg-[url('/footer.jpg')] bg-no-repeat bg-[length:100%_100%] h-40 w-full flex justify-center items-center">
          <h1 className="text-white font-secondary-extrabold font-secondary-extrabold font-secondary-extrabold text-5xl">"<span className="text-gray-400">Let's</span> Shop Beyond Boundaries"</h1>
        </div>
      </div>
    </div>
  )
}

export default ForYou
