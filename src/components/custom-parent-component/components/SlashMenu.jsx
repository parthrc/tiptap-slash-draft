import React, { useState } from "react";
import useEditorStore from "../../../store/editor.tsx";

const SlashMenu = ({ query, setInputValue, setShowMenu, onItemClick }) => {
  const { availableBlocks, editor } = useEditorStore();

  const handleOnClickSlashMenuItem = (value) => {
    console.log("Clicked on slash menu item", value);

    setShowMenu(false);

    // Create a JSX component from the component ID
    const jsxComponent = React.createElement(value);

    editor.addComponents(jsxComponent);

    // Notify EditableDiv that a menu item was clicked
    onItemClick(true);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        position: "absolute",
        background: "white",
        zIndex: "99999",
      }}
    >
      {availableBlocks.map((block, index) => {
        if (
          block.category &&
          block.category.attributes.label
            .toLowerCase()
            .includes(query.toLowerCase())
        ) {
          return (
            <div key={index} style={{ padding: "5px" }}>
              <div style={{ padding: "5px", fontWeight: "bold" }}>
                {block.category.attributes.label}
              </div>
              {block.items &&
                block.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ padding: "3px", cursor: "pointer" }}
                    onMouseDown={() =>
                      handleOnClickSlashMenuItem(item.attributes.id)
                    }
                  >
                    {item.attributes.label}
                  </div>
                ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default SlashMenu;
