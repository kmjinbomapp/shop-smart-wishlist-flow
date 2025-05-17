
import React from "react";
import HotdealTimer from "../components/HotdealTimer";
import ProductList from "../components/ProductList";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlistStore } from "../store/wishlistStore";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { items } = useWishlistStore();

  return (
    <div className="container max-w-6xl mx-auto py-6 px-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">쇼핑 서비스</h1>
        <Link to="/wishlist">
          <Button variant="outline" className="relative">
            <Heart className="h-5 w-5" />
            <span className="ml-2">찜한 상품</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-wishlist text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </Link>
      </header>

      <section className="mb-8">
        <HotdealTimer />
      </section>

      <ProductList type="hotdeal" title="오늘의 핫딜" />
      <ProductList type="regular" title="투데이 추천 상품" />
    </div>
  );
}
