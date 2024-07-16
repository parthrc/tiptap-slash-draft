"use client";

import React, { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import GrapesJS from "grapesjs";
import ReactComponents from "../grapesjs-core/react-components";
import GrapesEditorContext from "./GrapesEditorContext";
import CustomGrapesjsParent from "@/components/custom-parent-component/custom-grapesjs-parent";
import useEditorStore from "@/store/editor";

export default function Home() {
  const { setAvailableBlocks } = useEditorStore();

  useEffect(() => {
    const editor = GrapesJS.init({
      container: "#gjs",
      fromElement: true,
      showOffsets: true,
      noticeOnUnload: false,
      storageManager: false,
      plugins: [ReactComponents],
      canvas: {
        styles: [
          "styles/blocknote-mantine.css",
          "styles/custom-grapesjs-parent.css",
          "styles/SampleComponent.css",
        ],
      },
      canvasCss: ".gjs-plh-image {width:auto;height:auto;}",
      parser: {
        optionsHtml: {
          allowScripts: true,
        },
      },
    });

    editor.Blocks.add("blocknote-editor-block", {
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
    editor.Blocks.add("sample-component-block", {
      label: "Sample component",
      content: { type: "sample-component" },
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
