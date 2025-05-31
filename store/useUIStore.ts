import { create } from 'zustand';

interface UIState {
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const useUIStore = create<UIState>((set: (partial: Partial<UIState>) => void) => ({
  loading: false,
  error: null,
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default useUIStore;
