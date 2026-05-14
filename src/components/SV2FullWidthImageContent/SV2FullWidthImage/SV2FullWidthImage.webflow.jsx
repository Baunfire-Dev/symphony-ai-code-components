import { SV2FullWidthImage } from './SV2FullWidthImage';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(SV2FullWidthImage, {
  name: 'SV2 Fullwidth Image Content - Image',
  description: '',
  group: 'SV2 Fullwidth Image Content',
  props: {
    isVisible: props.Visibility({
      name: "Show Element",
      defaultValue: true
    }),
    image: props.Image({
      name: "Image",
      tooltip: "Add a Video URL to display a Watch Video button."
    }),
    videoURL: props.Text({
      name: "Video URL",
      defaultValue: "",
      tooltip: "Enter a direct MP4 video URL (for example, a direct Vimeo MP4 link). Regular video page links are not supported.",
    })
  },
});