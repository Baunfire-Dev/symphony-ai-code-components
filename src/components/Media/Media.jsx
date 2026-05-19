import { useState, useRef } from 'react';
import './Media.css';

export const Media = ({
  isVisible = true,
  type = 'Image',
  img,
  videoURL,
  videoThumbnail,
  controls = true,
  autoplay = false
}) => {

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);

    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };

  if(!isVisible) return (
    <div className='global-media hidden'></div>
  );

  if (type === 'Video') {
    
    if (controls) {
      return (
        <div className='relative w-full aspect-[16/9]'>

          {isPlaying ? (
            <video
              ref={videoRef}
              className="block w-full h-full object-cover"
              controls
              playsInline
            >
              <source src={videoURL} type="video/mp4" />
            </video>
          ) : (
            <>
              <img
                src={videoThumbnail?.src}
                className='absolute inset-0 z-[1] w-full h-full object-cover'
                alt=""
              />

              <button
                onClick={handlePlay}
                className='w-[72px] h-[72px] rounded-[100%] bg-[#000]/[50%] flex items-center justify-center absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none outline-none focus:outline-none focus:ring-0 cursor-pointer'
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 6.5V17.5L17 12L8 6.5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </>
          )}

        </div>
      );
    }

    return (
      <video
        className="w-full aspect-[16/9] object-cover"
        autoPlay
        muted
        loop
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