import Header from "@/components/Header"
import Hero from "@/components/Hero"
import About from "@/components/About";
import Sliders from "@/components/Sliders";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <section className="flex-col gap-5">
      <div className="h-screen p-5">
        <Header />
        <Hero />
      </div>
      <div className="p-5 mb-40">
        <About />
      </div>
      <div className="p-5">
        <WhyChooseUs />
      </div>
      <div className="p-5">
        <Sliders />
      </div>
      <div className="pt-10">
        <Footer />
      </div>
    </section>
  )
}

export default LandingPage
