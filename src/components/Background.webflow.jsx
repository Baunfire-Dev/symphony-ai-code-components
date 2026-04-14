import { Background } from './Background';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Background, {
  name: 'Background',
  description: '',
  props: {
    type: props.Variant({
      name: "Type",
      defaultValue: "Image",
      options: ["Image", "Video"],
      helpText: "Select background type",
    }),
    image: props.Image({
      name: "Image",
    }),
    videoURL: props.Text({
      name: "Video URL",
      defaultValue: "",
      helpText: "",
    }),
  },
});
