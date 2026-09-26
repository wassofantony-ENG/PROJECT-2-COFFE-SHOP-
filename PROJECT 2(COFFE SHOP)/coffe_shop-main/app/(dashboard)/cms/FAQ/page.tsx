'use client'
import { useEffect, useState } from "react"
import { Trash2, Edit, Plus, X } from "lucide-react"
import Link from "next/link"
import FAQ from "@/app/types/faq"
import { CircleQuestionMark } from "lucide-react"

export default function Faq() {
    const [data, setData] = useState<FAQ[]>([{} as FAQ])
    const [addPanel, setAddPanel] = useState<boolean>(false);
    const [newData, setNewData] = useState<FAQ>({ id: 0, question: '', answer: '' })
    const deleteQ = async (id: number) => {
        setData((prev) => prev?.filter(ele => ele.id != id))
        await fetch(`${process.env.NEXT_PUBLIC_API}/faq/${id}`, {
            method: "DELETE",
        });
    }
    const togglePanel = () => {
        setAddPanel((prev) => !prev);
        if (addPanel) {
            setNewData({} as FAQ);
        }
    };
    const showForm = () => {
        setAddPanel(prev => !prev)
    }

    const addItem = async (data: FAQ) => {

        const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/faq`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: data.question,
                answer: data.answer
            }),
        });
        const res: FAQ = await endpoint.json()
        setData((prev) => prev ? [...prev, res] : [res])
        setNewData({ id: 0, question: '', answer: '' })
        setAddPanel(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/faq`);
            if (!endpoint.ok) throw new Error("fetch faild");
            const res: FAQ[] = await endpoint.json();
            setData(res);
        };
        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-[#EDE8E1] p-8 lg:p-12 overflow-y-scroll">
            <div className="max-w-6xl mx-auto mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center">
                        <CircleQuestionMark className="w-6 h-6 text-[#2D2420]" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-serif text-[#2D2420] tracking-wide">
                        FAQ
                    </h1>
                </div>
                <div className="h-1 w-32 bg-linear-to-r from-[#C9A66B] to-transparent rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto mb-8">
                <div
                    className={`bg-[#FAF8F5] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${addPanel ? "ring-2 ring-[#C9A66B]" : ""
                        }`}
                >
                    {/* Panel Header */}
                    <div
                        onClick={addPanel ? () => { } : togglePanel}
                        className={`flex items-center justify-between p-5 cursor-pointer ${!addPanel ? "hover:bg-[#F5F0E8]" : ""
                            } transition-colors`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${addPanel ? "bg-[#2D2420]" : "bg-[#C9A66B]"
                                    }`}
                            >
                                <Plus
                                    className={`w-5 h-5 transition-all duration-300 ${addPanel
                                        ? "rotate-45 text-[#FAF8F5]"
                                        : "rotate-0 text-[#2D2420]"
                                        }`}
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-[#2D2420]">
                                Add a FAQ
                            </h2>
                        </div>
                        {addPanel && (
                            <button
                                onClick={togglePanel}
                                className="p-2 hover:bg-[#EDE8E1] rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-[#6B5B51]" />
                            </button>
                        )}
                    </div>

                    {/* Panel Form */}
                    {addPanel && (
                        <div className="px-5 pb-5">
                            <div className="h-px bg-[#E5DED5] mb-6" />
                            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="question"
                                        className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide"
                                    >
                                        question
                                    </label>
                                    <input
                                        required
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={newData.question}
                                        onChange={(e) => {
                                            setNewData((prev) => ({ ...prev, question: e.target.value }));
                                        }}
                                        className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                                        placeholder="Enter drink name"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                                        answer
                                    </label>
                                    <input
                                        type="text"
                                        value={newData.answer}
                                        onChange={(e) => {
                                            setNewData((prev) => ({
                                                ...prev,
                                                answer: e.target.value,
                                            }));
                                        }}
                                        className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                                        placeholder="Short description"
                                    />
                                </div>

                            </form>

                            {/* Action Buttons */}
                            <div className="flex justify-end items-center gap-3 mt-8">
                                <button
                                    onClick={togglePanel}
                                    className="px-6 py-3 rounded-xl font-medium text-[#6B5B51] hover:bg-[#EDE8E1] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        addItem(newData);
                                    }}
                                    className="px-6 py-3 bg-[#2D2420] text-[#FAF8F5] rounded-xl font-medium hover:bg-[#3D342F] transition-colors shadow-lg hover:shadow-xl"
                                >
                                    Add Faq
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-4  overflow-hidden">
                {data.length !== 0 ? (
                    data.map((co) => (
                        <div
                            key={co.id}
                            className={`bg-[#FAF8F5] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
                        >
                            <div className="flex items-center justify-between p-4">
                                {/* Image & Info */}
                                <div className="flex items-center gap-5 ml-5">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#2D2420] capitalize mb-1">
                                            {co.question}
                                        </h3>
                                        <p className="text-[#6B5B51] text-sm line-clamp-1 max-w-md">
                                            {co.answer}
                                        </p>

                                    </div>
                                </div>

                                {/* Price & Actions */}
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                deleteQ(co.id);
                                            }}
                                            className="p-3 rounded-xl text-[#6B5B51] hover:bg-red-50 hover:text-red-600 transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <Link href={`/cms/FAQ/${co.id}`}>
                                            <button className="p-3 rounded-xl text-[#6B5B51] hover:bg-[#C9A66B]/20 hover:text-[#2D2420] transition-all">
                                                <Edit className="w-5 h-5" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-[#FAF8F5] rounded-2xl p-12 text-center">
                        <div className="w-16 h-16 bg-[#EDE8E1] rounded-full flex items-center justify-center mx-auto mb-4">
                            <CircleQuestionMark className="w-8 h-8 text-[#9C8B7E]" />
                        </div>
                        <h3 className="text-2xl font-serif text-[#9C8B7E]">
                            No dessert to show
                        </h3>
                        <p className="text-[#9C8B7E] mt-2">
                            Add your first dessert to get started
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}