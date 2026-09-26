"use client";

import { Edit, Plus, Trash2, X, Cake } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "@/app/types/product";

export default function Dessert() {
  const [data, setData] = useState<Product[]>([]);
  const [deltedId, setDeletedId] = useState<number | null>(null);
  const [addPanel, setAddPanel] = useState<boolean>(false);
  const [imagePrivew, setImagePrivew] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const [newItem, setNewItem] = useState<Product>({
    id: 1,
    name: "",
    description: "",
    price: 0,
    image_url: "",
    type: "",
    long_description: "",
  });

  const deleteItem = async (id: number) => {
    setData((prev) => prev.filter((ele) => ele.id !== id));

    await fetch(`${process.env.NEXT_PUBLIC_API}/product/dessert/${id}`, {
      method: "DELETE",
    });
  };

  const deleteing = async (id: number) => {
    setDeletedId(id);
    setTimeout(async () => {
      await deleteItem(id);
      setDeletedId(null);
    }, 300);
  };

  const addItem = async (data: Product) => {
    const formDataContent = new FormData();
    formDataContent.append("image", image as Blob);
    formDataContent.append("name", data.name);
    formDataContent.append("description", data.description);
    formDataContent.append("price", data.price.toString());
    formDataContent.append("type", data.type);
    formDataContent.append("long_description", data.long_description);
    if (!data.name) return;
    const endpoint = await fetch(
      `${process.env.NEXT_PUBLIC_API}/product/dessert`,
      {
        method: "post",
        body: formDataContent,
      }
    );
    const res = await endpoint.json();
    setData((prev) => [...prev, res]);
    setNewItem({
      id: 1,
      name: "",
      description: "",
      price: 0,
      image_url: "",
      type: "",
      long_description: "",
    });
    setImagePrivew("");
    setImage(null);
  };

  const togglePanel = () => {
    setAddPanel((prev) => !prev);
    if (addPanel) {
      setNewItem({
        id: 1,
        name: "",
        description: "",
        price: 0,
        image_url: "",
        type: "",
        long_description: "",
      });
      setImagePrivew("");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const endpoint = await fetch(
        `${process.env.NEXT_PUBLIC_API}/product/dessert`
      );
      if (!endpoint.ok) throw new Error("fetch faild");
      const res: Product[] = await endpoint.json();
      setData(res);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#EDE8E1] p-8 lg:p-12 overflow-y-scroll">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#C9A66B] rounded-xl flex items-center justify-center">
            <Cake className="w-6 h-6 text-[#2D2420]" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif text-[#2D2420] tracking-wide">
            Dessert
          </h1>
        </div>
        <div className="h-1 w-32 bg-linear-to-r from-[#C9A66B] to-transparent rounded-full" />
      </div>

      {/* Add Panel */}
      <div className="max-w-6xl mx-auto mb-8">
        <div
          className={`bg-[#FAF8F5] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
            addPanel ? "ring-2 ring-[#C9A66B]" : ""
          }`}
        >
          {/* Panel Header */}
          <div
            onClick={addPanel ? () => {} : togglePanel}
            className={`flex items-center justify-between p-5 cursor-pointer ${
              !addPanel ? "hover:bg-[#F5F0E8]" : ""
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  addPanel ? "bg-[#2D2420]" : "bg-[#C9A66B]"
                }`}
              >
                <Plus
                  className={`w-5 h-5 transition-all duration-300 ${
                    addPanel
                      ? "rotate-45 text-[#FAF8F5]"
                      : "rotate-0 text-[#2D2420]"
                  }`}
                />
              </div>
              <h2 className="text-xl font-semibold text-[#2D2420]">
                Add a Dessert
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
                    Name
                  </label>
                  <input
                    required
                    id="name"
                    name="name"
                    type="text"
                    value={newItem.name}
                    onChange={(e) => {
                      setNewItem((prev) => ({ ...prev, name: e.target.value }));
                    }}
                    className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                    placeholder="Enter drink name"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                    Description
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
                    className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                    placeholder="Short description"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                    Price
                  </label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => {
                      setNewItem((prev) => ({
                        ...prev,
                        price: parseInt(e.target.value),
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

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                    Type
                  </label>
                  <select
                    value={newItem.type}
                    onChange={(e) => {
                      setNewItem((prev) => ({ ...prev, type: e.target.value }));
                    }}
                    className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="sweet">Sweet</option>
                    <option value="salty">Salty</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#6B5B51] uppercase tracking-wide">
                    Long Description
                  </label>
                  <input
                    type="text"
                    value={newItem.long_description}
                    onChange={(e) => {
                      setNewItem((prev) => ({
                        ...prev,
                        long_description: e.target.value,
                      }));
                    }}
                    className="px-4 py-3 bg-[#EDE8E1] border-2 border-transparent rounded-xl text-[#2D2420] placeholder:text-[#9C8B7E] focus:outline-none focus:border-[#C9A66B] focus:bg-white transition-all"
                    placeholder="Detailed description"
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
                    addItem(newItem);
                  }}
                  className="px-6 py-3 bg-[#2D2420] text-[#FAF8F5] rounded-xl font-medium hover:bg-[#3D342F] transition-colors shadow-lg hover:shadow-xl"
                >
                  Add Dessert
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drinks List */}
      <div className="max-w-6xl mx-auto space-y-4  overflow-hidden">
        {data.length !== 0 ? (
          data.map((co) => (
            <div
              key={co.id}
              className={`bg-[#FAF8F5] rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
                deltedId === co.id
                  ? "opacity-0 scale-95 max-h-0"
                  : "opacity-100 scale-100 max-h-40"
              }`}
            >
              <div className="flex items-center justify-between p-4">
                {/* Image & Info */}
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#EDE8E1] shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={`${process.env.NEXT_PUBLIC_API}/${co.image_url}`}
                      alt={co.name}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2D2420] capitalize mb-1">
                      {co.name}
                    </h3>
                    <p className="text-[#6B5B51] text-sm line-clamp-1 max-w-md">
                      {co.description}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 bg-[#C9A66B]/20 text-[#8B7355] text-xs font-medium rounded-full uppercase">
                      {co.type}
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center gap-6">
                  <span className="text-xl font-bold text-[#2D2420]">
                    {co.price} $
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        deleteing(co.id);
                      }}
                      className="p-3 rounded-xl text-[#6B5B51] hover:bg-red-50 hover:text-red-600 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <Link href={`/cms/dessert/${co.id}`}>
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
              <Cake className="w-8 h-8 text-[#9C8B7E]" />
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
  );
}
