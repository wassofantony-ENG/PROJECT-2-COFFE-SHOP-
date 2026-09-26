'use client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { ArrowLeft, Upload,GalleryThumbnails, Save, RotateCcw } from "lucide-react";
import Link from "next/link";
import GallaryI from "@/app/types/gallartItem";
export default function GallaryItem() {
    const [imagePrivew, setImagePrivew] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState<GallaryI>()
    const [newItem, setNewItem] = useState<GallaryI>({} as GallaryI);
    const id = useParams().galleryItemsId

    const updateItem = async (data: GallaryI) => {
        const formDataContent = new FormData();
        formDataContent.append("image", image as Blob);
        formDataContent.append("category", data.category);
        formDataContent.append('description', data.description);
        formDataContent.append('title', data.title);


        await fetch(`${process.env.NEXT_PUBLIC_API}/gallary/${id}`, {
            method: "put",
            body: formDataContent
        });
        redirect('/cms/galleryItems')
    }

    useEffect(() => {
        console.log(id)
        const fetchData = async () => {
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/gallary/${id}`)
            const res = await endpoint.json()
            setData(res)
            setNewItem(res)
            setImage(res.image_url)
        }
        fetchData()
    }, [id])

    return (
        <div className="h-screen bg-[#EDE8E1] py-8 px-6">
            {/* Back Navigation */}
            <div className="max-w-4xl mx-auto mb-6">
                <Link
                    href="/cms/galleryItems"
                    className="inline-flex items-center gap-2 text-[#6B5B51] hover:text-[#2D2420] transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back galleryItems List</span>
                </Link>
            </div>

            {/* Main Card */}
            <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[#2D2420] px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C9A66B] rounded-full flex items-center justify-center">
                            <GalleryThumbnails className="w-5 h-5 text-[#2D2420]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif text-[#FAF8F5]">Edit item</h1>
                            <p className="text-[#A89A8C] text-sm">Update item information</p>
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
                                <label htmlFor="name" className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    title
                                </label>
                                <input
                                    required
                                    name="title"
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({ ...prev, title: e.target.value }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="Enter title"
                                />
                            </div>

                            {/* Description Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    description
                                </label>
                                <input
                                    type="text"
                                    value={newItem.description}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="Short description"
                                />
                            </div>


                            {/* Type Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    category
                                </label>
                                <input
                                    type="text"
                                    value={newItem.category}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({
                                            ...prev,
                                            category:e.target.value,
                                        }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="endter category"
                                />
                            </div>

                        </div>

                        {/* Right Column - Image Upload */}
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                Product Image
                            </label>
                            
                            {/* Image Preview */}
                            <div className="relative aspect-square bg-[#EDE8E1] rounded-2xl overflow-hidden border-2 border-dashed border-[#C9A66B]">
                                {(imagePrivew || newItem.image_url) ? (
                                    <img
                                        alt="Product preview"
                                        src={imagePrivew || `${process.env.NEXT_PUBLIC_API}/` + newItem.image_url}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-[#A89A8C]">
                                        <GalleryThumbnails className="w-16 h-16 mb-4 opacity-50" />
                                        <p className="text-sm">No image selected</p>
                                    </div>
                                )}
                            </div>

                            {/* File Input */}
                            <label className="relative cursor-pointer">
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
                                    className="hidden"
                                />
                                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-[#EDE8E1] border-2 border-[#C9A66B] rounded-xl text-[#2D2420] hover:bg-[#E5DED5] transition-colors">
                                    <Upload className="w-5 h-5 text-[#C9A66B]" />
                                    <span className="font-medium">Choose New Image</span>
                                </div>
                            </label>
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
                            Update items
                        </button>
                        <button
                            type="button"
                            onClick={() => { setNewItem(data as GallaryI) }}
                            className="flex-1 flex items-center justify-center gap-3 bg-transparent border-2 border-[#C9A66B] text-[#2D2420] py-4 px-8 rounded-xl font-semibold hover:bg-[#C9A66B]/10 transition-colors cursor-pointer"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Discard Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
