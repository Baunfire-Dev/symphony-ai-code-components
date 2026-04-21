import { IconCard } from './IconCard';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(IconCard, {
  name: 'IconCard',
  description: '',
  props: {
    width: props.Variant({
      name:"Variant",
      defaultValue:"1/3",
      options:["1/2","1/3"]
    }),
    icon: props.Image({
      name: "Icon",
      tooltip: "",
    }),
    heading: props.Text({
      name: "Heading",
      defaultValue: "Heading",
      tooltip: "",
    }),
    content: props.Text({
      name: "Content",
      defaultValue: "Content",
      tooltip: "",
    })
  },
});
