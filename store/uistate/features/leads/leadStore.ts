import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LeadStore {
  selectedRows: string[];
  setSelectedRows: (rows: string[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  clearSelection: () => void;
}

export const useLeadStore = create<LeadStore>()(
  persist(
    (set) => ({
      selectedRows: [],
      setSelectedRows: (rows) => set({ selectedRows: rows }),
      currentPage: 1,
      setCurrentPage: (page) => {
        set({ currentPage: page });
      },
      clearSelection: () => set({ selectedRows: [] }),
    }),
    {
      name: 'lead-store', // unique name for localStorage key
      partialize: (state) => ({
        currentPage: state.currentPage,
        selectedRows: state.selectedRows,
      }), // only persist these fields
    },
  ),
);
