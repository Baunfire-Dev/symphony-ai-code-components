import { Heading } from "./Heading";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Heading, {
  name: "Heading",
  description: "",
  props: {
    textColor: props.Variant({
      name: "Text Color",
      defaultValue: "Default",
      options: ["Default", "White", "Teal", "Blue", "Yellow", "Light Purple", "Magenta", "Light Blue"],
      helpText: "Select text color",
    }),
    tag: props.Variant({
      name: "Tag",
      defaultValue: "h1",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      helpText: "Select heading level",
    }),
    appearance: props.Variant({
      name: "Appearance",
      defaultValue: "",
      options: ["None", "h1", "h2", "h3", "h4", "h5", "h6", "Callout Text"],
      helpText: "Select heading appearance",
    }),
    text: props.Text({
      name: "Text",
      defaultValue: "Heading",
      helpText: "",
    }),
    align: props.Variant({
      name: "Text Alignment",
      defaultValue: "left",
      options: ["left", "center", "right"],
      helpText: "Align heading text",
    }),
  },
});