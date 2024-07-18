import React, { useRef, useState } from "react";
import SlashMenu from "./SlashMenu.jsx";
import Tiptap from "../../tiptap/Tiptap.jsx";

const EditableDiv = ({ text, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(text);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const slashMenuRef = useRef(null);

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
    if (!event) return;
    if (
      slashMenuRef.current &&
      slashMenuRef.current.contains(event.relatedTarget)
    ) {
      return;
    }
    if (inputValue.trim() === "") {
      onCancel();
    } else {
      onSave(inputValue);
    }
  };

  // const handleSave = () => {
  //   if (inputValue.trim() === "") {
  //     onCancel();
  //   } else {
  //     onSave(inputValue);
  //   }
  // };

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
      />
      {showMenu && (
        <div ref={slashMenuRef}>
          <SlashMenu
            query={query}
            setInputValue={handleSetInputValue}
            setShowMenu={setShowMenu}
          />
        </div>
      )}
    </div>
  );
};

export default EditableDiv;
