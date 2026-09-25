import './ResourcesCards.css';
import React from "react";
import { useResourceFeed } from "../shared/useResourceFeed";

const RESOURCES_ENDPOINT = "https://symphonyai-resources.jjimenez-3e7.workers.dev/resources";

function ResourceCard({ resource, size = "small" }) {
    const colorMap = {
      "Dark Purple": "violet",
      "Light Purple": "light-purple",
      "Pink": "magenta",
      "Orange": "orange",
      "Yellow": "yellow",
      "Light Blue": "light-blue",
      "Royal Blue": "blue",
      "Green": "teal",
    };

    const date = new Date(resource.date);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    const href = resource.newResourceUrl || resource.externalUrl || resource.slug;
    const isExternal = !resource.newResourceUrl && !!resource.externalUrl;

    return (
        <div className={`src-card is-${size}`}>
            <a
                href={href}
                className="src-c-link"
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
            />

            <div className="src-c-head">
                <div className="src-c-head-inner">
                    <p className="src-c-date">{formattedDate}</p>

                    <p className="src-c-type">
                        {resource.types?.map((item) => item.name).join(", ") || "Resource"}
                    </p>
                </div>

                <p className="src-c-title">{resource.name}</p>

                {resource.featuredImage && (
                    <img
                        loading="lazy"
                        src={resource.featuredImage.url}
                        alt={resource.featuredImage.alt || "resource-image"}
                        className="src-c-image"
                    />
                )}
            </div>

            <div className="src-foot">
                <div className="src-foot-inner">
                    <div className="src-c-orb" color={colorMap[resource.verticals?.[0]?.color] || "violet"}></div>

                    <p className="src-c-tag">
                        {
                            resource.verticals?.map((item) => item.name).join(", ") ||
                            resource.topics?.map((item) => item.name).join(", ") ||
                            "Resource"
                        }
                    </p>
                </div>

                <div className="src-c-arrow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="14"
                        viewBox="0 0 26 14"
                        fill="none"
                    >
                        <path
                            d="M18.913 1L25 7M25 7L18.913 13M25 7L1 7"
                            stroke="#0074E8"
                            strokeLinecap="square"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ResourcesCards(props) {
    const {
        count = 4,
        ...filterProps
    } = props;

    const { items: resources, loading } = useResourceFeed({
        endpoint: RESOURCES_ENDPOINT,
        filterProps,
        limit: count,
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    const featuredResource = resources[0];
    const secondaryResources = resources.slice(1);

    return (
        <>
            {count < 4 ? (
                <div className="src-cards-flex-grid">
                    {resources.map((resource) => (
                        <ResourceCard
                            key={resource.slug}
                            resource={resource}
                            size="big"
                        />
                    ))}
                </div>
            ) : (
                <div className="src-cards">
                    {featuredResource && (
                        <div className="src-card-outer is-single">
                            <ResourceCard
                                resource={featuredResource}
                                size="big"
                            />
                        </div>
                    )}

                    {secondaryResources.length > 0 && (
                        <div className="src-card-outer is-multiple">
                            {secondaryResources.map((resource) => (
                                <ResourceCard
                                    key={resource.slug}
                                    resource={resource}
                                    size="small"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
