import { create } from 'zustand';

interface LeadStore {
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  clearSelection: () => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  selectedRows: [],
  setSelectedRows: (rows) => set({ selectedRows: rows }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  clearSelection: () => set({ selectedRows: [] }),
}));
