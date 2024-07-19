import React, { useRef, useState } from "react";
import SlashMenu from "./SlashMenu.jsx";
import Tiptap from "../../tiptap/Tiptap.jsx";
import FixedMenu from "../../tiptap/FixedMenu.jsx";
import useEditorStore from "@/store/editor.tsx";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const EditableDiv = ({ text, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(text);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  // State to track menu item clicks
  const [clickedOnMenuItem, setClickedOnMenuItem] = useState(false);
  // state to track toolbar clicks
  const [clickedToolbar, setClickedToolbar] = useState(false);
  const slashMenuRef = useRef(null);
  const editorRef = useRef(null);
  // current tiptap instance
  const editor = useEditor();

  const handleInputChange = (content) => {
    setInputValue(content);
    const lastSlashIndex = content.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      setShowMenu(true);
      setQuery(content.substring(lastSlashIndex + 1));
    } else {
      setShowMenu(false);
    }
  };

  const handleBlur = (event) => {
    console.log("Inside onBlur");
    console.log("clickedOnMenuItem", clickedOnMenuItem);
    console.log("clickedToolbar", clickedToolbar);
    // Check if a menu item was clicked
    if (clickedOnMenuItem || clickedToolbar) {
      // Reset clickedOnMenuItem flag
      setClickedOnMenuItem(false);
      setClickedToolbar(false);
      return; // Skip handling onBlur
    }

    // Check if click happened inside the slash menu
    if (
      slashMenuRef.current &&
      slashMenuRef.current.contains(event.relatedTarget)
    ) {
      return; // Strop onBlur if true
    }

    // Handel save or cancel based on input value
    if (inputValue.trim() === "") {
      onCancel();
    } else {
      onSave(inputValue);
    }
  };

  const handleSetInputValue = (value) => {
    const lastSlashIndex = inputValue.lastIndexOf("/");
    const newValue = inputValue.substring(0, lastSlashIndex + 1) + value;
    setInputValue(newValue);
    setShowMenu(false);
  };

  const handleMenuAction = (action) => {
    console.log("Inside toolbar handle");

    switch (action) {
      case "bold":
        console.log(editor);
        console.log("bold clikced", editor.chain);

        // editor.editor.
        break;
      case "italic":
        editor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        // myeditor.chain().focus().toggleUnderline().run();
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        <FixedMenu
          onAction={handleMenuAction}
          setClickedToolbar={setClickedToolbar}
        />
        <div ref={editorRef}>
          <Tiptap
            initialValue={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      {showMenu && (
        <div ref={slashMenuRef}>
          <SlashMenu
            query={query}
            setInputValue={handleSetInputValue}
            setShowMenu={setShowMenu}
            onItemClick={setClickedOnMenuItem} // Pass function to set clickedOnMenuItem
          />
        </div>
      )}
    </div>
  );
};

export default EditableDiv;
