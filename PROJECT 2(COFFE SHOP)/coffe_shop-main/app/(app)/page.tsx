import {Playfair_Display , Poppins } from "next/font/google"
import Image from "next/image"
import CoffeeCarousel from "./components/SectionShowcase"
import {ChevronsRight} from "lucide-react"
import BaristaCards from "./components/Team"
import CoffeeDessertGallery from "./components/CoffeeDessertGallery"
import Link from "next/link"

const playfairdisplay = Playfair_Display({
  subsets:['latin'],
})
const poppins = Poppins({
  weight: ['400','700'],
})


export default async function Home() {
  return (
    <>
    {/* hero */}
    <div className="Hero  bg-[url('/landing.png')] min-h-screen w-full bg-cover flex justify-start items-center">
      <div className="text ml-15  md:ml-32 mt-20">
          <h2 className={`${poppins.className} text-white text-[16px] w-1/2 tracking-[5px] uppercase`}>welcome</h2>
          <p className={`${playfairdisplay.className} text-white text-[60px] w-full sm:w-2/3  md:w-2/3 lg:w-1/2  text-shadow-xs leading-18`}>We serve the richest coffee in the city!</p>
          <Link href={'/products'}>
      <button className="mt-15 bg-white p-4 w-50 rounded-full cursor-pointer font-semibold text-SecondarySection ">Explore</button>
          </Link>
      </div>
    </div>

    {/* products icons */}
    <div className="bg-MainSection flex justify-center items-center mb-16">
      <ul className={`w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 p-10 gap-8 *:flex *:justify-center *:items-center *:flex-col *:text-SecondarySection`}>
        <li><Image src={'/hot-coffee.svg'} alt="hot coffee" width='100' height={100}></Image><p className={`${poppins.className}`}>Hot Coffee</p></li>
        <li><Image src={'/cold-coffee.svg'} alt="cold coffee" width='100' height={100}></Image><p className={`${poppins.className}`}>Cold Coffee</p></li>
        <li><Image src={'/cup.svg'} alt="cup coffee" width='100' height={100}></Image><p className={`${poppins.className}`}>Cup Coffee</p></li>
        <li><Image src={'/cake.svg'} alt="dessert" width='100' height={100}></Image><p className={`${poppins.className}`}>Dessert</p></li>
      </ul>
    </div>
    {/* showacse sections */}
      <div className="coffe_section">
          <CoffeeCarousel title = 'coffee'></CoffeeCarousel>
      </div>
      <div className="dessert_section">
          <CoffeeCarousel title="dessert"></CoffeeCarousel>
      </div>

      {/* explore ad */}
      <div className="explore flex justify-center items-center w-full h-fit bg-MainSection lg:justify-between" >
      <Image alt="hand" height={300} width={300} src={'/hand_and_beans.svg'} className="w-1/3 hidden lg:inline"></Image>
        <div className="content w-2/3 lg:w-1/3 *:m-3">
          <h2 className={`${playfairdisplay.className}  font-bold text-2xl  lg:text-3xl`}>Check Out Our Best Coffee Made With The Best Beans</h2>
        <Link href={'/products'}>
          <button className={`cursor-pointer bg-SecondarySection text-white ${poppins.className} flex justify-between items-center p-3.5  rounded-full text-[14px]`}>Explore Our Products <ChevronsRight /></button>
        </Link>
        </div>
      <Image alt="beans" height={300} width={300} src={'/beans.svg'} className='w-1/3 hidden lg:inline'></Image>
      </div>
      {/* Team */}
      <BaristaCards />

      {/* Gallary */}
    <CoffeeDessertGallery />

    
    </>
  )
}
