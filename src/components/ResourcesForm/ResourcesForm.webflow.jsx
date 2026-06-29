import { ResourcesForm } from './ResourcesForm';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(ResourcesForm, {
  name: 'Resources Subcribe Form',
  description: '',
  props: {
    industry: props.Variant({
      name: "Industry",
      defaultValue: "",
      options: ["Choose an industry", "Retail / CPG", "Financial Services", "Industrial", "Media", "Enterprise IT"],
      tooltip: "Select industry",
    })
  },
});
