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
        title: "Générateur d’accroches sponsors",
        tagline: "Analyse de site + synthèse → phrase d’ouverture personnalisée.",
        description:
            "Un script qui parcourt un site d’entreprise, extrait les éléments saillants (secteurs, projets, mots-clés) et rédige une accroche courte, claire et vérifiable pour vos emails de prospection.",
        features: [
            "Extraction sémantique (titre, méta, contenus clés)",
            "Vérifications factuelles et filtrage du bruit",
            "Accroche courte au ton étudiant-pro/pro",
            "Export CSV/Excel pour intégration directe",
        ],
        input: "Nom d’entreprise, URL (CSV)",
        output: "Accroche personnalisée, statut, horodatage (CSV/XLSX)",
        stack: "Python, parsing HTML, régex, pipeline de post-édition",
    },
    {
        id: "bulk-mailer",
        title: "Envoi d’emails en lot (personnalisés)",
        tagline: "Objet + accroche personnalisée + corps standardisé, suivi automatique.",
        description:
            "Automatise l’envoi d’emails depuis un fichier source en injectant l’accroche par contact et en traçant les envois, erreurs et relances.",
        features: [
            "Personnalisation par contact (objet/accroche)",
            "Gestion des erreurs et reprise",
            "Journal d’envoi, date/heure et statut",
            "Pré-visualisation ‘dry-run’ avant envoi réel",
        ],
        input: "CSV: email, objet, accroche, message, signature",
        output: "Log d’envoi + fichier enrichi (statut, date)",
        stack: "Python, SMTP/API mail, gestion des quotas",
    },
    {
        id: "crm-enrichment",
        title: "Enrichissement CRM depuis le web",
        tagline: "Complète vos listes (emails, secteurs, mots-clés) de façon fiable.",
        description:
            "À partir d’un simple fichier d’entreprises, le programme tente de retrouver les sites, pages contacts et données utiles, puis met à jour votre base.",
        features: [
            "Recherche de domaines & contacts",
            "Détection de secteurs (règles + mots-clés)",
            "Nettoyage & normalisation des champs",
            "Exports prêts pour Google Sheets/Excel",
        ],
        input: "CSV minimal (nom entreprise, éventuellement site)",
        output: "CSV/XLSX enrichi (site, email, secteur, tags)",
        stack: "Python, normalisation, heuristiques secteur",
    },
    {
        id: "reporting-auto",
        title: "Rapports automatiques hebdo/mensuels",
        tagline: "Collecte, agrégation et envoi ponctuel sans intervention.",
        description:
            "Orchestre l’agrégation de données (comptabilité, ventes, trafic) et diffuse un rapport prêt à lire par email ou dans votre dossier partagé.",
        features: [
            "Planification (hebdo/mensuel)",
            "Agrégation multi-sources (CSV, Sheets, APIs)",
            "Génération PDF/HTML lisible",
            "Envoi ou dépôt automatique (Drive/Share)",
        ],
        input: "Sources CSV/Sheets/APIs, gabarit de rapport",
        output: "PDF/HTML + archive des versions",
        stack: "Python, planificateur, génération PDF",
    },
    {
        id: "files-to-sheets",
        title: "Synchronisation Fichiers → Sheets/Excel",
        tagline: "Met à jour vos tableaux à partir de dossiers vivants.",
        description:
            "Surveille un dossier (devis, factures, mesures) et recopie les métriques utiles dans un tableau, avec historisation, pour un suivi toujours à jour.",
        features: [
            "Surveillance de dossier (ajout/modif)",
            "Extraction de champs (nommage intelligent)",
            "Historisation des révisions",
            "Tableau ‘toujours à jour’",
        ],
        input: "Dossier local/Drive et règles d’extraction",
        output: "Google Sheets/Excel structuré",
        stack: "Python, Watcher, APIs Sheets/Office",
    },
    {
        id: "ops-windows",
        title: "Automatisations Windows & PowerShell",
        tagline: "Scripts d’exploitation pour postes et serveurs.",
        description:
            "Des scripts PowerShell fiables pour tâches d’ops : sauvegardes, nettoyage, packaging, déploiements ou génération de rapports systèmes.",
        features: [
            "Exécution planifiée & journaux",
            "Sécurisation des variables/credentials",
            "Rapports récapitulatifs",
            "Intégrable à vos outils internes",
        ],
        input: "Paramètres d’environnement et planning",
        output: "Logs, états, fichiers de sortie",
        stack: "PowerShell, tâches planifiées, fichiers/REST",
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
                    Des processus qui connectent vos outils et vous font gagner un temps précieux.
                    Chaque cellule ci-dessous décrit un programme réel que nous adaptons à vos
                    données et à vos contraintes.
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

                            <p className="mt-4 text-sm leading-6 text-zinc-200">{p.description}</p>

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
                                    Adaptable à vos données et outils
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
                        Vous avez un cas spécifique (API interne, ERP, mesures labo, reporting) ?
                    </p>
                    <button
                        onClick={goToContact}
                        className="mt-3 inline-block rounded-xl border border-white/20 px-4 py-2 text-sm font-medium hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    >
                        Décrivez-nous votre flux → on l’automatise proprement
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
