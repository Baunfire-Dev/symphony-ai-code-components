import { TailwindTest } from './TailwindTest';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(TailwindTest, {
  name: 'TailwindTest',
  description: '',
  props: {
    text: props.Text({
      name: "Text",
      defaultValue: "",
      helpText: "",
    })
  },
});
