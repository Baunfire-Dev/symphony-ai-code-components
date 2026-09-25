import './ResourcesGridCards.css';
import React from "react";
import { useResourceFeed } from "../shared/useResourceFeed";

const ENDPOINTS = {
    Resources: "https://symphonyai-resources.jjimenez-3e7.workers.dev/resources",
    News: "https://symphonyai-resources.jjimenez-3e7.workers.dev/news",
    "Events & Webinars": "https://symphonyai-resources.jjimenez-3e7.workers.dev/webinar-events",
};

const EMPTY_LABELS = {
    Resources: "resources",
    News: "news",
    "Events & Webinars": "webinar & events",
};

function ResourceCard({ type, resource, size = "small" }) {
    let href = resource.slug;
    let isExternal = false;

    if (type === "Resources") {
        href = resource.newResourceUrl || resource.externalUrl || href;
        isExternal = !resource.newResourceUrl && !!resource.externalUrl;
    }

    if (type === "Events & Webinars" || type === "News") {
        href = resource.externalUrl || href;
        isExternal = !!resource.externalUrl;
    }

    const date = new Date(resource.date);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    return (
        <div className={`lnre-card is-${size}`} key={resource.id}>
            <a href={href} target={isExternal ? "_blank" : "_self"} className="lnre-c-link"></a>

            <div className="lnre-c-head">
                <div className="lnre-c-head-inner">
                    <p className="lnre-c-type">{resource.types?.map((item) => item.name).join(", ") || type}</p>

                    {(type === "News" && resource.logo) && (
                        <img
                            loading="lazy"
                            src={resource.logo.url}
                            alt={resource.logo.alt || "logo image"}
                            className="lnre-c-image"
                        />
                    )}
                </div>

                <p className="lnre-c-title">{resource.name}</p>
            </div>

            <div className="lnre-foot">
                <p className="lnre-c-date">{formattedDate}</p>

                <div className="lnre-c-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="14" viewBox="0 0 26 14" fill="none">
                        <path d="M18.913 1L25 7M25 7L18.913 13M25 7L1 7" stroke="#0074E8" strokeLinecap="square"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ResourcesGridCards(props) {
    const {
        dataSource = "Resources",
        count = 4,
        ...filterProps
    } = props;

    const endpoint = ENDPOINTS[dataSource];
    const { items, loading } = useResourceFeed({ endpoint, filterProps, limit: count });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!items.length) {
        return (
            <div className="layout-state empty">
                No {EMPTY_LABELS[dataSource] || "resources"} found.
            </div>
        );
    }

    const featuredItem = items[0];
    const secondaryItems = items.slice(1);

    return (
        <div className="lnre-cards">
            {featuredItem && (
                <div className="lnre-card-outer is-single">
                    <ResourceCard
                        type={dataSource}
                        key={featuredItem.id}
                        resource={featuredItem}
                        size="big"
                    />
                </div>
            )}

            {secondaryItems.length > 0 && (
                <div className="lnre-card-outer is-multiple">
                    {secondaryItems.map((item) => (
                        <ResourceCard
                            type={dataSource}
                            key={item.id}
                            resource={item}
                            size="small"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
