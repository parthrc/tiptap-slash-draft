"use client";

import React, { useEffect, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import GrapesJS from "grapesjs";
import ReactComponents from "../grapesjs-core/react-components";
import GrapesEditorContext from './GrapesEditorContext'

export default function Home() {

  useEffect(() => {
    const e = GrapesJS.init({
      container: "#gjs",
      fromElement: true,
      showOffsets: true,
      noticeOnUnload: false,
      storageManager: false,
      plugins: [ReactComponents],
      canvas: {
        styles: [
          'styles/blocknote-mantine.css'
        ],
      },
      canvasCss: ".gjs-plh-image {width:auto;height:auto;}",
      parser: {
        optionsHtml: {
          allowScripts: true,
        }
      }
    });

    e.Blocks.add('blocknote-editor-block', {
      label: 'BlockNote Editor',
      content: { type: 'blocknote-editor' },
      category: 'React Components',
    });

  }, []);

  return (
      <div id="gjs" />
  );
}