import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card"

const About = () => {
  return (
    <section className="ml-20">
      <div className="flex w-full flex-col-reverse md:flex-row">
        <div>
          <Image src="/about.png" alt="about-image" width={600} height={200} className="" />
        </div>
        <div className="px-10 w-[70vw]">
          <h1 className="text-4xl">About Us</h1>
          <p className="text-gray-600 dark:text-gray-400">At Gebeya, we believe shopping should be simple, enjoyable, and tailored to you. Our mission is to bring you high-quality products at unbeatable prices, all in one convenient online store.</p>
          <div className="flex-row gap-3 md:flex">
            <Card className="mt-5">
              <CardContent>
                <h1 className="mt-3">Who We Are</h1>
                <p>We are a passionate team of professionals dedicated to making your shopping experience seamless. From sourcing the best products to providing excellent customer service, we strive to ensure that every interaction leaves you satisfied.</p>
              </CardContent>
            </Card>

            <Card className="mt-5">
              <CardContent>
                <h1 className="mt-3">Our Vision</h1>
                <p>We aim to become your go-to online destination, making everyday shopping effortless and enjoyable. Whether you’re looking for trendy products, essentials, or gifts, [Your Shop Name] is here to provide a seamless experience.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
