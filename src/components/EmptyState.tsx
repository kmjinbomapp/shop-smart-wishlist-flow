
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  type: "wishlist";
  message?: string;
}

export default function EmptyState({ type, message }: EmptyStateProps) {
  const navigate = useNavigate();
  
  const renderEmptyWishlist = () => (
    <>
      <Heart className="h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-xl font-semibold mb-2">
        {message || "찜한 상품이 없습니다"}
      </h2>
      <p className="text-muted-foreground mb-6">상품을 찜하면 여기에 표시됩니다</p>
      <Button onClick={() => navigate("/")}>
        쇼핑하러 가기
      </Button>
    </>
  );
  
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-gray-50">
      {type === "wishlist" && renderEmptyWishlist()}
    </div>
  );
}
