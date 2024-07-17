"use client";

import React, { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import GrapesJS from "grapesjs";
import ReactComponents from "../grapesjs-core/react-components";
import GrapesjsWebpagePresetPlugin from "grapesjs-preset-webpage";
import useEditorStore from "@/store/editor";
import CustomGrapesjsParent from "@/components/custom-parent-component/custom-grapesjs-parent";

export default function Home() {
  const { setAvailableBlocks, setEditor } = useEditorStore();

  useEffect(() => {
    const editor = GrapesJS.init({
      container: "#gjs",
      fromElement: true,
      showOffsets: true,
      noticeOnUnload: false,
      storageManager: false,
      plugins: [ReactComponents, GrapesjsWebpagePresetPlugin],
      canvas: {
        styles: [
          "styles/blocknote-mantine.css",
          "styles/custom-grapesjs-parent.css",
          "styles/SampleComponent.css",
          "styles/prosemirror.css",
          "styles/menu.css",
        ],
      },
      canvasCss: ".gjs-plh-image {width:auto;height:auto;}",
      parser: {
        optionsHtml: {
          allowScripts: true,
        },
      },
    });

    if (editor) {
      setEditor(editor);
    }

    editor.Blocks.add("blocknote-editor", {
      label: "BlockNote Editor",
      content: { type: "blocknote-editor" },
      category: "React Components",
    });

    // // Testing by adding a sample component
    // editor.Blocks.add("sample-component-block", {
    //   label: "Sample component",
    //   content: { type: "sample-component" },
    //   category: "React Components",
    // });

    // Testing by adding a sample component
    editor.Blocks.add("sample-component", {
      label: "Sample component",
      content: { type: "sample-component" },
      category: "New category",
    });

    // Testing by adding a second sample component
    editor.Blocks.add("sample2", {
      label: "Sample 2",
      content: { type: "sample2" },
      category: "New category",
    });

    // Block for custom-grapesjs-parent component
    editor.Blocks.add("custom-grapesjs-parent", {
      label: "Custom Grapesjs Parent",
      content: { type: "custom-grapesjs-parent" },
      category: "React Component",
    });

    // Listen to events

    // using Blocks API
    // get list of all available blocks
    const blockManager = editor.Blocks;
    console.log("blockManager", blockManager.getBlocksByCategory());
    console.log("All blocks=", blockManager.getAll().models);
    setAvailableBlocks(blockManager.getBlocksByCategory());
  }, []);

  return <div id="gjs" />;
}
