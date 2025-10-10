// …imports
import React, { useEffect } from "react";
import { SiteBackground, TopNav, Footer } from "../App";

export default function ProjectsWeb() {
    useEffect(() => {
        document.title = "Sites web — SmartFlow";
        window.scrollTo({ top: 0 });
    }, []);

    // ⬇️ Helper local : Home → scroll jusqu'à la section demandée
    const goHomeThenScrollTo = (targetId: string) => {
        const isHome = window.location.hash === "#/" || window.location.hash === "" || window.location.hash === "#";
        const doScroll = () => {
            const el = document.getElementById(targetId);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        if (isHome) {
            doScroll();
            return;
        }

        // 1) revenir à la home
        window.location.hash = "#/";
        // 2) quand la home est montée, on scrolle (on réessaie un court instant si besoin)
        let tries = 0;
        const tryScroll = () => {
            const el = document.getElementById(targetId);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else if (tries++ < 20) {
                requestAnimationFrame(tryScroll);
            }
        };
        // petit délai pour laisser le rendu se faire
        setTimeout(() => requestAnimationFrame(tryScroll), 200);
    };

    const PROJECTS = [
        {
            id: "ame-du-monde",
            title: "Âme du Monde",
            client: "Agence de voyages sur mesure",
            excerpt:
                "Identité raffinée, direction artistique complète et site vitrine fluide. Navigation claire, typographie élégante, design immersif.",
            image: "/public/assets/ame-du-monde.png",
            url: "https://amedumonde.ch",
        },
        {
            id: "travel-gc",
            title: "Travel Génie Civil",
            client: "Association EPFL",
            excerpt:
                "Site événementiel pour le voyage d’étude du Génie Civil 2025. Étapes, partenaires et équipe dans une interface épurée et mobile-first.",
            image: "/public/assets/travel-gc.png",
            url: "https://travelgc.ch",
        },
    ] as const;

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            {/* Intro */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">Projets</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Nos sites web</h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl">
                    Des sites élégants, rapides et lisibles — pensés pour être beaux, utiles et durables.
                </p>
            </section>

            {/* Projets */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12 sm:pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                    {PROJECTS.map((p) => (
                        <article key={p.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src={p.image}
                                    alt={`${p.title} – aperçu du site`}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <div className="p-5 sm:p-6">
                                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{p.title}</h2>
                                <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-zinc-400">{p.client}</p>
                                <p className="mt-3 text-sm text-zinc-300">{p.excerpt}</p>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                                    >
                                        Voir le site
                                        <svg
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            className="h-[14px] w-[14px] -mr-0.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        >
                                            <path
                                                d="M7 17L17 7M9 7h8v8"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.25"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
                    <h3 className="text-xl sm:text-2xl font-semibold">Un projet en tête ?</h3>
                    <p className="mt-2 text-sm sm:text-base text-zinc-300">Parlez-nous de votre site. On vous propose une approche claire et efficace.</p>
                    <button
                        onClick={() => goHomeThenScrollTo("contact")}
                        className="mt-5 inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20"
                    >
                        Discuter de votre site
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
