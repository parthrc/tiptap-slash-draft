import { Editor as TiptapEditor } from "@tiptap/core";
import { Editor as GrapesJSEditor, BlocksByCategory } from "grapesjs";
import { create } from "zustand";

type EditorStore = {
  editor: GrapesJSEditor | null;
  setEditor: (editor: GrapesJSEditor) => void;
  tiptapEditor: TiptapEditor | null;
  setTiptapEditor: (tiptapEditor: TiptapEditor) => void;
  availableBlocks: [];
  setAvailableBlocks: (blocks: []) => void;
};

const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor: GrapesJSEditor) => set({ editor }),
  tiptapEditor: null,
  setTiptapEditor: (tiptapEditor: TiptapEditor) => set({ tiptapEditor }),
  availableBlocks: [],
  setAvailableBlocks: (blocks: []) => set({ availableBlocks: blocks }),
}));

export default useEditorStore;
