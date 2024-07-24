"use client";

import React, { useEffect } from "react";
import "grapesjs/dist/css/grapes.min.css";
import GrapesJS from "grapesjs";
import ReactComponents from "../grapesjs-core/react-components";
import GrapesjsWebpagePresetPlugin from "grapesjs-preset-webpage";
import useEditorStore from "@/store/editor";
import { handleMenuAction } from "@/components/custom-parent-component/components/EditableDiv";

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
      console.log(typeof editor);
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

    // Block for custom text editor
    editor.Blocks.add("custom-text-editor", {
      label: "Custom Text Editor",
      content: { type: "custom-text-editor" },
      category: "React Component",
    });

    // Listen to events

    // using Blocks API
    // get list of all available blocks
    const blockManager = editor.Blocks;
    const allBlocks = blockManager.getBlocksByCategory();
    // console.log("all blocks", allBlocks);
    // an empty array to store nlocks and rte options
    let finalSlashList = [
      { label: "bold", type: "rte" },
      { label: "italic", type: "rte" },
      { label: "strike", type: "rte" },
      { label: "bullet", type: "rte" },
    ];
    // add all blocks to slashMenuItems
    allBlocks.map((block) => {
      if (block.category) {
        if (block.items) {
          block.items.map((item) => {
            finalSlashList.push({
              label: item.attributes.label,
              type: "custom-component",
              component_id: item.attributes.id,
            });
            // console.log("Item=", item.attributes.label);
          });
        }
      }
    });

    // console.log("Final slash list=", finalSlashList);
    setAvailableBlocks(finalSlashList);
  }, []);

  return <div id="gjs" />;
}
