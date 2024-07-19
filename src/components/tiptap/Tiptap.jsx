"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import useEditorStore from "@/store/editor.tsx";

const Tiptap = ({ initialValue, onChange, onBlur }) => {
  const { setTiptapEditor } = useEditorStore();

  const tiptapEditor = useEditor({
    extensions: [StarterKit],
    content: initialValue, // Ensure initial content is set correctly
    autofocus: true,
    onUpdate({ editor }) {
      onChange(editor.getText()); // Get HTML to preserve formatting
    },
    onBlur({ editor, event }) {
      event.preventDefault();
      onBlur(event);
    },
  });

  useEffect(() => {
    if (tiptapEditor) {
      setTiptapEditor(tiptapEditor);
    }
  }, [tiptapEditor, setTiptapEditor]);

  return (
    <EditorContent editor={tiptapEditor} style={{ border: "2px solid red" }} />
  );
};

export default Tiptap;
