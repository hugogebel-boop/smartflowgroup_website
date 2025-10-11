import React, { useEffect } from "react";
import { SiteBackground, TopNav, Footer } from "../layout";

type Program = {
    id: string;
    title: string;
    tagline: string;
    description: string;
    features: string[];
    input: string;
    output: string;
    stack: string;
};

const PROGRAMS: Program[] = [
    {
        id: "hooks-generator",
        title: "Générateur d’accroches",
        tagline: "CSV/Excel (entreprise, URL) → accroche + amorce d’e-mail.",
        description:
            "À partir d’un fichier avec le nom d’entreprise et son URL, le script récupère quelques infos du site et rédige une accroche courte. En option, il génère aussi une amorce d’e-mail personnalisée via l’API de chat.",
        features: [
            "Lecture CSV/Excel (company_name, website_url)",
            "Récupération basique d’infos depuis le site (titres/sections)",
            "Accroche courte et vérifiable (1–2 lignes)",
            "Amorce d’e-mail 2–4 phrases (optionnelle)",
            "Export CSV/XLSX avec statut et horodatage",
        ],
        input: "CSV/XLSX : company_name, website_url (http/https)",
        output:
            "CSV/XLSX : hook, mail_opening (optionnel), status, timestamp",
        stack:
            "Python, extraction HTML, simple règles/regex, API de chat pour la génération",
    },
    {
        id: "bulk-mailer",
        title: "Envoi d’e-mails personnalisés",
        tagline: "Construit et envoie le bon message à la bonne personne.",
        description:
            "À partir d’un fichier avec entreprise, e-mail, accroche et contenu, le programme assemble le message final et l’envoie au destinataire indiqué. Il journalise les envois et les erreurs éventuelles.",
        features: [
            "Lecture CSV/Excel (company, email, hook, body)",
            "Construction du mail (objet/corps) à partir des champs fournis",
            "Envoi au destinataire exact (colonne email requise)",
            "Mode test (dry-run) avant envoi réel",
            "Journal d’envoi avec statut, date/heure et message d’erreur",
        ],
        input:
            "CSV/XLSX : company_name, email, hook, body (+ éventuellement subject, signature)",
        output:
            "Log d’envoi + fichier enrichi (status, timestamp, error_message le cas échéant)",
        stack: "Python, SMTP ou API e-mail, gestion d’erreurs et reprise simple",
    },
];

/* ===== Fonction de redirection vers Contact (depuis l’accueil) ===== */
function goToContact() {
    window.location.hash = "/"; // revient à la page d’accueil
    setTimeout(() => {
        const contact = document.getElementById("contact");
        if (contact) contact.scrollIntoView({ behavior: "smooth" });
    }, 500); // petit délai le temps que la page charge
}

export default function ProjectsAutomation() {
    useEffect(() => {
        document.title = "SmartFlow";
        window.scrollTo({ top: 0 });
    }, []);

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            {/* En-tête */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                    Projets
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">
                    Nos programmes automatisés
                </h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-3xl">
                    Des automatisations développées sur mesure : elles s’intègrent à vos outils, traitent vos données et exécutent vos tâches répétitives, pour simplifier, accélérer et fiabiliser vos processus.
                </p>
            </section>

            {/* Grille des programmes */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                    {PROGRAMS.map((p) => (
                        <article
                            key={p.id}
                            className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 transition hover:border-white/20"
                        >
                            <header>
                                <h3 className="text-xl sm:text-[22px] font-semibold tracking-tight">
                                    {p.title}
                                </h3>
                                <p className="mt-1 text-[13px] sm:text-sm text-zinc-300">
                                    {p.tagline}
                                </p>
                            </header>

                            <p className="mt-4 text-sm leading-6 text-zinc-200">
                                {p.description}
                            </p>

                            <ul className="mt-4 space-y-2">
                                {p.features.map((f, i) => (
                                    <li key={i} className="text-sm text-zinc-200 leading-6">
                                        <span className="inline-block mr-2 opacity-70">—</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <dl className="mt-5 grid grid-cols-1 gap-3 text-[13px] sm:text-sm">
                                <div className="flex items-start gap-2">
                                    <dt className="shrink-0 text-zinc-400 w-20">Entrée</dt>
                                    <dd className="text-zinc-100">{p.input}</dd>
                                </div>
                                <div className="flex items-start gap-2">
                                    <dt className="shrink-0 text-zinc-400 w-20">Sortie</dt>
                                    <dd className="text-zinc-100">{p.output}</dd>
                                </div>
                                <div className="flex items-start gap-2">
                                    <dt className="shrink-0 text-zinc-400 w-20">Stack</dt>
                                    <dd className="text-zinc-100">{p.stack}</dd>
                                </div>
                            </dl>

                            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[12px] text-zinc-400">
                                    Adaptable à vos colonnes et contraintes
                                </span>
                                <button
                                    onClick={goToContact}
                                    className="text-[12px] sm:text-sm font-medium underline underline-offset-4 decoration-zinc-400 hover:decoration-white"
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
                        onClick={goToContact}
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
