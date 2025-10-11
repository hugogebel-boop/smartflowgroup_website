// src/projects/ProjectsApps.tsx (ou même emplacement que ton fichier actuel)
import React, { useEffect, useMemo, useState, useRef } from "react";
import { SiteBackground, TopNav, Footer } from "../layout";
import { motion, AnimatePresence } from "framer-motion";

/* ====== Utils ====== */
const asset = (p: string) =>
    `${(import.meta as any).env?.BASE_URL || "/"}${p.replace(/^\/+/, "")}`;

type AppMeta = {
    key: string;
    title: string;
    tagline: string;
    resume: string;
    points: string[];
    tags: string[];
    gallery: string[]; // chemins vers tes captures
};

const APPS: AppMeta[] = [
    {
        key: "labapp",
        title: "LabApp",
        tagline: "Gestion de laboratoire : échantillons, essais, traçabilité.",
        resume:
            "Application WPF/.NET pour la planification des essais, la traçabilité des échantillons et le reporting. Pensée pour accélérer le quotidien et fiabiliser les données.",
        points: [
            "Planification des essais & calendrier intégré",
            "Fiches échantillon, codes QR & chaîne de traçabilité",
            "Exports PDF/Excel & historisation des rapports",
        ],
        tags: ["WPF", ".NET 8", "EF Core", "SQL Server"],
        gallery: [
            asset("/assets/apps/labapp/overview.png"),
            asset("/assets/apps/labapp/samples.png"),
            asset("/assets/apps/labapp/tests.png"),
            asset("/assets/apps/labapp/report.png"),
        ],
    },
    {
        key: "comptaapp",
        title: "ComptaApp",
        tagline: "Facturation, marge & suivi projet — simplement.",
        resume:
            "Application interne pour centraliser devis, factures, coûts et marges par projet. Vue d’ensemble claire, exports et préparation des écritures.",
        points: [
            "Suivi par projet (coûts, marge, avancement)",
            "Émission de factures & numérotation auto",
            "Exports compatibles comptabilité & TVA",
        ],
        tags: ["Desktop", "TypeScript/.NET", "SQLite/SQL", "Exports XLSX"],
        gallery: [
            asset("/assets/apps/comptaapp/dashboard.png"),
            asset("/assets/apps/comptaapp/invoice.png"),
            asset("/assets/apps/comptaapp/projects.png"),
            asset("/assets/apps/comptaapp/export.png"),
        ],
    },
];

/* ====== Petites briques UI ====== */
function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-900/40 px-2 py-1 text-[11px] leading-none text-zinc-300">
            {children}
        </span>
    );
}

function Bullet({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-2 text-sm text-zinc-200">
            <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-zinc-500/60" />
            <span>{children}</span>
        </li>
    );
}

type AppCardProps = { meta: AppMeta; defaultOpen?: boolean };

function AppCard({ meta, defaultOpen = false }: AppCardProps) {
    const [open, setOpen] = useState(defaultOpen);
    const panelId = `panel-${meta.key}`;
    const ref = useRef<HTMLDivElement | null>(null);

    // scroll doux quand on ouvre
    useEffect(() => {
        if (open && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [open]);

    return (
        <motion.article
            ref={ref}
            layout
            className="relative overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
            {/* En-tête compacte */}
            <div className="flex flex-col gap-3 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">{meta.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                        {meta.tags.map((t) => (
                            <Chip key={t}>{t}</Chip>
                        ))}
                    </div>
                </div>
                <p className="text-sm sm:text-base text-zinc-300">{meta.tagline}</p>

                <div className="mt-2">
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpen((v) => !v)}
                        className="group inline-flex items-center gap-2 rounded-xl border border-zinc-700/70 bg-zinc-800/40 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                    >
                        <svg
                            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 011.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                        {open ? "Réduire" : "Voir plus"}
                    </button>
                </div>
            </div>

            {/* Panneau déroulant */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="border-t border-zinc-800/70"
                    >
                        <div className="p-5 sm:p-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* Colonne texte */}
                                <div className="flex flex-col gap-4">
                                    <p className="text-sm sm:text-base text-zinc-300">{meta.resume}</p>
                                    <ul className="flex flex-col gap-2">
                                        {meta.points.map((p, idx) => (
                                            <Bullet key={idx}>{p}</Bullet>
                                        ))}
                                    </ul>
                                </div>

                                {/* Colonne galerie */}
                                <div className="grid grid-cols-2 gap-3">
                                    {meta.gallery.map((src, i) => (
                                        <figure
                                            key={i}
                                            className="group relative overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950"
                                        >
                                            <img
                                                src={src}
                                                alt={`${meta.title} — capture ${i + 1}`}
                                                className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                                loading="lazy"
                                            />
                                            <figcaption className="sr-only">
                                                {meta.title} — capture d’écran {i + 1}
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}

export default function ProjectsApps() {
    useEffect(() => {
        document.title = "SmartFlow — Apps métier";
        window.scrollTo({ top: 0 });
    }, []);

    const header = useMemo(
        () => ({
            k: "Apps métier",
            sub: "Des outils internes robustes et clairs pour accélérer votre quotidien.",
        }),
        []
    );

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            {/* En-tête de page */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                    Projets
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">{header.k}</h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-300">{header.sub}</p>
            </section>

            {/* Liste des apps */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 sm:pb-28">
                <div className="grid gap-6 sm:gap-8">
                    {APPS.map((meta, i) => (
                        <AppCard key={meta.key} meta={meta} defaultOpen={i === 0} />
                    ))}
                </div>

                {/* Hint fichiers */}
                <p className="mt-8 text-center text-xs text-zinc-500">
                    Remplace les images dans <code className="text-zinc-400">/assets/apps/&lt;app&gt;/</code> par tes captures.
                </p>
            </section>

            <Footer />
        </main>
    );
}
