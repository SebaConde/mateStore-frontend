"use client"
import { useLovedProducts } from "../../../../hooks/use-loved-products"
import LovedItem from "../loved-products/components/loved-item";

export default function Page() {
    const {lovedItems} = useLovedProducts();

    return(
        <div className="max-w-4xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
            <h1 className="sm:text-2xl"> 
                Productos que te gustan
            </h1>
            <div className="">
                <div>
                    {lovedItems.length==0 &&(
                        <p>No hay productos en la lista💔</p>
                    )}
                    <ul>
                        {lovedItems.map((item)=>(
                            <LovedItem key={item.id} product={item}/>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    )
}