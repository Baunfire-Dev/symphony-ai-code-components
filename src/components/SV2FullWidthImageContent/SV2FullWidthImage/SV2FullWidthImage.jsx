import './SV2FullWidthImage.css';
import { useState, useRef } from 'react';

export const SV2FullWidthImage = ({ isVisible, image, videoURL }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const hasVideo = !!videoURL?.trim();

  const handlePlay = () => {
    setIsPlaying(true);

    // wait for video to mount then play
    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };
  
  return (
    <div className={`relative w-full ${hasVideo ? 'aspect-[16/9]' : ''} ${!isVisible ? 'hidden' : ''}`}>
      {!isPlaying && (
        <>
          {hasVideo ?
              <img
                src={image.src}
                className="absolute inset-0 w-full h-full object-cover"
              />
            :
              <img
                src={image.src}
                className="w-full h-auto"
              />
          }
          {hasVideo && (
            <button
              className="text-[1rem] text-white font-[700] flex items-center gap-[10px] border border-solid border-white rounded-[9999px] px-[24px] py-[12px] absolute bottom-[16px] right-[16px] bg-transparent outline-none focus:outline-none focus:ring-0 cursor-pointer"
              onClick={handlePlay}
            >
              Watch Video
              <svg class="play-btn" xmlns="http://www.w3.org/2000/svg" width="24" height="24"> <defs> <mask id="circle-mask-block_01dcc04df89365e35ac81be1d7d4beb0-318007299">  <circle cx="12" cy="12" r="11" fill="white"></circle> <path d="M9 7v10l8-5z" fill="black"></path> </mask> </defs> <circle cx="12" cy="12" r="11" fill="white" stroke="black" mask="url(#circle-mask-block_01dcc04df89365e35ac81be1d7d4beb0-318007299)"></circle> </svg>
            </button>
          )}
        </>
      )}

      {hasVideo && isPlaying && (
        <video
          ref={videoRef}
          src={videoURL}
          controls
          className="block absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};