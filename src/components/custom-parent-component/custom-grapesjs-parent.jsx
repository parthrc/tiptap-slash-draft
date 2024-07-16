import { useState } from "react";
import "./custom-grapesjs-parent.css";

const demottexts = [];

const CustomGrapesjsParent = () => {
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="customGrapesjs">
      Custom grapesjs parent component
      <div
        onClick={handleClick}
        style={{
          padding: "20px",
          border: "1px solid black",
          minHeight: "100px",
        }}
      >
        {editing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          text || "Click to edit"
        )}
      </div>
    </div>
  );
};

export default CustomGrapesjsParent;
