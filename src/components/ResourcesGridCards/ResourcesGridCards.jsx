import './ResourcesGridCards.css';
import React, { useEffect, useMemo, useState } from "react";
import FILTER_MAP from "./filterMap";

function ResourceCard({ type, resource, size = "small", getLabelsByIds, fields }) {
    const fd = resource.fieldData;

    const typeNames = getLabelsByIds([].concat(fd[fields.types] ?? []), "type");

    let slug = fd.slug;
    let dateSlug = 'post-date';

    if (type == "Events & Webinars") {
        slug = fd['news-url'] || slug;
    } else if (type == "News") {
        slug = fd['external-url'] || slug;
    } else {
        dateSlug = 'publish-date';
    }

    const date = new Date(fd[dateSlug]);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    return (
        <div class={`lnre-card is-${size}`} key={resource.id}>
            <a href={`/${slug}`} class="lnre-c-link"></a>

            <div class="lnre-c-head">
                <div class="lnre-c-head-inner">
                    <p class="lnre-c-type">{typeNames.join(", ")}</p>

                    {fd["logo"]?.url && (
                        <img
                            loading="lazy"
                            src={fd["logo"]?.url}
                            alt={fd["logo"]?.alt}
                            class="lnre-c-image"
                        />
                    )}
                </div>

                <p class="lnre-c-title">{fd.name}</p>
            </div>

            <div class="lnre-foot">
                <p class="lnre-c-date">{formattedDate}</p>

                <div class="lnre-c-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="14" viewBox="0 0 26 14" fill="none">
                        <path d="M18.913 1L25 7M25 7L18.913 13M25 7L1 7" stroke="#0074E8" stroke-linecap="square"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ResourcesGridCards(props) {
    const {
        resourcesCollectionId = "",
        newsCollectionId = "",
        eventsWebinarCollectionId = "",
        siteTokenId = "",
        dataSource = "Resources",
        ...filterProps
    } = props;

    const collectionMap = {
        "News": newsCollectionId,
        "Events & Webinars": eventsWebinarCollectionId,
        "Resources": resourcesCollectionId,
    };

    const fieldMap = {
        "Resources": {
            verticals: "verticals-2",
            types: "types-2",
            topics: "topics-2",
        },
        "News": {
            verticals: "verticals",
            types: "types",
            topics: "topics",
        },
        "Events & Webinars": {
            verticals: "verticals",
            types: "types",
            topics: "topics",
        },
    };

    const collectionId = collectionMap[dataSource] ?? resourcesCollectionId;
    const fields = fieldMap[dataSource] ?? fieldMap["Resources"];

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
        if (!siteTokenId || !collectionId) return;

        let cancelled = false;

        async function fetchResources() {
            setLoading(true);
            setError(null);

            const matchesFilters = (r) => {
                const fd = r.fieldData;
                const check = (field, set) => {
                    if (set.size === 0) return true;
                    const vals = [].concat(fd[field] ?? []);
                    return vals.some((id) => set.has(id));
                };
                return (
                    check(fields.verticals, activeFilters.verticals) &&
                    check(fields.types, activeFilters.types) &&
                    check(fields.topics, activeFilters.topics)
                );
            };

            try {
                const PAGE = 100;
                let offset = 0;
                let total = null;
                let results = [];

                while (results.length < 4) {
                    const res = await fetch(
                        `https://api-cdn.webflow.com/v2/collections/${collectionId}/items/live?limit=${PAGE}&offset=${offset}&sortBy=createdOn&sortOrder=desc`,
                        {
                            headers: {
                                Authorization: `Bearer ${siteTokenId}`,
                                "accept-version": "2.0.0",
                            },
                        }
                    );

                    if (!res.ok) {
                        throw new Error(`API error ${res.status}`);
                    }

                    const data = await res.json();

                    if (total === null) {
                        total = data.pagination?.total ?? 0;
                    }

                    const matched = (data.items ?? [])
                        .filter((r) => !r.isDraft && !r.isArchived)
                        .filter(matchesFilters);

                    results = results.concat(matched);

                    offset += PAGE;

                    if (offset >= total) break;
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
    }, [dataSource, collectionId, siteTokenId, filterKey]);

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
                        fields={fields}
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
                            fields={fields}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}