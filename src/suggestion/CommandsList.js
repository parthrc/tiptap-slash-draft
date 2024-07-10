import React, { useState, useEffect } from "react";
import './CommandsList.css'
function CommandList({ items, command }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0); 
  }, [items]);

  const onKeyDown = ({ event }) => {
    switch (event.key) {
      case "ArrowUp":
        upHandler();
        return true;
      case "ArrowDown":
        downHandler();
        return true;
      case "Enter":
        enterHandler();
        return true;
      default:
        return false;
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + items.length - 1) % items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  const selectItem = (index) => {
    const item = items[index];
    if (item) {
      command(item);
    }
  };

  return (
    <div className="items" onKeyDown={onKeyDown}> 
      {items.map((item, index) => (
        <button
          className={`item ${index === selectedIndex ? "is-selected" : ""}`}
          key={index}
          onClick={() => selectItem(index)}
        >
          {item.element || item.title}
        </button>
      ))}
    </div>
  );
}

export default CommandList;
