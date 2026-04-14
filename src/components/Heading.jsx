import './Heading.css'

export const Heading = ({ tag: Tag = "h1", text, appearance }) => {
  const appearanceMap = {
    "Callout Text": "callout-text",
  };

  const className = appearanceMap[appearance] || appearance;

  return <Tag className={className}>{text}</Tag>;
};