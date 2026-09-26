"use client"

import { Coffee, Cake, Info, MessageCircle, Users, Images } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import user from "@/app/types/user"

export default function DashboardSidenav() {
  const pathname = usePathname()
  const [data , setData] = useState<user | null>()
  const [isLoading , setIsLoading] = useState<boolean>(true)

    useEffect(()=>{
        const fetchData = async ()=>{
            
            const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/user`)
            if(!endpoint.ok) throw new Error('falid to fetch')
            const res = await endpoint.json()
            setData(res[0])
            setIsLoading(false)
        }
        fetchData()
    },[])

  const navigationItems = [
    { id: "coffee", label: "Coffee", icon: Coffee, href: "/cms/coffee" },
    { id: "dessert", label: "Dessert", icon: Cake, href: "/cms/dessert" },
    { id: "info", label: "Info", icon: Info, href: "/cms/info" },
    { id: "faq", label: "FAQ", icon: MessageCircle, href: "/cms/FAQ" },
    { id: "baristas", label: "Baristas", icon: Users, href: "/cms/baristas" },
    { id: "galleryitems", label: "Gallery Items", icon: Images, href: "/cms/galleryItems" },
  ]

  return (
    <aside className="w-64 bg-[#2D2420] text-[#FAF8F5] flex flex-col h-250">
      {/* Logo/Header */}
      <div className="p-6 border-b border-[#4A3D35]">
        <Link href={'/'}>
        <h1 className="text-2xl font-display font-light tracking-wide">Midnight Cafe</h1>
        </Link>
        <p className="text-xs text-[#B4A79C] mt-1">Management Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#C9A66B] text-[#2D2420] shadow-lg"
                      : "text-[#B4A79C] hover:bg-[#3D332A] hover:text-[#FAF8F5]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#4A3D35]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-[#C9A66B] flex items-center justify-center text-[#2D2420] font-semibold">
            A
          </div>
          <div>
            {isLoading || <p className="text-sm font-medium">{data?data.name:"Raghd"}</p>}
            {isLoading && <p className="text-sm font-medium">{'loading...'}</p>}
            <p className="text-xs text-[#B4A79C]">{data ? data.name:'Raghd'}@cafe.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
