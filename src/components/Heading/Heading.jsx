import './Heading.css'

export const Heading = ({ isVisible, textColor = "Default", tag: Tag = "h1", text, appearance, align = "left" }) => {
    const appearanceMap = {
        "Callout Text": "callout-text",
    };

    const alignmentMap = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
    };

    const textColorMap = {
        "Default": "",
        "White": "white",
        "Teal": "teal",
        "Blue": "blue",
        "Yellow": "yellow",
        "Light Purple": "light-purple",
        "Magenta": "magenta",
        "Light Blue": "light-blue",
        "Lighter Purple": "lighter-purple",
        "Inherit": "inherit-color"
    }

    const headingAppearance = appearance && appearance !== "None" ? (appearanceMap[appearance] || appearance) : null;
    const alignment = alignmentMap[align];

    const renderText = (text = "") => {
        if (typeof text !== "string") return text;

        return text.split(/(<br\s*\/?>)/gi).map((part, i) => {
            if (/<br\s*\/?>/i.test(part)) {
                return <br key={i} />;
            }

            return part.split(/(\[\[.*?\]\]|\{\{.*?\}\})/g).map((segment, j) => {
                if (segment.startsWith("[[") && segment.endsWith("]]")) {
                    return (
                        <span key={`${i}-${j}`} className="gradient-text">
                            {segment.replace(/\[\[|\]\]/g, "")}
                        </span>
                    );
                }

                if (segment.startsWith("{{") && segment.endsWith("}}")) {
                    return (
                        <span key={`${i}-${j}`} className="highlight-text">
                            {segment.replace(/\{\{|\}\}/g, "")}
                        </span>
                    );
                }

                return segment;
            });
        });
    };

    return <Tag className={[headingAppearance, alignment, textColorMap[textColor], !isVisible ? "hidden" : ""].filter(Boolean).join(" ")}>{renderText(text)}</Tag>;
};