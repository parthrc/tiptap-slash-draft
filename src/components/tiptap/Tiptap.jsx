"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({ initialValue, onChange, onBlur }) => {
  const tiptapeditor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    immediatelyRender: false,
    autofocus: true,
    onUpdate({ editor }) {
      onChange(editor.getText());
    },

    onBlur({ editor, event }) {
      event.preventDefault();
      onBlur();
    },
  });

  return (
    <EditorContent editor={tiptapeditor} style={{ border: "2px solid red" }} />
  );
};

export default Tiptap;
