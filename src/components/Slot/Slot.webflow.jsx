import { Slot } from './Slot';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Slot, {
  name: 'Slot',
  description: '',
  props: {
    children: props.Slot({
        name: "Content"
    })
  },
});
