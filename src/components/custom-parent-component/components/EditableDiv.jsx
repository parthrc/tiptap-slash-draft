import React, { useState, useRef } from "react";
import SlashMenu from "./SlashMenu.jsx";
import Tiptap from "../../tiptap/Tiptap.jsx";
import FixedMenu from "../../tiptap/FixedMenu.jsx";
import useEditorStore from "@/store/editor.tsx";

const EditableDiv = ({ text, onSave, onCancel }) => {
  const { tiptapEditor } = useEditorStore();
  const [inputValue, setInputValue] = useState(text);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [clickedOnMenuItem, setClickedOnMenuItem] = useState(false);
  const [clickedToolbar, setClickedToolbar] = useState(false);
  const slashMenuRef = useRef(null);
  const editorRef = useRef(null);

  const handleInputChange = (content) => {
    console.log("content", content);
    setInputValue(content); // Save content as HTML
    const lastSlashIndex = content.lastIndexOf("/");
    console.log("lastSlashIndex", lastSlashIndex);
    if (lastSlashIndex !== -1) {
      setShowMenu(true);
      setQuery(content.substring(lastSlashIndex + 1));
    } else {
      setShowMenu(false);
    }
  };

  const handleBlur = (event) => {
    // Safeguard to ensure event is defined
    if (!event) {
      console.warn("Blur event is undefined");
      return;
    }

    if (clickedOnMenuItem || clickedToolbar) {
      setClickedOnMenuItem(false);
      setClickedToolbar(false);
      return;
    }

    // Check if the blur event happened within the slash menu
    if (
      slashMenuRef.current &&
      slashMenuRef.current.contains(event.relatedTarget)
    ) {
      return; // Stop onBlur if true
    }

    if (inputValue.trim() === "") {
      onCancel();
    } else {
      onSave(inputValue); // Save the content with formatting
    }
  };

  const handleSetInputValue = (value) => {
    const lastSlashIndex = inputValue.lastIndexOf("/");
    const newValue = inputValue.substring(0, lastSlashIndex + 1) + value;
    setInputValue(newValue);
    setShowMenu(false);
  };

  const handleMenuAction = (action) => {
    if (!tiptapEditor) return;

    switch (action) {
      case "bold":
        tiptapEditor.chain().focus().toggleBold().run();
        break;
      case "italic":
        tiptapEditor.chain().focus().toggleItalic().run();
        break;
      case "underline":
        // Add underline functionality if you have the underline extension
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
            onItemClick={setClickedOnMenuItem}
          />
        </div>
      )}
    </div>
  );
};

export default EditableDiv;
