import { SV2EurekaStepItem } from './SV2EurekaStepItem';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(SV2EurekaStepItem, {
  name: 'SV2 Eureka Step Item',
  description: '',
  group: 'SV2 Eureka Step',
  props: {
    title: props.Text({
      name: "Title",
      defaultValue: "",
      tooltip: "",
    }),
    description: props.TextNode({
      name: "Description",
      multiline: true,
      defaultValue: "",
      tooltip: "",
    }),
    type: props.Variant({
      name: "Type",
      defaultValue: "Image",
      options: ["Image", "Video"],
      tooltip: "Select background type",
    }),
    image: props.Image({
      name: "Image",
    }),
    videoURL: props.Text({
      name: "Video URL",
      defaultValue: "",
      tooltip: "Enter a direct link to an MP4 video file (e.g., a direct Vimeo MP4 URL). Other page links are not supported.",
    }),
  },
});
