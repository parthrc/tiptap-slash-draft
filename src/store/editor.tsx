import { BlocksByCategory, Editor } from "grapesjs";
import { create } from "zustand";

type EditorStore = {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
  availableBlocks: BlocksByCategory[];
  setAvailableBlocks: (blocks: BlocksByCategory[]) => void;
};

const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor: Editor) => set({ editor }),
  availableBlocks: [],
  setAvailableBlocks: (blocks: BlocksByCategory[]) => {
    set({ availableBlocks: blocks });
    console.log("Blocks set in store =", blocks);
  },
}));

export default useEditorStore;
