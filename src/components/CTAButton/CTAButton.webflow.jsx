import { CTAButton } from './CTAButton';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(CTAButton, {
  name: 'CTAButton',
  description: '',
  group: 'Global',
  props: {
    isVisible: props.Visibility({
      name: "Visible",
      group: "Display",
      defaultValue: true
    }),
    variant: props.Variant({
      name: "Variant",
      defaultValue: "White",
      options: ["Primary", "White", "Blue", "Teal", "Yellow", "Light Blue", "Light Purple", "Magenta", "Glass"],
      tooltip: "Select button style variant",
    }),
    text: props.Text({
      name: "Button Text",
      defaultValue: "Text Link",
      tooltip: "Text displayed inside the button",
    }),
    link: props.Link({
      name: "Link",
      tooltip: "Link destination",
    }),
  },
});
