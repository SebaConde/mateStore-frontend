//import ProductTasteOrigin from "@/components/shared/product-taste-origin";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../../../../../../hooks/use-cart";
import { useLovedProducts } from "../../../../../../hooks/use-loved-products";
import { formatPrice } from "../../../../../lib/formatPice";
import { ProductType } from "../../../../../../types/product";
import { Heart } from "lucide-react";


export type InfoProductProps = {
    product: ProductType;
}

const InfoProduct = (props: InfoProductProps) =>{
    const {product} = props;
    const {addItem} = useCart();
    const {addLovedItem} = useLovedProducts();
    const {lovedItems, toggleLoved} = useLovedProducts();
    const isLoved = lovedItems.some((item)=>item.id == product.id)
    
    return (
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
                <h1 className="text-2xl">{product.productName}</h1>
                
                {/* <ProductTasteOrigin taste={product.taste} origin={product.origin}/> */}
            </div>
            <Separator className="my-4" />
            <p>{product.description}</p>
            <Separator className="my-4"/>
            <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-5">
                <Button className="flex-1" onClick={() => addItem(product)}>Comprar</Button>
                 <Heart width={30} strokeWidth={1} 
                  className={`transition duration-300 cursor-pointer hover:fill-black ${isLoved ? 'fill-black dark:fill-white' : 'fill-none'}`}
                  onClick={() => toggleLoved(product)}/>
            </div>
           
        </div>
    );

}

export default InfoProduct;