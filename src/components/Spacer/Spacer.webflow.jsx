import { Spacer } from './Spacer';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Spacer, {
  name: 'Spacer',
  description: '',
  group: 'Global',
  props: {
    spacingSize: props.Variant({
      name: "Spacing Size",
      defaultValue: "none",
      options: ["none", "xxl", "xl", "lg", "med", "sm", "xs", "xxs", "xxxs", "xxxxs"],
      tooltip: "Select heading level",
    }),
  },
});