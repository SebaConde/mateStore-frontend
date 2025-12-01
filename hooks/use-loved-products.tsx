import { create } from "zustand";
import { persist,createJSONStorage } from "zustand/middleware";
import { ProductType } from "../types/product";
import { toast } from "sonner";  
import { AlertTriangle } from "lucide-react";

interface UseLovedProductsType{
    lovedItems: ProductType[],
    addLovedItem: (data: ProductType) => void,
    removeLovedItem: (id:number) => void,   
    toggleLoved: (product: ProductType) => void;
}

export const useLovedProducts = create(persist<UseLovedProductsType>((set,get)=>({
    lovedItems: [],
    toggleLoved: (product:ProductType) => {
        const current = get().lovedItems;
        const alreadyLoved = current.some((item) => item.id === product.id);

        if (alreadyLoved) {
          // si ya está → lo saco
          set({ lovedItems: current.filter((item) => item.id !== product.id) });
          toast("Producto eliminado de la lista💔")
        } else {
          // si no está → lo agrego
          set({ lovedItems: [...current, product] });
          toast("Producto añadido a la lista❤️");
        }
      },
    addLovedItem:(data: ProductType) =>{
        const currentLovedItem = get().lovedItems;
        const existingItem = currentLovedItem.find((item)=>item.id == data.id);

        if (existingItem) {
            return toast("El producto ya está en la lista", {
            icon: <AlertTriangle className="text-yellow-500" />,
            style: {
              background: "#FEF3C7",
              color: "#92400E",
              border: "1px solid #FCD34D",
            },
          });
        } else {
            set({
                lovedItems: [...get().lovedItems, data]
            })
            toast("Producto añadido a la lista❤️");
        }
    },
    removeLovedItem:(id:number)=>{
        set({lovedItems: [...get().lovedItems.filter((item)=>item.id != id)]})
        toast("Producto eliminado de la lista💔")
    },
}),{
    name:'loved-products-storage',
    storage: createJSONStorage(()=>localStorage)
}))