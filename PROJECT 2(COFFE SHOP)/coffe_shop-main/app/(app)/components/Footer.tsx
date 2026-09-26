'use client'
import Image from "next/image"
import { Playfair_Display, Poppins } from "next/font/google"
import Link from "next/link"
import { useEffect, useState } from "react"
import Info from "@/app/types/info"

const playfairdisplay = Playfair_Display({
  subsets: ["latin"],
})
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
})

export default function Footer() {
  const [data,setData] = useState<Info[]>([{} as Info])

  useEffect(()=>{
    const fetchData = async ()=>{
      const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/info`)
      const res = await endpoint.json()
      setData(res)
    }
    fetchData()
  },[])
  return (
    <footer id="contacts" className="bg-[#2D2420] text-[#EDE8E1] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className={`${playfairdisplay.className} text-4xl md:text-5xl font-bold mb-12 text-center md:text-left`}>
          Midnight Cafe
        </h2>

        <div className={`${poppins.className} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12`}>
          {/* Privacy Column */}
          <ul className="space-y-3 *:hover:text-[#C4A574] *:text-sm  *:transition-colors *:cursor-pointer">
            <li className="font-bold  text-sm tracking-wider mb-4 text-[#C4A574] ">PRIVACY</li>
            <li className="">Terms of use</li>
            <li className="">Privacy policy</li>
            <li className="">Cookies</li>
          </ul>

          {/* Services Column */}
          <ul className="space-y-3 *:hover:text-[#C4A574] *:text-sm  *:transition-colors *:cursor-pointer">
            <li className="font-bold text-sm tracking-wider mb-4 text-[#C4A574]">SERVICES</li>
            <li className="">Shop</li>
            <li className="">Order ahead</li>
            <Link href={'/products'}>
              <li className="">Menu</li>
            </Link>
          </ul>

          {/* About Us Column */}
          <ul className="space-y-3 *:hover:text-[#C4A574] *:text-sm  *:transition-colors *:cursor-pointer">
            <li className="font-bold text-sm tracking-wider mb-4  text-[#C4A574]">ABOUT US</li>
            <Link href={'/about'}>
              <li className="mb-3">Find a location</li>
            </Link>
            <Link href={'/about'}>
              <li className="mb-3">About us</li>
            </Link>
            <Link href={'/about'}>
              <li className="mb-3">Our story</li>
            </Link>
          </ul>

          {/* Information Column */}
          <ul className="space-y-3 *:hover:text-[#C4A574] *:text-sm  *:transition-colors *:cursor-pointer">
            <li className="font-bold text-sm tracking-wider mb-4  text-[#C4A574]">INFORMATION</li>
            <Link href={`tel:${data[0].phone}`}>
              <li className="">Jobs</li>
            </Link>
          </ul>

          {/* Social Media Column */}
          <ul className="space-y-3 col-span-2 md:col-span-3 lg:col-span-1">
            <li className="font-bold text-sm tracking-wider mb-4 text-[#C4A574]">SOCIAL MEDIA</li>
            <li className="flex gap-4 items-center">
              <Link href={'https://www.linkedin.com'}>
                <Image
                src={"/linkedin.png"}
                alt="linkedin"
                width={32}
                height={32}
                className="hover:opacity-70 transition-opacity cursor-pointer"
              /></Link>
              <Link href={'https://www.facebook.com'}>
              <Image
                src={"/gg_facebook.png"}
                alt="facebook"
                width={32}
                height={32}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                />
                </Link>
                <Link href={'https://www.twitter.com'}>
              <Image
                src={"/prime_twitter.png"}
                alt="twitter"
                width={32}
                height={32}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                />
                </Link>
              <Link href={'https://www.instgram.com'}>
              <Image
                src={"/instagram.png"}
                alt="instagram"
                width={32}
                height={32}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                />
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
