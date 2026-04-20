import './CTAButton.css'

export const CTAButton = ({
  isVisible,
  text,
  link,
  variant = "White",
}) => {
  const buttonVariant = {
    "White" : "white",
    "Blue" : "blue",
    "Teal" : "teal",
    "Yellow" : "yellow",
    "Light Blue" : "light-blue",
    "Light Purple" : "light-purple"
  }

  return (
    <a href={link?.href} target={link?.target ?? "_self"} className={`btn ${buttonVariant[variant]} ${!isVisible ? "hidden" : ""}`}>
      {text}
    </a>
  );
};