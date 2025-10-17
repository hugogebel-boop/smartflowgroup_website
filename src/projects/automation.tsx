import React, { useEffect } from "react";
import { SiteBackground, TopNav, Footer, useGoHomeAndScroll } from "../layout";

type Program = {
    id: string;
    title: string;
    tagline: string;
    description: string;
    input: string;
    output: string;
    stack: string;
};

const PROGRAMS: Program[] = [
    {
        id: "hooks-generator",
        title: "Générateur d’accroches",
        tagline: "Du site web à l’accroche prête à coller.",
        description:
            "Donnez-nous un fichier avec le nom de l’entreprise et son URL : le programme explore la page, repère le ton, les titres clés et ce qui fait la singularité de la marque. Il en ressort une accroche courte (1–2 lignes), nette et vérifiable. En option, il propose aussi une amorce d’e-mail personnalisée pour ouvrir la conversation sans tourner autour du pot.",
        input: "CSV/XLSX → company_name, website_url",
        output: "CSV/XLSX → hook, mail_opening, status, timestamp",
        stack: "Python · extraction HTML · règles/regex · API de openAI",
    },
    {
        id: "bulk-mailer",
        title: "Envoi d’e-mails personnalisés",
        tagline: "Assemble, vérifie, envoie.",
        description:
            "À partir d’un tableau (entreprise, e-mail, accroche, contenu), le programme construit l’objet et le corps du message, injecte les bonnes variables et adresse le bon destinataire. Un mode essai permet de contrôler la mise en page avant l’envoi réel. Chaque action est journalisée avec le statut, la date et l’éventuel message d’erreur pour un suivi limpide.",
        input: "CSV/XLSX → company_name, email, hook, body",
        output: "Journal d’envoi + fichier enrichi (status, timestamp, error_message)",
        stack: "Python · SMTP ou API e-mail · gestion d’erreurs et reprise simple",
    },
];

export default function ProjectsAutomation() {
    const goHomeAndScroll = useGoHomeAndScroll();
    

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            {/* En-tête */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 py-[var(--section-y)]">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                    
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">
                    Nos programmes automatisés
                </h1>
                
                {/* H1 sémantique invisible pour le SEO */}
                <h1 style={{ display: 'none' }}>Programmes automatisés — SmartFlow | Scripts et automatisation</h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-3xl">
                    Des automatisations sur mesure qui s’intègrent à vos outils, traitent vos données et exécutent vos tâches répétitives pour aller plus vite, sans perdre en qualité.
                </p>
            </section>

            {/* Grille des programmes */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-[var(--section-y)]">
                {/* items-stretch + articles en flex pour égaliser les hauteurs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                    {PROGRAMS.map((p) => (
                        <article
                            key={p.id}
                            className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 transition hover:border-white/20 focus-within:border-white/25 h-full flex flex-col"
                        >
                            <header>
                                <h3 className="text-xl sm:text-[22px] font-semibold tracking-tight">
                                    <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                                        {p.title}
                                    </span>
                                </h3>
                                <p className="mt-1 text-[13px] sm:text-sm text-zinc-300/90">
                                    {p.tagline}
                                </p>
                            </header>

                            {/* Texte (sans puces) */}
                            <div className="mt-4 text-sm leading-6 text-zinc-200">
                                <p>{p.description}</p>
                            </div>

                            {/* Méta façon “variables” (monospace, sans bulles) */}
                            <div className="mt-5 text-[12.5px] sm:text-[13px] font-mono leading-6">
                                <p>
                                    <span className="text-emerald-300">entrée</span>
                                    <span className="text-zinc-400"> = </span>
                                    <span className="text-zinc-100">{p.input}</span>
                                </p>
                                <p>
                                    <span className="text-sky-300">sortie</span>
                                    <span className="text-zinc-400"> = </span>
                                    <span className="text-zinc-100">{p.output}</span>
                                </p>
                                <p>
                                    <span className="text-fuchsia-300">stack</span>
                                    <span className="text-zinc-400"> = </span>
                                    <span className="text-zinc-100">{p.stack}</span>
                                </p>
                            </div>

                            {/* Footer de carte collé en bas */}
                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[12px] text-zinc-400">
                                    S’adapte à vos colonnes et à vos contraintes
                                </span>
                                <button
                                    onClick={() => goHomeAndScroll("contact")}
                                    className="text-[12px] sm:text-sm font-medium underline underline-offset-4 decoration-zinc-400 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                                    aria-label={`Demander une démo — ${p.title}`}
                                >
                                    Demander une démo
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bandeau final */}
                <div className="mt-10 sm:mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 text-center">
                    <p className="text-sm sm:text-base text-zinc-200">
                        Vous avez un processus, un fichier ou une tâche à automatiser ?
                    </p>
                    <button
                        onClick={() => goHomeAndScroll("contact")}
                        className="mt-3 inline-block rounded-xl border border-white/20 px-4 py-2 text-sm font-medium hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        Décrivez-nous votre besoin → on le transforme en script efficace
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
