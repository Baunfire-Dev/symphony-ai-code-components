import { VideoPlayer } from './VideoPlayer';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(VideoPlayer, {
  name: 'VideoPlayer',
  description: '',
  props: {
    videoURL: props.Text({
      name: "Text",
      defaultValue: "",
      tooltip: "",
    }),
    videoThumbnail: props.Image({
      name: "Video Thumbnail",
    }),
  },
});
