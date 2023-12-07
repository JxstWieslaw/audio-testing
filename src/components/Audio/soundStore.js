import { create } from "zustand";

const useSoundStore = create((set) => ({
  isPlaying: false,
  isFullControlPlaying:false,
  isSwapSourcePlaying:false,
  setFullControlPlaying: (val) => set((state) => ({ isFullControlPlaying: val })),
  setSwapSourcePlaying: (val) => set((state) => ({ isSwapSourcePlaying: val })),
  setPlaying: (val) => set((state) => ({ isPlaying: val })),
}));

export default useSoundStore;
