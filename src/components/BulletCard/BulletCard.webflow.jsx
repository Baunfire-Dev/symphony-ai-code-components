import { BulletCard } from './BulletCard';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(BulletCard, {
  name: 'BulletCard',
  description: '',
  props: {
    variant: props.Variant({
      name:"Variant",
      defaultValue:"Teal",
      options:["Blue","Teal","Yellow", "Magenta", "Light Purple"]
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
