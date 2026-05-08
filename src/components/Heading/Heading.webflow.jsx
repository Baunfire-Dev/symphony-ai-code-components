import { Heading } from "./Heading";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Heading, {
  name: "Heading",
  description: "",
  group: "Global",
  props: {
    isVisible: props.Visibility({
      name: "Visible",
      group: "Display",
      defaultValue: true
    }),
    textColor: props.Variant({
      name: "Text Color",
      defaultValue: "Default",
      options: ["Default", "White", "Teal", "Blue", "Yellow", "Light Purple", "Magenta", "Light Blue"],
      tooltip: "Select text color",
    }),
    tag: props.Variant({
      name: "Tag",
      defaultValue: "h1",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      tooltip: "Select heading level",
    }),
    appearance: props.Variant({
      name: "Appearance",
      defaultValue: "",
      options: ["None", "h1", "h2", "h3", "h4", "h5", "h6", "Callout Text"],
      tooltip: "Select heading appearance",
    }),
    text: props.Text({
      name: "Text",
      defaultValue: "Heading",
      tooltip: "Use [[text]] to apply gradient styling. Example: This is [[highlighted text]]",
    }),
    align: props.Variant({
      name: "Text Alignment",
      defaultValue: "left",
      options: ["left", "center", "right"],
      tooltip: "Align heading text",
    }),
  },
});