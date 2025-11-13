/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetFeaturedProducts } from "../../api/useGetFeaturedProducts";
import { ResponseType } from "../../types/response";
import IconButton from "./shared/icon-button";

import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "./ui/carousel";

import { Card, CardContent } from "./ui/card";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import SkeletonSchema from "./skeletonSchema"; 
import { ProductType } from "../../types/product";

const FeaturedProducts = () => {
  const { result, loading }:ResponseType= useGetFeaturedProducts();

  const router = useRouter();
  
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos destacados</h3>

      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {result != null &&
            result.map((product: ProductType) => {
              const { id, slug, images, productName, price, tipo, category } = product;

              return (
                <CarouselItem key={id} className="md:basis-1/2 lg:basis-1/3 group">
                  <div className="p-1 ">
                    <Card className=" py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${images[0].url}`} alt="Image featured" height={400} width={400}/>
                        <div className="absolute w-full px-6 bottom-5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition duration-200">
                          <div className="flex justify-center gap-x-6">
                            <IconButton onclick={() => router.push(`product/${slug}`)} icon={<Expand size={20} />} className="text-gray-600" />
                            <IconButton onclick={() => console.log('carrito')} icon={<ShoppingCart size={20} />} className="text-gray-600"/>
                          </div>
                        </div>
                      </CardContent>
                      {/* <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">{productName}</h3>
                        <ProductTasteOrigin taste={product.taste} origin={product.origin}/>
                      </div> */}
                      
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
