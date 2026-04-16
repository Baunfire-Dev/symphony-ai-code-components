import { CTAButton } from './CTAButton';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(CTAButton, {
  name: 'CTAButton',
  description: '',
  props: {
    variant: props.Variant({
      name: "Variant",
      defaultValue: "White",
      options: ["White", "Blue", "Teal", "Yellow", "Light Blue"],
      helpText: "Select button style variant",
    }),
    text: props.Text({
      name: "Button Text",
      defaultValue: "Text Link",
      helpText: "Text displayed inside the button",
    }),
    link: props.Link({
      name: "Link",
      helpText: "Link destination",
    }),
  },
});
