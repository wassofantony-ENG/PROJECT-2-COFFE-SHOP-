import Image from "next/image"
import { ArrowLeft, MapPin, Briefcase, Calendar } from "lucide-react"
import Link from "next/link"
import Barista from "@/app/types/baristas"

interface BaristaProfileProps {
  barista: Barista
  backHref?: string
}

export default function BaristaProfile({ barista, backHref = "/baristas" }: BaristaProfileProps) {
  return (
    <div key={barista.id} className="min-h-screen bg-[#EDE8E1]">
      {/* Back Navigation */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[#6B5B51] hover:text-[#2D2420] transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Team</span>
        </Link>
      </div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-[#FAF8F5] rounded-3xl shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-[#2D2420] to-[#4A3F3A]" />

          {/* Profile Section */}
          <div className="px-8 lg:px-12 pb-12">
            {/* Avatar */}
            <div className="relative -mt-20 mb-6">
              <div className="w-40 h-40 rounded-full border-4 border-[#FAF8F5] shadow-xl overflow-hidden bg-[#2D2420]">
                <img
                  src={`${process.env.NEXT_PUBLIC_API}/${barista.image_url}` || "/placeholder.svg"}
                  alt={barista.name}
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Name */}
            <h1 className="text-4xl lg:text-5xl font-serif text-[#2D2420] mb-6">
              {barista.name}
            </h1>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-[#EDE8E1] rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A66B] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#2D2420]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B5B51] uppercase tracking-wide">Age</p>
                  <p className="text-lg font-semibold text-[#2D2420]">{barista.age} years</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#EDE8E1] rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A66B] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#2D2420]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B5B51] uppercase tracking-wide">Experience</p>
                  <p className="text-lg font-semibold text-[#2D2420]">{barista.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#EDE8E1] rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A66B] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#2D2420]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B5B51] uppercase tracking-wide">Nationality</p>
                  <p className="text-lg font-semibold text-[#2D2420]">{barista.nationality}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E5DED5] mb-8" />

            {/* Bio */}
            <div>
              <h3 className="text-sm font-semibold text-[#C9A66B] uppercase tracking-wider mb-4">
                About
              </h3>
              <p className="text-[#6B5B51] leading-relaxed text-lg">
                {barista.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
