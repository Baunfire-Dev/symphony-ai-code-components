import { VideoPlayer } from './VideoPlayer';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(VideoPlayer, {
  name: 'Video Player',
  description: '',
  group: 'Full Width Video Content',
  props: {
    videoURL: props.Text({
      name: "Video URL",
      defaultValue: "",
      tooltip: "Enter a direct link to an MP4 video file (e.g., a direct Vimeo MP4 URL). Other page links are not supported.",
    }),
    videoThumbnail: props.Image({
      name: "Video Thumbnail",
    }),
  },
});