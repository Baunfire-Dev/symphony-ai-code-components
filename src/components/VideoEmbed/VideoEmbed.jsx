export const VideoEmbed = ({ videoId, type = "youtube" }) => {
  const videoSources = {
    youtube: `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&mute=1&playsinline=1`,
    vimeo: `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`,
  };

  return (
    <div
        style={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}
    >
        {videoId &&
            <iframe
                src={videoSources[type]}
                style={{
                    width: "100%",
                    height: "100%",
                    border: 0
                }}
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Embedded Video"
            />
        }
        <div style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', inset: 0 }}></div>
    </div>
  );
};