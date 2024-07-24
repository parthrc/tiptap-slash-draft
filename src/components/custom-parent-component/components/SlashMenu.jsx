import React, { useState } from "react";
import useEditorStore from "../../../store/editor.tsx";
import { type } from "os";
import { handleMenuAction } from "./EditableDiv.jsx";

const slashMenuItems = [
  { label: "label ", type: "block", data: {} },
  { label: "label ", type: "rte", data: {} },
];

const SlashMenu = ({ query, setInputValue, setShowMenu, onItemClick }) => {
  const { availableBlocks, editor } = useEditorStore();

  const handleOnClickSlashMenuItem = (value) => {
    console.log("Clicked on slash menu item", value);
    // check type of clicked item and proceed accordingly

    // if custom component
    if (value.type === "custom-component") {
      // Create a JSX component from the component ID
      const jsxComponent = React.createElement(value.component_id);
      editor.addComponents(jsxComponent);
    }

    // if tiptap menu item
    if (value.type === "rte") {
      handleMenuAction(value.label);
    }
    // Notify EditableDiv that a menu item was clicked
    onItemClick(true);
    // close slash menu
    setShowMenu(false);
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
        // console.log("block=", block.label);
        return (
          <div
            key={index}
            style={{ padding: "5px", cursor: "pointer" }}
            onMouseDown={() => handleOnClickSlashMenuItem(block)}
          >
            {block.label}
          </div>
        );
      })}
      {/* {availableBlocks.map((block, index) => {
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
      })} */}
    </div>
  );
};

export default SlashMenu;
