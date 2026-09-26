import Link from "next/link"
export default function NotFound(){
    return(
        <div className="flex justify-center items-center flex-col min-h-screen gap-8 bg-Mainsection">
            <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
            <button className="p-4 rounded-full bg-SecondarySection text-white"><Link href={"/"}> GO HOME </Link></button>
        </div>
    )
}