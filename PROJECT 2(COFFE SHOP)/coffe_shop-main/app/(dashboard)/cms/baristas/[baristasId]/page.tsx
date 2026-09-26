'use client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { ArrowLeft, Upload, Coffee, Save, RotateCcw } from "lucide-react";
import Link from "next/link";
import barista from "@/app/types/baristas";
export default function EditBaristaItem() {
    const [imagePrivew, setImagePrivew] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState<barista>()
    const [newItem, setNewItem] = useState<barista>({} as barista);
    const id = useParams().baristasId

    const updateItem = async (data: barista) => {
        const formDataContent = new FormData();
        formDataContent.append("image", image as Blob);
        formDataContent.append("name", data.name);
        formDataContent.append('bio', data.bio);
        formDataContent.append('age', data.age.toString());
        formDataContent.append('experience', data.experience);
        formDataContent.append('nationality', data.nationality);

        await fetch(`${process.env.NEXT_PUBLIC_API}/baristas/${id}`, {
            method: "put",
            body: formDataContent
        });
        redirect('/cms/baristas')
    }

    useEffect(() => {
        const fetchData = async () => {
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/baristas/${id}`)
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
                    href="/cms/baristas"
                    className="inline-flex items-center gap-2 text-[#6B5B51] hover:text-[#2D2420] transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to baristas List</span>
                </Link>
            </div>

            {/* Main Card */}
            <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-[#2D2420] px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C9A66B] rounded-full flex items-center justify-center">
                            <Coffee className="w-5 h-5 text-[#2D2420]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif text-[#FAF8F5]">Edit barista</h1>
                            <p className="text-[#A89A8C] text-sm">Update barista information</p>
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
                                    Name
                                </label>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    value={newItem.name}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({ ...prev, name: e.target.value }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="Enter barista name"
                                />
                            </div>

                            {/* Description Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    nationality
                                </label>
                                <input
                                    type="text"
                                    value={newItem.nationality}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({
                                            ...prev,
                                            nationality: e.target.value,
                                        }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="Short description"
                                />
                            </div>

                            {/* Price Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    age
                                </label>
                                <input
                                    type="number"
                                    value={newItem.age}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({
                                            ...prev,
                                            age: parseInt(e.target.value),
                                        }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="0"
                                />
                            </div>

                            {/* Type Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    experience
                                </label>
                                                                <input
                                    type="text"
                                    value={newItem.experience}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({
                                            ...prev,
                                            experience:e.target.value,
                                        }));
                                    }}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all"
                                    placeholder="0"
                                />
                            </div>

                            {/* Long Description Field */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#2D2420] uppercase tracking-wide">
                                    bio
                                </label>
                                <textarea
                                    value={newItem.bio}
                                    onChange={(e) => {
                                        setNewItem((prev) => ({
                                            ...prev,
                                            bio: e.target.value,
                                        }));
                                    }}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#E5DED5] rounded-xl text-[#2D2420] placeholder-[#A89A8C] focus:outline-none focus:border-[#C9A66B] focus:ring-2 focus:ring-[#C9A66B]/20 transition-all resize-none"
                                    placeholder="Detailed description of the barista"
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
                                        <Coffee className="w-16 h-16 mb-4 opacity-50" />
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
                            Update barista
                        </button>
                        <button
                            type="button"
                            onClick={() => { setNewItem(data as barista) }}
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
