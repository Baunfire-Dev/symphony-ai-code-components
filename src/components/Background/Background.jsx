import "./Background.css";

export const Background = ({ isVisible = true, type = "Image", image, videoURL }) => {
  return (
    <div className={['background-container', !isVisible ? "hidden" : ""].filter(Boolean).join(" ")}>
      {type === "Image" && image && (
        <img src={image.src} alt="" />
      )}

      {type === "Video" && videoURL && (
        <video autoPlay muted loop playsInline>
          <source src={videoURL} type="video/mp4" />
        </video>
      )}
    </div>
  );
};