'use client'

import product from "@/app/types/product"
import { useEffect, useState } from "react"
import { Coffee, Cake } from "lucide-react"
import Link from "next/link"

type FilterType = "all" | "coffee" | "dessert"

    // const [filteredProducts,setFilteredProducts] = useState<product[]>([{} as product])

    // const filterElements = ()=>{
    //     setFilteredProducts(filter == 'all'?products:products.filter((product) => product.type === filter))
    // }
export default function Product() {
    const [products,setProducts] = useState<product[]>([{} as product])

    useEffect(() => {
        const fetchData = async () => {
            const coffeeEnd = await fetch(`${process.env.NEXT_PUBLIC_API}/product/coffee`)
            const dessertEnd = await fetch(`${process.env.NEXT_PUBLIC_API}/product/dessert`)
            const coffeeRes = await coffeeEnd.json()
            const dessertRes = await dessertEnd.json()
            setProducts( [...coffeeRes])
            setProducts(prev => [...prev , ...dessertRes])
        }
        fetchData()
    }, [])

    const [filter, setFilter] = useState<FilterType>("all")
    const filteredProducts =
            filter === "all"
            ? products
            : products.filter((product) => (product.type=='sweet'||product.type=='salty'?'dessert':'coffee') === filter)

    const filterButtons: { label: string; value: FilterType; icon?: React.ReactNode }[] = [
        { label: "All", value: "all" },
        { label: "Coffee", value: "coffee", icon: <Coffee className="w-4 h-4" /> },
        { label: "Dessert", value: "dessert", icon: <Cake className="w-4 h-4" /> },
    ]

    return (
        <div className="min-h-screen bg-[#EDE8E1]">
            {/* Header */}
            <div className="bg-[#2D2420] py-16 px-6 pt-40">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-[#FAF8F5] mb-4">
                        Our Menu
                    </h1>
                    <p className="text-[#C9A66B] text-lg max-w-2xl mx-auto">
                        Discover our carefully crafted selection of artisan coffees and delicious desserts
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="sticky top-0 bg-[#EDE8E1]/95 backdrop-blur-sm z-10 border-b border-[#D4C8BC]">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                        {filterButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setFilter(btn.value)}
                                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${filter === btn.value
                                        ? "bg-[#2D2420] text-[#FAF8F5]"
                                        : "bg-[#FAF8F5] text-[#6B5B51] hover:bg-[#E5DED5]"
                                    }`}
                            >
                                {btn.icon}
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}?type=${product.type=='sweet'||product.type=='salty'?'dessert':'coffee'}`}
                            className="group"
                        >
                            <div className="bg-[#FAF8F5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-[#2D2420]">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API}/${product.image_url}` || "/placeholder.svg"}
                                        alt={product.name}
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Type Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center gap-1.5 bg-[#C9A66B] text-[#2D2420] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                                            {product.type === "coffee" ? (
                                                <Coffee className="w-3 h-3" />
                                            ) : (
                                                <Cake className="w-3 h-3" />
                                            )}
                                            {product.type}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-serif text-[#2D2420] mb-2 group-hover:text-[#C9A66B] transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-[#6B5B51] text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-[#2D2420]">
                                            {product.price}$
                                        </span>
                                        <span className="text-[#C9A66B] text-sm font-medium group-hover:translate-x-1 transition-transform">
                                            View Details →
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-[#E5DED5] rounded-full flex items-center justify-center mx-auto mb-4">
                            {filter === "coffee" ? (
                                <Coffee className="w-8 h-8 text-[#6B5B51]" />
                            ) : (
                                <Cake className="w-8 h-8 text-[#6B5B51]" />
                            )}
                        </div>
                        <p className="text-[#6B5B51] text-lg">
                            No {filter} items found
                        </p>
                    </div>
                )}
            </div>
        </div>
    )

}