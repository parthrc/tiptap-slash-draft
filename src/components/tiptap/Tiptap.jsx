"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Tiptap = ({ initialValue, onChange, onBlur, onKeyDown }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    immediatelyRender: false,
    autofocus: true,

    onUpdate({ editor }) {
      onChange(editor.getText());
    },

    // other events
  });

  // Attach event listeners to the editor DOM element
  useEffect(() => {
    if (editor) {
      editor.view.dom.addEventListener("blur", onBlur);
      editor.view.dom.addEventListener("keydown", onKeyDown);
    }

    return () => {
      if (editor) {
        editor.view.dom.removeEventListener("blur", onBlur);
        editor.view.dom.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [editor, onBlur, onKeyDown]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
