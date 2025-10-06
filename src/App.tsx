import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";

/* =========================================================
   Constantes (hors composants pour éviter les recréations)
   ========================================================= */
const isClient = typeof window !== "undefined";

const NOISE_BG =
    'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\' viewBox=\'0 0 160 160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix type=\'saturate\' values=\'0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'.5\'/></svg>")';

/* =========================================================
   Hooks utilitaires
   ========================================================= */
function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        if (!isClient) return;
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const onChange = () => setReduced(media.matches);
        onChange();
        media.addEventListener?.("change", onChange);
        media.addListener?.(onChange); // fallback Safari anciens
        return () => {
            media.removeEventListener?.("change", onChange);
            media.removeListener?.(onChange);
        };
    }, []);
    return reduced;
}

function useIsTouchDevice() {
    const [touch, setTouch] = useState(false);
    useEffect(() => {
        if (!isClient) return;
        const q = "(hover: none), (pointer: coarse)";
        const mq = window.matchMedia(q);
        const update = () => setTouch(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        mq.addListener?.(update); // fallback
        return () => {
            mq.removeEventListener?.("change", update);
            mq.removeListener?.(update);
        };
    }, []);
    return touch;
}

/** Coupe les animations quand l’onglet est masqué (perf/batterie) */
function usePageVisible() {
    const [v, setV] = useState(true);
    useEffect(() => {
        const on = () => setV(!document.hidden);
        on();
        document.addEventListener("visibilitychange", on);
        return () => document.removeEventListener("visibilitychange", on);
    }, []);
    return v;
}

/* =========================================================
   Background — Color Mist amélioré (perf + phases désynchronisées)
   ========================================================= */
function SiteBackground() {
    const reduced = usePrefersReducedMotion();
    const visible = usePageVisible();

    // Knobs
    const SPEED = 45; // plus petit = plus rapide (sec A/R)
    const AMP_X = 360; // px
    const AMP_Y = 240; // px
    const POWER = 1.28;
    const SAT = 1.18;
    const BRIGHT = 1.06;

    // Phases aléatoires pour désynchroniser les nappes
    const PHASE_1 = useRef(Math.random()).current;
    const PHASE_2 = useRef(Math.random()).current;
    const PHASE_3 = useRef(Math.random()).current;
    const PHASE_4 = useRef(Math.random()).current;

    const a = (x: number) => Math.min(1, x * POWER);
    const animOn = !reduced && visible;

    return (
        <>
            {/* base */}
            <div className="fixed inset-0 -z-30 bg-[#0B0B12]" />
            <div className="fixed inset-0 -z-20 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Saturation / brightness wrapper */}
            <div
                className="fixed inset-0 -z-10 overflow-hidden"
                style={{ filter: `saturate(${SAT}) brightness(${BRIGHT})` }}
                aria-hidden
            >
                {/* Nap 1 — violet/rose */}
                <motion.div
                    className="absolute left-[-15%] top-[-10%] h-[70vh] w-[70vw] rounded-[9999px] pointer-events-none"
                    style={{
                        background: `radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,${a(
                            0.22
                        )}) 0%, rgba(168,85,247,${a(0.1)}) 35%, rgba(168,85,247,0) 70%)`,
                        filter: "blur(56px)",
                        mixBlendMode: "screen",
                        maskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.62) 65%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.62) 65%, rgba(0,0,0,0) 100%)",
                        willChange: "transform",
                    }}
                    animate={
                        animOn
                            ? { x: [-AMP_X, AMP_X, -AMP_X], y: [AMP_Y, -AMP_Y, AMP_Y], scale: [0.985, 1.02, 0.985] }
                            : {}
                    }
                    transition={
                        animOn
                            ? {
                                x: { duration: SPEED, ease: "easeInOut", repeat: Infinity, delay: PHASE_1 * 1.5 },
                                y: { duration: SPEED * 0.9, ease: "easeInOut", repeat: Infinity, delay: PHASE_1 * 0.7 },
                                scale: { duration: SPEED * 1.4, ease: "easeInOut", repeat: Infinity, delay: PHASE_1 * 0.3 },
                            }
                            : {}
                    }
                />

                {/* Nap 2 — cyan */}
                <motion.div
                    className="absolute right-[-12%] top-[10%] h-[65vh] w-[60vw] rounded-[9999px] pointer-events-none"
                    style={{
                        background: `radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,${a(
                            0.18
                        )}) 0%, rgba(34,211,238,${a(0.085)}) 35%, rgba(34,211,238,0) 70%)`,
                        filter: "blur(54px)",
                        mixBlendMode: "screen",
                        maskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0) 100%)",
                        willChange: "transform",
                    }}
                    animate={
                        animOn
                            ? { x: [AMP_X * 1.2, -AMP_X * 1.2, AMP_X * 1.2], y: [-AMP_Y, AMP_Y, -AMP_Y] }
                            : {}
                    }
                    transition={
                        animOn
                            ? {
                                x: { duration: SPEED * 1.1, ease: "easeInOut", repeat: Infinity, delay: PHASE_2 * 1.2 },
                                y: { duration: SPEED * 0.95, ease: "easeInOut", repeat: Infinity, delay: PHASE_2 * 0.5 },
                            }
                            : {}
                    }
                />

                {/* Nap 3 — magenta */}
                <motion.div
                    className="absolute left-[5%] bottom-[-12%] h-[60vh] w-[55vw] rounded-[9999px] pointer-events-none"
                    style={{
                        background: `radial-gradient(60% 60% at 50% 50%, rgba(232,121,249,${a(
                            0.14
                        )}) 0%, rgba(232,121,249,${a(0.06)}) 35%, rgba(232,121,249,0) 70%)`,
                        filter: "blur(66px)",
                        mixBlendMode: "screen",
                        maskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.58) 65%, rgba(0,0,0,0) 100%)",
                        WebkitMaskImage:
                            "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.58) 65%, rgba(0,0,0,0) 100%)",
                        willChange: "transform",
                    }}
                    animate={
                        animOn ? { x: [-AMP_X * 0.8, AMP_X * 0.8, -AMP_X * 0.8], y: [0, AMP_Y * 0.6, 0] } : {}
                    }
                    transition={
                        animOn
                            ? {
                                x: { duration: SPEED * 0.9, ease: "easeInOut", repeat: Infinity, delay: PHASE_3 * 0.8 },
                                y: { duration: SPEED * 1.2, ease: "easeInOut", repeat: Infinity, delay: PHASE_3 * 0.4 },
                            }
                            : {}
                    }
                />

                {/* Nap 4 — streak très faible */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `radial-gradient(80% 100% at 20% 50%, rgba(168,85,247,${a(
                            0.05
                        )}) 0%, rgba(56,189,248,${a(0.04)}) 30%, rgba(232,121,249,${a(0.035)}) 55%, rgba(0,0,0,0) 70%)`,
                        mixBlendMode: "screen",
                        filter: "blur(90px)",
                        willChange: "transform",
                        transform: "translateZ(0)",
                    }}
                    animate={animOn ? { x: [-AMP_X * 1.4, AMP_X * 1.4, -AMP_X * 1.4] } : {}}
                    transition={
                        animOn
                            ? { duration: Math.max(12, SPEED * 0.6), ease: "easeInOut", repeat: Infinity, delay: PHASE_4 }
                            : {}
                    }
                />
            </div>

            {/* grain */}
            <motion.div
                aria-hidden
                className="fixed inset-0 -z-5 mix-blend-overlay pointer-events-none"
                style={{
                    opacity: 0.06,
                    backgroundImage: NOISE_BG,
                    backgroundSize: "160px 160px",
                    willChange: "opacity",
                }}
                animate={animOn ? { opacity: [0.05, 0.08, 0.05] } : {}}
                transition={animOn ? { duration: 14, ease: "easeInOut", repeat: Infinity } : {}}
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

    // Fade out la flèche 0 → 120px
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
                        aria-label="Découvrir notre approche"
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                    >
                        Notre approche
                    </a>
                    <a
                        href="#services"
                        aria-label="Voir nos services"
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
                <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-80 animate-bounce" aria-hidden="true">
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

    const block = src.match(/^\/\*[\s\S]*\*\/$/);
    if (block) {
        const m = block[0].match(/\/\*\s*(Notre approche)([\s\S]*?)\*\//);
        if (m) {
            push("cm", "/* ");
            push("kw", m[1]);
            push("cm", m[2] + "*/");
            return tokens;
        }
    }

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
   Editor frame — glassy
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

            <div className="rounded-xl border border-white/5 bg-black/30 px-2.5 sm:px-4 py-3 sm:py-5 overflow-x-auto">
                <div className="min-w-full">{children}</div>
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 rounded-2xl bg-[conic-gradient(from_120deg_at_50%_50%,rgba(56,189,248,0.06),rgba(168,85,247,0.10),rgba(232,121,249,0.06),rgba(56,189,248,0.06))] blur-xl"
            />
        </div>
    );
}

/* =========================================================
   DEV SECTION — sticky reveal optimisé (RAF throttle)
   ========================================================= */
function DevScrollCodeSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        // progression plus douce sans allonger la page
        offset: ["start 10%", "end 90%"],
    });

    const [p, setP] = useState(0);
    const rafRef = useRef<number | null>(null);

    // Throttle via requestAnimationFrame pour lisser la frappe
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => setP(v));
    });

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
   Services — déco néon optimisée (low-blur sur écrans étroits)
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
        theme: { color: "#a855f7", tint: "rgba(168,85,247,0.25)", shape: "diamond" }, // violet
    },
    {
        k: "02",
        title: "Développement web",
        tag: "Code rapide et durable",
        kicker: "React/Next, Tailwind, TypeScript",
        desc:
            "Sites et portails performants, maintenables et élégants. Structure typée, SEO technique propre, formulaires robustes, i18n, et intégrations back-office sans friction.",
        pillars: ["SSR/SSG au besoin", "SEO & perfs (LCP/CLS)", "Auth, formulaires, i18n"],
        theme: { color: "#38bdf8", tint: "rgba(56,189,248,0.25)", shape: "wave" }, // bleu
    },
    {
        k: "03",
        title: "Applications desktop",
        tag: "Efficience au quotidien",
        kicker: "WPF, .NET, EF Core",
        desc:
            "Outils métier rapides et fiables : MVVM propre, bases solides, imports/exports Excel et vues optimisées pour le travail réel. Focus sur stabilité, ergonomie et vitesse.",
        pillars: ["MVVM testable", "SQL/EF Core, offline-first", "Import/Export Excel, reporting"],
        theme: { color: "#22c55e", tint: "rgba(34,197,94,0.25)", shape: "hex" }, // vert
    },
    {
        k: "04",
        title: "Automatisation",
        tag: "Gain de temps, contrôle total",
        kicker: "Excel, Power Automate, Python",
        desc:
            "On automatise ce qui vous prend du temps : connecteurs, scripts, flux approuvés. Moins d’erreurs, plus de traçabilité et des process qui roulent seuls.",
        pillars: ["Connecteurs & APIs", "Nettoyage/ETL léger", "Workflows traçables"],
        theme: { color: "#eab308", tint: "rgba(234,179,8,0.25)", shape: "bolt" }, // jaune ⚡
    },
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
    shape: ShapeKey;
    color: string;
    tint: string;
    active: boolean;
    sizePct?: number;
    intensity?: number;
}) {
    const isTouch = useIsTouchDevice?.() ?? false;
    const reduced = usePrefersReducedMotion?.() ?? false;

    // uid "safe" sans useId (compat)
    const uidRef = useRef(Math.random().toString(36).slice(2));
    const uid = uidRef.current;

    // low-blur pour appareils étroits/low-end
    const isNarrow = isClient ? window.innerWidth < 400 : false;
    const BLUR_STD_DEV = isNarrow ? 4 : 10;

    const widthPx = `min(${sizePct}%, 120px)`;
    const strong = (a: number) => Math.min(1, a * intensity);

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

    const idShape = `sf-shape-${uid}`;
    const idClip = `sf-clip-${uid}`;
    const idGrad = `sf-inner-grad-${uid}`;
    const idBlur = `sf-inner-blur-${uid}`;

    return (
        <div className="absolute pointer-events-none z-0" style={{ right: "0.5rem", bottom: "0.5rem", width: widthPx, height: widthPx }}>
            {/* HALO EXTERNE (coupé sur mobile) */}
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
                    animate={active && !reduced ? { opacity: [0.18, 0.28, 0.36], scale: [0.96, 0.99, 1] } : { opacity: 0.16, scale: 0.96 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
            )}

            {/* SHAPE + inner glow */}
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
                    {shapeEl.tag === "path" ? <path id={idShape} {...(shapeEl.props as any)} /> : <polygon id={idShape} {...(shapeEl.props as any)} />}
                    <clipPath id={idClip}>
                        <use href={`#${idShape}`} />
                    </clipPath>

                    <radialGradient id={idGrad} cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor={color} stopOpacity="0.58" />
                        <stop offset="42%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="80%" stopColor={color} stopOpacity="0" />
                    </radialGradient>

                    <filter id={idBlur} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={BLUR_STD_DEV} />
                    </filter>
                </defs>

                {/* inner-glow clippé */}
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
    const inView = useInView(ref, { margin: "-12% 0% -12% 0%", amount: 0.35 });

    const [hovered, setHovered] = React.useState(false);
    const isTouch = useIsTouchDevice();
    const reduced = usePrefersReducedMotion();

    const neonActive = isTouch ? inView : hovered;

    return (
        <article
            ref={ref}
            onMouseEnter={() => !isTouch && setHovered(true)}
            onMouseLeave={() => !isTouch && setHovered(false)}
            onFocus={() => !isTouch && setHovered(true)}
            onBlur={() => !isTouch && setHovered(false)}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0"
            style={{ contain: "layout style paint" }}
        >
            <DecoShape shape={s.theme.shape as ShapeKey} color={s.theme.color} tint={s.theme.tint} active={neonActive} sizePct={32} />

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

            <motion.div
                className="relative z-10 p-6 sm:p-7 will-change-transform transform-gpu"
                initial={{ opacity: 0.92, scale: 0.985 }}
                animate={inView ? { opacity: 1, scale: 1.0 } : { opacity: 0.92, scale: 0.985 }}
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
                            <li key={idx} className="text-[13px] sm:text-sm text-zinc-400">
                                • {p}
                            </li>
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
   Projets — cartes avec halo néon (violet discret)
   ========================================================= */
type GlowColor = "yellow" | "red" | "green";
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

    // Sur mobile (touch): actif = quand la carte est visible
    // Sur desktop: actif = hover (comme avant)
    const active = isTouch ? inView : hovered;

    const c = glowHex[color];

    return (
        <div className="relative isolate">
            {/* Halo néon — UNIQUEMENT desktop (pas sur mobile/touch) */}
            {!isTouch && (
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
                    transition={{ duration: active ? 1.0 : 4.0, ease: [0.22, 1, 0.36, 1] }}
                />
            )}

            <a
                ref={ref}
                href={href}
                onMouseEnter={() => !isTouch && setHovered(true)}
                onMouseLeave={() => !isTouch && setHovered(false)}
                onFocus={() => !isTouch && setHovered(true)}
                onBlur={() => !isTouch && setHovered(false)}
                className="relative block overflow-hidden rounded-2xl p-4 sm:p-5 transition-transform"
                style={{
                    background: "linear-gradient(180deg, rgba(22,24,31,0.45) 0%, rgba(12,14,18,0.42) 100%)",
                    backdropFilter: "blur(8px)",
                    // Bordure: sur mobile elle devient violette quand visible
                    border: `1px solid ${isTouch
                            ? (active ? c : "rgba(255,255,255,0.15)")
                            : "rgba(255,255,255,0.12)"
                        }`,
                    transition: "border-color 300ms ease, transform 300ms ease",
                }}
                aria-label={`${title} – en savoir plus`}
            >
                <div
                    className="mb-2 sm:mb-3 h-28 sm:h-32 w-full overflow-hidden rounded-lg"
                    style={{
                        background: "linear-gradient(180deg, rgba(40,43,53,0.25) 0%, rgba(22,24,31,0.25) 100%)",
                    }}
                />
                <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base font-medium text-white/85 group-hover:text-white">{title}</h3>
                    <span className="text-[10px] text-zinc-400">→</span>
                </div>
                <p className="mt-1 text-[13px] text-zinc-300">{subtitle}</p>
            </a>
        </div>
    );
}
function WorksSection() {
    const works = [
        { t: "Site agence de voyage", d: "Next.js, Tailwind, Motion", href: "#", color: "yellow" as GlowColor },
        { t: "Automation workflow", d: "React, TypeScript, Auth", href: "#", color: "red" as GlowColor },
        { t: "App desktop labo", d: ".NET, WPF, EF Core", href: "#", color: "green" as GlowColor },
    ];
    return (
        <section id="works" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
                    <h2 className="text-xl sm:text-2xl font-semibold">Nos réalisations</h2>
                    <a href="#contact" className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline" aria-label="Nous contacter">
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

/* =========================================================
   Contact — labels + autocomplete + endpoint robuste
   ========================================================= */
function ContactSection() {
    return (
        <section id="contact" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
                <h2 className="text-xl sm:text-2xl font-semibold">Contact</h2>
                <p className="mt-2 text-sm sm:text-base text-zinc-300">Parlez-nous de votre projet. Réponse rapide et conseils concrets.</p>

                {/* FormSubmit : remplace l’email par le tien si besoin */}
                <form
                    className="mt-5 sm:mt-6 grid gap-4"
                    action="https://formsubmit.co/hello@smartflow.dev"
                    method="POST"
                >
                    {/* Anti-spam & options */}
                    <input type="hidden" name="_subject" value="Nouveau message SmartFlow" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="sr-only" htmlFor="c-nom">
                                Nom
                            </label>
                            <input
                                id="c-nom"
                                name="nom"
                                placeholder="Votre nom"
                                autoComplete="name"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="c-email">
                                Email
                            </label>
                            <input
                                id="c-email"
                                name="email"
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                placeholder="Votre email"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="c-message">
                            Message
                        </label>
                        <textarea
                            id="c-message"
                            name="message"
                            placeholder="Décrivez brièvement votre besoin…"
                            className="min-h-[140px] rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full"
                            required
                        />
                    </div>

                    <div className="flex items-stretch sm:items-center">
                        <button
                            type="submit"
                            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                            aria-label="Envoyer le message"
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
                        <a href="#services" className="text-zinc-300 hover:text-white" aria-label="Voir nos services">
                            Services
                        </a>
                        <a href="#works" className="text-zinc-300 hover:text-white" aria-label="Voir nos réalisations">
                            Réalisations
                        </a>
                        <a href="#contact" className="text-zinc-300 hover:text-white" aria-label="Nous contacter">
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
