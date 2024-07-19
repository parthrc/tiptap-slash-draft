import React from "react";

const FixedMenu = ({ onAction, setClickedToolbar }) => {
  return (
    <div>
      <button
        onMouseDown={() => {
          setClickedToolbar(true);
          onAction("bold");
        }}
      >
        Bold
      </button>

      <button
        onMouseDown={() => {
          setClickedToolbar(true);
          onAction("italic");
        }}
      >
        Italic
      </button>

      <button
        onMouseDown={() => {
          setClickedToolbar(true);
          onAction("underline");
        }}
      >
        Underline
      </button>
    </div>
  );
};

export default FixedMenu;
