'use client'
import { useParams , useSearchParams } from "next/navigation"
import { useEffect ,useState} from "react";
import product from "@/app/types/product";
import ProductProfile from "../../components/ProductProfile";
export default function ProductsPage() {
        const searchParams = useSearchParams();
        const type = searchParams.get('type')
        const productId = useParams().productId
        const [product , setProduct] = useState<product>({} as product)
        
        useEffect(()=>{
            const fetchData  = async ()=>{
                const endpoint = await fetch(`${process.env.NEXT_PUBLIC_API}/product/${type}/${productId}`)
                const res = await endpoint.json()
                setProduct(res)
            }
            fetchData()
        },[productId,type])
        return(
        <>
            <ProductProfile product={product}></ProductProfile>
        </>
    )
}