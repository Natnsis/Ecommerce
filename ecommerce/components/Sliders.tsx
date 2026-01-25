import CircularGallery from "./ui/circular-gallery"

const Sliders = () => {
  return (
    <div className="h-[400px] relative">
      <CircularGallery
        bend={0}
        borderRadius={0}
        scrollSpeed={3}
        scrollEase={0.05}
        textColor="#E7000A"
        items={[
          { image: '/slider/stripe.png', text: "stripe" },
          { image: '/slider/stripe.png', text: "paypal" },
          { image: '/slider/bitcoin.png', text: "visa" },
          { image: '/slider/discount.png', text: "mastercard" },
          { image: '/slider/stripe.png', text: "supabase" },
          { image: '/slider/stripe.png', text: "vercel" },
          { image: '/slider/stripe.png', text: "discount" },
        ]}
      />
    </div>
  )
}

export default Sliders
