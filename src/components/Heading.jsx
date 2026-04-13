import './Heading.css'

export const Heading = ({ tag: Tag = "h1", text, appearance = "h1" }) => {
  return <Tag className={appearance}>{text}</Tag>;
};