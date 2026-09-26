'use client'
import { useState , useEffect } from "react"
import { FAQList } from "../components/FaqList"
import FAQ from "@/app/types/faq"
import Info from "@/app/types/info"
import { Playfair_Display } from "next/font/google"
import { LocationEdit , Clock , Book } from "lucide-react"
const playfairdisplay = Playfair_Display({
  subsets:['latin'],
})

export default function About(){

    const [data , setData] = useState<FAQ[]>([{} as FAQ])
    const [info , setInfo] = useState<Info>({} as Info)
    useEffect(()=>{
    const fetchData = async ()=>{
        const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/faq`)
        const Aendpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/info`)
        const res = await endpoint.json()
        const infoRes = await Aendpoint.json()
        setData(res)
        setInfo(infoRes[0])
    }
    fetchData()
  },[])
    return(<>
        <div className="bg-[#2D2420] h-30"></div>
        <div>
            <div className="w-full mt-10 mb-10 max-w-3xl mx-auto ">
                <h2 className={`${playfairdisplay.className} flex justify-start items-center mb-5 text-4xl gap-4 text-[#C9A66B]`}><Book className="text-4xl"/> Our Story</h2>
                <p className={`${playfairdisplay.className} text-xl mb-10`}>{info.our_story}</p>
                <h2 className={`${playfairdisplay.className}  flex justify-start items-center gap-4 mb-5 text-4xl text-[#C9A66B]`}><LocationEdit></LocationEdit> Our Location</h2>
                <p className={`${playfairdisplay.className} text-xl mb-10`}>{info.address}</p>
                <h2 className={`${playfairdisplay.className} flex justify-start items-center gap-4 mb-5 text-4xl text-[#C9A66B]`}><Clock></Clock> Opening Hours</h2>
                <p className={`${playfairdisplay.className} text-xl mb-10`}>{info.opening_hours}</p>
            </div>
            <FAQList  faqs={data}></FAQList>
        </div>
    </>)
}