import { Button } from './Button';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Button, {
  name: 'Button',
  description: '',
  props: {
    text: props.Text({
      name: "Text",
      defaultValue: "",
      helpText: "",
    })
  },
});
