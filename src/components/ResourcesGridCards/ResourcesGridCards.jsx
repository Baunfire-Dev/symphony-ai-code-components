import './ResourcesGridCards.css';
import React, { useEffect, useState } from "react";

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
        ...filterProps
    } = props;

    const [resources, setResources] = useState([]);
    const [news, setNews] = useState([]);
    const [webinarEvents, setWebinarEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const filterMap = {
        // Vertical
        vertical_ai: { group: "vertical", name: "AI" },
        vertical_enterpriseIt: { group: "vertical", name: "Enterprise IT" },
        vertical_financialServices: { group: "vertical", name: "Financial Services" },
        vertical_industrial: { group: "vertical", name: "Industrial" },
        vertical_media: { group: "vertical", name: "Media" },
        vertical_retailCpg: { group: "vertical", name: "Retail / CPG" },

        // Type
        type_academicPublication: { group: "type", name: "Academic publication" },
        type_analystReport: { group: "type", name: "Analyst report" },
        type_artificialIntelligence: { group: "type", name: "Artificial intelligence" },
        type_blog: { group: "type", name: "Blog" },
        type_byline: { group: "type", name: "Byline" },
        type_caseStudy: { group: "type", name: "Case study" },
        type_coverage: { group: "type", name: "Coverage" },
        type_dataSheet: { group: "type", name: "Data sheet" },
        type_default: { group: "type", name: "Default" },
        type_demo: { group: "type", name: "Demo" },
        type_ebook: { group: "type", name: "Ebook" },
        type_industryEvent: { group: "type", name: "Industry event" },
        type_infographic: { group: "type", name: "Infographic" },
        type_insuranceInsight: { group: "type", name: "Insurance insight" },
        type_itOperation: { group: "type", name: "IT operation" },
        type_mediaCoverage: { group: "type", name: "Media Coverage" },
        type_partner: { group: "type", name: "Partner" },
        type_podcast: { group: "type", name: "Podcast" },
        type_pressRelease: { group: "type", name: "Press release" },
        type_solutionVideo: { group: "type", name: "Solution video" },
        type_video: { group: "type", name: "Video" },
        type_videoSeries: { group: "type", name: "Video series" },
        type_virtualIndustryEvent: { group: "type", name: "Virtual industry event" },
        type_webinar: { group: "type", name: "Webinar" },
        type_whitePaper: { group: "type", name: "White paper" },

        // Topic
        topic_cpg: { group: "topic", name: "CPG" },
        topic_finserveCdd: { group: "topic", name: "FinServe CDD" },
        topic_finserveKyc: { group: "topic", name: "FinServe KYC" },
        topic_finserveSanctionsScreening: { group: "topic", name: "FinServe Sanctions Screening" },
        topic_fsAgentic: { group: "topic", name: "FS Agentic" },
        topic_industrialConnectedWorker: { group: "topic", name: "Industrial Connected Worker" },
        topic_industrialDataops: { group: "topic", name: "Industrial DataOps" },
        topic_industrialUnifiedNamespace: { group: "topic", name: "Industrial Unified Namespace" },
        topic_mediaStreaming: { group: "topic", name: "Media Streaming" },
        topic_retailCategoryManagement: { group: "topic", name: "Retail Category Management" },
        topic_retailContentMonetization: { group: "topic", name: "Retail Content Monetization" },
        topic_retailDemandForecasting: { group: "topic", name: "Retail Demand Forecasting" },
        topic_retailGrocery: { group: "topic", name: "Retail Grocery" },
        topic_retailMerchandising: { group: "topic", name: "Retail Merchandising" },
        topic_retailStoreOperations: { group: "topic", name: "Retail Store Operations" },
        topic_retailSupplyChain: { group: "topic", name: "Retail Supply Chain" },
        topic_verticalAi: { group: "topic", name: "Vertical AI" }
    };

    useEffect(() => {
        function getFilteredItems(items) {
            const activeFilters = Object.entries(filterProps)
                .filter(([_, value]) => value === true)
                .map(([key]) => filterMap[key])
                .filter(Boolean);

            const filtersByGroup = {
                vertical: activeFilters.filter((f) => f.group === "vertical"),
                type: activeFilters.filter((f) => f.group === "type"),
                topic: activeFilters.filter((f) => f.group === "topic"),
            };

            return items.filter((resource) => {
                const matchGroup = (filters, items) => {
                    if (!filters.length) return true;

                    return filters.some((filter) =>
                        items?.some((item) => item.name === filter.name)
                    );
                };

                return (
                    matchGroup(filtersByGroup.vertical, resource.verticals) &&
                    matchGroup(filtersByGroup.type, resource.types) &&
                    matchGroup(filtersByGroup.topic, resource.topics)
                );
            });
        }

        async function loadData() {
            setLoading(true);

            try {
                let endpoint = "";
                let setter = null;

                if (dataSource === "Resources") {
                    endpoint = "https://symphonyai-resources.jjimenez-3e7.workers.dev/resources";
                    setter = setResources;
                } else if (dataSource === "News") {
                    endpoint = "https://symphonyai-resources.jjimenez-3e7.workers.dev/news";
                    setter = setNews;
                } else if (dataSource === "Events & Webinars") {
                    endpoint = "https://symphonyai-resources.jjimenez-3e7.workers.dev/webinar-events";
                    setter = setWebinarEvents;
                }

                if (!endpoint || !setter) return;

                const res = await fetch(endpoint);
                const data = await res.json();

                const sortedItems = [...(data.items || [])].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );

                setter(getFilteredItems(sortedItems).slice(0, 4));
            } catch (error) {
                console.error(`Failed to load ${dataSource}:`, error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [dataSource, ...Object.values(filterProps)]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (dataSource === "Resources" && !resources.length) {
        return (
            <div className="layout-state empty">
                No resources found.
            </div>
        );
    }

    if (dataSource === "News" && !news.length) {
        return (
            <div className="layout-state empty">
                No news found.
            </div>
        );
    }

    if (dataSource === "Events & Webinars" && !webinarEvents.length) {
        return (
            <div className="layout-state empty">
                No webinar & events found.
            </div>
        );
    }

    const items = dataSource === "Resources" ? resources : dataSource === "News" ? news : webinarEvents;

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