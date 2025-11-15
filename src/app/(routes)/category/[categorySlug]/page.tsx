"use client";
import { useGetCategoryProducts } from "../../../../../api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { ResponseType } from "../../../../../types/response";
import { useParams, useRouter } from "next/navigation";
import FilterType from "@/app/(routes)/category/[categorySlug]/components/filter-type";

import SkeletonSchema from "@/components/skeletonSchema";
import { ProductType } from "../../../../../types/product";
import { useState } from "react";
import { Filter } from "lucide-react";
import FiltersControlCategory from "./components/filters-control-category";
import ProductCard from "./components/product-card";

export default function Page() {
  const params = useParams();
  const { categorySlug } = params;
  const normalizedSlug = Array.isArray(params.categorySlug)
    ? params.categorySlug[0]
    : params.categorySlug ?? "";

  const { result, loading }: ResponseType = useGetCategoryProducts(normalizedSlug);
  
  // Verificar que result tenga datos y que el primer producto tenga la categoría correcta
  const hasValidData = result != null && !loading && Array.isArray(result) && result.length > 0;
  const categoryName = hasValidData ? result[0]?.category?.categoryName : null;

  const [filterType, setFilterType] = useState('')
  const filteredProducts = result != null && !loading &&(
    filterType == '' ? result : result.filter((product:ProductType)=>product.tipo == filterType)
  )

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {loading && (
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded" />
      )}
      
      {!loading && categoryName && (
        <h1 className="text-3xl font-medium">
          Cafe {categoryName}
        </h1>
      )}
      
      {!loading && !categoryName && hasValidData && (
        <h1 className="text-3xl font-medium">
          Cafe
        </h1>
      )}
      
      {!loading && result && result.length === 0 && (
        <h1 className="text-3xl font-medium">
          No hay productos en esta categoría
        </h1>
      )}
      <Separator />
       <div className="sm:flex sm:justify-between sm:gap-4">
        <div className="flex flex-col gap-2">  
          <FiltersControlCategory setFilterType={setFilterType} />
        </div>

       <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
          {loading && <SkeletonSchema grid={3} />}
          {filteredProducts != null && !loading && filteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          {filteredProducts != null && !loading && filteredProducts.length === 0 && (
              <p>NO hay productos con ese filtro que intentas aplicar.</p>
            )}
        </div> 
      </div> 
    </div>
  );
}