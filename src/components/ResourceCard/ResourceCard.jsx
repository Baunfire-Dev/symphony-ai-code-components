import './ResourceCard.css';
export const ResourceCard = ({ 
  variant,
  eyebrow,
  heading,
  link,
  ctaText
}) => {
  const cardVariant = {
    "Blue" : "blue",
    "Teal" : "teal",
    "Yellow" : "yellow",
    "Magenta" : "magenta",
  }
  return (
    <div className={`resource-card ${cardVariant[variant]}`}>
      <a href={ link?.href ?? "#" } target={ link?.target ?? "_self" } className={`resource-card-link-wrap`}></a>
      <div className={`resource-card-heading-wrap`}>
        <p className={`resource-card-eyebrow`}>{ eyebrow }</p>
        <h4 className={`resource-card-heading`}>{ heading }</h4>
      </div>
      <p className={`resource-card-cta-text`}>{ ctaText ?? "Read Now" } &gt;</p>
    </div>
  );
};
