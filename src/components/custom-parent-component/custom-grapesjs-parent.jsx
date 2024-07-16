import { useEffect, useRef, useState } from "react";
import "./custom-grapesjs-parent.css";
import EditableDiv from "./components/EditableDiv.jsx";

const demottexts = [];

const CustomGrapesjsParent = () => {
  const [divs, setDivs] = useState(["Div 1", "Div 2", "Div 3"]);
  // Track the index of the div being edited
  const [editingIndex, setEditingIndex] = useState(null);
  // Ref for parent div
  const parentRef = useRef();
  // ref for number of children divs
  const divRefs = useRef([]);

  useEffect(() => {
    // Clear the divRefs array and reassign refs to current divs
    divRefs.current = divRefs.current.slice(0, divs.length);
  }, [divs]);

  // main function to check if user clicks on blank space
  const handleParentClick = (e) => {
    // Check if the click target is the parent div itself
    if (e.target !== parentRef.current) {
      return;
    }
    // get size and position of parent div
    const parentRect = parentRef.current.getBoundingClientRect();
    // get y acis value of user click
    const clickY = e.clientY - parentRect.top;
    // defualt position to add new child
    let insertIndex = divs.length;

    // loop through all the children divs
    // to Find the index where the new div should be inserted
    for (let i = 0; i < divRefs.current.length; i++) {
      // get values of current div
      const div = divRefs.current[i];
      // get size and position of the div
      const divRect = div.getBoundingClientRect();
      // check if user click was above this div
      if (clickY < divRect.top) {
        insertIndex = i;
        break;
      }
    }

    // Insert the new div at the calculated position
    setDivs((prevDivs) => {
      const newDivs = [
        ...prevDivs.slice(0, insertIndex),
        `New Div ${Date.now()}`,
        ...prevDivs.slice(insertIndex),
      ];
      setEditingIndex(insertIndex);
      return newDivs;
    });
  };

  const handleSave = (index, newText) => {
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
              text=""
              onSave={(newText) => handleSave(index, newText)}
              onCancel={handleCancel}
            />
          ) : (
            div
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomGrapesjsParent;
