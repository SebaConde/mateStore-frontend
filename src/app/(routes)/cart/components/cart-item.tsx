import ProductImage from "../../../../components/shared/product-image";
import { useCart } from "../../../../../hooks/use-cart";
import { formatPrice } from "../../../../lib/formatPice";
import { cn } from "@/lib/utils";
import { ProductType } from "../../../../../types/product";
import { Trash2 } from "lucide-react";
 
interface CartItemProps{
    product: ProductType
}

const CartItem = (props:CartItemProps) =>{
    const {product} = props;
    const {removeItem} = useCart();
    return(
       <li className="flex py-6 border-b">
        <ProductImage url={product.images[0].url} slug={product.slug} />
        <div className="flex justify-between flex-1 px-6">
            <div>
                <h2 className="text-lg font-bold">{product.productName}</h2>
                <p className="font-bold">{formatPrice(product.price)}</p>
            </div>
            <div>
                <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition cursor-pointer")}>
                    <Trash2 size={20} onClick={()=> removeItem(product.id)} />
                </button>
            </div>
        </div>

       </li>
    )
}

export default CartItem;