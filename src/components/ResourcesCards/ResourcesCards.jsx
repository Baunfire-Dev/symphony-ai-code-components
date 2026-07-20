import './ResourcesCards.css';
import React, { useEffect, useState } from "react";

function ResourceCard({ resource, size = "small" }) {
    const colorMap = {
      "Dark Purple": "violet",
      "Light Purple": "light-purple",
      "Pink": "magenta",
      "Orange": "orange",
      "Yellow": "yellow",
      "Light Blue": "light-blue",
      "Royal Blue": "blue",
      "Green": "teal",
    };

    const date = new Date(resource.date);
    const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;

    const href = resource.newResourceUrl || resource.externalUrl || resource.slug;
    const isExternal = !resource.newResourceUrl && !!resource.externalUrl;

    return (
        <div className={`src-card is-${size}`}>
            <a
                href={href}
                className="src-c-link"
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
            />

            <div className="src-c-head">
                <div className="src-c-head-inner">
                    <p className="src-c-date">{formattedDate}</p>

                    <p className="src-c-type">
                        {resource.types?.map((item) => item.name).join(", ") || "Resource"}
                    </p>
                </div>

                <p className="src-c-title">{resource.name}</p>

                {resource.featuredImage && (
                    <img
                        loading="lazy"
                        src={resource.featuredImage.url}
                        alt={resource.featuredImage.alt || "resource-image"}
                        className="src-c-image"
                    />
                )}
            </div>

            <div className="src-foot">
                <div className="src-foot-inner">
                    <div className="src-c-orb" color={colorMap[resource.verticals[0].color]}></div>

                    <p className="src-c-tag">
                        {
                            resource.verticals?.map((item) => item.name).join(", ") ||
                            resource.topics?.map((item) => item.name).join(", ") ||
                            "Resource"
                        }
                    </p>
                </div>

                <div className="src-c-arrow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="14"
                        viewBox="0 0 26 14"
                        fill="none"
                    >
                        <path
                            d="M18.913 1L25 7M25 7L18.913 13M25 7L1 7"
                            stroke="#0074E8"
                            strokeLinecap="square"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function ResourcesCards(props) {
    const {
        count = 4,
        ...filterProps
    } = props;

    const [resources, setResources] = useState([]);
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
        async function loadResources() {
            try {
                const res = await fetch(
                    "https://symphonyai-resources.jjimenez-3e7.workers.dev/resources"
                );

                const data = await res.json();

                const sortedResources = [...(data.items || [])].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );

                const activeFilters = Object.entries(filterProps)
                    .filter(([_, value]) => value === true)
                    .map(([key]) => filterMap[key])
                    .filter(Boolean);

                const filtersByGroup = {
                    vertical: activeFilters.filter((f) => f.group === "vertical"),
                    type: activeFilters.filter((f) => f.group === "type"),
                    topic: activeFilters.filter((f) => f.group === "topic")
                };

                const filteredResources = sortedResources.filter((resource) => {
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

                setResources(filteredResources.slice(0, count));

            } catch (error) {
                console.error("Failed to load resources:", error);
            } finally {
                setLoading(false);
            }
        }

        loadResources();
    }, [count, ...Object.values(filterProps)]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const featuredResource = resources[0];
    const secondaryResources = resources.slice(1);

    return (
        <>
            {count < 4 ? (
                <div className="src-cards-flex-grid">
                    {resources.map((resource) => (
                        <ResourceCard
                            key={resource.slug}
                            resource={resource}
                            size="big"
                        />
                    ))}
                </div>
            ) : (
                <div className="src-cards">
                    {featuredResource && (
                        <div className="src-card-outer is-single">
                            <ResourceCard
                                resource={featuredResource}
                                size="big"
                            />
                        </div>
                    )}

                    {secondaryResources.length > 0 && (
                        <div className="src-card-outer is-multiple">
                            {secondaryResources.map((resource) => (
                                <ResourceCard
                                    key={resource.slug}
                                    resource={resource}
                                    size="small"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}