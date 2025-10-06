import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";

/* =========================================================
   Helpers
   ========================================================= */
const isClient = typeof window !== "undefined";

function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (!isClient) return;
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setReduced(media.matches);
        onChange();
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, []);
    return reduced;
}
function useIsTouchDevice() {
    const [touch, setTouch] = useState(false);
    useEffect(() => {
        if (!isClient) return;
        const mq = window.matchMedia("(hover: none), (pointer: coarse)");
        const update = () => setTouch(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);
    return touch;
}

/* =========================================================
   Background — Color Mist (subtle, fast drift)
   ========================================================= */
function SiteBackground() {
    const reduced = usePrefersReducedMotion();

    // Knobs
    const SPEED = 45;           // plus petit = plus rapide (sec A/R)
    const AMP_X = 360;          // px
    const AMP_Y = 240;          // px
    const POWER = 1.28;         // 1.00–1.40 → boost d’intensité
    const SAT = 1.18;           // saturation globale
    const BRIGHT = 1.06;        // brightness globale

    // petit helper alpha
    const a = (x: number) => Math.min(1, x * POWER);

    return (
        <>
            {/* base */}
            <div className="fixed inset-0 -z-30 bg-[#0B0B12]" />
            <div className="fixed inset-0 -z-20 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* WRAPPER FX : boost global (saturation/brightness) */}
            <div
                className="fixed inset-0 -z-10 overflow-hidden"
                style={{ filter: `saturate(${SAT}) brightness(${BRIGHT})` }}
                aria-hidden
            >
                {/* Nap 1 — violet/rose (un peu plus dense au centre) */}
                <motion.div
                    className="absolute left-[-15%] top-[-10%] h-[70vh] w-[70vw] rounded-[9999px] pointer-events-none"
                    style={{
                        background:
                            `radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,${a(0.22)}) 0%, rgba(168,85,247,${a(0.10)}) 35%, rgba(168,85,247,0) 70%)`,
                        filter: "blur(56px)",              // blur légerement ↓ → plus “présent”
                        mixBlendMode: "screen",
                        maskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.62) 65%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.62) 65%, rgba(0,0,0,0) 100%)",
                        willChange: "transform",
                    }}
                    animate={reduced ? {} : { x: [-AMP_X, AMP_X, -AMP_X], y: [AMP_Y, -AMP_Y, AMP_Y], scale: [0.985, 1.02, 0.985] }}
                    transition={reduced ? {} : {
                        x: { duration: SPEED, ease: "easeInOut", repeat: Infinity },
                        y: { duration: SPEED * 0.9, ease: "easeInOut", repeat: Infinity },
                        scale: { duration: SPEED * 1.4, ease: "easeInOut", repeat: Infinity },
                    }}
                />

                {/* Nap 2 — cyan (renforcée un chouïa) */}
                <motion.div
                    className="absolute right-[-12%] top-[10%] h-[65vh] w-[60vw] rounded-[9999px] pointer-events-none"
                    style={{
                        background:
                            `radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,${a(0.18)}) 0%, rgba(34,211,238,${a(0.085)}) 35%, rgba(34,211,238,0) 70%)`,
                        filter: "blur(54px)",
                        mixBlendMode: "screen",
                        maskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0) 100%)",
                        willChange: "transform",
                    }}
                    animate={reduced ? {} : { x: [AMP_X * 1.2, -AMP_X * 1.2, AMP_X * 1.2], y: [-AMP_Y, AMP_Y, -AMP_Y] }}
                    transition={reduced ? {} : {
                        x: { duration: SPEED * 1.1, ease: "easeInOut", repeat: Infinity },
                        y: { duration: SPEED * 0.95, ease: "easeInOut", repeat: Infinity },
                    }}
                />

                {/* Nap 3 — magenta (profondeur) */}
                <motion.div
                    className="absolute left-[5%] bottom-[-12%] h-[60vh] w-[55vw] rounded-[9999px] pointer-events-none"
                    style={{
                        background:
                            `radial-gradient(60% 60% at 50% 50%, rgba(232,121,249,${a(0.14)}) 0%, rgba(232,121,249,${a(0.06)}) 35%, rgba(232,121,249,0) 70%)`,
                        filter: "blur(66px)",
                        mixBlendMode: "screen",
                        maskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.58) 65%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.58) 65%, rgba(0,0,0,0) 100%)",
                        willChange: "transform",
                    }}
                    animate={reduced ? {} : { x: [-AMP_X * 0.8, AMP_X * 0.8, -AMP_X * 0.8], y: [0, AMP_Y * 0.6, 0] }}
                    transition={reduced ? {} : {
                        x: { duration: SPEED * 0.9, ease: "easeInOut", repeat: Infinity },
                        y: { duration: SPEED * 1.2, ease: "easeInOut", repeat: Infinity },
                    }}
                />

                {/* Nap 4 — STREAK large et très faible (donne de la “puissance” perçue) */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            `radial-gradient(80% 100% at 20% 50%, rgba(168,85,247,${a(0.05)}) 0%, rgba(56,189,248,${a(0.04)}) 30%, rgba(232,121,249,${a(0.035)}) 55%, rgba(0,0,0,0) 70%)`,
                        mixBlendMode: "screen",
                        filter: "blur(90px)",
                        willChange: "transform",
                        transform: "translateZ(0)",
                    }}
                    animate={reduced ? {} : { x: [-AMP_X * 1.4, AMP_X * 1.4, -AMP_X * 1.4] }}
                    transition={reduced ? {} : { duration: Math.max(12, SPEED * 0.6), ease: "easeInOut", repeat: Infinity }}
                />
            </div>

            {/* grain */}
            <motion.div
                aria-hidden
                className="fixed inset-0 -z-5 mix-blend-overlay pointer-events-none"
                style={{
                    opacity: 0.06,
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>\")",
                    backgroundSize: "160px 160px",
                    willChange: "opacity",
                }}
                animate={reduced ? {} : { opacity: [0.05, 0.08, 0.05] }}
                transition={reduced ? {} : { duration: 14, ease: "easeInOut", repeat: Infinity }}
            />
        </>
    );
}

/* =========================================================
   HERO
   ========================================================= */
function HeroSection() {
    const { scrollY } = useScroll();
    const [opacity, setOpacity] = useState(1);

    // Fade out la flèche dès qu’on scroll de 0 → 120px
    useMotionValueEvent(scrollY, "change", (latest) => {
        const o = Math.max(0, 1 - latest / 120);
        setOpacity(o);
    });

    return (
        <section
            id="hero"
            className="relative flex min-h-[88vh] md:min-h-screen w-full items-center justify-center overflow-hidden text-white"
            style={{ paddingTop: "max(env(safe-area-inset-top),1rem)", paddingBottom: "1rem" }}
        >
            <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 text-center">
                <p className="mb-2 sm:mb-3 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                    SmartFlow
                </p>

                <h1 className="text-[30px] sm:text-5xl md:text-6xl font-semibold leading-[1.07]">
                    <span className="bg-clip-text text-transparent bg-[linear-gradient(120deg,#e0e7ff_0%,#a78bfa_35%,#22d3ee_65%,#e879f9_100%)]">
                        Design ✕ Développement,
                    </span>
                    <br />
                    une expérience numérique.
                </h1>

                <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
                    Sites, logiciels et automatisations pensés pour vous simplifier la vie.
                </p>

                <div className="mt-6 sm:mt-8 inline-flex w-full flex-col sm:w-auto sm:flex-row gap-3 justify-center">
                    <a
                        href="#dev"
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                    >
                        Notre approche
                    </a>
                    <a
                        href="#services"
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                    >
                        Nos services
                    </a>
                </div>
            </div>

            {/* flèche fine, fondue au scroll */}
            <motion.div
                className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"
                animate={{ opacity }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="opacity-80 animate-bounce"
                    aria-hidden="true"
                >
                    <path
                        d="M6 9l6 6 6-6"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </section>
    );
}

/* =========================================================
   Mini highlighter — tokenized (safe)
   ========================================================= */
type Token = { t: "str" | "kw" | "red" | "cm" | "plain"; v: string };

function tokenizeTS(src: string): Token[] {
    const tokens: Token[] = [];
    const push = (t: Token["t"], v: string) => v && tokens.push({ t, v });

    // Bloc commentaire complet ? On met en avant "Notre approche"
    const block = src.match(/^\/\*[\s\S]*\*\/$/);
    if (block) {
        const m = block[0].match(/\/\*\s*(Notre approche)([\s\S]*?)\*\//);
        if (m) {
            push("cm", "/* ");
            push("kw", m[1]); // “Notre approche” en violet
            push("cm", m[2] + "*/");
            return tokens;
        }
    }

    // Tokenisation simple lignes (strings, keywords, start/commit, commentaires //)
    const re =
        /("[^"]*"|'[^']*'|`[^`]*`)|\b(export|function|return|const|let|type|interface|new|async|await|start|commit)\b|(\/\/.*$)/gm;

    let i = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
        if (m.index > i) push("plain", src.slice(i, m.index));

        if (m[1]) push("str", m[1]);
        else if (m[2]) push(m[2] === "start" || m[2] === "commit" ? "red" : "kw", m[2]);
        else if (m[3]) push("cm", m[3]);

        i = m.index + m[0].length;
    }
    if (i < src.length) push("plain", src.slice(i));
    return tokens;
}

/* =========================================================
   Code content
   ========================================================= */
const APPROACH_LINES: string[] = [
    "/* Notre approche : simple et directe. */",
    "SmartFlow.start({",
    '  idée: "on comprend le besoin",',
    '  design: "on imagine une expérience fluide",',
    '  dev: "on code avec clarté et exigence",',
    '  suivi: "on reste proches et réactifs",',
    '  valeur: "un rendu soigné, sans friction",',
    "});",
    "",
    'SmartFlow.commit("livrer, apprendre, améliorer");',
    'console.log("Chaque projet est créé sur mesure.");',
];

function sliceByBudget(lines: string[], budget: number) {
    const out: string[] = [];
    let remain = Math.max(0, budget);
    for (const line of lines) {
        if (remain <= 0) {
            out.push("");
            continue;
        }
        const take = Math.min(line.length, remain);
        out.push(line.slice(0, take));
        remain -= take;
    }
    return out;
}

/* =========================================================
   Code line
   ========================================================= */
function CodeLine({ text, index, active }: { text: string; index: number; active: boolean }) {
    const tokens = useMemo(() => tokenizeTS(text), [text]);
    return (
        <motion.div
            className="whitespace-pre leading-6 sm:leading-7 font-mono text-[10.5px] xs:text-[11px] sm:text-[13px] md:text-[15px] text-white"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
        >
            <span className="mr-2 sm:mr-3 text-white">{String(index + 1).padStart(2, "0")}</span>
            {tokens.map((k, i) => {
                const cls =
                    k.t === "str"
                        ? "text-emerald-400"
                        : k.t === "kw"
                            ? "text-violet-300 font-medium"
                            : k.t === "red"
                                ? "text-red-500 font-bold"
                                : k.t === "cm"
                                    ? "text-zinc-400/90"
                                    : "";
                return (
                    <span key={i} className={cls}>
                        {k.v}
                    </span>
                );
            })}
            {active && <span className="inline-block w-2 h-4 align-baseline ml-0.5 bg-zinc-200 animate-pulse" />}
        </motion.div>
    );
}

/* =========================================================
   Editor frame — glassy, mobile-friendly width
   ========================================================= */
function EditorFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full mx-auto max-w-[min(92vw,48rem)] sm:max-w-3xl rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 backdrop-blur p-3 sm:p-5 md:p-7">
            <div className="flex items-center gap-2 mb-2.5 sm:mb-4">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/90" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400/90" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400/90" />
                <div className="ml-2 sm:ml-3 text-[10px] sm:text-xs tracking-widest uppercase text-zinc-400">dev / approche.ts</div>
            </div>

            {/* code zone */}
            <div className="rounded-xl border border-white/5 bg-black/30 px-2.5 sm:px-4 py-3 sm:py-5 overflow-x-auto">
                <div className="min-w-full">{children}</div>
            </div>

            {/* subtle outer glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-2xl bg-[conic-gradient(from_120deg_at_50%_50%,rgba(56,189,248,0.06),rgba(168,85,247,0.10),rgba(232,121,249,0.06),rgba(56,189,248,0.06))] blur-xl"
            />
        </div>
    );
}

/* =========================================================
   DEV SECTION — sticky reveal (distance de scroll ↑)
   ========================================================= */
function DevScrollCodeSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const [p, setP] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));

    const totalChars = useMemo(() => APPROACH_LINES.reduce((a, l) => a + l.length, 0), []);
    const budget = Math.round(totalChars * Math.max(0, Math.min(1, p)));
    const visible = useMemo(() => sliceByBudget(APPROACH_LINES, budget), [budget]);

    const lengths = useMemo(() => APPROACH_LINES.map((l) => l.length), []);
    const cum = useMemo(() => {
        let s = 0;
        return lengths.map((len) => (s += len));
    }, [lengths]);

    const activeIdx = useMemo(() => {
        const i = cum.findIndex((S) => budget < S);
        return i === -1 ? APPROACH_LINES.length - 1 : i;
    }, [cum, budget]);

    return (
        <section id="dev" ref={sectionRef} className="relative min-h-[320vh] sm:min-h-[420vh] md:min-h-[500vh] w-full text-white">
            <div
                className="sticky top-0 z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-3 sm:px-4"
                style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
                {/* Même style de titre que Nos services */}
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 w-full max-w-[min(92vw,48rem)]">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Notre approche</h2>
                </div>

                <EditorFrame>
                    {visible.map((t, i) => (
                        <CodeLine key={i} text={t} index={i} active={i === activeIdx && t.length < APPROACH_LINES[i].length} />
                    ))}
                </EditorFrame>
            </div>

            <div className="h-[200vh] sm:h-[280vh] md:h-[350vh]" />
        </section>
    );
}

/* =========================================================
   Services — contenu enrichi + “s’allume” à l’arrivée
   ========================================================= */
const SERVICES = [
    {
        k: "01",
        title: "Design & conception",
        tag: "Interfaces claires",
        kicker: "UI/UX, identité, prototypes",
        desc:
            "On part de votre usage réel : parcours simples, hiérarchie limpide et micro-interactions utiles. Identité sobre, design system épuré et prototypes cliquables pour valider vite et bien.",
        pillars: ["Wireframes → prototypes", "Design system minimal", "Accessibilité & motion discret"],
        theme: { color: "#a855f7", tint: "rgba(168,85,247,0.25)", shape: "diamond" } // violet
    },
    {
        k: "02",
        title: "Développement web",
        tag: "Code rapide et durable",
        kicker: "React/Next, Tailwind, TypeScript",
        desc:
            "Sites et portails performants, maintenables et élégants. Structure typée, SEO technique propre, formulaires robustes, i18n, et intégrations back-office sans friction.",
        pillars: ["SSR/SSG au besoin", "SEO & perfs (LCP/CLS)", "Auth, formulaires, i18n"],
        theme: { color: "#38bdf8", tint: "rgba(56,189,248,0.25)", shape: "wave" } // bleu
    },
    {
        k: "03",
        title: "Applications desktop",
        tag: "Efficience au quotidien",
        kicker: "WPF, .NET, EF Core",
        desc:
            "Outils métier rapides et fiables : MVVM propre, bases solides, imports/exports Excel et vues optimisées pour le travail réel. Focus sur stabilité, ergonomie et vitesse.",
        pillars: ["MVVM testable", "SQL/EF Core, offline-first", "Import/Export Excel, reporting"],
        theme: { color: "#22c55e", tint: "rgba(34,197,94,0.25)", shape: "hex" } // vert
    },
    {
        k: "04",
        title: "Automatisation",
        tag: "Gain de temps, contrôle total",
        kicker: "Excel, Power Automate, Python",
        desc:
            "On automatise ce qui vous prend du temps : connecteurs, scripts, flux approuvés. Moins d’erreurs, plus de traçabilité et des process qui roulent seuls.",
        pillars: ["Connecteurs & APIs", "Nettoyage/ETL léger", "Workflows traçables"],
        theme: { color: "#eab308", tint: "rgba(234,179,8,0.25)", shape: "bolt" } // jaune ⚡
    }
] as const;

type ShapeKey = "bolt" | "wave" | "diamond" | "hex";

export function DecoShape({
    shape,
    color,
    tint,
    active,
    sizePct = 30,
    intensity = 1.15,
}: {
    shape: "bolt" | "wave" | "diamond" | "hex";
    color: string;
    tint: string;
    active: boolean;
    sizePct?: number;
    intensity?: number;
}) {
    const isTouch = useIsTouchDevice?.() ?? false;
    const reduced = usePrefersReducedMotion?.() ?? false;

    // uid "safe" sans dépendre de React.useId (compat)
    const uidRef = useRef(Math.random().toString(36).slice(2));
    const uid = uidRef.current;

    const widthPx = `min(${sizePct}%, 120px)`;
    const strong = (a: number) => Math.min(1, a * intensity);

    // géométrie
    const shapeEl = (() => {
        switch (shape) {
            case "bolt":
                return { tag: "path" as const, props: { d: "M60 10 L35 55 H60 L30 110 L90 50 H60 L90 10 Z" } };
            case "wave":
                return { tag: "path" as const, props: { d: "M10 70 C30 40, 70 100, 90 70 S150 40, 170 70" } };
            case "diamond":
                return { tag: "polygon" as const, props: { points: "100,20 40,80 100,140 160,80" } };
            default:
                return { tag: "polygon" as const, props: { points: "100,20 55,45 55,95 100,120 145,95 145,45" } };
        }
    })();

    const baseStroke = { fill: "none", stroke: color, strokeWidth: 2, vectorEffect: "non-scaling-stroke" as const };

    // ids uniques
    const idShape = `sf-shape-${uid}`;
    const idClip = `sf-clip-${uid}`;
    const idGrad = `sf-inner-grad-${uid}`;
    const idBlur = `sf-inner-blur-${uid}`;

    return (
        <div
            className="absolute pointer-events-none z-0"
            style={{ right: "0.5rem", bottom: "0.5rem", width: widthPx, height: widthPx }}
        >
            {/* --- HALO EXTERNE : coupé sur mobile (touch) --- */}
            {!isTouch && (
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(120% 120% at 70% 70%, ${color}40 0%, transparent 70%)`,
                        filter: "blur(20px)",
                        borderRadius: "9999px",
                        transform: "translateZ(0)",
                    }}
                    initial={{ opacity: 0.18, scale: 0.96 }}
                    animate={
                        active && !reduced ? { opacity: [0.18, 0.28, 0.36], scale: [0.96, 0.99, 1] } : { opacity: 0.16, scale: 0.96 }
                    }
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
            )}

            {/* --- SHAPE + INNER GLOW (OK mobile) --- */}
            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 200 160"
                preserveAspectRatio="xMidYMid meet"
                initial={{ opacity: 0.1, transform: "scale(0.96)", filter: `drop-shadow(0 0 0 ${color}00)` }}
                animate={
                    active && !reduced
                        ? {
                            opacity: [0.1, 0.25, strong(1)],
                            transform: ["scale(0.96)", "scale(0.99)", "scale(1)"],
                            filter: [
                                `drop-shadow(0 0 0 ${color}00)`,
                                `drop-shadow(0 0 6px ${color}66)`,
                                `drop-shadow(0 0 16px ${color}AA) drop-shadow(0 0 28px ${color}80)`,
                            ],
                        }
                        : { opacity: 0.1, transform: "scale(0.96)", filter: `drop-shadow(0 0 0 ${color}00)` }
                }
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                <defs>
                    {shapeEl.tag === "path" ? (
                        <path id={idShape} {...(shapeEl.props as any)} />
                    ) : (
                        <polygon id={idShape} {...(shapeEl.props as any)} />
                    )}
                    <clipPath id={idClip}>
                        <use href={`#${idShape}`} />
                    </clipPath>

                    <radialGradient id={idGrad} cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.58" />
                        <stop offset="42%" stopColor={color} stopOpacity="0.30" />
                        <stop offset="80%" stopColor={color} stopOpacity="0.00" />
                    </radialGradient>

                    <filter id={idBlur} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                    </filter>
                </defs>

                {/* inner-glow clippé à l’intérieur (garde l’intérieur éclairé sur mobile) */}
                <motion.g
                    clipPath={`url(#${idClip})`}
                    filter={`url(#${idBlur})`}
                    initial={{ opacity: 0 }}
                    animate={active && !reduced ? { opacity: [0, 0.35, strong(0.55)] } : { opacity: 0 }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                >
                    <rect x="-50" y="-40" width="300" height="240" fill={`url(#${idGrad})`} />
                    <use href={`#${idShape}`} fill={tint} opacity="0.25" />
                </motion.g>

                {/* trait */}
                {shapeEl.tag === "path" ? (
                    <path {...(shapeEl.props as any)} {...baseStroke} />
                ) : (
                    <polygon {...(shapeEl.props as any)} {...baseStroke} />
                )}
            </motion.svg>
        </div>
    );
}

function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
    const ref = React.useRef<HTMLDivElement | null>(null);

    // In-view plus stable sur mobile
    const inView = useInView(ref, {
        margin: "-12% 0% -12% 0%",
        amount: 0.35,
    });

    const [hovered, setHovered] = React.useState(false);
    const isTouch = useIsTouchDevice();
    const reduced = usePrefersReducedMotion();

    // Sur mobile : néon suit le zoom (inView). Desktop : néon au hover uniquement.
    const neonActive = isTouch ? inView : hovered;

    // On sépare la "carte" (statique) du "calque zoom" (transform seulement)
    return (
        <article
            ref={ref}
            onMouseEnter={() => !isTouch && setHovered(true)}
            onMouseLeave={() => !isTouch && setHovered(false)}
            onFocus={() => !isTouch && setHovered(true)}
            onBlur={() => !isTouch && setHovered(false)}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0"
            style={{
                contain: "layout style paint",
            }}
        >
            {/* Calque décor néon (indépendant du zoom) */}
            <DecoShape shape={s.theme.shape as ShapeKey} color={s.theme.color} tint={s.theme.tint} active={neonActive} sizePct={32} />

            {/* Contour : lueur quand neonActive */}
            <div
                aria-hidden
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    boxShadow: neonActive
                        ? `inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 24px 0 ${s.theme.color}22`
                        : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                    transition: "box-shadow 260ms ease",
                }}
            />

            {/* Calque qui zoom: transform-only, GPU-friendly */}
            <motion.div
                className="relative z-10 p-6 sm:p-7 will-change-transform transform-gpu"
                initial={{ opacity: 0.92, scale: 0.985 }}
                animate={
                    inView
                        ? { opacity: 1, scale: 1.0 }
                        : { opacity: 0.92, scale: 0.985 }
                }
                transition={
                    reduced
                        ? { duration: 0 }
                        : {
                            type: "tween",
                            duration: inView ? 0.35 : 0.45,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.03 * i,
                        }
                }
                whileHover={!reduced && !isTouch ? { y: -4 } : {}}
            >
                <div className="mb-1.5 flex items-center justify-between">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400">{s.k}</div>
                    <span className="inline-flex items-center rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-200/90">
                        {s.tag}
                    </span>
                </div>

                <div className="text-xs uppercase tracking-wide" style={{ color: s.theme.color + "CC" }}>
                    {s.kicker}
                </div>
                <h3 className="mt-1 text-base sm:text-lg font-medium text-white/90">{s.title}</h3>
                <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-zinc-300">{s.desc}</p>

                {!!s.pillars?.length && (
                    <ul className="mt-3 space-y-1.5">
                        {s.pillars.map((p, idx) => (
                            <li key={idx} className="text-[13px] sm:text-sm text-zinc-400">• {p}</li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </article>
    );
}

function ServicesSection() {
    return (
        <section id="services" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Nos services</h2>
                </div>

                <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                    {SERVICES.map((s, i) => (
                        <ServiceCard key={s.k} s={s} i={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   Projets — cartes avec halo néon (jaune/rouge/vert)
   ========================================================= */
type GlowColor = "yellow" | "red" | "green";
// par ceci (violet discret partout) :
const glowHex: Record<GlowColor, string> = {
    yellow: "#9b6bff",
    red: "#9b6bff",
    green: "#9b6bff",
};

function ProjectCard({
    title,
    subtitle,
    href,
    color,
}: {
    title: string;
    subtitle: string;
    href: string;
    color: GlowColor;
}) {
    const isTouch = useIsTouchDevice();
    const [hovered, setHovered] = React.useState(false);
    const ref = React.useRef<HTMLAnchorElement | null>(null);
    const inView = useInView(ref, { margin: "-15% 0% -15% 0%", amount: 0.25 });

    const active = isTouch ? inView : hovered;
    const c = glowHex[color];

    return (
        <div className="relative isolate">
            {/* Halo plus doux, même position */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    borderRadius: "0.9rem",
                    boxShadow: `
            0 0 8px 2px ${c}33,
            0 0 20px 6px ${c}29,
            0 0 36px 12px ${c}20
          `,
                    filter: "blur(4px) saturate(1.4) brightness(1.1)",
                }}
                animate={{ opacity: active ? 1 : 0, scale: active ? 1.01 : 0.99 }}
                transition={{
                    duration: active ? 1.0 : 4.0, // 1s in / 4s out
                    ease: [0.22, 1, 0.36, 1],
                }}
            />

            {/* Carte plus transparente */}
            <a
                ref={ref}
                href={href}
                onMouseEnter={() => !isTouch && setHovered(true)}
                onMouseLeave={() => !isTouch && setHovered(false)}
                onFocus={() => !isTouch && setHovered(true)}
                onBlur={() => !isTouch && setHovered(false)}
                className="relative block overflow-hidden rounded-2xl p-4 sm:p-5 transition-transform"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(22,24,31,0.45) 0%, rgba(12,14,18,0.42) 100%)",
                    backdropFilter: "blur(8px)",
                }}
            >
                <div
                    className="mb-2 sm:mb-3 h-28 sm:h-32 w-full overflow-hidden rounded-lg"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(40,43,53,0.25) 0%, rgba(22,24,31,0.25) 100%)",
                    }}
                />
                <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-medium text-white/85 group-hover:text-white">
                        {title}
                    </h3>
                    <span className="text-[10px] text-zinc-400">→</span>
                </div>
                <p className="mt-1 text-[13px] text-zinc-300">{subtitle}</p>
            </a>
        </div>
    );
}

/* =========================================================
   Works / Contact / Footer
   ========================================================= */
function WorksSection() {
    const works = [
        { t: "Site vitrine premium", d: "Next.js, Tailwind, Motion", href: "#", color: "yellow" as GlowColor },
        { t: "Portail métier", d: "React, TypeScript, Auth", href: "#", color: "red" as GlowColor },
        { t: "App desktop labo", d: ".NET, WPF, EF Core", href: "#", color: "green" as GlowColor },
    ];
    return (
        <section id="works" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
                    <h2 className="text-xl sm:text-2xl font-semibold">Nos réalisations</h2>
                    <a href="#contact" className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline">
                        Discuter d’un projet
                    </a>
                </div>
                <div className="grid gap-8 sm:gap-10 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
                    {works.map((w, i) => (
                        <ProjectCard key={i} title={w.t} subtitle={w.d} href={w.href} color={w.color} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ContactSection() {
    return (
        <section id="contact" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Contact</h2>
                <p className="mt-2 text-sm sm:text-base text-zinc-300">
                    Parlez-nous de votre projet. Réponse rapide et conseils concrets.
                </p>

                <form className="mt-5 sm:mt-6 grid gap-4" action="mailto:hello@smartflow.dev" method="post" encType="text/plain">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <input
                            name="nom"
                            placeholder="Votre nom"
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40"
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            inputMode="email"
                            placeholder="Votre email"
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40"
                            required
                        />
                    </div>

                    <textarea
                        name="message"
                        placeholder="Décrivez brièvement votre besoin…"
                        className="min-h-[140px] rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40"
                        required
                    />

                    <div className="flex items-stretch sm:items-center">
                        <button
                            type="submit"
                            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="relative w-full text-white py-8 sm:py-10">
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
                    <div>
                        <div className="text-[11px] sm:text-sm uppercase tracking-[0.25em] text-zinc-400">SmartFlow</div>
                        <p className="mt-2 text-zinc-400 text-xs sm:text-sm">Design & Développement d’expériences numériques.</p>
                    </div>
                    <div className="flex gap-5 sm:gap-6 text-sm">
                        <a href="#services" className="text-zinc-300 hover:text-white">
                            Services
                        </a>
                        <a href="#works" className="text-zinc-300 hover:text-white">
                            Réalisations
                        </a>
                        <a href="#contact" className="text-zinc-300 hover:text-white">
                            Contact
                        </a>
                    </div>
                </div>
                <div className="mt-6 sm:mt-8 border-t border-white/10 pt-5 sm:pt-6 text-[11px] sm:text-xs text-zinc-500">
                    © {new Date().getFullYear()} SmartFlow — Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}

/* =========================================================
   APP
   ========================================================= */
export default function App() {
    return (
        <main className="relative min-h-screen text-white antialiased [text-size-adjust:100%] selection:bg-white/20">
            <SiteBackground />
            <HeroSection />
            <DevScrollCodeSection />
            <ServicesSection />
            <WorksSection />
            <ContactSection />
            <Footer />
        </main>
    );
}
