
import React from "react";
import { Product, ProductListSchema } from "../schemas/productSchema";
import { fetchProducts, fetchHotdeals } from "../api/productApi";
import { useSafeQuery } from "../hooks/useSafeQuery";
import ProductCard from "./ProductCard";

interface ProductListProps {
  type: "regular" | "hotdeal";
  title: string;
}

export default function ProductList({ type, title }: ProductListProps) {
  const {
    data,
    isLoading,
    error,
  } = useSafeQuery<Product[]>(
    [type === "regular" ? "products" : "hotdeals"],
    type === "regular" ? fetchProducts : fetchHotdeals,
    ProductListSchema,
    {
      refetchOnWindowFocus: false,
    }
  );

  // Mock data for development
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "프리미엄 블루투스 이어폰",
      description: "고품질 사운드의 무선 이어폰",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      price: 89000,
      originalPrice: 129000,
      discountRate: 31,
      isHotDeal: type === "hotdeal"
    },
    {
      id: 2,
      name: "편안한 패브릭 소파",
      description: "거실에 어울리는 모던한 소파",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      price: 450000,
      originalPrice: 600000,
      discountRate: 25,
      isHotDeal: type === "hotdeal"
    },
    {
      id: 3,
      name: "고양이 장난감 세트",
      description: "귀여운 고양이 장난감 모음",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      price: 15000,
      originalPrice: 20000,
      discountRate: 25,
      isHotDeal: type === "hotdeal"
    },
    {
      id: 4,
      name: "캠핑용 접이식 의자",
      description: "내구성 높은 야외용 의자",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a",
      price: 35000,
      originalPrice: 50000,
      discountRate: 30,
      isHotDeal: type === "hotdeal"
    }
  ];

  const products = data || mockProducts;

  if (isLoading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="p-8 bg-red-50 rounded-lg text-center">
          <p className="text-red-600">{error.message || "데이터 로딩에 실패했습니다"}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
