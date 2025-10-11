// src/projects/ProjectsApps.tsx
import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
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
    gallery: string[]; // autant d'images que tu veux
};

/* ====== Contenu (sobre & exact) ====== */
const APPS: AppMeta[] = [
    {
        key: "labapp",
        title: "LabApp",
        tagline: "Planification des essais, gestion des échantillons, rapports.",
        resume:
            "LabApp est une application WPF/.NET pour organiser les essais de laboratoire : créer les échantillons, planifier les essais et produire des rapports. L’objectif est de clarifier le flux de travail et d’éviter les manipulations répétitives.",
        points: [
            "Planification des essais avec vues simples",
            "Gestion d’échantillons (création, statuts, notes)",
            "Export/rapport (PDF/Excel) selon les modèles du labo",
        ],
        tags: ["WPF", ".NET 8", "EF Core", "SQL Server"],
        gallery: [
            asset("/assets/apps/labapp/1.png"),
            asset("/assets/apps/labapp/2.png"),
            asset("/assets/apps/labapp/3.png"),
        ],
    },
    {
        key: "comptaapp",
        title: "ComptaApp",
        tagline: "Scan des fiches de salaire et envoi automatique par e-mail.",
        resume:
            "ComptaApp prend un lot de fiches de salaire, les scanne (OCR si nécessaire) et les distribue automatiquement par e-mail à chaque salarié.",
        points: [
            "Dossier d’entrée pour les fiches (PDF/scan)",
            "Association fiche → salarié (règles simples configurables)",
            "Envoi automatique par e-mail aux destinataires",
        ],
        tags: ["Desktop", "OCR", "Emailing"],
        gallery: [
            asset("/assets/apps/comptaapp/1.png"),
            asset("/assets/apps/comptaapp/2.png"),
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

/* ====== Carousel 16:9 (léger crop pour remplir) ====== */
function ImageCarousel({
    images,
    title,
}: {
    images: string[];
    title: string;
}) {
    const [idx, setIdx] = useState(0);
    const total = images.length;
    const wrap = useCallback(
        (n: number) => {
            if (total === 0) return 0;
            return ((n % total) + total) % total;
        },
        [total]
    );

    const goPrev = () => setIdx((i) => wrap(i - 1));
    const goNext = () => setIdx((i) => wrap(i + 1));

    // Navigation clavier (← →)
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
        };
        el.addEventListener("keydown", onKey);
        return () => el.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            className="group relative w-full outline-none"
            aria-label={`Galerie ${title}`}
        >
            {/* Cadre 16/9 : padding-top:56.25% (exact) */}
            <figure
                className="relative w-full overflow-hidden rounded-xl border border-zinc-800/70 bg-zinc-950"
                style={{ paddingTop: "56.25%" }} // 16/9 exact
            >
                {images.map((src, i) => (
                    <img
                        key={src + i}
                        src={src}
                        alt={`${title} — image ${i + 1}/${total}`}
                        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${i === idx ? "opacity-100" : "opacity-0"
                            }`}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                    />
                ))}

                {/* Flèche gauche */}
                {total > 1 && (
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Image précédente"
                        className="
              absolute left-3 top-1/2 -translate-y-1/2
              hidden items-center justify-center rounded-full
              bg-zinc-900/70 border border-zinc-700/60 backdrop-blur
              p-2 text-zinc-200 hover:bg-zinc-800/80
              group-hover:flex focus:flex
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60
            "
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                        </svg>
                    </button>
                )}

                {/* Flèche droite */}
                {total > 1 && (
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Image suivante"
                        className="
              absolute right-3 top-1/2 -translate-y-1/2
              hidden items-center justify-center rounded-full
              bg-zinc-900/70 border border-zinc-700/60 backdrop-blur
              p-2 text-zinc-200 hover:bg-zinc-800/80
              group-hover:flex focus:flex
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60
            "
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                            <path d="m10 6-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
                        </svg>
                    </button>
                )}
            </figure>

            {/* Indicateurs (clic pour naviguer) */}
            {total > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIdx(i)}
                            aria-label={`Aller à l’image ${i + 1}`}
                            className={`h-2.5 w-2.5 rounded-full ${i === idx ? "bg-zinc-200" : "bg-zinc-600/60 hover:bg-zinc-500/80"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

type AppCardProps = { meta: AppMeta; defaultOpen?: boolean };

function AppCard({ meta, defaultOpen = false }: AppCardProps) {
    const [open, setOpen] = useState(defaultOpen);
    const panelId = `panel-${meta.key}`;
    const ref = useRef<HTMLDivElement | null>(null);

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
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                        {meta.title}
                    </h3>
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

                                {/* Colonne galerie — carousel 16/9 (crop léger) */}
                                <div className="min-w-0">
                                    <ImageCarousel images={meta.gallery} title={meta.title} />
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
            sub: "Des outils internes clairs pour accélérer votre quotidien.",
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
            </section>

            <Footer />
        </main>
    );
}