import './SV2EurekaStepItem.css';
export const SV2EurekaStepItem = ({ title, description, type, image, videoURL }) => {
  return (
    <div className='sv2-eureka-step-item flex items-center gap-[24px]'>
      <div className='flex-1 flex flex-col items-start gap-[16px]'>
        <p className='title'>{title}</p>
        <p className='subtext'>{description}</p>
      </div>
      <div className='w-[1px] bg-white/[0.2] self-stretch'></div>
      <div className='flex-1 py-[60px]'>
        {type === "Image" && image && (
          <img src={image.src} alt="" className='w-full h-auto'/>
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