"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Tiptap = ({ initialValue, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    immediatelyRender: false,
    autofocus: true,
    onBlur({ editor, event }) {
      event.preventDefault();
    },

    onUpdate({ editor }) {
      onChange(editor.getText());
    },
  });

  return <EditorContent editor={editor} style={{ border: "2px solid red" }} />;
};

export default Tiptap;
