'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import barista from "@/app/types/baristas"
import BaristaProfile from "../../components/BaristaProfile"

export default function BaristaPage(){
    const id = useParams().baristaId
    const [data , setData] = useState<barista>({} as barista)

    useEffect(()=>{
        const fetchData = async ()=>{
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/baristas/${id}`)
            const res = await endpoint.json()
            setData(res)
        }
        fetchData()
    },[id])
    return(
        <>
            <div className="bg-[#2D2420] h-30"></div>
            <BaristaProfile barista = {data} />
        </>
    )
}