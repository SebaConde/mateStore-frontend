/* eslint-disable @typescript-eslint/no-unused-expressions */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { ProductType } from "../types/product";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType) => void; //Funcion
  removeItem: (id: number) => void;
  removeAll: () => void;
}
 
export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("El producto ya existe en el carrito", {
            icon: <AlertTriangle className="text-yellow-500" />,
            style: {
              background: "#FEF3C7",
              color: "#92400E",
              border: "1px solid #FCD34D",
            },
          });
        } else {
          set({
            items: [...get().items, data],
          });
          toast("Producto añadido al carrito🛍️");
        }
      },

      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id != id)] }),
          toast("Articulo eliminado del carrito de compras");
      },

      removeAll: () => {
        set({ items: [] }),
          toast("Todos los articulos del carrito fueron eliminados.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);