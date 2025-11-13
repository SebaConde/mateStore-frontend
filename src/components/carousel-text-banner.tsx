"use client"
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from 'embla-carousel-autoplay'

export const dataCarouselTop = [
    {
        id:1,
        title: "Envío en 24/48 hrs.",
        description: "Como cliente vip, tus envios en 24/48 horas.",
        link: "#",
    },
    {
        id:2,
        title: "Envío gratis en compras mayores a 4000",
        description: "Envío gratis si tu compra excede los 4000",
        link: "#",
    },
    {
        id:3,
        title: "Devoluciones y entregas gratuitas.",
        description: "Como cliente, tienes envios y devoluciones gratuitas",
        link: "#",
    },
    {
        id:4,
        title: "Comprar novedades",
        description: "Mirá los nuevos ingresos",
        link: "#",
    },
]

const CarouselText = () =>{
    const router = useRouter();
    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto"
            plugins={[
                Autoplay({
                    delay:2500
                })
            ]}>
                <CarouselContent>
                    {dataCarouselTop.map(({id,title,description,link})=>(
                    <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer" >
                        <div>
                            <Card className="shadow-none border-none bg-transparent">
                                <CardContent className="flex flex-col justify-center items-center text-center">
                                    <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                    <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default CarouselText;