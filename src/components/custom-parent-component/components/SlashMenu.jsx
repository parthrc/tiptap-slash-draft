import React from "react";
import useEditorStore from "../../../store/editor.tsx"; // Adjust the path as necessary
import {
  coreReactModel,
  coreReactView,
} from "@/grapesjs-core/react-components.js";
import CustomGrapesjsParent from "../custom-grapesjs-parent.jsx";

const SlashMenu = ({ query, setInputValue, setShowMenu }) => {
  const { availableBlocks, editor } = useEditorStore();

  const handleOnClickSlashMenuItem = (value) => {
    console.log("Clicked on slash menu item", value);

    setShowMenu(false);
    // create a jsx component from the component ID
    const jsxComponent = React.createElement(value);
    console.log("componentName", typeof jsxComponent);

    editor.addComponents(jsxComponent);
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
        if (block.category) {
          console.log(block.category.attributes.label, "Block=", block.items);
        }
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
                    onClick={() =>
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
