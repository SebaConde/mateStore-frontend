/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
interface ProductImage{
    url:string,
    slug: string,
}

 const ProductImage= (product:ProductImage) =>{
    const router = useRouter ();
    const {url,slug} = product;
     
    return(
        <div onClick={()=> router.push(`/product/${slug}`)} className="cursor-pointer">
            <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`} 
            alt="product image" 
            className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32" />
        </div>

    )
 }

 export default ProductImage;