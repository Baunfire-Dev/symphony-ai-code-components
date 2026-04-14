import './CTAButton.css'

export const CTAButton = ({
  text,
  link,
  variant = "White",
}) => {
  const buttonVariant = {
    "White" : "white",
    "Blue" : "blue",
    "Teal" : "teal",
    "Yellow" : "yellow"
  }
  return (
    <a href={link?.href} target={link?.target ?? "_self"} className={`btn ${buttonVariant[variant]}`}>
      {text}
    </a>
  );
};