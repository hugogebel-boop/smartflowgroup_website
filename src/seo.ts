// src/seo.ts
const BASE_URL = "https://www.smartflowgroup.ch";

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

// Configuration SEO par défaut
export const DEFAULT_SEO = {
    author: "SmartFlow",
    ogSiteName: "SmartFlow",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterSite: "@smartflowgroup",
    twitterCreator: "@smartflowgroup",
    robots: "index, follow",
    ogImage: `${BASE_URL}/assets/icon/android-chrome-512x512.png`
};

// Configurations SEO spécifiques par page
export const SEO_CONFIGS = {
    home: {
        title: "SmartFlow — Design & Développement web, une expérience numérique",
        description: "Sites web, applications métier et outils d'automatisation sur mesure. SmartFlow conçoit des solutions digitales élégantes et performantes pour simplifier votre quotidien professionnel.",
        keywords: "développement web, design web, sites web, applications métier, automatisation, React, Next.js, WPF, .NET, Python, Suisse, Lausanne",
        canonical: BASE_URL,
        ogTitle: "SmartFlow — Design & Développement web",
        ogDescription: "Sites web, applications métier et outils d'automatisation sur mesure. Solutions digitales élégantes et performantes.",
        ogUrl: BASE_URL,
    },
    
    web: {
        title: "Sites web — SmartFlow | Développement web moderne et élégant",
        description: "Découvrez nos réalisations web : sites vitrine, portfolios et applications web modernes. Développement React, Next.js avec une attention particulière à l'expérience utilisateur.",
        keywords: "sites web, développement web, React, Next.js, Tailwind, portfolio, site vitrine, expérience utilisateur, UX, UI, Suisse",
        canonical: `${BASE_URL}/projects/web`,
        ogTitle: "Sites web — SmartFlow",
        ogDescription: "Sites web élégants et performants développés avec React et Next.js. Une expérience utilisateur soignée pour chaque projet.",
        ogUrl: `${BASE_URL}/projects/web`,
    },
    
    apps: {
        title: "Applications métier — SmartFlow | Outils internes sur mesure",
        description: "Applications métier WPF et .NET pour optimiser vos processus internes. LabApp, ComptaApp et autres outils conçus pour améliorer votre productivité quotidienne.",
        keywords: "applications métier, WPF, .NET, applications desktop, outils internes, productivité, automatisation, EF Core, SQL Server",
        canonical: `${BASE_URL}/projects/apps`,
        ogTitle: "Applications métier — SmartFlow",
        ogDescription: "Applications métier WPF et .NET sur mesure pour optimiser vos processus internes et améliorer votre productivité.",
        ogUrl: `${BASE_URL}/projects/apps`,
    },
    
    automation: {
        title: "Programmes automatisés — SmartFlow | Scripts et automatisation",
        description: "Outils d'automatisation Python et PowerShell pour connecter vos systèmes et automatiser vos tâches répétitives. Scripts sur mesure pour votre entreprise.",
        keywords: "automatisation, Python, PowerShell, scripts, automatisation processus, Excel, intégration systèmes, données, productivité",
        canonical: `${BASE_URL}/projects/automation`,
        ogTitle: "Programmes automatisés — SmartFlow",
        ogDescription: "Scripts et outils d'automatisation sur mesure pour connecter vos systèmes et automatiser vos processus métier.",
        ogUrl: `${BASE_URL}/projects/automation`,
    },
    
    mentions: {
        title: "Mentions légales — SmartFlow",
        description: "Mentions légales du site SmartFlow. Informations sur l'éditeur, droits d'auteur et conditions d'utilisation du contenu.",
        keywords: "mentions légales, SmartFlow, droits d'auteur, propriété intellectuelle",
        canonical: `${BASE_URL}/mentions`,
        ogTitle: "Mentions légales — SmartFlow",
        ogDescription: "Mentions légales et informations sur l'éditeur du site SmartFlow.",
        ogUrl: `${BASE_URL}/mentions`,
        robots: "noindex, follow"
    }
};
