
import React from "react";
import { cn } from "@/lib/utils";
import { Product } from "../schemas/productSchema";
import LikeButton from "./LikeButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useWishlistStore } from "../store/wishlistStore";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  isWishlistPage?: boolean;
}

export default function ProductCard({ product, isWishlistPage = false }: ProductCardProps) {
  const { id, name, image, price, originalPrice, discountRate, isHotDeal } = product;
  const { isEditMode, selectedIds, toggleSelect } = useWishlistStore();
  
  const isSelected = selectedIds.includes(id);
  
  const handleCardClick = () => {
    if (isEditMode && isWishlistPage) {
      toggleSelect(id);
    } else {
      toast.info(`${name} 상품 상세페이지로 이동합니다`);
    }
  };
  
  const formattedPrice = new Intl.NumberFormat('ko-KR').format(price);
  const formattedOriginalPrice = originalPrice 
    ? new Intl.NumberFormat('ko-KR').format(originalPrice)
    : null;
  
  return (
    <div 
      className={cn(
        "relative group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300",
        isEditMode && isWishlistPage && "cursor-pointer",
        isSelected && "ring-2 ring-primary bg-primary/5"
      )}
      onClick={handleCardClick}
    >
      {isEditMode && isWishlistPage && (
        <div className="absolute top-2 right-2 z-10">
          <Checkbox checked={isSelected} />
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image || "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        
        {!isEditMode && (
          <div className="absolute top-2 right-2">
            <LikeButton product={product} />
          </div>
        )}
        
        {isHotDeal && (
          <div className="absolute top-2 left-2 bg-hotdeal text-white px-2 py-1 text-xs font-bold rounded-md animate-hotdeal-pulse">
            핫딜
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2 h-10">
          {name}
        </h3>
        
        <div className="mt-2">
          {discountRate && (
            <span className="text-hotdeal font-bold mr-1">{discountRate}%</span>
          )}
          <span className="font-bold">{formattedPrice}원</span>
          
          {formattedOriginalPrice && (
            <span className="text-gray-400 text-sm line-through ml-1">
              {formattedOriginalPrice}원
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
