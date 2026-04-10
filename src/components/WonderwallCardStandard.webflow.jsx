import { WonderwallCardStandard } from './WonderwallCardStandard';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(WonderwallCardStandard, {
  name: 'Wonderwall Card Standard',
  description: '',
  group: 'Wonderwall',
  props: {
    text: props.Text({
      name: "Text",
      defaultValue: "",
      helpText: "",
    })
  },
});
