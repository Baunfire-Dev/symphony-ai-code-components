import './CTAButton.css'

export const CTAButton = ({
  text,
  link,
  variant = "Primary",
}) => {
  return (
    <a href={link?.href}>
      {text}
    </a>
  );
};