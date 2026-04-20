import { StatCard } from './StatCard';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(StatCard, {
  name: 'StatCard',
  description: '',
  props: {
    stat: props.Text({
      name: "Stat",
      group:"Content",
      defaultValue: "",
      tooltip: "",
    }),
    text: props.RichText({
      name:"Text",
      group:"Content"
    }),
    variant: props.Variant({
      name:"Variant",
      defaultValue:"Teal",
      options:["White","Blue","Teal","Yellow"]
    })
  },
});
