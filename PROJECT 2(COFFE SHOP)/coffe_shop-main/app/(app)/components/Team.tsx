"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect , useState} from "react"
import Link from "next/link"
import {Playfair_Display , Poppins } from "next/font/google"
import Image from "next/image"
import BaristaIdCard from "./BaristaIdCard"
import barista from "@/app/types/baristas"
const playfairdisplay = Playfair_Display({
  subsets:['latin'],
})
const poppins = Poppins({
  weight: ['400','700'],
})


export default function BaristaCards() {
    
    const [baristas , setBaristas] = useState<barista[]>()
    // const baristas = [
    //     {
    //         id: 1,
    //         name: "Marco Rossi",
    //         age: 28,
    //         experience: "5 years",
    //         nationality: "Italian",
    //         image: "/professional-barista-portrait.png",
    //     },
    //     {
    //         id: 2,
    //         name: "Sofia Chen",
    //         age: 25,
    //         experience: "3 years",
    //         nationality: "Chinese",
    //         image: "/professional-barista-portrait-woman.jpg",
    //     },
    //     {
    //         id: 3,
    //         name: "James Wilson",
    //         age: 32,
    //         experience: "8 years",
    //         nationality: "British",
    //         image: "/professional-barista-portrait-man.jpg",
    //     },
    //     {
    //         id: 4,
    //         name: "Aisha Patel",
    //         age: 27,
    //         experience: "4 years",
    //         nationality: "Indian",
    //         image: "/professional-barista-portrait-woman-smiling.jpg",
    //     },
    // ]

    const scroll = (direction: "left" | "right") => {
        const container = document.getElementById("baristas")
        if (container) {
            const scrollAmount = 340
            if (direction === "left") {
                container.scrollLeft -= scrollAmount
            } else {
                container.scrollLeft += scrollAmount
            }
        }
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/baristas`);
            const res = await endpoint.json()
            setBaristas(res)
        }
        fetchData()
    },[])

    return (
        <div className="min-h-screen bg-[#f4f1eb] py-16 px-4">
            
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h1 className={ `text-2xl text-center mb-12 text-SecondarySection tracking-wide font-semibold ${playfairdisplay.className}`}>OUR BARISTA TEAM</h1>

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
                        id="baristas"
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        {baristas?.map((barista) => (
                            
                            <div key={barista.id} className="flex-none w-80 snap-center">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-[#2b2520]/10">
                                    {/* ID Card Header */}
                                    <div className="bg-linear-to-r from-[#2b2520] to-[#4a3f38] text-white py-3 px-6">
                                        <p className="text-sm font-semibold tracking-wider">BARISTA ID CARD</p>
                                    </div>

                                    {/* Photo Section */}
                                    <div className="relative h-64 overflow-hidden bg-linear-to-b from-gray-50 to-white flex items-center justify-center p-6">
                                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#2b2520] shadow-lg">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API}/${barista.image_url}`}
                                                alt={barista.name}
                                                width={1000}
                                                height={1000}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Information Section */}
                                    <div className="p-6 space-y-3">
                                        <h3 className={`text-2xl font-bold text-[#2b2520] text-center mb-4 ${poppins.className}`}>{barista.name}</h3>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center border-b border-[#2b2520]/10 pb-2">
                                                <span className={ `text-sm font-semibold text-[#5a5450] ${poppins.className}`}>Age:</span>
                                                <span className={`text-sm text-[#2b2520] font-medium ${poppins.className}`}>{barista.age}</span>
                                            </div>

                                            <div className="flex justify-between items-center border-b border-[#2b2520]/10 pb-2">
                                                <span className={`text-sm font-semibold text-[#5a5450] ${poppins.className}`}>Experience:</span>
                                                <span className={`text-sm text-[#2b2520] font-medium ${poppins.className}`}>{barista.experience}</span>
                                            </div>

                                            <div className="flex justify-between items-center  border-[#2b2520]/10 pb-2">
                                                <span className={`text-sm font-semibold text-[#5a5450] ${poppins.className}`}>Nationality:</span>
                                                <span className={`text-sm text-[#2b2520] font-medium ${poppins.className}`}>{barista.nationality}</span>
                                            </div>
                                        </div>

                                        {/* View Profile Button */}
                                        <div className="pt-4">
                                            <Link href={`/baristas/${barista.id}`}>
                                            <button className="w-full bg-[#2b1810] hover:bg-[#1f0f08] text-white py-2 rounded-lg transition-colors cursor-pointer">
                                                View Profile
                                            </button>
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
