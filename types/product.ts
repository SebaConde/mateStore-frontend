export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  images: {
    id: number;
    url: string;
  }[];
  active: boolean;
  isFeatured: boolean;
  price: number;
  tipo: string;
  category: {
    id: number;
    slug: string;
    categoryName: string;
  };
};
