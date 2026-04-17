import { ResourceCard } from './ResourceCard';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(ResourceCard, {
  name: 'ResourceCard',
  description: '',
  props: {
    variant: props.Variant({
      name:"Variant",
      defaultValue:"Teal",
      options:["Blue","Teal","Yellow", "Magenta"]
    }),
    eyebrow: props.Text({
      name: "Eyebrow",
      defaultValue: "Eyebrow",
      helpText: "",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "Heading",
      helpText: "",
    }),
    link: props.Link({
      name: "Link",
      helpText: "Link destination",
    }),
    ctaText: props.Text({
      name: "CTA Text",
      defaultValue: "CTA Text",
      helpText: "",
    }),
  },
});
