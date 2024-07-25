import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import SlashMenu from "./SlashMenu.jsx";
import Tiptap from "../../tiptap/Tiptap.jsx";
import FixedMenu from "../../tiptap/FixedMenu.jsx";
import useEditorStore from "@/store/editor.tsx";
import useRefStore from "@/store/refStore.jsx";

const EditableDiv = ({ text, onSave, onCancel }) => {
  const { tiptapEditor } = useEditorStore();
  const [inputValue, setInputValue] = useState(text);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [clickedOnMenuItem, setClickedOnMenuItem] = useState(false);
  const [clickedToolbar, setClickedToolbar] = useState(false);
  const slashMenuRef = useRef(null);
  const editorRef = useRef(null);
  const setMyRef = useRefStore((state) => state.setMyRef);
  const myRef = useRefStore((state) => state.myRef);

  useEffect(() => {
    setMyRef(editorRef);
  }, [editorRef, setMyRef]);

  const handleMenuAction = (action) => {
    setClickedToolbar(true);
    console.log("Inside handleMenuAction", action);
    if (!tiptapEditor) return;

    switch (action) {
      case "bold":
        console.log("bold fired");
        tiptapEditor.chain().focus().toggleBold().run();
        break;
      case "italic":
        tiptapEditor.chain().focus().toggleItalic().run();
        break;
      case "strike":
        tiptapEditor.chain().focus().toggleStrike().run();
        break;
      case "bullet":
        tiptapEditor.chain().focus().toggleBulletList().run();
        break;
      case "h1":
        tiptapEditor.chain().focus().toggleHeading({ level: 1 }).run();
        tiptapEditor.commands.focus("end");
        break;

      default:
        console.log("default case");
        break;
    }

    tiptapEditor.commands.focus("end");
  };

  const handleInputChange = (content) => {
    console.log("handleOnChange", content);
    setInputValue(content); // Save content as HTML
  };

  const handleBlur = (event) => {
    console.log("handle blur fired");
    if (!event) {
      console.log("Blur event is undefined");
      return;
    }
    console.log("clickedOnMenuItem", clickedOnMenuItem);
    console.log("clickedToolbar", clickedToolbar);
    if (clickedOnMenuItem) {
      setClickedOnMenuItem(false);
      return;
    }
    if (clickedToolbar) {
      console.log("returning after toolbar click");
      setClickedToolbar(false);
      return;
    }

    if (
      slashMenuRef.current &&
      slashMenuRef.current.contains(event.relatedTarget)
    ) {
      console.log("Stopping onBlur due to slash");
      return;
    }
    console.log("onBlur input value", inputValue);
    if (inputValue.trim() === "") {
      onCancel();
    } else {
      onSave(inputValue); // Save the content with formatting
    }
  };

  const handleSetInputValue = (value) => {
    const lastSlashIndex = inputValue.lastIndexOf("/");
    const newValue = inputValue.substring(0, lastSlashIndex + 1) + value;
    setInputValue(newValue);
    setShowMenu(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        <FixedMenu
          onAction={(action) => handleMenuAction(action)}
          setClickedToolbar={setClickedToolbar}
        />
        <div ref={editorRef}>
          <Tiptap
            initialValue={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          />
        </div>
      </div>
      {showMenu && (
        <div ref={slashMenuRef}>
          <SlashMenu
            query={query}
            setInputValue={handleSetInputValue}
            setShowMenu={setShowMenu}
            onItemClick={setClickedOnMenuItem}
            handleMenuAction={handleMenuAction}
          />
        </div>
      )}
    </div>
  );
};

EditableDiv.propTypes = {
  text: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

EditableDiv.defaultProps = {
  text: "",
};

export { EditableDiv };
