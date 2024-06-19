import { create } from "zustand";

interface IShowMobileNav {
  showMobileNav: boolean;
  setShowMobileNav: (showMobileNav: boolean) => void;
}

export const useShowMobileNav = create<IShowMobileNav>((set) => ({
  showMobileNav: false,
  setShowMobileNav: (showMobileNav: boolean) => set({ showMobileNav }),
}));
