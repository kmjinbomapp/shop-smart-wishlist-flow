
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Check, X } from "lucide-react";
import { useWishlistStore } from "../store/wishlistStore";
import { toast } from 'sonner';

export default function EditToolbar() {
  const {
    isEditMode,
    setEditMode,
    selectedIds,
    removeSelected,
    selectAll,
    clearSelection,
    items
  } = useWishlistStore();

  const handleEdit = () => {
    setEditMode(true);
    toast.info("편집 모드가 활성화되었습니다");
  };

  const handleCancel = () => {
    setEditMode(false);
    toast.info("편집 모드가 비활성화되었습니다");
  };

  const handleRemove = () => {
    if (selectedIds.length === 0) {
      toast.warning("선택된 상품이 없습니다");
      return;
    }

    removeSelected();
    toast.success(`${selectedIds.length}개의 상품이 찜 목록에서 제거되었습니다`);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      clearSelection();
    } else {
      selectAll();
    }
  };

  if (!isEditMode) {
    return (
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleEdit} className="flex items-center">
          <Edit className="mr-2 h-4 w-4" />
          편집
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between mb-4 flex-wrap gap-2">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
        >
          {selectedIds.length === items.length ? '선택 해제' : '전체 선택'}
        </Button>
        <span className="text-sm text-muted-foreground">
          {selectedIds.length}개 선택됨
        </span>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRemove}
          disabled={selectedIds.length === 0}
        >
          <Trash className="mr-2 h-4 w-4" />
          삭제
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
        >
          <X className="mr-2 h-4 w-4" />
          취소
        </Button>
      </div>
    </div>
  );
}
