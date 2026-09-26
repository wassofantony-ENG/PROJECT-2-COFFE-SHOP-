'use client'
import { useEffect, useState } from "react";
import info from "@/app/types/info";
import { Info, RotateCcw , Save,ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function InfoPage() {
    const [data , setData] = useState<info[]>([{} as info])
    const [newItem , setNewItem] = useState<info>({} as info)

        const updateItem = async (data: info) => {
            console.log(data)
            // const formDataContent = new FormData();
            // formDataContent.append("phone", data.phone);
            // formDataContent.append("address", data.address);
            // formDataContent.append("email", data.email);
            // formDataContent.append("opening_hours", data.opening_hours);
            // formDataContent.append("our_story", data.our_story);

            await fetch(`${process.env.NEXT_PUBLIC_API}/info/${data.id}`, {
                method: "put",
                headers:{
                    "Content-Type": "application/json",
                }
                ,
                body: JSON.stringify(data)
            });
        }

    useEffect(()=>{
        const fetchData = async ()=>{
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/info`)
            const res = await endpoint.json()
            setData(res)
            setNewItem(res[res.length -1] )
        }
        fetchData()
    },[])
    return (<>

        <div className="min-h-screen bg-[#EDE8E1] py-8 px-6">
            {/* Back Navigation */}
            <div className="max-w-4xl mx-auto mb-6">
                <Link
                    href="/cms/FAQ"
                    className="inline-flex items-center gap-2 text-[#6B5B51] hover:text-[#2D2420] transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to FAQ List</span>
                </Link>
            </div>

            {/* Main Card */}
            <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[#2D2420] px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C9A66B] rounded-full flex items-center justify-center">
                            <Info className="w-5 h-5 text-[#2D2420]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif text-[#FAF8F5]">Edit info</h1>
                            <p className="text-[#A89A8C] text-sm">Update General information</p>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Name Field */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="question" className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    phone
                                </label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    value={newItem?.phone}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({ ...prev, phone: e.target.value }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="phone"
                                />
                            </div>

                            {/* Description Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    address
                                </label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    value={newItem?.address}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({ ...prev, address: e.target.value }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="address"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    email
                                </label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    value={newItem?.email}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({ ...prev, email: e.target.value }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="email"
                                />
                            </div>
                    <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    opening_hours
                                </label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    value={newItem?.opening_hours}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({ ...prev, opening_hours: e.target.value }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="opening_hours"
                                />
                            </div>
                    <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    our_story
                                </label>
                                <textarea
                                    required
                                    name="name"
                                    value={newItem?.our_story}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({ ...prev, our_story: e.target.value }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="our_story"
                                />
                            </div>
                        </div>

                    </form>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-[#E5DED5]">
                        <button
                            type="button"
                            onClick={() => { updateItem(newItem) }}
                            className="flex-1 flex items-center justify-center gap-3 bg-[#2D2420] text-[#FAF8F5] py-4 px-8 rounded-xl font-semibold hover:bg-[#3D342F] transition-colors shadow-lg hover:shadow-xl cursor-pointer"
                        >
                            <Save className="w-5 h-5" />
                            Update info
                        </button>
                        <button
                            type="button"
                            onClick={() => { setNewItem(data[data.length -1] as info) }}
                            className="flex-1 flex items-center justify-center gap-3 bg-transparent border-2 border-[#C9A66B] text-[#2D2420] py-4 px-8 rounded-xl font-semibold hover:bg-[#C9A66B]/10 transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Discard Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}