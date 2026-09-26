"use client"
import product from "@/app/types/product"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {Playfair_Display , Poppins } from "next/font/google"
// import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const playfairdisplay = Playfair_Display({
  subsets:['latin'],
})
const poppins = Poppins({
  weight: ['400','700'],
})

export default function CoffeeCarousel({title}:{title:string}) {

  // const coffeeProducts = [
  //   {
  //     id: 1,
  //     name: "Latte",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,",
  //     price: 2.5,
  //     image_url: "/drinks/d2.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Black Coffee",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,",
  //     price: 2.75,
  //     image_url: "/drinks/d3.png",
  //   },
  //   {
  //     id: 3,
  //     name: "Espresso",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,",
  //     price: 1.5,
  //     image_url: "/drinks/d4.png",
  //   },
  //   {
  //     id: 4,
  //     name: "Regular Coffee",
  //     description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit,",
  //     price: 2,
  //     image_url: "/drinks/d5.png",
  //   }

  // ]
  const [coffeeProducts,setCoffeeProducts] = useState<product[]>()
  useEffect(()=>{
    const fetchData  = async ()=>{
      const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/product/${title}`)
      const res = await endpoint.json()
      setCoffeeProducts(res)
    }
    fetchData()
  },[title])
  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`${title}`)
    if (container) {
      const scrollAmount = 340
      if (direction === "left") {
        container.scrollLeft -= scrollAmount
      } else {
        container.scrollLeft += scrollAmount
      }
    }
  }

  return (
    <div className="h-full pb-16 px-4 bg-[#f4f1eb]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className={`text-2xl text-center mb-12 text-SecondarySection tracking-wide font-semibold uppercase ${playfairdisplay.className}`}>OUR SPIECIAL {title}</h1>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-4 bg-[#d4cfc4] hover:bg-[#c4bfb4] rounded-full p-3 shadow-lg transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-[#2b2520]" />
          </button>

          {/* Cards Container */}
          <div
            id={`${title}`}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {coffeeProducts?.map((product) => (
              <div key={product.id} className="flex-none w-80 snap-center cursor-pointer">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API}/${product.image_url}`}
                      alt={product.name}
                      height={10000}
                      width={10000}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold text-SecondarySection mb-2 ${poppins.className}`}>{product.name}</h3>
                    <p className={`text-SecondarySection font-semibold text-sm leading-relaxed mb-6 ${poppins.className}`}>{product.description}</p>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xl font-bold text-SecondarySection ${poppins.className}`}>{product.price} $</span>
                      <Link href={`/products/${product.id}?type=${title}`} className="bg-[#2b1810] hover:bg-[#1f0f08] text-white px-6 py-2 rounded-lg transition-colors">
                        More Information
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-4 bg-[#d4cfc4] hover:bg-[#c4bfb4] rounded-full p-3 shadow-lg transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-[#2b2520]" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
