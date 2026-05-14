import { useEffect, useRef } from 'react';
import './SV2FullWidthVideo.css';

export const SV2FullWidthVideo = ({isVisible, videoURL}) => {

  return (
    <video
      className={`w-full aspect-[16/9] object-cover ${!isVisible ? 'hidden' : ''}`}
      autoPlay
      muted
      playsInline
    >
      <source src={videoURL} type="video/mp4" />
    </video>
  );
};