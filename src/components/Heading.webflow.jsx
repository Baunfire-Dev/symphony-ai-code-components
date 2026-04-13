import { Heading } from "./Heading";
import { props } from "@webflow/data-types";
import { declareComponent } from "@webflow/react";

export default declareComponent(Heading, {
  name: "Heading",
  description: "",
  props: {
    tag: props.Option({
      name: "Tag",
      defaultValue: "h1",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      helpText: "Select heading level",
    }),
    appearance: props.Option({
      name: "Appearance",
      defaultValue: "",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      helpText: "Select heading appearance",
    }),
    text: props.Text({
      name: "Text",
      defaultValue: "",
      helpText: "",
    }),
  },
});