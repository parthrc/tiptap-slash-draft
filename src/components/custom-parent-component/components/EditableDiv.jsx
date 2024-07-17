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

  const handleSave = () => {
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

  return (
    <div style={{ position: "relative" }}>
      <Tiptap initialValue={inputValue} onChange={handleInputChange} />
      {showMenu && (
        <SlashMenu
          query={query}
          setInputValue={handleSetInputValue}
          setShowMenu={setShowMenu}
        />
      )}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditableDiv;
