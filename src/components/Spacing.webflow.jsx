import { Spacing } from './Spacing';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Spacing, {
  name: 'Spacing',
  description: '',
  props: {
    spacingSize: props.Variant({
      name: "Spacing Size",
      defaultValue: "none",
      options: ["none", "xxl", "xl", "lg", "med", "sm", "xs", "xxs", "xxxs", "xxxxs"],
      helpText: "Select heading level",
    }),
  },
});