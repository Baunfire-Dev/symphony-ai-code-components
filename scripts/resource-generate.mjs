import fs from "fs";
import path from "path";

const CONFIG = {
    token: process.env.WEBFLOW_DATA_API_TOKEN,
    siteId: process.env.WEBFLOW_SITE_ID,
    collections: {
        verticals: process.env.WEBFLOW_VERTICALS_COLLECTION_ID,
        types: process.env.WEBFLOW_TYPES_COLLECTION_ID,
        topics: process.env.WEBFLOW_TOPICS_COLLECTION_ID,
        resources: process.env.WEBFLOW_RESOURCES_COLLECTION_ID,
        news: process.env.WEBFLOW_NEWS_COLLECTION_ID,
        eventsWebinar: process.env.WEBFLOW_EVENTS_WEBINAR_COLLECTION_ID,
    },
    nameField: "name",
    resourcesCards: {
        outDefinition: path.resolve("./src/components/ResourcesCards/ResourcesCards.webflow.jsx"),
        outFilterMap: path.resolve("./src/components/ResourcesCards/filterMap.js"),
    },
    resourcesGridCards: {
        outDefinition: path.resolve("./src/components/ResourcesGridCards/ResourcesGridCards.webflow.jsx"),
        outFilterMap: path.resolve("./src/components/ResourcesGridCards/filterMap.js"),
    }
};

async function fetchCollection(collectionId) {
    const PAGE = 100;
    let offset = 0;
    let all = [];

    while (true) {
        const res = await fetch(
            `https://api-cdn.webflow.com/v2/sites/${CONFIG.siteId}/collections/${collectionId}/items?limit=${PAGE}&offset=${offset}&sortBy=name&sortOrder=asc`,
            {
                headers: {
                    Authorization: `Bearer ${CONFIG.token}`,
                    "accept-version": "2.0.0",
                },
            }
        );

        if (!res.ok) {
            const body = await res.text();
            throw new Error(`API error ${res.status} for collection ${collectionId}: ${body}`);
        }

        const data = await res.json();
        all = all.concat(data.items ?? []);
        if (all.length >= (data.pagination?.total ?? 0)) break;
        offset += PAGE;
    }

    return all;
}

function sanitizeKey(name) {
    return name
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .split(/\s+/)
        .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
        .join("");
}

function generateProps(items, prefix) {
    return items
        .map((item) => {
            const name = item.fieldData?.[CONFIG.nameField] ?? item.id;
            const key = `${prefix}_${sanitizeKey(name)}`;
            const group = prefix[0].toUpperCase() + prefix.slice(1).toLowerCase();
            return { key, id: item.id, name, group, type: prefix };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
}

function renderFilterMap(allProps) {
    const lines = allProps
        .map(({ key, id, name, type }) => `${key}: { id: ${JSON.stringify(id)}, name: ${JSON.stringify(name)}, type: ${JSON.stringify(type)} },`)
        .join("\n");

    return `const FILTER_MAP = {\n${lines}\n};\n\nexport default FILTER_MAP;\n`;
}

function renderProps(allProps) {
    return allProps
        .map(({ key, group, name }) => `
        ${key}: props.Boolean({ 
            name: ${JSON.stringify(name)}, 
            defaultValue: false,
            group: ${JSON.stringify(group)}
        })`);
}

function renderResourcesGridCardsDefinition(allProps) {
    return `
import ResourcesGridCards from "./ResourcesGridCards";
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(ResourcesGridCards, {
    name: "Resources Grid Cards",
    group: "Resources",
    options: {
        ssr: false,
    },
    props: {
        siteTokenId: props.Text({
            name: "Site Token ID",
            defaultValue: ${JSON.stringify(CONFIG.token ?? "")},
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        eventsWebinarCollectionId: props.Text({
            name: "Events & Webinar Collection ID",
            defaultValue: ${JSON.stringify(CONFIG.collections.eventsWebinar ?? "")},
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        newsCollectionId: props.Text({
            name: "News Collection ID",
            defaultValue: ${JSON.stringify(CONFIG.collections.news ?? "")},
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        resourcesCollectionId: props.Text({
            name: "Resources Collection ID",
            defaultValue: ${JSON.stringify(CONFIG.collections.resources ?? "")},
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        dataSource: props.Variant({
            name: "Data Source",
            defaultValue: "Resources",
            options: ["Resources", "Events & Webinars", "News"],
        }), ${renderProps(allProps)}
    },
});`;
}

function renderResourcesCardsDefinition(allProps) {
    return `
import ResourcesCards from "./ResourcesCards";
import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';

export default declareComponent(ResourcesCards, {
    name: "Resources Cards",
    group: "Resources",
    options: {
        ssr: false,
    },
    props: {
        siteTokenId: props.Text({
            name: "Site Token ID",
            defaultValue: ${JSON.stringify(CONFIG.token ?? "")},
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        resourcesCollectionId: props.Text({
            name: "Resources Collection ID",
            defaultValue: ${JSON.stringify(CONFIG.collections.resources ?? "")},
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }), ${renderProps(allProps)}
    },
});`;
}

async function main() {
    const [verticals, types, topics] = await Promise.all([
        fetchCollection(CONFIG.collections.verticals),
        fetchCollection(CONFIG.collections.types),
        fetchCollection(CONFIG.collections.topics),
    ]);

    const allProps = [
        ...generateProps(verticals, "vertical"),
        ...generateProps(types, "type"),
        ...generateProps(topics, "topic"),
    ];

    fs.writeFileSync(CONFIG.resourcesCards.outFilterMap, renderFilterMap(allProps), "utf8");
    fs.writeFileSync(CONFIG.resourcesCards.outDefinition, renderResourcesCardsDefinition(allProps), "utf8");
    console.log(`Resources Cards Files Done!`);

    fs.writeFileSync(CONFIG.resourcesGridCards.outFilterMap, renderFilterMap(allProps), "utf8");
    fs.writeFileSync(CONFIG.resourcesGridCards.outDefinition, renderResourcesGridCardsDefinition(allProps), "utf8");
    console.log(`Resources Grid Cards Files Done!`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
