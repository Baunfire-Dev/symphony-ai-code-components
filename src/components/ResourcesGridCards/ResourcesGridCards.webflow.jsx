
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
        resourcesFeedUrl: props.Text({
            name: "Resources Feed URL",
            defaultValue: "/data/resources",
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        resourcesPaginationParam: props.Text({
            name: "Resources Pagination Param",
            defaultValue: "9f1b8a28",
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        newsFeedUrl: props.Text({
            name: "News Feed URL",
            defaultValue: "/data/news",
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        newsPaginationParam: props.Text({
            name: "News Pagination Param",
            defaultValue: "14d9ee46",
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        eventsFeedUrl: props.Text({
            name: "Webinars & Events Feed URL",
            defaultValue: "/data/webinars-events",
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        eventsPaginationParam: props.Text({
            name: "Webinars & Events Pagination Param",
            defaultValue: "dc921e64",
            group: 'Tokens',
            tooltip: 'Critical prop — only edit if you know what you are doing.',
        }),
        dataSource: props.Variant({
            name: "Data Source",
            defaultValue: "Resources",
            options: ["Resources", "Events & Webinars", "News"],
        }), 
        vertical_ai: props.Boolean({ 
            name: "AI", 
            defaultValue: false,
            group: "Vertical"
        }),
        vertical_enterpriseIt: props.Boolean({ 
            name: "Enterprise IT", 
            defaultValue: false,
            group: "Vertical"
        }),
        vertical_financialServices: props.Boolean({ 
            name: "Financial Services", 
            defaultValue: false,
            group: "Vertical"
        }),
        vertical_industrial: props.Boolean({ 
            name: "Industrial", 
            defaultValue: false,
            group: "Vertical"
        }),
        vertical_media: props.Boolean({ 
            name: "Media", 
            defaultValue: false,
            group: "Vertical"
        }),
        vertical_retailCpg: props.Boolean({ 
            name: "Retail / CPG", 
            defaultValue: false,
            group: "Vertical"
        }),
        type_academicPublication: props.Boolean({ 
            name: "Academic publication", 
            defaultValue: false,
            group: "Type"
        }),
        type_analystReport: props.Boolean({ 
            name: "Analyst report", 
            defaultValue: false,
            group: "Type"
        }),
        type_artificialIntelligence: props.Boolean({ 
            name: "Artificial intelligence", 
            defaultValue: false,
            group: "Type"
        }),
        type_blog: props.Boolean({ 
            name: "Blog", 
            defaultValue: false,
            group: "Type"
        }),
        type_byline: props.Boolean({ 
            name: "Byline", 
            defaultValue: false,
            group: "Type"
        }),
        type_caseStudy: props.Boolean({ 
            name: "Case study", 
            defaultValue: false,
            group: "Type"
        }),
        type_coverage: props.Boolean({ 
            name: "Coverage", 
            defaultValue: false,
            group: "Type"
        }),
        type_dataSheet: props.Boolean({ 
            name: "Data sheet", 
            defaultValue: false,
            group: "Type"
        }),
        type_default: props.Boolean({ 
            name: "Default", 
            defaultValue: false,
            group: "Type"
        }),
        type_demo: props.Boolean({ 
            name: "Demo", 
            defaultValue: false,
            group: "Type"
        }),
        type_ebook: props.Boolean({ 
            name: "Ebook", 
            defaultValue: false,
            group: "Type"
        }),
        type_industryEvent: props.Boolean({ 
            name: "Industry event", 
            defaultValue: false,
            group: "Type"
        }),
        type_infographic: props.Boolean({ 
            name: "Infographic", 
            defaultValue: false,
            group: "Type"
        }),
        type_insuranceInsight: props.Boolean({ 
            name: "Insurance insight", 
            defaultValue: false,
            group: "Type"
        }),
        type_itOperation: props.Boolean({ 
            name: "IT operation", 
            defaultValue: false,
            group: "Type"
        }),
        type_mediaCoverage: props.Boolean({ 
            name: "Media Coverage", 
            defaultValue: false,
            group: "Type"
        }),
        type_partner: props.Boolean({ 
            name: "Partner", 
            defaultValue: false,
            group: "Type"
        }),
        type_podcast: props.Boolean({ 
            name: "Podcast", 
            defaultValue: false,
            group: "Type"
        }),
        type_pressRelease: props.Boolean({ 
            name: "Press release", 
            defaultValue: false,
            group: "Type"
        }),
        type_solutionVideo: props.Boolean({ 
            name: "Solution video", 
            defaultValue: false,
            group: "Type"
        }),
        type_video: props.Boolean({ 
            name: "Video", 
            defaultValue: false,
            group: "Type"
        }),
        type_videoSeries: props.Boolean({ 
            name: "Video series", 
            defaultValue: false,
            group: "Type"
        }),
        type_virtualIndustryEvent: props.Boolean({ 
            name: "Virtual industry event", 
            defaultValue: false,
            group: "Type"
        }),
        type_webinar: props.Boolean({ 
            name: "Webinar", 
            defaultValue: false,
            group: "Type"
        }),
        type_whitePaper: props.Boolean({ 
            name: "White paper", 
            defaultValue: false,
            group: "Type"
        }),
        topic_cpg: props.Boolean({ 
            name: "CPG", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_finserveCdd: props.Boolean({ 
            name: "FinServe CDD", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_finserveKyc: props.Boolean({ 
            name: "FinServe KYC", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_finserveSanctionsScreening: props.Boolean({ 
            name: "FinServe Sanctions Screening", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_fsAgentic: props.Boolean({ 
            name: "FS Agentic", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_industrialConnectedWorker: props.Boolean({ 
            name: "Industrial Connected Worker", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_industrialDataops: props.Boolean({ 
            name: "Industrial DataOps", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_industrialUnifiedNamespace: props.Boolean({ 
            name: "Industrial Unified Namespace", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_mediaStreaming: props.Boolean({ 
            name: "Media Streaming", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_retailCategoryManagement: props.Boolean({ 
            name: "Retail Category Management", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_retailContentMonetization: props.Boolean({ 
            name: "Retail Content Monetization", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_retailDemandForecasting: props.Boolean({ 
            name: "Retail Demand Forecasting", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_retailGrocery: props.Boolean({ 
            name: "Retail Grocery", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_retailMerchandising: props.Boolean({ 
            name: "Retail Merchandising", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_retailStoreOperations: props.Boolean({ 
            name: "Retail Store Operations", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_retailSupplyChain: props.Boolean({ 
            name: "Retail Supply Chain", 
            defaultValue: false,
            group: "Topic"
        }),
        topic_verticalAi: props.Boolean({ 
            name: "Vertical AI", 
            defaultValue: false,
            group: "Topic"
        })
    },
});