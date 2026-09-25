import { useEffect, useState } from "react";
import FILTER_MAP from "./filterMap.js";

function getActiveFilters(filterProps) {
    return Object.entries(filterProps)
        .filter(([, value]) => value === true)
        .map(([key]) => FILTER_MAP[key])
        .filter(Boolean);
}

function matchesFilters(resource, activeFilters) {
    const byGroup = {
        vertical: activeFilters.filter((f) => f.type === "vertical"),
        type: activeFilters.filter((f) => f.type === "type"),
        topic: activeFilters.filter((f) => f.type === "topic"),
    };

    // Matched by id (the real Webflow CMS item id), not display name — a
    // renamed Vertical/Type/Topic in the CMS no longer silently breaks
    // filtering for existing component instances.
    const matchGroup = (filters, items) => {
        if (!filters.length) return true;
        return filters.some((filter) => items?.some((item) => item.id === filter.id));
    };

    return (
        matchGroup(byGroup.vertical, resource.verticals) &&
        matchGroup(byGroup.type, resource.types) &&
        matchGroup(byGroup.topic, resource.topics)
    );
}

// Sorts newest-first by `date`, applies the active boolean filters (OR
// within a group — e.g. any selected Vertical — AND across groups), and
// caps to `limit` when provided. Exported standalone so it's testable /
// reusable without the fetch+state wiring below.
export function filterAndSortItems(items, filterProps, limit) {
    const activeFilters = getActiveFilters(filterProps);

    const sorted = [...(items || [])].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    const filtered = sorted.filter((resource) => matchesFilters(resource, activeFilters));

    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
}

// Shared data layer for ResourcesCards and ResourcesGridCards: fetch the
// flattened JSON feed from the Cloudflare Worker, then sort/filter/slice
// client-side (the Worker doesn't know about per-instance filter props).
export function useResourceFeed({ endpoint, filterProps, limit }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // filterProps is a plain object of booleans; spreading its values into
    // the dependency array (rather than the object itself) re-fetches only
    // when an actual filter toggle changes, matching the prior behavior.
    const filterValues = Object.values(filterProps || {});

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);

            if (!endpoint) {
                setItems([]);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(endpoint);
                const data = await res.json();

                if (!cancelled) {
                    setItems(filterAndSortItems(data.items, filterProps, limit));
                }
            } catch (err) {
                console.error(`Failed to load resource feed (${endpoint}):`, err);
                if (!cancelled) setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [endpoint, limit, ...filterValues]);

    return { items, loading, error };
}
