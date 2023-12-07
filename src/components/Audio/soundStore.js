import { create } from "zustand";

const useSoundStore = create((set) => ({
  isPlaying: false,
  setPlaying: (val) => set((state) => ({ isPlaying: val })),
}));

export default useSoundStore;
