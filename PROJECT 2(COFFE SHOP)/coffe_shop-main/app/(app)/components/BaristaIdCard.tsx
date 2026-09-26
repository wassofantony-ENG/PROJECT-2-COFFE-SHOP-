import barista from "@/app/types/baristas" 
import Link from "next/link"
import {Playfair_Display , Poppins } from "next/font/google"

const playfairdisplay = Playfair_Display({
  subsets:['latin'],
})
const poppins = Poppins({
  weight: ['400','700'],
})
export default function BaristaIdCard({data}:{
    data:barista
}){
    console.log(data)
    return(<>
    <div key={data.id} className="flex-none w-80 snap-center">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-[#2b2520]/10">
                                    {/* ID Card Header */}
                                    <div className="bg-linear-to-r from-[#2b2520] to-[#4a3f38] text-white py-3 px-6">
                                        <p className="text-sm font-semibold tracking-wider">BARISTA ID CARD</p>
                                    </div>

                                    {/* Photo Section */}
                                    <div className="relative h-64 overflow-hidden bg-linear-to-b from-gray-50 to-white flex items-center justify-center p-6">
                                        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#2b2520] shadow-lg">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API}/${data.image_url}`}
                                                alt={data.name}
                                                width={1000}
                                                height={1000}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Information Section */}
                                    <div className="p-6 space-y-3">
                                        <h3 className={`text-2xl font-bold text-[#2b2520] text-center mb-4 ${poppins.className}`}>{data.name}</h3>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center border-b border-[#2b2520]/10 pb-2">
                                                <span className={ `text-sm font-semibold text-[#5a5450] ${poppins.className}`}>Age:</span>
                                                <span className={`text-sm text-[#2b2520] font-medium ${poppins.className}`}>{data.age}</span>
                                            </div>

                                            <div className="flex justify-between items-center border-b border-[#2b2520]/10 pb-2">
                                                <span className={`text-sm font-semibold text-[#5a5450] ${poppins.className}`}>Experience:</span>
                                                <span className={`text-sm text-[#2b2520] font-medium ${poppins.className}`}>{data.experience}</span>
                                            </div>

                                            <div className="flex justify-between items-center  border-[#2b2520]/10 pb-2">
                                                <span className={`text-sm font-semibold text-[#5a5450] ${poppins.className}`}>Nationality:</span>
                                                <span className={`text-sm text-[#2b2520] font-medium ${poppins.className}`}>{data.nationality}</span>
                                            </div>
                                        </div>

                                        {/* View Profile Button */}
                                        <div className="pt-4">
                                            <Link href={`/baristas/${data.id}`}>
                                            <button className="w-full bg-[#2b1810] hover:bg-[#1f0f08] text-white py-2 rounded-lg transition-colors cursor-pointer">
                                                View Profile
                                            </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
    </>)
}