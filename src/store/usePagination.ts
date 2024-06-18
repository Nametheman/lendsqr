import { create } from "zustand";

interface IPagination {
  page: number;
  setPage: (page: number) => void;
  data: any[];
  setData: (data: any[]) => void;
  showPerPage: number;
  setShowPerPage: (showPerPage: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export const usePagination = create<IPagination>((set) => ({
  page: 1,
  setPage: (page: number) => set({ page }),
  data: [],
  setData: (data: any[]) => set({ data }),
  showPerPage: 10,
  setShowPerPage: (showPerPage: number) => set({ showPerPage }),
  currentPage: 1,
  setCurrentPage: (currentPage: number) => set({ currentPage }),
}));
