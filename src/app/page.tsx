import BannerDiscount from "@/components/banner-discount";
import CarouselText from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import BannerProduct from "@/components/banner-product";

export default function Home() {
  return (
    <main>
    <CarouselText />
    <FeaturedProducts />
    <BannerDiscount />
    <ChooseCategory />
    <BannerProduct />
    </main>
  );
}
