'use client'
import { useEffect, useState } from "react"
import { Trash2, Edit, Plus, X, PersonStanding } from "lucide-react"
import GallaryItem from "@/app/types/gallartItem"
import Image from "next/image"
import Link from "next/link"

export default function GallaryItems() {

    const [data, setData] = useState<GallaryItem[]>([{} as GallaryItem])
    const [addPanel, setAddPanel] = useState<boolean>(false);
    const [newData, setNewData] = useState<GallaryItem>({ } as GallaryItem)
    const [imagePrivew, setImagePrivew] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const deleteQ = async (id: number) => {
        setData((prev) => prev?.filter(ele => ele.id != id))
        await fetch(`${process.env.NEXT_PUBLIC_API}/gallary/${id}`, {
            method: "DELETE",
        });
    }


    const togglePanel = () => {
        setAddPanel((prev) => !prev);
        if (addPanel) {
            setNewData({} as GallaryItem);
        }
    };

    const addItem = async (data: GallaryItem) => {
        const formDataContent = new FormData();
        formDataContent.append("image", image as Blob);
        formDataContent.append("category", data.category);
        formDataContent.append('description', data.description);
        formDataContent.append('title', data.title);
        
        const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/gallary`, {
            method: "post",
            body: formDataContent,
        });
        const res: GallaryItem = await endpoint.json()
        setData((prev) => prev ? [...prev, res] : [res])
        setNewData({} as GallaryItem)
        setAddPanel(false)
        console.log(res);
    }

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/gallary`);
            if (!endpoint.ok) throw new Error("fetch faild");
            const res: GallaryItem[] = await endpoint.json();
            setData(res);
        };
        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-[#EDE8E1] p-8 lg:p-12 overflow-y-scroll">
            <div className="max-w-6xl mx-auto mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center">
                        <PersonStanding className="w-6 h-6 text-[#2D2420]" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-serif text-[#2D2420] tracking-wide">
                        Gallary
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
                                Add Item
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
                                        htmlFor="name"
                                        className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide"
                                    >
                                        category
                                    </label>
                                    <input
                                        required
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={newData.category}
                                        onChange={(e) => {
                                            setNewData((prev) => ({ ...prev, category: e.target.value }));
                                        }}
                                        className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                                        placeholder="Set category"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                                        description
                                    </label>
                                    <input
                                        type="text"
                                        value={newData.description}
                                        onChange={(e) => {
                                            setNewData((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }));
                                        }}
                                        className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                                        placeholder="Short description"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                                        title
                                    </label>
                                    <input
                                        type="text"
                                        value={newData.title}
                                        onChange={(e) => {
                                            setNewData((prev) => ({
                                                ...prev,
                                                title:e.target.value,
                                            }));
                                        }}
                                        className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const selectedFile = e.target.files?.[0];
                                            if (!selectedFile) return;
                                            setImage(selectedFile);
                                            const url = URL.createObjectURL(selectedFile);
                                            setImagePrivew(url);
                                        }}
                                        className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#C9A66B] file:text-[#2D2420] file:font-medium file:cursor-pointer hover:file:bg-[#D4B87A] focus:outline-none focus:border-[#C9A66B] transition-all cursor-pointer"
                                    />
                                    {imagePrivew && (
                                        <div className="mt-3 relative w-fit">
                                            <Image
                                                alt="Preview"
                                                className="rounded-xl object-cover shadow-md"
                                                src={imagePrivew || "/placeholder.svg"}
                                                height={150}
                                                width={150}
                                            />
                                        </div>
                                    )}
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
                                    Add Item
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
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#EDE8E1] shrink-0">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={`${process.env.NEXT_PUBLIC_API}/${co.image_url}`}
                                            alt={co.title}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-[#2D2420] capitalize mb-1">
                                            {co.title}
                                        </h3>
                                        <p className="text-[#6B5B51] text-sm line-clamp-1 max-w-md">
                                            {co.description}
                                        </p>
                                        <p className="text-[#6B5B51] text-sm line-clamp-1 max-w-md">
                                            {co.category}
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
                                        <Link href={`/cms/galleryItems/${co.id}`}>
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
                            <PersonStanding className="w-8 h-8 text-[#9C8B7E]" />
                        </div>
                        <h3 className="text-2xl font-serif text-[#9C8B7E]">
                            No items to show
                        </h3>
                        <p className="text-[#9C8B7E] mt-2">
                            Add your first item to get started
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}