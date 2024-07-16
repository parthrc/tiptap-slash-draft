import { useEffect, useRef, useState } from "react";
import "./custom-grapesjs-parent.css";

const demottexts = [];

const CustomGrapesjsParent = () => {
  const [divs, setDivs] = useState(["Div 1", "Div 2", "Div 3"]);
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
    setDivs((prevDivs) => [
      ...prevDivs.slice(0, insertIndex),
      `New Div ${Date.now()}`,
      ...prevDivs.slice(insertIndex),
    ]);
  };

  return (
    <div
      ref={parentRef}
      onClick={handleParentClick}
      style={{ border: "1px solid black", padding: "10px" }}
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
          {div}
        </div>
      ))}
    </div>
  );
};

export default CustomGrapesjsParent;
