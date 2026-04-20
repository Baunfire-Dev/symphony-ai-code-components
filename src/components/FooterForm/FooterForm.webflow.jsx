import { FooterForm } from './FooterForm';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(FooterForm, {
  name: 'FooterForm',
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
