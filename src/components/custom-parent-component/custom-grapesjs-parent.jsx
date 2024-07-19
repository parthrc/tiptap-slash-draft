import { useEffect, useRef, useState } from "react";
import "./custom-grapesjs-parent.css";
import EditableDiv from "./components/EditableDiv.jsx";

const CustomGrapesjsParent = () => {
  const [divs, setDivs] = useState([
    "example component 1",
    "example component 2",
    "example component 3",
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const parentRef = useRef();
  const divRefs = useRef([]);

  useEffect(() => {
    divRefs.current = divRefs.current.slice(0, divs.length);
  }, [divs]);

  const handleParentClick = (e) => {
    if (e.target !== parentRef.current) {
      return;
    }
    const parentRect = parentRef.current.getBoundingClientRect();
    const clickY = e.clientY - parentRect.top;
    let insertIndex = divs.length;

    for (let i = 0; i < divRefs.current.length; i++) {
      const div = divRefs.current[i];
      const divRect = div.getBoundingClientRect();
      if (clickY < divRect.top) {
        insertIndex = i;
        break;
      }
    }

    setDivs((prevDivs) => {
      const newDivs = [
        ...prevDivs.slice(0, insertIndex),
        "",
        ...prevDivs.slice(insertIndex),
      ];
      setEditingIndex(insertIndex);
      return newDivs;
    });
  };

  const handleSave = (index, newText) => {
    console.log("newText", newText);
    setDivs((prevDivs) =>
      prevDivs.map((div, i) => (i === index ? newText : div))
    );
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setDivs((prevDivs) =>
      prevDivs.filter((_, index) => index !== editingIndex)
    );
    setEditingIndex(null);
  };

  return (
    <div
      ref={parentRef}
      onClick={handleParentClick}
      style={{
        border: "1px solid black",
        padding: "10px",
        position: "relative",
      }}
    >
      {divs.map((div, index) => (
        <div
          key={index}
          ref={(el) => (divRefs.current[index] = el)}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: "lightgray",
          }}
        >
          {editingIndex === index ? (
            <EditableDiv
              text={div}
              onSave={(newText) => handleSave(index, newText)}
              onCancel={handleCancel}
            />
          ) : (
            div || ""
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomGrapesjsParent;
