import React from "react";
import useEditorStore from "../../../store/editor.tsx"; // Adjust the path as necessary

const SlashMenu = ({ query, setInputValue }) => {
  const { availableBlocks } = useEditorStore();

  const handleOnClickSlashMenuItem = (value) => {
    setInputValue((prevValue) => {
      const lastSlashIndex = prevValue.lastIndexOf("/");
      const newValue = prevValue.substring(0, lastSlashIndex + 1) + value;
      return newValue;
    });
  };

  return (
    <div
      style={{
        border: "1px solid black",
        position: "absolute",
        background: "white",
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
                    onClick={() =>
                      handleOnClickSlashMenuItem(item.attributes.label)
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
