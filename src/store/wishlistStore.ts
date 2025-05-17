
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../schemas/productSchema';

interface WishlistState {
  items: Product[];
  isEditMode: boolean;
  selectedIds: number[];
  toggle: (product: Product) => void;
  isWishlisted: (id: number) => boolean;
  setEditMode: (status: boolean) => void;
  toggleSelect: (id: number) => void;
  selectAll: () => void;
  clearSelection: () => void;
  removeSelected: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isEditMode: false,
      selectedIds: [],
      
      toggle: (product) => {
        const isWishlisted = get().items.some(item => item.id === product.id);
        
        if (isWishlisted) {
          set({ items: get().items.filter(item => item.id !== product.id) });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      
      isWishlisted: (id) => {
        return get().items.some(item => item.id === id);
      },
      
      setEditMode: (status) => {
        set({ isEditMode: status });
        if (!status) {
          set({ selectedIds: [] });
        }
      },
      
      toggleSelect: (id) => {
        const { selectedIds } = get();
        const isSelected = selectedIds.includes(id);
        
        if (isSelected) {
          set({ selectedIds: selectedIds.filter(itemId => itemId !== id) });
        } else {
          set({ selectedIds: [...selectedIds, id] });
        }
      },
      
      selectAll: () => {
        const allIds = get().items.map(item => item.id);
        set({ selectedIds: allIds });
      },
      
      clearSelection: () => {
        set({ selectedIds: [] });
      },
      
      removeSelected: () => {
        const { selectedIds, items } = get();
        if (selectedIds.length === 0) return;
        
        const filteredItems = items.filter(item => !selectedIds.includes(item.id));
        set({ items: filteredItems, selectedIds: [] });
      }
    }),
    { name: 'wishlist-storage' }
  )
);
