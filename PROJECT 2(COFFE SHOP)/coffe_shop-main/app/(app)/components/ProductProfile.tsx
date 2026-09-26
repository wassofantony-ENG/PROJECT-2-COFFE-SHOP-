import Image from "next/image"
import { ArrowLeft, Coffee, Cake } from "lucide-react"
import Link from "next/link"
import Product from "@/app/types/product"

interface ProductProfileProps {
  product: Product
  backHref?: string
}

export default function ProductProfile({ product, backHref = "/products" }: ProductProfileProps) {
  const TypeIcon = (product.type=='sweet'||product.type=='salty'?'dessert':'coffee') === "coffee" ? Coffee : Cake

  return (<>
    <div className="bg-[#2D2420] h-30"></div>
    <div className="min-h-screen bg-[#EDE8E1] ">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[#6B5B51] hover:text-[#2D2420] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Menu</span>
        </Link>
      </div>

      {/* Product Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-[#FAF8F5] rounded-3xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px] bg-[#2D2420]">
              <img
                src={`${process.env.NEXT_PUBLIC_API}/${product.image_url}` || "/placeholder.svg"}
                alt={product.name}
                className="object-cover"
                />
              {/* Type Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 bg-[#C9A66B] text-[#2D2420] px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  <TypeIcon className="w-4 h-4" />
                  {product.type}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              {/* Header */}
              <div className="mb-8 *:capitalize">
                <h1 className="text-4xl lg:text-5xl font-serif text-[#2D2420] mb-4  leading-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-[#6B5B51] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#2D2420]">
                {product.price} $
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E5DED5] mb-8" />

              {/* Long Description */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-[#C9A66B] uppercase tracking-wider mb-4">
                  About This {product.type}
                </h3>
                <p className="text-[#6B5B51] capitalize leading-relaxed">
                  {product.long_description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                </>
  )
}
