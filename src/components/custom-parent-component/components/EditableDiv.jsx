import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import SlashMenu from "./SlashMenu.jsx";
import Tiptap from "../../tiptap/Tiptap.jsx";
import FixedMenu from "../../tiptap/FixedMenu.jsx";
import useEditorStore from "@/store/editor.tsx";

const handleMenuAction = (tiptapEditor, action, setClickedToolbar) => {
  setClickedToolbar(true);
  console.log("Inside handleMenuAction");
  if (!tiptapEditor) return;

  switch (action) {
    case "bold":
      console.log("bold fired");
      tiptapEditor.chain().focus().toggleBold().run();
      break;
    case "italic":
      tiptapEditor.chain().focus().toggleItalic().run();
      break;
    case "strike":
      tiptapEditor.chain().focus().toggleStrike().run();
      break;
    case "bullet":
      tiptapEditor.chain().focus().toggleBulletList().run();
      break;
    default:
      console.log("default case");
      break;
  }
};

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
    // Ensure event is defined
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
      console.log("returning after toolbar click");
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

  return (
    <div style={{ position: "relative" }}>
      <div>
        <FixedMenu
          onAction={(action) =>
            handleMenuAction(tiptapEditor, action, setClickedToolbar)
          }
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

// EditableDiv.propTypes = {
//   text: PropTypes.string,
//   onSave: PropTypes.func.isRequired,
//   onCancel: PropTypes.func.isRequired,
// };

// EditableDiv.defaultProps = {
//   text: "",
// };

export { EditableDiv, handleMenuAction };
