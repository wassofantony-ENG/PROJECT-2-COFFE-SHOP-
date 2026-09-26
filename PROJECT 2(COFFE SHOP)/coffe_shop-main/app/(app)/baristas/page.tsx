'use client'

import barista from "@/app/types/baristas"
import { useEffect, useState } from "react"
import BaristaIdCard from "../components/BaristaIdCard"

export default function BaristasPage(){
    const [data , setData] = useState<barista[]>()

    useEffect(() => {
        const fetchData = async ()=>{
            const endpoint= await fetch(`${process.env.NEXT_PUBLIC_API}/baristas`)
            const res = await endpoint.json()
            setData(res)
        }
        fetchData()
    },[])
    return(<>
                <div className="bg-[#2D2420] py-16 px-6 pt-40">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#FAF8F5] mb-4">
                        Our Team
                    </h1>
                    <p className="text-[#C9A66B] text-lg max-w-2xl mx-auto capitalize">
                        Meet out wonderful team of baristas
                    </p>
                </div>
            </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-25 mb-10 gap-10 p-10 bg-bodyBg">
        {data?.map(ele =>(
            <BaristaIdCard data={ele} key={ele.id} />
        ))}    
        </div>
        </>
    )
}