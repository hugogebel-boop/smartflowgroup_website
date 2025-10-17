// …imports
import React, { useEffect } from "react";
import { SiteBackground, TopNav, Footer, useGoHomeAndScroll } from "../layout";

export default function ProjectsWeb() {
    const goHomeAndScroll = useGoHomeAndScroll();
    

    const PROJECTS = [
        {
            id: "ame-du-monde",
            title: "Âme du Monde",
            client: "Agence de voyages sur mesure",
            excerpt:
                "Nous avons accompagné Âme du Monde dans la création d’une identité à son image : élégante et inspirante. De la direction artistique au développement du site vitrine, chaque détail a été pensé pour offrir une expérience fluide et immersive.",
            image: "/assets/ame-du-monde.png",
            url: "https://amedumonde.ch",
        },
        {
            id: "travel-gc",
            title: "Travel Génie Civil",
            client: "Association EPFL",
            excerpt:
                "Création du site événementiel du voyage d’étude du Génie Civil 2025, conçu pour présenter le projet et ses étapes, et soutenir la recherche de partenaires.",
            image: "/assets/travel-gc.png",
            url: "https://travelgc.ch",
        },
    ] as const;

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            {/* Intro */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 py-[var(--section-y)]">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                    Projets
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Nos sites web</h1>
                
                {/* H1 sémantique invisible pour le SEO */}
                <h1 style={{ display: 'none' }}>Sites web — SmartFlow | Développement web moderne et élégant</h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl">
                    Des sites élégants et soignés, conçus pour une expérience web naturelle et agréable.
                </p>
            </section>

            {/* Projets */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-[calc(var(--section-y)_-_0.5rem)]">
                {/* items-stretch + h-full sur <article> → cartes de même hauteur */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 items-stretch">
                    {PROJECTS.map((p) => (
                        <article
                            key={p.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:bg-white/[0.07] h-full"
                        >
                            <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative block aspect-[16/10] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                aria-label={`${p.title} — ouvrir le site dans un nouvel onglet`}
                            >
                                {/* Image + harmonisation (légère) */}
                                <img
                                    src={p.image}
                                    alt={`${p.title} – aperçu du site`}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] brightness-[.97] contrast-[1.02]"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Scrim discret pour que la photo n’écrase pas la typographie */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/25 opacity-100 transition-opacity duration-300 group-hover:from-black/15 group-hover:to-black/35" />
                            </a>

                            <div className="p-5 sm:p-6">
                                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                                    <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                                        {p.title}
                                    </span>
                                </h2>
                                <p className="mt-1 text-[12px] uppercase tracking-[0.2em] text-zinc-400/90">
                                    {p.client}
                                </p>
                                <p className="mt-3 text-sm text-zinc-300">{p.excerpt}</p>

                                <div className="mt-5">
                                    <a
                                        href={p.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-[var(--section-y)]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 text-center">
                    <h3 className="text-xl sm:text-2xl font-semibold">Un projet qui mérite de prendre forme ?</h3>
                    <p className="mt-2 text-sm sm:text-base text-zinc-300">
                        Parlez-nous de votre projet, nous lui donnerons vie.
                    </p>
                    <button
                        onClick={() => goHomeAndScroll("contact")}
                        className="mt-5 inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                        Discuter de votre site
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
