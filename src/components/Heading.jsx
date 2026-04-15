import './Heading.css'

export const Heading = ({ textColor = "Default", tag: Tag = "h1", text, appearance, align = "left" }) => {
  const appearanceMap = {
    "Callout Text": "callout-text",
  };

  const alignmentMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const textColorMap = {
    "Default" : "",
    "White" : "white",
    "Teal" : "teal",
    "Blue" : "blue",
    "Yellow" : "yellow",
    "Light Purple" : "light-purple",
    "Magenta" : "magenta"
  }

  const headingAppearance = appearance && appearance !== "None" ? (appearanceMap[appearance] || appearance) : null;
  const alignment = alignmentMap[align];

  return <Tag className={[headingAppearance, alignment, textColorMap[textColor]].filter(Boolean).join(" ")}>{text}</Tag>;
};