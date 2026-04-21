import './IconCard.css';
export const IconCard = ({
  width,
  icon,
  heading,
  content,
}) => {
  const widthVariant = {
    "1/2" : "one-half",
    "1/3" : "one-third"
  }
  return (
    <div className={`icon-card ${widthVariant[width]}`}>
      { icon && (
        <img src={ icon.src } alt={ icon.alt || "" } />
      )}

      <h5>{ heading }</h5>
      <p>{ content }</p>
    </div>
  );
};
