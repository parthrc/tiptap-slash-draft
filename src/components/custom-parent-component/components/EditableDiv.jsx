import React, { useState, useRef, useEffect } from "react";

const EditableDiv = ({ text, onSave, onCancel }) => {
  const [inputValue, setInputValue] = useState(text);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (inputValue.trim() === "") {
      onCancel();
    } else {
      onSave(inputValue);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <input
      id="custom-input"
      type="text"
      ref={inputRef}
      value={inputValue}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onKeyDown={handleInputKeyDown}
    />
  );
};

export default EditableDiv;
