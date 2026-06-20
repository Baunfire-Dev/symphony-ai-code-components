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

        if (!text.includes("[[") && !text.includes("{{")) return text;

        return text.split(/(\[\[.*?\]\]|\{\{.*?\}\})/g).map((part, i) => {
            if (part.startsWith("[[") && part.endsWith("]]")) {
                const clean = part.replace(/\[\[|\]\]/g, "");

                return (
                    <span key={i} className="gradient-text">
                        {clean}
                    </span>
                );
            }

            if (part.startsWith("{{") && part.endsWith("}}")) {
                const clean = part.replace(/\{\{|\}\}/g, "");

                return (
                    <span key={i} className="highlight-text">
                        {clean}
                    </span>
                );
            }

            return part;
        });
    };

    return <Tag className={[headingAppearance, alignment, textColorMap[textColor], !isVisible ? "hidden" : ""].filter(Boolean).join(" ")}>{renderText(text)}</Tag>;
};