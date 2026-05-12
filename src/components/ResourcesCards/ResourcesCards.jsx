import React, { useEffect, useState } from "react";
import FILTER_MAP from "./filterMap";

export default function ResourceBlock(props) {
    const { resourcesCollectionId = "", ...filterProps } = props;

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const activeVerticalIds = new Set();
    const activeTypeIds = new Set();
    const activeTopicIds = new Set();

    for (const [key, id] of Object.entries(FILTER_MAP)) {
        if (!filterProps[key]) continue;
        if (key.startsWith("vertical_")) activeVerticalIds.add(id);
        if (key.startsWith("type_")) activeTypeIds.add(id);
        if (key.startsWith("topic_")) activeTopicIds.add(id);
    }

    useEffect(() => {
        if (!resourcesCollectionId) return;

        async function fetchResources() {
            setLoading(true);
            setError(null);
            try {
                const PAGE = 100;
                let offset = 0;
                let all = [];

                while (true) {
                    const res = await fetch(
                        `https://api.webflow.com/v2/collections/${resourcesCollectionId}/items/live?limit=${PAGE_SIZE}&offset=${offset}&sortBy=createdOn&sortOrder=desc`
                    );
                    if (!res.ok) throw new Error(`API error ${res.status}`);
                    const data = await res.json();
                    all = all.concat(data.items ?? []);
                    if (all.length >= (data.pagination?.total ?? 0)) break;
                    offset += PAGE;
                }

                setResources(all);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchResources();
    }, [resourcesCollectionId]);

    const results = resources
        .filter((r) => !r.isDraft && !r.isArchived)
        .filter((r) => {
            const fd = r.fieldData;
            if (activeVerticalIds.size > 0) {
                const vals = [].concat(fd.verticals ?? []);
                if (!vals.some((id) => activeVerticalIds.has(id))) return false;
            }
            if (activeTypeIds.size > 0) {
                const vals = [].concat(fd.types ?? []);
                if (!vals.some((id) => activeTypeIds.has(id))) return false;
            }
            if (activeTopicIds.size > 0) {
                const vals = [].concat(fd.topics ?? []);
                if (!vals.some((id) => activeTopicIds.has(id))) return false;
            }
            return true;
        })
        .slice(0, 4);

    if (loading) return <div>Loading…</div>;
    if (error) return <div>Error: {error}</div>;
    if (!results.length) return <div>No resources found.</div>;

    return (
        <div>
            {results.map((r) => (
                <div key={r.id}>
                    <a href={`/${r.fieldData.slug}`}>
                        <p>{r.fieldData.name}</p>
                    </a>
                </div>
            ))}
        </div>
    );
}