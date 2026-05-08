import { Media } from './Media';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(Media, {
  name: 'Media',
  description: '',
  group: 'Global',
  props: {
    type: props.Variant({
      name: "Type",
      defaultValue: "Image",
      options: ["Image", "Video"],
      tooltip: "Select media type",
    }),
    img: props.Image({
      name: "Image",
    }),
    videoURL: props.Text({
      name: "Video URL",
      group: "Video",
      defaultValue: "",
      tooltip: "Enter a direct link to an MP4 video file (e.g., a direct Vimeo MP4 URL). Other page links are not supported.",
    }),
    videoThumbnail: props.Image({
      name: "Vide Thumbnail",
      group: "Video",
    }),
    controls: props.Boolean({
      name: "Show Controls",
      group: "Video",
      defaultValue: true,
    }),
    autoplay: props.Boolean({
      name: "Auto Play Video",
      group: "Video",
      defaultValue: false,
    }),
  },
});
