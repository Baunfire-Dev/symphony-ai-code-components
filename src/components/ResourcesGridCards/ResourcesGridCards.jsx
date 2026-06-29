import './ResourcesGridCards.css';
import React, { useEffect, useMemo, useState } from "react";
import FILTER_MAP from "./filterMap";

function getFetchOrigin() {
    const WORKER_ORIGIN = "https://symphonyai.rcuer.workers.dev";

    if (typeof window === 'undefined') return '';

    const host = window.location.hostname;

    if (host.endsWith('.design.webflow.com')) {
        return WORKER_ORIGIN;
    }
    return '';
}

function decodeEntities(str) {
    if (typeof str !== 'string') return str;
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
}

function ResourceCard({ type, resource, size = "small", getLabelsBySlugs }) {
    const typeNames = getLabelsBySlugs([].concat(resource.types ?? []), "type");

    let href = `/${resource.slug}`;
    let isExternal = false;

    if (type === "Resources") {
        href = resource.newResourceUrl || resource.externalUrl || href;
        isExternal = !resource.newResourceUrl && !!resource.externalUrl;
    }

    if (type === "Events & Webinars") {
        href = resource.externalUrl || href;
        isExternal = !!resource.externalUrl;
    } 
    
    if (type === "News") {
        href = resource.newsUrl || href;
        isExternal = !!resource.newsUrl;
    }

    const date = new Date(resource.date);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    return (
        <div className={`lnre-card is-${size}`} key={resource.id}>
            <a href={`${href}`} target={isExternal ? "_blank" : "_self"} className="lnre-c-link"></a>

            <div className="lnre-c-head">
                <div className="lnre-c-head-inner">
                    <p className="lnre-c-type">{typeNames.join(", ")}</p>

                    {(type === "News" && resource.logoUrl) && (
                        <img
                            loading="lazy"
                            src={resource.logoUrl}
                            alt="logo image"
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

    function getLabelsBySlugs(slugs, type) {
        return Object.values(FILTER_MAP)
            .filter((entry) => entry.type === type && slugs.includes(entry.id))
            .map((entry) => entry.name);
    }

    useEffect(() => {
        if (!feedUrl) return;
        
        const fetchOrigin = getFetchOrigin();

        let cancelled = false;

        async function fetchPage(pageNum) {
            const path = pageNum === 1
                ? feedUrl
                : `${feedUrl}?${paginationParam}=${pageNum}`;

            const res = await fetch(`${fetchOrigin}${path}`);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, "text/html");

            const itemWrappers = doc.querySelectorAll(".data-row");

            return Array.from(itemWrappers).map((wrapper) => {
                const mainScript = wrapper.querySelector("script[data-post-item]");
                if (!mainScript) return null;

                let main;
                try {
                    main = JSON.parse(mainScript.textContent);
                    for (const key in main) {
                        if (typeof main[key] === 'string') {
                            main[key] = decodeEntities(main[key]);
                        }
                    }
                } catch {
                    return null;
                }

                const parseSlugs = (selector) =>
                    Array.from(wrapper.querySelectorAll(selector))
                        .map((s) => {
                            try { return JSON.parse(s.textContent).slug; }
                            catch { return null; }
                        })
                        .filter(Boolean);

                return {
                    ...main,
                    verticals: parseSlugs("script[data-vertical]"),
                    types: parseSlugs("script[data-type]"),
                    topics: parseSlugs("script[data-topic]"),
                };
            }).filter(Boolean);
        }

        async function fetchResources() {
            setLoading(true);
            setError(null);

            const matchesFilters = (item) => {
                const check = (vals, set) => {
                    if (set.size === 0) return true;
                    return (vals ?? []).some((slug) => set.has(slug));
                };
                return (
                    check(item.verticals, activeFilters.verticals) &&
                    check(item.types, activeFilters.types) &&
                    check(item.topics, activeFilters.topics)
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
    }, [dataSource, feedUrl, paginationParam, filterKey]);

    if (loading) return <div class="layout-state loading">Loading…</div>;
    if (error) return <div class="layout-state error">Error: {error}</div>;
    if (!resources.length) return <div class="layout-state empty">No resources found.</div>;

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
                        getLabelsBySlugs={getLabelsBySlugs}
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
                            getLabelsBySlugs={getLabelsBySlugs}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}