export const Badge = ({ text, variant = "Light" }) => {
  const variantStyles = {
    Light: { backgroundColor: "#eee", color: "#000" },
    Dark: { backgroundColor: "#000", color: "#fff" },
  };

  return (
    <span
      style={{
        borderRadius: "1em",
        display: "inline-block",
        fontSize: "14px",
        lineHeight: 2,
        padding: "0 1em",
        cursor: "default",
        ...variantStyles[variant]
      }}
    >
      {text}
    </span>
  );
};