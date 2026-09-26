import '../globals.css';
import Link from 'next/link';
import {Playfair_Display} from "next/font/google"
// import Link from 'next/link';
const playfairdisplay = Playfair_Display({
  subsets:['latin'],
})
export default function TopNav(){
    
    return(
        <div className={`flex flex-col backdrop-blur-md  justify-center md:justify-between md:flex-row  gap-5 items-center p-4 ${playfairdisplay.className} absolute top-7 w-full  `}>
            <h1 className='font-semibold text-xl pr-20 text-white ml-30 tracking-widest'>Midnight Cafe</h1>
            <nav className='*:uppercase font-medium md:pr-30 *:text-white'>
            <ul className='flex justify-between items-center gap-12 *:transition-all *:hover:text-zinc-500 *:cursor-pointer'>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href='/products'>Products</Link></li>
                <li><Link href={'/baristas'}>baristas</Link></li>
                <li><Link href={'#contacts'} className="scroll-smooth">contact us</Link></li>
                <li><Link href={'/about'}>About</Link></li>
            </ul>
            </nav>
        </div>
    )
}