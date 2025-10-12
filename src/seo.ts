// src/seo.ts
export function setHead(tags: {
    title?: string;
    description?: string;
    canonical?: string;
    robots?: string;
    ogTitle?: string;
    ogDescription?: string;
}) {
    if (tags.title) document.title = tags.title;

    const ensure = (selector: string, createEl: () => HTMLElement) => {
        let el = document.head.querySelector(selector) as HTMLElement | null;
        if (!el) { el = createEl(); document.head.appendChild(el); }
        return el;
    };

    if (tags.description !== undefined) {
        const el = ensure('meta[name="description"]', () => {
            const m = document.createElement("meta"); m.setAttribute("name", "description"); return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", tags.description);
    }

    if (tags.canonical) {
        const el = ensure('link[rel="canonical"]', () => {
            const l = document.createElement("link"); l.setAttribute("rel", "canonical"); return l;
        }) as HTMLLinkElement;
        el.setAttribute("href", tags.canonical);
    }

    if (tags.robots !== undefined) {
        const el = ensure('meta[name="robots"]', () => {
            const m = document.createElement("meta"); m.setAttribute("name", "robots"); return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", tags.robots);
    }

    // Open Graph basique (préview réseaux)
    if (tags.ogTitle) {
        const el = ensure('meta[property="og:title"]', () => {
            const m = document.createElement("meta"); m.setAttribute("property", "og:title"); return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", tags.ogTitle);
    }
    if (tags.ogDescription) {
        const el = ensure('meta[property="og:description"]', () => {
            const m = document.createElement("meta"); m.setAttribute("property", "og:description"); return m;
        }) as HTMLMetaElement;
        el.setAttribute("content", tags.ogDescription);
    }
}
