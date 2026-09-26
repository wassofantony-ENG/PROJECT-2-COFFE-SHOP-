"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {Are_You_Serious, Playfair_Display } from "next/font/google"
import GallaryI from "@/app/types/gallartItem"

const playfairdisplay = Playfair_Display({
  subsets : ['latin']
})


export default function CoffeeDessertGallery() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "coffee" | "desserts">("all")

  const [galleryItems , setGalleryItems] = useState<GallaryI[]>([{} as GallaryI])
  const filteredItems =
    selectedCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

    useEffect(()=>{
      const fetchData = async () => {
        const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/gallary`)
        const res = await endpoint.json()
        setGalleryItems(res)
      }
      fetchData()
    },[])
  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      {/* Hero Section */}
      <div className="relative h-fit overflow-hidden">
        <div className=" flex flex-col items-center justify-center text-center px-4">
          <h1 className={ `text-2xl text-center text-SecondarySection tracking-wide font-semibold ${playfairdisplay.className}`}>
            GALLERY
          </h1>
          <p className={`text-[14px] md:text-xl text-[#6B5B51] max-w-2xl leading-relaxed ${playfairdisplay.className}`}>
            Discover our artisanal collection of coffee creations and handcrafted desserts
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="z-20 bg-[#f4f1eb] border-b border-[#D4CABE]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-[#2D2420] text-[#FAF8F5] shadow-lg"
                  : "bg-transparent text-[#6B5B51] hover:bg-[#D4CABE]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("coffee")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "coffee"
                  ? "bg-[#2D2420] text-[#FAF8F5] shadow-lg"
                  : "bg-transparent text-[#6B5B51] hover:bg-[#D4CABE]"
              }`}
            >
              Coffee
            </button>
            <button
              onClick={() => setSelectedCategory("desserts")}
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "desserts"
                  ? "bg-[#2D2420] text-[#FAF8F5] shadow-lg"
                  : "bg-transparent text-[#6B5B51] hover:bg-[#D4CABE]"
              }`}
            >
              Desserts
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-[#FAF8F5] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={ `${process.env.NEXT_PUBLIC_API}/${item.image_url}` || "/placeholder.svg"}
                  alt={item.title}
                  width={2000}
                  height={2000}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-2">
                  <span className={`inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-wider ${playfairdisplay.className}`}>
                    {item.category}
                  </span>
                </div>
                <h3 className={ `text-2xl font-display font-light mb-2 text-balance ${playfairdisplay.className}`}>{item.title}</h3>
                <p className={`text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ${playfairdisplay.className}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
