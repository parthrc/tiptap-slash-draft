import React, { useState, useRef, useEffect } from "react";
import SlashMenu from "./SlashMenu.jsx";

const EditableDiv = ({ text, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(text);
  // state for slash menu
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  // automatically focus on input element creation
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // check if '/' was typed
    const lastSlashIndex = value.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      setShowMenu(true);
      setQuery(value.substring(lastSlashIndex + 1));
    } else {
      setShowMenu(false);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowMenu(false);
      if (inputValue.trim() === "") {
        onCancel();
      } else {
        onSave(inputValue);
      }
    }, 200);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  // setInputValue when using slash menu
  const handleSetInputValue = (value) => {
    // get index of slash
    const lastSlashIndex = inputValue.lastIndexOf("/");
    const newValue = inputValue.substring(0, lastSlashIndex + 1) + value;
    setInputValue(newValue);
    setShowMenu(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        id="custom-input"
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
      />
      {showMenu && (
        <SlashMenu query={query} setInputValue={handleSetInputValue} />
      )}
    </div>
  );
};

export default EditableDiv;
