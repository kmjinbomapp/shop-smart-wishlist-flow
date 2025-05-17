
import React from "react";
import { useWishlistStore } from "../store/wishlistStore";
import EditToolbar from "../components/EditToolbar";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className="container max-w-6xl mx-auto py-6 px-4">
      <header className="flex items-center mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">찜한 상품</h1>
      </header>

      {items.length > 0 ? (
        <>
          <EditToolbar />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlistPage={true}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState type="wishlist" />
      )}
    </div>
  );
}
