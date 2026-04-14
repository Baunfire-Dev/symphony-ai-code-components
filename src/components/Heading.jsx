import './Heading.css'

export const Heading = ({ tag: Tag = "h1", text, appearance, align = "left" }) => {
  const appearanceMap = {
    "Callout Text": "callout-text",
  };

  const alignmentMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const headingAppearance = appearance && appearance !== "None" ? (appearanceMap[appearance] || appearance) : null;
  const alignment = alignmentMap[align];

  return <Tag className={[headingAppearance, alignment].filter(Boolean).join(" ")}>{text}</Tag>;
};