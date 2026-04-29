import './SV2EurekaStepItem.css';
export const SV2EurekaStepItem = ({ reverse, title, description, type, image, videoURL }) => {

  return (
    <div className={`sv2-eureka-step-item ${reverse ? 'reversed' : ''}`}>
      <div className='flex-1 flex flex-col items-start gap-[16px]'>
        <p className='title'>{title}</p>
        <div className='subtext'>{description}</div>
      </div>
      <div className='absolute top-0 bottom-0 left-0 lg:static w-[1px] bg-white/[0.2] lg:self-stretch'></div>
      <div className='media-container flex-1 lg:py-[60px]'>
        {type === "Image" && image && (
          <img src={image.src} alt="" className='w-full h-auto mix-blend-lighten'/>
        )}

        {type === "Video" && videoURL && (
          <video className='aspect-[16/9] w-full' autoPlay muted loop playsInline>
            <source src={videoURL} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
};