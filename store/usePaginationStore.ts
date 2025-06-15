import { create } from 'zustand';

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  resetPagination: () => void;
}

const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  itemsPerPage: 9,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setItemsPerPage: (items: number) => set({ itemsPerPage: items, currentPage: 1 }),
  resetPagination: () => set({ currentPage: 1 }),
}));

export default usePaginationStore;
