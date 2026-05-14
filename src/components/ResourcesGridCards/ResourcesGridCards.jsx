import './ResourcesGridCards.css';
import React, { useEffect, useMemo, useState } from "react";
import FILTER_MAP from "./filterMap";

function ResourceCard({ type, resource, size = "small", getLabelsByIds }) {
    const typeNames = getLabelsByIds([].concat(resource.types ?? []), "type");

    let slug = resource.slug;

    if (type === "Events & Webinars") {
        slug = resource.newsUrl || slug;
    } else if (type === "News") {
        slug = resource.externalUrl || slug;
    }

    const date = new Date(resource.date);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    return (
        <div className={`lnre-card is-${size}`} key={resource.id}>
            <a href={`/${slug}`} className="lnre-c-link"></a>

            <div className="lnre-c-head">
                <div className="lnre-c-head-inner">
                    <p className="lnre-c-type">{typeNames.join(", ")}</p>

                    {resource.logoUrl && (
                        <img
                            loading="lazy"
                            src={resource.logoUrl}
                            alt={resource.logoAlt || ""}
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

function getFetchBase() {
    if (typeof window === 'undefined') return '';
    const host = window.location.hostname;
    
    if (host.endsWith('.design.webflow.com')) {
        const slug = host.replace('.design.webflow.com', '');
        return `https://${slug}.webflow.io`;
    }
    
    return '';
}

export default function ResourcesGridCards(props) {
    const {
        resourcesFeedUrl = "/data/resources",
        resourcesPaginationParam = "",
        newsFeedUrl = "/data/news",
        newsPaginationParam = "",
        eventsFeedUrl = "/data/events",
        eventsPaginationParam = "",
        dataSource = "Resources",
        ...filterProps
    } = props;

    let feedUrl, paginationParam;
    if (dataSource === "News") {
        feedUrl = newsFeedUrl;
        paginationParam = newsPaginationParam;
    } else if (dataSource === "Events & Webinars") {
        feedUrl = eventsFeedUrl;
        paginationParam = eventsPaginationParam;
    } else {
        feedUrl = resourcesFeedUrl;
        paginationParam = resourcesPaginationParam;
    }

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const filterKey = useMemo(
        () => Object.keys(FILTER_MAP).filter((k) => filterProps[k]).sort().join("|"),
        [filterProps]
    );

    const activeFilters = useMemo(() => {
        const verticals = new Set();
        const types = new Set();
        const topics = new Set();

        for (const [key, { id, type }] of Object.entries(FILTER_MAP)) {
            if (!filterProps[key]) continue;
            if (type === "vertical") verticals.add(id);
            else if (type === "type") types.add(id);
            else if (type === "topic") topics.add(id);
        }
        return { verticals, types, topics };
    }, [filterKey]);

    function getLabelsByIds(ids, type) {
        return Object.values(FILTER_MAP)
            .filter((entry) => entry.type === type && ids.includes(entry.id))
            .map((entry) => entry.name);
    }

    useEffect(() => {
        if (!feed?.url) return;

        let cancelled = false;

        async function fetchPage(pageNum) {
            const url = pageNum === 1
                ? feed.url
                : `${feed.url}?${feed.paginationParam}=${pageNum}`;

            const res = await fetch(url);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, "text/html");
            const scripts = doc.querySelectorAll("script[data-resource-item]");

            return Array.from(scripts).map((s) => {
                try {
                    return JSON.parse(s.textContent);
                } catch {
                    return null;
                }
            }).filter(Boolean);
        }

        async function fetchResources() {
            setLoading(true);
            setError(null);

            const matchesFilters = (item) => {
                const check = (field, set) => {
                    if (set.size === 0) return true;
                    const vals = [].concat(item[field] ?? []);
                    return vals.some((id) => set.has(id));
                };
                return (
                    check("verticals", activeFilters.verticals) &&
                    check("types", activeFilters.types) &&
                    check("topics", activeFilters.topics)
                );
            };

            try {
                let results = [];
                let page = 1;
                const MAX_PAGES = 30;

                while (results.length < 4 && page <= MAX_PAGES) {
                    const items = await fetchPage(page);
                    if (items.length === 0) break;

                    results = results.concat(items.filter(matchesFilters));
                    page++;

                    if (cancelled) return;
                }

                if (!cancelled) setResources(results.slice(0, 4));
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchResources();

        return () => {
            cancelled = true;
        };
    }, [dataSource, feed.url, feed.paginationParam, filterKey]);

    if (loading) return <div>Loading…</div>;
    if (error) return <div>Error: {error}</div>;
    if (!resources.length) return <div>No resources found.</div>;

    const featuredResource = resources[0];
    const secondaryResources = resources.slice(1);

    return (
        <div className="lnre-cards">
            {featuredResource && (
                <div className="lnre-card-outer is-single">
                    <ResourceCard
                        type={dataSource}
                        resource={featuredResource}
                        size="big"
                        getLabelsByIds={getLabelsByIds}
                    />
                </div>
            )}

            {secondaryResources.length > 0 && (
                <div className="lnre-card-outer is-multiple">
                    {secondaryResources.map((resource) => (
                        <ResourceCard
                            type={dataSource}
                            key={resource.id}
                            resource={resource}
                            size="small"
                            getLabelsByIds={getLabelsByIds}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}