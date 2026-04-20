import './BulletCard.css';
export const BulletCard = ({
  variant,
  heading,
  content,
}) => {
  const cardVariant = {
    "Blue" : "blue",
    "Teal" : "teal",
    "Yellow" : "yellow",
    "Magenta" : "magenta",
    "Light Purple" : "light-purple",
  }
  return (
    <div className={`bullet-card`}>
      <div className={`bullet-card-inner`}>
        <span className={`bullet-card-bullet ${cardVariant[variant]}`}></span>
        <h4 className={`bullet-card-heading`}>{ heading }</h4>
      </div>
      <p>{ content }</p>
    </div>
  );
};
