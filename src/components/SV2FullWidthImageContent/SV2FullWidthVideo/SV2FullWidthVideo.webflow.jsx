import { SV2FullWidthVideo } from './SV2FullWidthVideo';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(SV2FullWidthVideo, {
  name: 'SV2 Fullwidth Image Content - Video',
  description: '',
  group: 'SV2 Fullwidth Image Content',
  props: {
    isVisible: props.Visibility({
      name: "Show Element",
      defaultValue: true
    }),
    videoURL: props.Text({
      name: "Video URL",
      group: "Video",
      defaultValue: "",
      tooltip: "Enter a direct link to an MP4 video file (e.g., a direct Vimeo MP4 URL). Other page links are not supported.",
    })
  },
});
