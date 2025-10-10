import React, { useEffect } from "react";
import { SiteBackground, TopNav, Footer } from "../App";

export default function ProjectsApps() {
    useEffect(() => {
        document.title = "SmartFlow";
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />
            <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">Projets</p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">Nos apps métier</h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-300">
                    Des outils internes robustes et clairs pour accélérer votre quotidien.
                </p>
            </section>
            <Footer />
        </main>
    );
}
