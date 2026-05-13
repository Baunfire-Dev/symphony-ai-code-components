import './ResourcesGridCards.css';
import React, { useEffect, useState } from "react";
import FILTER_MAP from "./filterMap";

function ResourceCard({ type, resource, size = "small", getLabelsByIds }) {
    const fd = resource.fieldData;

    const date = new Date(fd['publish-date']);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    // const verticalNames = getLabelsByIds([].concat(fd["verticals-2"] ?? []), "vertical");
    const typeNames = getLabelsByIds([].concat(fd["types-2"] ?? []), "type");
    // const topicNames = getLabelsByIds([].concat(fd["topics-2"] ?? []), "topic");

    let slug = fd.slug;

    if (type == "Events & Webinars") {
        slug = fd['news-url'] || slug;
    } else if (type == "News") {
        slug = fd['external-url'] || slug;
    }

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

    const collectionId = collectionMap[dataSource] ?? resourcesCollectionId;;

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const activeVerticalIds = new Set();
    const activeTypeIds = new Set();
    const activeTopicIds = new Set();

    for (const [key, { id, type }] of Object.entries(FILTER_MAP)) {
        if (!filterProps[key]) continue;

        if (type === "vertical") activeVerticalIds.add(id);
        if (type === "type") activeTypeIds.add(id);
        if (type === "topic") activeTopicIds.add(id);
    }

    function matchesFilters(r) {
        const fd = r.fieldData;

        if (activeVerticalIds.size > 0) {
            const vals = [].concat(fd["verticals-2"] ?? []);
            if (!vals.some((id) => activeVerticalIds.has(id))) return false;
        }

        if (activeTypeIds.size > 0) {
            const vals = [].concat(fd["types-2"] ?? []);
            if (!vals.some((id) => activeTypeIds.has(id))) return false;
        }

        if (activeTopicIds.size > 0) {
            const vals = [].concat(fd["topics-2"] ?? []);
            if (!vals.some((id) => activeTopicIds.has(id))) return false;
        }

        return true;
    }

    function getLabelsByIds(ids, type) {
        return Object.values(FILTER_MAP)
            .filter((entry) => entry.type === type && ids.includes(entry.id))
            .map((entry) => entry.name);
    }

    useEffect(() => {
        if (!siteTokenId || !collectionId) return;

        async function fetchResources() {
            setLoading(true);
            setError(null);

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

                setResources(results.slice(0, 4));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchResources();
    }, [resourcesCollectionId, siteTokenId]);

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