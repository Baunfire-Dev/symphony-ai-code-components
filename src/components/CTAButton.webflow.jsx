import { CTAButton } from './CTAButton';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(CTAButton, {
  name: 'CTAButton',
  description: '',
  props: {
    variant: props.Option({
      name: "Variant",
      defaultValue: "Primary",
      options: ["Primary", "Secondary"],
      helpText: "Select button style variant",
    }),
    text: props.Text({
      name: "Button Text",
      defaultValue: "",
      helpText: "Text displayed inside the button",
    }),
    link: props.Link({
      name: "Link",
      helpText: "Link destination",
    }),
  },
});
