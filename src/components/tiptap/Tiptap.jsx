"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import useEditorStore from "@/store/editor.tsx";

const Tiptap = ({ initialValue, onChange, onBlur, setShowMenu, showMenu }) => {
  const { setTiptapEditor } = useEditorStore();

  const tiptapEditor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    autofocus: true,
    onUpdate({ editor }) {
      // console.log("tiptap onUpdate fired");
      const content = editor.getText(); // Get plain text content

      // console.log("editor content", content);
      // console.log("show menu", showMenu);
      // console.log("endsWith", content.endsWith("/"));
      // Check if content ends with a single slash
      if (content.endsWith("/")) {
        setShowMenu(true);
        return;
      } else {
        setShowMenu(false);
      }

      // Call onChange with HTML content if not showing menu
      if (!showMenu) {
        onChange(editor.getHTML()); // Use HTML content for saving
      }
    },
    onBlur({ editor, event }) {
      console.log("tiptap onBlur fired");
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
