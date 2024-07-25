// store.js
import create from "zustand";

const useRefStore = create((set) => ({
  myRef: null,
  setMyRef: (ref) => set({ myRef: ref }),
}));

export default useRefStore;
