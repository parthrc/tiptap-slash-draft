import React, { useState } from "react";
import SlashMenu from "./SlashMenu.jsx";
import Tiptap from "../../tiptap/Tiptap.jsx";

const EditableDiv = ({ text, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(text);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");

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

  const handleBlur = () => {
    if (inputValue.trim() === "") {
      onCancel();
    } else {
      onSave(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents default behavior (like newline)
      handleBlur();
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
      <Tiptap
        initialValue={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {showMenu && <SlashMenu query={query} setInputValue={handleSetInputValue} />}
    </div>
  );
};

export default EditableDiv;
