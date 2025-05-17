
import React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "../schemas/productSchema";
import { useWishlistStore } from "../store/wishlistStore";

interface LikeButtonProps {
  product: Product;
  className?: string;
}

export default function LikeButton({ product, className }: LikeButtonProps) {
  const { toggle, isWishlisted } = useWishlistStore();
  const isLiked = isWishlisted(product.id);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(product);
  };

  return (
    <button
      onClick={handleLikeToggle}
      className={cn(
        "rounded-full p-2 transition-all duration-200 hover:scale-110",
        isLiked ? "text-wishlist" : "text-gray-400",
        className
      )}
      aria-label={isLiked ? "찜 해제하기" : "찜하기"}
    >
      <Heart 
        className={cn(
          "h-5 w-5", 
          isLiked && "fill-wishlist animate-pulse-scale"
        )} 
      />
    </button>
  );
}
