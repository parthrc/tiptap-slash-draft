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
    console.log("handleOnChange", content);
    setInputValue(content); // Save content as HTML
  };

  const handleBlur = (event) => {
    //  ensure event is defined
    if (!event) {
      console.log("Blur event is undefined");
      return;
    }
    console.log("clickedOnMenuItem", clickedOnMenuItem);
    console.log("clickedToolbar", clickedToolbar);
    if (clickedOnMenuItem) {
      setClickedOnMenuItem(false);
      return;
    }
    if (clickedToolbar) {
      console.log("retuuning after oolbar click");
      setClickedToolbar(false);

      return;
    }

    // Check if the blur event happened within the slash menu
    if (
      slashMenuRef.current &&
      slashMenuRef.current.contains(event.relatedTarget)
    ) {
      console.log("Stopping onBlur due to slash");
      return; // Stop onBlur if true
    }
    console.log("onBlur input value", inputValue);
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
    setClickedToolbar(true);
    console.log("Inside handlemenuAction");
    if (!tiptapEditor) return;

    switch (action) {
      case "bold":
        console.log("bold fired");
        tiptapEditor.chain().focus().toggleBold().run();
        break;
      case "italic":
        tiptapEditor.chain().focus().toggleItalic().run();

        break;
      case "underline":
        // tiptapEditor.chain().focus().toggleUnderline().run();
        break;
      default:
        console.log("default case");
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
            setShowMenu={setShowMenu}
            showMenu={showMenu}
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
