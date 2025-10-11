import React, { useEffect } from "react";
import { SiteBackground, TopNav, Footer } from "../layout";

export default function Mentions() {
    useEffect(() => {
        document.title = "Mentions légales — SmartFlow";
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            <section className="mx-auto max-w-4xl px-6 sm:px-8 py-20">
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6">Mentions légales</h1>

                <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                    <p>
                        Le site <strong>smartflowgroup.ch</strong> est édité par <strong>SmartFlow</strong>,
                        un studio indépendant spécialisé dans la conception de sites web, d’applications métier
                        et d’outils d’automatisation sur mesure.
                    </p>

                    <p>
                        Tous les contenus, visuels, textes, interfaces, codes et projets présentés sur ce site
                        ont été conçus et réalisés par SmartFlow. Ils sont protégés par les lois relatives à la
                        propriété intellectuelle et au droit d’auteur. Toute reproduction, diffusion, adaptation
                        ou utilisation partielle ou totale, sur quelque support que ce soit, est strictement
                        interdite sans l’autorisation écrite préalable de SmartFlow.
                    </p>

                    <p>
                        Les logos, marques et projets cités appartenant à des clients sont utilisés uniquement à
                        titre de démonstration, avec leur accord, et demeurent la propriété de leurs détenteurs
                        respectifs.
                    </p>

                    <p>
                        Pour toute demande concernant les droits, le contenu ou la reproduction d’un projet,
                        vous pouvez nous contacter à l’adresse suivante :
                        <br />
                        <a
                            href="mailto:contactS@smartflowgroup.ch"
                            className="text-zinc-100 underline hover:text-white"
                        >
                            contact@smartflowgroup.ch
                        </a>
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
