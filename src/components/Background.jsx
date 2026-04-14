import "./Background.css";

export const Background = ({ type = "Image", image, videoURL }) => {
  return (
    <div className="background-container">
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