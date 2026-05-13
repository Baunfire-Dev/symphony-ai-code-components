import './ResourcesCards.css';
import React, { useEffect, useState } from "react";
import FILTER_MAP from "./filterMap";

function ResourceCard({ resource, size = "small", getLabelsByIds }) {
    const fd = resource.fieldData;

    const date = new Date(fd['publish-date']);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    const verticalNames = getLabelsByIds([].concat(fd["verticals-2"] ?? []), "vertical");
    const typeNames = getLabelsByIds([].concat(fd["types-2"] ?? []), "type");
    const topicNames = getLabelsByIds([].concat(fd["topics-2"] ?? []), "topic");

    return (
        <div class={`src-card is-${size}`} key={resource.id}>
            <a href={`/${fd.slug}`} class="src-c-link"></a>

            <div class="src-c-head">
                <div class="src-c-head-inner">
                    <p class="src-c-date">{formattedDate}</p>
                    <p class="src-c-type">{typeNames[0] || "Resource"}</p>
                </div>

                <p class="src-c-title">{fd.name}</p>

                {fd["featured-image"]?.url && (
                    <img
                        loading="lazy"
                        src={fd["featured-image"]?.url}
                        alt={fd["featured-image"]?.alt}
                        class="src-c-image"
                    />
                )}
            </div>

            <div class="src-foot">
                <div class="src-foot-inner">
                    <div class="src-c-orb"></div>
                    <p class="src-c-tag">{topicNames[0] || verticalNames[0]}</p>
                </div>

                <div class="src-c-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="14" viewBox="0 0 26 14" fill="none">
                        <path d="M18.913 1L25 7M25 7L18.913 13M25 7L1 7" stroke="#0074E8" stroke-linecap="square"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ResourcesCards(props) {
    const { resourcesCollectionId = "", siteTokenId = "", ...filterProps } = props;

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
        if (!siteTokenId || !resourcesCollectionId) return;

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
                        `https://api-cdn.webflow.com/v2/collections/${resourcesCollectionId}/items/live?limit=${PAGE}&offset=${offset}&sortBy=createdOn&sortOrder=desc`,
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
        <div className="src-cards">
            {featuredResource && (
                <div className="src-card-outer is-single">
                    <ResourceCard
                        resource={featuredResource}
                        size="big"
                        getLabelsByIds={getLabelsByIds}
                    />
                </div>
            )}

            {secondaryResources.length > 0 && (
                <div className="src-card-outer is-multiple">
                    {secondaryResources.map((resource) => (
                        <ResourceCard
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