import './CTAButton.css'

export const CTAButton = ({
  isVisible,
  text,
  link,
  variant = "White",
}) => {
  const buttonVariant = {
    "Primary" : "primary",
    "White" : "white",
    "Blue" : "blue",
    "Teal" : "teal",
    "Yellow" : "yellow",
    "Light Blue" : "light-blue",
    "Light Purple" : "light-purple",
    "Magenta" : "magenta",
    "Glass" : "glass"
  }

  return (
    <a href={link?.href} target={link?.target ?? "_self"} className={`btn ${buttonVariant[variant]} ${!isVisible ? "hidden" : ""}`}>
      <span>{text}</span>
    </a>
  );
};