"use client"
import { Button } from "@/components/ui/button";
import { FacebookLogoIcon, TwitterLogoIcon, TelegramLogoIcon } from "@phosphor-icons/react";
import Image from "next/image";
import CopyRight from "@/components/CopyRight"

const Footer = () => {
  return (
    <footer className="pt-10 px-20">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 items-center">
            <Image src="/gebeya-logo.png" alt="footer-log" width={50} height={300} />
            <h1 className="text-lg font-bold">Gebeya</h1>
          </div>
          <p className="w-[40vw] text-sm pl-3 text-gray-600 dark:text-gray-400">
            We’re committed to delivering quality products, secure payments, and a smooth shopping experience. From browsing to checkout, our goal is to make online shopping simple, reliable, and enjoyable for everyone.
          </p>
          <div className="pl-3 flex gap-2">
            <Button><FacebookLogoIcon size={96} /></Button>
            <Button><TwitterLogoIcon size={96} /></Button>
            <Button><TelegramLogoIcon size={96} /></Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mr-20">
          <Button variant="link">HOME</Button>
          <Button variant="link">ABOUT</Button>
          <Button variant="link">HELP</Button>
          <Button variant="link">CONTACT US</Button>
        </div>
      </div>
      <CopyRight />
    </footer>
  )
}

export default Footer
