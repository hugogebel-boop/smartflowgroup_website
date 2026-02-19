// src/seo.ts
const BASE_URL = "https://smartflowsa.ch";
const OLD_URL = "https://www.smartflowgroup.ch";

export interface SEOConfig {
    title?: string;
    description?: string;
    canonical?: string;
    robots?: string;
    keywords?: string;
    author?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    ogType?: string;
    ogSiteName?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    twitterSite?: string;
    twitterCreator?: string;
}

export function setHead(config: SEOConfig) {
    // Helper pour créer ou mettre à jour les éléments meta
    const ensure = (selector: string, createEl: () => HTMLElement) => {
        let el = document.head.querySelector(selector) as HTMLElement | null;
        if (!el) { el = createEl(); document.head.appendChild(el); }
        return el;
    };

    // Title
    if (config.title) {
        document.title = config.title;
    }

    // Meta description
    if (config.description !== undefined) {
        const el = ensure('meta[name="description"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "description"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.description);
    }

    // Meta keywords
    if (config.keywords !== undefined) {
        const el = ensure('meta[name="keywords"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "keywords"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.keywords);
    }

    // Meta author
    if (config.author !== undefined) {
        const el = ensure('meta[name="author"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "author"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.author);
    }

    // Canonical URL
    if (config.canonical) {
        const el = ensure('link[rel="canonical"]', () => {
            const l = document.createElement("link"); 
            l.setAttribute("rel", "canonical"); 
            return l;
        }) as HTMLLinkElement;
        el.setAttribute("href", config.canonical);
    }

    // Robots
    if (config.robots !== undefined) {
        const el = ensure('meta[name="robots"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "robots"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.robots);
    }

    // Open Graph
    if (config.ogTitle) {
        const el = ensure('meta[property="og:title"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("property", "og:title"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.ogTitle);
    }
    
    if (config.ogDescription) {
        const el = ensure('meta[property="og:description"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("property", "og:description"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.ogDescription);
    }
    
    if (config.ogImage) {
        const el = ensure('meta[property="og:image"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("property", "og:image"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.ogImage);
    }
    
    if (config.ogUrl) {
        const el = ensure('meta[property="og:url"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("property", "og:url"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.ogUrl);
    }
    
    if (config.ogType) {
        const el = ensure('meta[property="og:type"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("property", "og:type"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.ogType);
    }
    
    if (config.ogSiteName) {
        const el = ensure('meta[property="og:site_name"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("property", "og:site_name"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.ogSiteName);
    }

    // Twitter Cards
    if (config.twitterCard) {
        const el = ensure('meta[name="twitter:card"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "twitter:card"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.twitterCard);
    }
    
    if (config.twitterTitle) {
        const el = ensure('meta[name="twitter:title"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "twitter:title"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.twitterTitle);
    }
    
    if (config.twitterDescription) {
        const el = ensure('meta[name="twitter:description"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "twitter:description"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.twitterDescription);
    }
    
    if (config.twitterImage) {
        const el = ensure('meta[name="twitter:image"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "twitter:image"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.twitterImage);
    }
    
    if (config.twitterSite) {
        const el = ensure('meta[name="twitter:site"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "twitter:site"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.twitterSite);
    }
    
    if (config.twitterCreator) {
        const el = ensure('meta[name="twitter:creator"]', () => {
            const m = document.createElement("meta"); 
            m.setAttribute("name", "twitter:creator"); 
            return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", config.twitterCreator);
    }
}

// Configuration SEO par défaut — noindex car le site redirige vers smartflowsa.ch
export const DEFAULT_SEO = {
    author: "SmartFlow",
    ogSiteName: "SmartFlow",
    ogType: "website",
    twitterCard: "summary",
    robots: "noindex, follow",
    canonical: `${BASE_URL}/`,
    ogUrl: `${BASE_URL}/`,
    ogImage: `${OLD_URL}/assets/og-image.png`
};

// Toutes les pages redirigent vers smartflowsa.ch — SEO unifié
export const SEO_CONFIGS = {
    home: {
        title: "SmartFlow a déménagé — Retrouvez-nous sur smartflowsa.ch",
        description: "SmartFlow a évolué. Retrouvez notre studio digital sur smartflowsa.ch — sites web sur mesure, SEO, identité visuelle et design UX/UI à Lausanne.",
        ogTitle: "SmartFlow — Retrouvez-nous sur smartflowsa.ch",
        ogDescription: "SmartFlow a évolué. Studio digital à Lausanne — sites web, SEO, identité visuelle et design UX/UI.",
    },
    web: {},
    apps: {},
    automation: {},
    mentions: {},
    privacy: {},
    conditions: {},
    contact: {},
};
