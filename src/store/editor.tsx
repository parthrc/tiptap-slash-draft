import { BlocksByCategory, Editor } from "grapesjs";
import { Editor as tippyEditor } from "@tiptap/core";
import { create } from "zustand";

type EditorStore = {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
  TipTapEditor: tippyEditor | null;
  setTipTapEditor: (tiptapeditor: tippyEditor) => void;
  availableBlocks: BlocksByCategory[];
  setAvailableBlocks: (blocks: BlocksByCategory[]) => void;
};

const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor: Editor) => set({ editor }),
  TipTapEditor: null,
  setTipTapEditor: (tiptapeditor: tippyEditor) => {
    set({ TipTapEditor: tiptapeditor });
  },
  availableBlocks: [],
  setAvailableBlocks: (blocks: BlocksByCategory[]) => {
    set({ availableBlocks: blocks });
  },
}));

export default useEditorStore;
