import { VideoEmbed } from './VideoEmbed';
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(VideoEmbed, {
  name: 'Video Embed',
  description: 'Embed a YouTube or Vimeo video using a video ID',
  group: 'Media',
  props: {
    type: props.Variant({
      name: "Video Type",
      options: ["youtube", "vimeo"],
      defaultValue: "youtube",
    }),
    videoId: props.Text({
      name: "Video ID",
      defaultValue: "",
      tooltip: "Enter the YouTube or Vimeo video ID",
    })
  },
});