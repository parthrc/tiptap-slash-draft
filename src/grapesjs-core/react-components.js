import ReactDOM from "react-dom/client";
import React from "react";
import BlockNoteEditor from "../components/Blocknote";
import SampleComponent from "../components/SampleComponent";
import CustomGrapesjsParent from "../components/custom-parent-component/custom-grapesjs-parent.jsx";

export default (editor) => {
  const domc = editor.Components;
  const defType = domc.getType("default");
  const defModel = defType.model;
  const wrpChld = "data-chld";
  const renderWait = 100;

  const coreReactModel = {
    toHTML(opts = {}) {
      const attributes = this.getAttrToHTML();
      const classes = attributes.class;
      return defModel.prototype.toHTML.call(this, {
        ...opts,
        tag: this.get("type"),
        attributes: {
          ...attributes,
          className: classes,
        },
      });
    },
  };

  const coreReactView = {
    tagName: "div",

    init() {
      const { model } = this;
      this.listenTo(model, "change:attributes", this.render);
      this.listenTo(model.components(), "add remove reset", this.__upRender);
    },

    getChildrenContainer() {
      const { childrenContainer } = this;
      if (childrenContainer) return childrenContainer;

      this.childrenContainer = document.createElement("childc");

      return this.childrenContainer;
    },

    createReactChildWrap() {
      return React.createElement("span", { [wrpChld]: true });
    },

    createReactEl(cmp, props) {
      return React.createElement(cmp, props, this.createReactChildWrap());
    },

    mountReact(cmp, el) {
      if (this.reactRoot?.render) return this.reactRoot.render(cmp);
      this.reactRoot = ReactDOM.createRoot(el);
      return this.reactRoot.render(cmp);
    },

    render() {
      const { model, el } = this;
      this.renderAttributes();
      this.renderChildren();
      const reactEl = this.createReactEl(model.get("component"), {
        ...model.get("attributes"),
      });
      this.mountReact(reactEl, el);
      this.__renderChildComponents(el);

      return this;
    },

    __renderChildComponents(el) {
      clearTimeout(this._rcc);
      this.rcc = setTimeout(() => {
        const chld = el.querySelector(`span[${wrpChld}]`);

        if (chld) {
          chld.style.display = "inherit";
          const chldCont = this.getChildrenContainer();
          while (chldCont.firstChild) {
            chld.appendChild(chldCont.firstChild);
          }
        }
      }, renderWait);
    },

    __upRender() {
      clearTimeout(this._upr);
      this._upr = setTimeout(() => this.render());
    },
  };

  // Main React component
  domc.addType("react-component", {
    model: coreReactModel,
    view: coreReactView,
  });

  domc.addType("blocknote-editor", {
    model: {
      ...coreReactModel,
      defaults: {
        component: BlockNoteEditor,
        tagName: "div",
        draggable: true,
        droppable: false,
        editable: false,
        attributes: { class: "blocknote-editor" },
      },
    },
    view: coreReactView,
  });

  // testing by addinga sample component
  domc.addType("sample-component", {
    model: {
      ...coreReactModel,
      defaults: {
        component: SampleComponent,
        tagName: "div",
        draggable: true,
        droppable: false,
        editable: false,
        attributes: { class: "MyComponent" },
      },
    },
    view: coreReactView,
  });

  

  // A Higher order custom component
  // Can drop other grapesjs components inside it
  // when user will click anywhere, a textbox would pop up
  // will ahve slash menu option
  domc.addType("custom-grapesjs-parent", {
    model: {
      ...coreReactModel,
      defaults: {
        component: CustomGrapesjsParent,
        tagName: "div",
        draggable: true,
        droppable: true,
        editable: false,
        attributes: { class: "customGrapesjs" },
      },
    },
    view: coreReactView,
  });
};
