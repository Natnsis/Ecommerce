import CircularGallery from "./ui/circular-gallery"

const Sliders = () => {
  return (
    <div className="h-[400px] relative">
      <CircularGallery
        items={[
          { image: '/slider/atm.png' },
          { image: '/slider/blockchain.png' },
          { image: '/slider/fintech.png' },
          { image: '/slider/mastercard.png' },
          { image: '/slider/paypal.png' },
          { image: '/slider/store.png' },
          { image: '/slider/visa.png' },
        ]}
      />
    </div>
  )
}

export default Sliders
