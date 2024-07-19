import React from "react";

const FixedMenu = ({ onAction, setClickedToolbar }) => {
  return (
    <div>
      <button
        onMouseDown={() => {
          onAction("bold");
        }}
      >
        Bold
      </button>

      <button
        onMouseDown={() => {
          onAction("italic");
        }}
      >
        Italic
      </button>

      <button
        onMouseDown={() => {
          onAction("underline");
        }}
      >
        Underline
      </button>
    </div>
  );
};

export default FixedMenu;
