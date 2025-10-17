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
    gallery: string[];
};

/* ====== Contenu (identique) ====== */
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
function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11.5px] leading-none text-zinc-200">
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

/* ====== Carousel 16:9 (crop léger) — amélioré a11y ====== */
/* ====== Carousel 16:9 (crop léger) — swipe mobile + a11y ====== */
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
    const [idx, setIdx] = useState(0);
    const [dx, setDx] = useState(0); // déplacement visuel pendant le swipe
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
    const goTo = (i: number) => setIdx(wrap(i));

    // Navigation clavier
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
            if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
            if (e.key === "Home") { e.preventDefault(); goTo(0); }
            if (e.key === "End") { e.preventDefault(); goTo(total - 1); }
        };
        el.addEventListener("keydown", onKey);
        return () => el.removeEventListener("keydown", onKey);
    }, [total]);

    // Live region pour lecteurs d'écran
    const liveRef = useRef<HTMLSpanElement | null>(null);
    useEffect(() => {
        if (liveRef.current) liveRef.current.textContent = `Image ${idx + 1} sur ${total}`;
    }, [idx, total]);

    // ====== Swipe (pointer events) ======
    const startX = useRef(0);
    const tracking = useRef(false);
    const pointerId = useRef<number | null>(null);

    const THRESH = 48; // px pour déclencher le changement d'image
    const MAX_DRAG = 120; // limite visuelle pendant le drag

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        // uniquement touche/contact (pas la souris) pour éviter conflits sur desktop
        if (e.pointerType === "mouse") return;
        const el = e.currentTarget;
        pointerId.current = e.pointerId;
        el.setPointerCapture(e.pointerId);
        tracking.current = true;
        startX.current = e.clientX;
        setDx(0);
    };

    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!tracking.current || pointerId.current !== e.pointerId) return;
        const delta = e.clientX - startX.current;
        // limite l'effet visuel
        const clamped = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, delta));
        setDx(clamped);
    };

    const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!tracking.current || pointerId.current !== e.pointerId) return;
        const delta = e.clientX - startX.current;
        tracking.current = false;
        pointerId.current = null;

        if (Math.abs(delta) > THRESH) {
            // swipe à gauche => image suivante ; à droite => précédente
            if (delta < 0) goNext();
            else goPrev();
        }
        // reset l’offset visuel
        setDx(0);
    };

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            className="group relative w-full outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl"
            aria-roledescription="carousel"
            aria-label={`Galerie ${title}`}
        >
            <figure
                className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950 [touch-action:pan-y] select-none"
                style={{ paddingTop: "56.25%" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                {images.map((src, i) => (
                    <img
                        key={src + i}
                        src={src}
                        alt={`${title} — image ${i + 1}/${total}`}
                        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 ${i === idx ? "opacity-100" : "opacity-0"}`}
                        // léger suivi du doigt pour l’image active
                        style={i === idx ? { transform: `translateX(${dx}px)` } : undefined}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        draggable={false}
                    />
                ))}

                {/* Flèches — visibles uniquement ≥ md (desktop/tablette en paysage) */}
                {total > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Image précédente"
                            className="absolute left-3 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full bg-zinc-900/70 border border-white/10 backdrop-blur p-3 text-zinc-200 hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-white/30 md:group-hover:flex"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Image suivante"
                            className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center rounded-full bg-zinc-900/70 border border-white/10 backdrop-blur p-3 text-zinc-200 hover:bg-zinc-800/80 focus:outline-none focus:ring-2 focus:ring-white/30 md:group-hover:flex"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                                <path d="m10 6-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
                            </svg>
                        </button>
                    </>
                )}
            </figure>

            {/* Indicateurs (tap/clic) */}
            {total > 1 && (
                <div className="mt-3 flex items-center justify-center gap-2">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIdx(i)}
                            aria-label={`Aller à l’image ${i + 1}`}
                            className={`flex items-center justify-center p-0 border-0 outline-none cursor-pointer
                before:block before:h-[10px] before:w-[10px] before:rounded-full before:content-['']
                before:transition-colors before:duration-300 ${i === idx ? "before:bg-zinc-200" : "before:bg-zinc-600/60 hover:before:bg-zinc-500/80"
                                }`}
                        />
                    ))}
                </div>
            )}

            <span ref={liveRef} aria-live="polite" className="sr-only" />
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
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
            {/* En-tête compacte */}
            <div className="flex flex-col gap-3 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl sm:text-[22px] font-semibold tracking-tight">
                        <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">
                            {meta.title}
                        </span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                        {meta.tags.map((t) => (
                            <Tag key={t}>{t}</Tag>
                        ))}
                    </div>
                </div>
                <p className="text-[13px] sm:text-sm text-zinc-300/90">{meta.tagline}</p>

                <div className="mt-2">
                    <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpen((v) => !v)}
                        className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-zinc-100 hover:border-white/20 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/30"
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
                        className="border-t border-white/10"
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
            <section className="mx-auto max-w-5xl px-4 sm:px-6 py-[var(--section-y)]">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                    
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl font-semibold">{header.k}</h1>
                
                {/* H1 sémantique invisible pour le SEO */}
                <h1 style={{ display: 'none' }}>Applications métier — SmartFlow | Outils internes sur mesure</h1>
                <p className="mt-3 text-sm sm:text-base text-zinc-300">{header.sub}</p>
            </section>

            {/* Liste des apps */}
            <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-[calc(var(--section-y)_+_24px)]">
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
