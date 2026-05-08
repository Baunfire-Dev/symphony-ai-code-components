import { useEffect, useRef } from 'react';
import './Media.css';

export const Media = ({ type = 'Image', img, videoURL, videoThumbnail, controls = true, autoplay = false }) => {

  if (type === 'Video') {
    return (
      <video
        className="w-full aspect-[16/9] object-cover"
        poster={videoThumbnail?.src}
        controls={controls}
        autoPlay={autoplay}
        muted={autoplay}
        playsInline
      >
        <source src={videoURL} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      className="w-full h-auto"
      src={img?.src}
      alt=""
    />
  );
};