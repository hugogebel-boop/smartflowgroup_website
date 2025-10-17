// src/App.tsx
import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { setHead } from "./seo";

const ProjectsWeb = React.lazy(() => import("./projects/web"));
const ProjectsApps = React.lazy(() => import("./projects/apps"));
const ProjectsAutomation = React.lazy(() => import("./projects/automation"));
const Mentions = React.lazy(() => import("./projects/Mentions"));

import {
    SiteBackground,
    TopNav,
    Footer,
    goToHomeAndScroll,
    useGoHomeAndScroll,
    usePrefersReducedMotion,
} from "./layout";

/* ================= Helpers ================= */
const isClient = typeof window !== "undefined";

function useIsTouchDevice() {
    const [touch, setTouch] = React.useState(false);

    React.useEffect(() => {
        if (typeof window === "undefined" || !("matchMedia" in window)) return;

        const mq = window.matchMedia("(hover: none), (pointer: coarse)");

        const onChange = (ev: MediaQueryListEvent | MediaQueryList) => {
            // ev.matches pour l'event moderne, mq.matches en fallback
            setTouch("matches" in ev ? ev.matches : mq.matches);
        };

        // valeur initiale
        setTouch(mq.matches);

        // ✅ API moderne
        if (typeof mq.addEventListener === "function") {
            mq.addEventListener("change", onChange as EventListener);
            return () => mq.removeEventListener("change", onChange as EventListener);
        }

        // 🔁 Fallback Safari (sans addEventListener / addListener)
        (mq as MediaQueryList).onchange = onChange as any;
        return () => {
            (mq as any).onchange = null;
        };
    }, []);

    return touch;
}

/* ================= HERO ================= */
function HeroSection() {
    const { scrollY } = useScroll();
    const [opacity, setOpacity] = useState(1);
    const reduced = usePrefersReducedMotion();
    const goHomeAndScroll = useGoHomeAndScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const o = Math.max(0, 1 - latest / 120);
        setOpacity(o);
    });

    return (
        <section
            id="hero"
            role="region"
            aria-labelledby="hero-title"
            className="relative flex min-h-[88svh] md:min-h-screen w-full items-center justify-center overflow-hidden text-white"
            style={{ paddingTop: "max(env(safe-area-inset-top),1rem)", paddingBottom: "1rem" }}
        >
            <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 text-center">
                <p className="mb-2 sm:mb-3 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                    SmartFlow
                </p>

                <h1 id="hero-title" className="text-[30px] sm:text-5xl md:text-6xl font-semibold leading-[1.07]">
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
                        href="/"
                        aria-label="Découvrir notre approche"
                        role="button"
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                        onClick={(e) => {
                            e.preventDefault();
                            goHomeAndScroll("dev");
                        }}
                    >
                        Notre approche
                    </a>
                    <a
                        href="/"
                        aria-label="Voir nos services"
                        role="button"
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                        onClick={(e) => {
                            e.preventDefault();
                            goHomeAndScroll("services");
                        }}
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
                    width="20" height="20" viewBox="0 0 24 24"
                    className={`opacity-80 ${!reduced ? "animate-bounce" : ""}`}
                    aria-hidden="true"
                >
                    <path d="M6 9l6 6 6-6" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </section>
    );
}

/* ================= Mini highlighter ================= */
type Token = { t: "str" | "kw" | "red" | "cm" | "plain"; v: string };

function tokenizeTS(src: string): Token[] {
    const tokens: Token[] = [];
    const push = (t: Token["t"], v: string) => v && tokens.push({ t, v });
    const re =
        /("[^"]*"|'[^']*'|`[^`]*`)|\b(export|function|return|const|let|type|interface|new|async|await|start|commit)\b|(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;

    let i = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
        if (m.index > i) push("plain", src.slice(i, m.index));
        if (m[1]) push("str", m[1]);
        else if (m[2]) push(m[2] === "start" || m[2] === "commit" ? "red" : "kw", m[2]);
        else if (m[3]) {
            const comment = m[3];
            if (/Notre approche/.test(comment)) {
                const marked = comment.replace(/(Notre approche)/g, "\u0000$1\u0000");
                const segs = marked.split("\u0000");
                segs.forEach((seg, idx) => push(idx % 2 ? "kw" : "cm", seg));
            } else push("cm", comment);
        }
        i = m.index + m[0].length;
    }
    if (i < src.length) push("plain", src.slice(i));
    return tokens;
}

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
        if (remain <= 0) { out.push(""); continue; }
        const take = Math.min(line.length, remain);
        out.push(line.slice(0, take));
        remain -= take;
    }
    return out;
}

function CodeLine({ text, index, active }: { text: string; index: number; active: boolean; }) {
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
                    k.t === "str" ? "text-emerald-400"
                        : k.t === "kw" ? "text-violet-300 font-medium"
                            : k.t === "red" ? "text-red-500 font-bold"
                                : k.t === "cm" ? "text-zinc-400/90" : "";
                return <span key={i} className={cls}>{k.v}</span>;
            })}
            {active && <span className="inline-block w-2 h-4 align-baseline ml-0.5 bg-zinc-200 animate-pulse" />}
        </motion.div>
    );
}

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

            <div aria-hidden className="pointer-events-none absolute -inset-1 rounded-2xl bg-[conic-gradient(from_120deg_at_50%_50%,rgba(56,189,248,0.06),rgba(168,85,247,0.10),rgba(232,121,249,0.06),rgba(56,189,248,0.06))] blur-xl" />
        </div>
    );
}

/* ================= DEV sticky reveal ================= */
function DevScrollCodeSection() {
    const reduced = usePrefersReducedMotion();
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 10%", "end 90%"] });

    const [p, setP] = useState(0);
    const rafRef = useRef<number | null>(null);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => setP(v));
    });

    useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

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

    // 🔕 Version statique si reduced-motion
    if (reduced) {
        return (
            <section id="dev" role="region" aria-labelledby="dev-title" className="relative w-full text-white py-12 sm:py-16">
                <div className="mx-auto w-full max-w-[min(92vw,48rem)] px-3 sm:px-4">
                    <h2 id="dev-title" className="mb-6 sm:mb-8 text-xl sm:text-2xl font-semibold">Notre approche</h2>
                    <EditorFrame>
                        {APPROACH_LINES.map((t, i) => (
                            <CodeLine key={i} text={t} index={i} active={false} />
                        ))}
                    </EditorFrame>
                </div>
            </section>
        );
    }

    return (
        <section id="dev" role="region" aria-labelledby="dev-title" ref={sectionRef} className="relative min-h-[320vh] sm:min-h-[420vh] md:min-h-[500vh] w-full text-white">
            <div className="sticky top-0 z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-3 sm:px-4" style={{ paddingTop: "env(safe-area-inset-top)" }}>
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 w-full max-w-[min(92vw,48rem)]">
                    <h2 id="dev-title" className="text-xl sm:text-2xl font-semibold text-white">Notre approche</h2>
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

/* ================= Services ================= */
const SERVICES = [
    {
        k: "01", title: "Design & identité digitale", tag: "Clarté visuelle", kicker: "UI/UX, branding, direction visuelle",
        desc: "Nous concevons des interfaces et des identités sobres, lisibles et intemporelles. Chaque élément visuel est pensé pour renforcer votre image et guider vos utilisateurs avec clarté.",
        pillars: ["Identité visuelle et direction artistique", "Interfaces nettes et lisibles", "Maquettes et prototypes interactifs"],
        theme: { color: "#a855f7", tint: "rgba(168,85,247,0.25)", shape: "diamond" }
    },
    {
        k: "02", title: "Sites web", tag: "Expérience soignée", kicker: "React, Next.js, Tailwind",
        desc: "Des sites élégants et réactifs, construits pour durer. Du code propre, des transitions fluides et une attention particulière portée à l’expérience utilisateur ainsi qu'au contenu.",
        pillars: ["Développement web moderne et léger", "Expérience utilisateur", "Optimisation du contenu et du référencement"],
        theme: { color: "#38bdf8", tint: "rgba(56,189,248,0.25)", shape: "wave" }
    },
    {
        k: "03", title: "Applications métier", tag: "Performance & fiabilité", kicker: "WPF, .NET, EF Core",
        desc: "Des outils internes conçus sur mesure pour améliorer vos processus quotidiens. Architecture stable, interfaces claires et fiabilité sur le long terme.",
        pillars: ["Outils internes adaptés à vos besoins", "Navigation claire et productivité accrue", "Suivi et exploitation simplifiés"],
        theme: { color: "#22c55e", tint: "rgba(34,197,94,0.25)", shape: "hex" }
    },
    {
        k: "04", title: "Outils d’automatisation", tag: "Processus autonomes", kicker: "Excel, Python, PowerShell",
        desc: "Nous mettons en place des scripts et automatisations fiables pour connecter vos outils et structurer vos données. Des processus stables, qui tournent seuls et restent sous contrôle.",
        pillars: ["Scripts sur mesure pour vos besoins", "Processus efficaces et traçables", "Intégrations fluides entre vos outils"],
        theme: { color: "#eab308", tint: "rgba(234,179,8,0.25)", shape: "bolt" }
    },
] as const;

type ShapeKey = "bolt" | "wave" | "diamond" | "hex";

/* =========================================================
   DecoShape — diffusion blur safe (iOS/desktop) + peps SVG
   Props: { shape, color, tint, active, sizePct?, intensity? }
   ========================================================= */
/* =========================================================
   DecoShape — glow centré qui s’étend vers l’extérieur (iOS-safe)
   ========================================================= */
/* =========================================================
   DecoShape — glow centré plus large et marqué (iOS-safe)
   ========================================================= */
export function DecoShape({
    shape,
    color,
    tint,
    active,
    sizePct = 30,
    intensity = 1.25, // intensité légèrement augmentée
}: {
    shape: ShapeKey;
    color: string;
    tint: string;
    active: boolean;
    sizePct?: number;
    intensity?: number;
}) {
    const isTouch = useIsTouchDevice();
    const reduced = usePrefersReducedMotion();
    const uidRef = React.useRef(Math.random().toString(36).slice(2));
    const uid = uidRef.current;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isIOS = /iP(hone|ad|od)/i.test(ua);
    const iosMode = isTouch || isIOS;

    const isNarrow = typeof window !== "undefined" ? window.innerWidth < 420 : false;
    const BLUR_STD_DEV = iosMode ? (isNarrow ? 8 : 12) : 26; // blur plus grand (desktop)

    const widthPx = `min(${sizePct}%, 130px)`; // halo un peu plus large
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

    const baseStroke: React.SVGProps<SVGPathElement> = {
        fill: "none",
        stroke: color,
        strokeWidth: 2,
        vectorEffect: "non-scaling-stroke",
    };

    const idShape = `sf-shape-${uid}`;
    const idClip = `sf-clip-${uid}`;
    const idGrad = `sf-inner-grad-${uid}`;
    const idBlur = `sf-inner-blur-${uid}`;
    const FILTER_BOX = { x: -150, y: -150, w: 520, h: 460 };

    return (
        <div
            className="absolute pointer-events-none z-0"
            style={{ right: "0.5rem", bottom: "0.5rem", width: widthPx, height: widthPx }}
        >
            {/* Halo centré plus large et marqué */}
            <motion.div
                aria-hidden
                className="absolute inset-0"
                style={{
                    // rayon agrandi, diffusion plus prononcée
                    background: `radial-gradient(circle at 50% 50%, ${color}55 0%, ${color}44 30%, ${color}22 60%, transparent 80%)`,
                    filter: `blur(${iosMode ? (isNarrow ? 12 : 16) : 32}px)`, // halo plus fort
                    borderRadius: "9999px",
                    transformOrigin: "50% 50%",
                    willChange: "opacity, transform, filter",
                }}
                initial={{ opacity: 0.15, scale: 0.8 }}
                animate={
                    active && !reduced
                        ? { opacity: [0.22, 0.32, 0.38], scale: [0.9, 0.98, 1.05] } // effet plus respirant
                        : { opacity: 0.14, scale: 0.8 }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* SVG net avec drop-shadow */}
            <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 200 160"
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: "visible" }}
                initial={{
                    opacity: 0.12,
                    transform: "scale(0.96)",
                    filter: iosMode ? undefined : `drop-shadow(0 0 0 ${color}00)`,
                }}
                animate={
                    active && !reduced
                        ? iosMode
                            ? {
                                opacity: [0.15, 0.26, strong(0.9)],
                                transform: ["scale(0.96)", "scale(1)", "scale(1.05)"],
                            }
                            : {
                                opacity: [0.18, 0.36, strong(1)],
                                transform: ["scale(0.965)", "scale(1)", "scale(1.06)"],
                                filter: [
                                    `drop-shadow(0 0 0 ${color}00)`,
                                    `drop-shadow(0 0 10px ${color}88)`,
                                    `drop-shadow(0 0 28px ${color}AA) drop-shadow(0 0 50px ${color}77)`,
                                ] as any,
                            }
                        : iosMode
                            ? { opacity: 0.1, transform: "scale(0.95)" }
                            : { opacity: 0.1, transform: "scale(0.95)", filter: `drop-shadow(0 0 0 ${color}00)` }
                }
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            >
                <defs>
                    {shapeEl.tag === "path"
                        ? <path id={idShape} {...(shapeEl.props as any)} />
                        : <polygon id={idShape} {...(shapeEl.props as any)} />}
                    <clipPath id={idClip}><use href={`#${idShape}`} /></clipPath>
                    <radialGradient id={idGrad} cx="50%" cy="50%" r="55%">
                        <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                        <stop offset="42%" stopColor={color} stopOpacity={0.35} />
                        <stop offset="80%" stopColor={color} stopOpacity={0} />
                    </radialGradient>
                    <filter
                        id={idBlur}
                        x={iosMode ? undefined : (FILTER_BOX.x as any)}
                        y={iosMode ? undefined : (FILTER_BOX.y as any)}
                        width={iosMode ? undefined : (FILTER_BOX.w as any)}
                        height={iosMode ? undefined : (FILTER_BOX.h as any)}
                        filterUnits={iosMode ? "objectBoundingBox" : "userSpaceOnUse"}
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation={BLUR_STD_DEV} edgeMode="duplicate" />
                    </filter>
                </defs>

                {iosMode ? (
                    <g clipPath={`url(#${idClip})`}>
                        <rect
                            x={-50}
                            y={-40}
                            width={300}
                            height={240}
                            fill={`url(#${idGrad})`}
                            filter={`url(#${idBlur})`}
                            opacity={active && !reduced ? 1 : 0}
                        />
                        <use href={`#${idShape}`} fill={tint} opacity="0.25" filter={`url(#${idBlur})`} />
                    </g>
                ) : (
                    <g clipPath={`url(#${idClip})`} filter={`url(#${idBlur})`}>
                        <rect
                            x={-50}
                            y={-40}
                            width={300}
                            height={240}
                            fill={`url(#${idGrad})`}
                            opacity={active && !reduced ? 1 : 0}
                        />
                        <use href={`#${idShape}`} fill={tint} opacity="0.25" />
                    </g>
                )}

                {shapeEl.tag === "path"
                    ? <path {...(shapeEl.props as any)} {...baseStroke} />
                    : <polygon {...(shapeEl.props as any)} {...(baseStroke as any)} />}
            </motion.svg>
        </div>
    );
}

/* =========================================================
   ServiceCard — allumage retardé 300ms sur mobile + glow synchro
   Props: { s, i }  avec s = SERVICES[i]
   ========================================================= */

// Petit hook utilitaire: retarde "active" sur mobile
function useMobileDelay(active: boolean, delayMs: number, enabled: boolean) {
    const [delayed, setDelayed] = React.useState(active && !enabled ? active : false);

    React.useEffect(() => {
        if (!enabled) {
            setDelayed(active);
            return;
        }
        let t: number | null = null;
        if (active) {
            t = window.setTimeout(() => setDelayed(true), delayMs);
        } else {
            setDelayed(false);
        }
        return () => {
            if (t) window.clearTimeout(t);
        };
    }, [active, delayMs, enabled]);

    return enabled ? delayed : active;
}

function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { margin: "-12% 0% -12% 0%", amount: 0.35 });

    const [hovered, setHovered] = React.useState(false);
    const isTouch = useIsTouchDevice();
    const reduced = usePrefersReducedMotion();

    // état brut: scroll (mobile) ou hover (desktop)
    const neonActiveRaw = isTouch ? inView : hovered;
    // retard 300ms sur mobile pour l'allumage
    const neonActive = useMobileDelay(neonActiveRaw, 300, isTouch);

    const headingId = `svc-${s.k}-title`;

    return (
        <article
            ref={ref}
            onMouseEnter={() => !isTouch && setHovered(true)}
            onMouseLeave={() => !isTouch && setHovered(false)}
            onFocus={() => !isTouch && setHovered(true)}
            onBlur={() => !isTouch && setHovered(false)}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0"
            style={{ contain: "layout style paint" }}
            role="article"
            aria-labelledby={headingId}
        >
            {/* Forme décorative lumineuse */}
            <DecoShape
                shape={s.theme.shape as ShapeKey}
                color={s.theme.color}
                tint={s.theme.tint}
                active={neonActive}
                sizePct={32}
            />

            {/* Liseré/ombre externe synchronisé sur l'allumage différé */}
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
                className="relative z-10 p-6 sm:p-7 transform-gpu"
                initial={{ opacity: 0.92, scale: 0.985 }}
                animate={inView ? { opacity: 1, scale: 1.0 } : { opacity: 0.92, scale: 0.985 }}
                transition={
                    reduced
                        ? { duration: 0 }
                        : {
                            type: "tween",
                            duration: inView ? 0.35 : 0.45,
                            ease: [0.22, 1, 0.36, 1],
                            // +300ms sur mobile pour s’aligner avec la diffusion lumineuse
                            delay: (isTouch ? 0.3 : 0) + 0.03 * i,
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
                <h3 id={headingId} className="mt-1 text-base sm:text-lg font-medium text-white/90">
                    {s.title}
                </h3>
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
        <section id="services" role="region" aria-labelledby="services-title" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
                    <h2 id="services-title" className="text-xl sm:text-2xl font-semibold text-white">Nos services</h2>
                </div>
                <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                    {SERVICES.map((s, i) => <ServiceCard key={s.k} s={s} i={i} />)}
                </div>
            </div>
        </section>
    );
}

/* ================= Works ================= */
type GlowColor = "yellow" | "red" | "green";
const glowHex: Record<GlowColor, string> = { yellow: "#9b6bff", red: "#9b6bff", green: "#9b6bff" };

type OverlayWords = { primary: string; secondary?: string[] };

function ProjectCard({
    title,
    subtitle,
    href,
    color,
    overlay,
}: {
    title: string;
    subtitle: string;
    href: string;
    color: GlowColor;
    overlay?: OverlayWords; // ← nouveau
}) {
    const isTouch = useIsTouchDevice();
    const [hovered, setHovered] = React.useState(false);
    const ref = React.useRef<HTMLAnchorElement | null>(null);
    const inView = useInView(ref, { margin: "-15% 0% -15% 0%", amount: 0.25 });

    const active = isTouch ? inView : hovered;
    const c = glowHex[color];

    return (
        <div className="relative isolate h-full">
            {!isTouch && (
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                        borderRadius: "0.9rem",
                        boxShadow: `0 0 8px 2px ${c}33, 0 0 20px 6px ${c}29, 0 0 36px 12px ${c}20`,
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
                className="relative block overflow-hidden rounded-2xl p-4 sm:p-5 transition-transform h-full
                   bg-gradient-to-b from-[rgba(22,24,31,0.45)] to-[rgba(12,14,18,0.42)]
                   backdrop-blur border border-white/15
                   flex flex-col focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label={`${title} – en savoir plus`}
                style={{ transition: "border-color 300ms ease, transform 300ms ease, outline-color 300ms ease" }}
            >
                {/* Zone image + overlay typographique */}
                <div
                    className="relative mb-2 sm:mb-3 h-28 sm:h-32 w-full overflow-hidden rounded-lg"
                    style={{ background: "linear-gradient(180deg, rgba(40,43,53,0.25) 0%, rgba(22,24,31,0.25) 100%)" }}
                >
                    {overlay && (
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.span
                                    className="font-semibold uppercase select-none bg-clip-text text-transparent
                     bg-[linear-gradient(120deg,#e0e7ff_0%,#a78bfa_35%,#22d3ee_65%,#e879f9_100%)] tracking-[0.22em]"
                                    style={{
                                        fontSize: "clamp(28px, 9vw, 48px)",
                                        letterSpacing: "0.2em",
                                        opacity: 0.45,            // ← moins opaque
                                        filter: "saturate(1.1)",  // léger boost pour le gradient
                                    }}
                                    animate={{ opacity: [0.38, 0.5, 0.45] }} // subtil vivant
                                    transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                                >
                                    {overlay.primary}
                                </motion.span>
                            </div>
                        </div>
                    )}
                </div>

                <h3 className="text-sm sm:text-base font-medium text-white/85">{title}</h3>
                <p className="mt-1 text-[13px] text-zinc-300">{subtitle}</p>
                <div className="mt-auto pt-3 flex items-center justify-end">
                    <span className="text-[10px] text-zinc-400">→</span>
                </div>
            </a>
        </div>
    );
}
function WorksSection() {
    const goHomeAndScroll = useGoHomeAndScroll();
    
    const works = [
        {
            t: "Nos sites web",
            d: "Découvrez une sélection de sites modernes, pensés pour raconter et sublimer chaque univers.",
            href: "/projects/web",
            color: "yellow" as GlowColor,
            overlay: { primary: "WEB", secondary: ["APP", "DEV"] }, // ← ici
        },
        {
            t: "Nos apps métier",
            d: "Des outils internes clairs et efficaces, conçus pour simplifier le quotidien de chaque équipe. Peu importe le domaine",
            href: "/projects/apps",
            color: "red" as GlowColor,
            overlay: { primary: "APP", secondary: ["WEB", "DEV"] }, // ← ici
        },
        {
            t: "Nos programmes automatisés",
            d: "Des processus intelligents et robustes qui connectent vos outils et gagnent du temps sans compromis.",
            href: "/projects/automation",
            color: "green" as GlowColor,
            overlay: { primary: "DEV", secondary: ["WEB", "APP"] }, // ← ici
        },
    ];

    return (
        <section id="works" role="region" aria-labelledby="works-title" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
                    <h2 id="works-title" className="text-xl sm:text-2xl font-semibold">Nos projets</h2>
                    <a
                        href="/"
                        className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline"
                        aria-label="Nous contacter"
                        onClick={(e) => { e.preventDefault(); goHomeAndScroll("contact"); }}
                    >
                        Discuter d'un projet
                    </a>
                </div>

                <div className="grid gap-8 sm:gap-10 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
                    {works.map((w, i) => (
                        <ProjectCard
                            key={i}
                            title={w.t}
                            subtitle={w.d}
                            href={w.href}
                            color={w.color}
                            overlay={w.overlay} // ← passer l’overlay
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ================= Contact ================= */
function ContactSection() {
    return (
        <section id="contact" role="region" aria-labelledby="contact-title" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
                <h2 id="contact-title" className="text-xl sm:text-2xl font-semibold">Contact</h2>
                <p className="mt-2 text-sm sm:text-base text-zinc-300">Parlez-nous de votre projet. Réponse rapide et conseils concrets.</p>

                <form className="mt-5 sm:mt-6 grid gap-4" action="https://formsubmit.co/hello@smartflow.dev" method="POST">
                    <input type="hidden" name="_subject" value="Nouveau message SmartFlow" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="sr-only" htmlFor="c-nom">Nom</label>
                            <input id="c-nom" name="nom" placeholder="Votre nom" autoComplete="name" autoCapitalize="words"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full" required />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="c-email">Email</label>
                            <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Votre email"
                                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full" required />
                        </div>
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="c-message">Message</label>
                        <textarea id="c-message" name="message" placeholder="Décrivez brièvement votre besoin…" autoCorrect="on" autoCapitalize="sentences"
                            className="min-h-[140px] rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full" required />
                    </div>

                    <div className="flex items-stretch sm:items-center">
                        <button type="submit" className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto" aria-label="Envoyer le message">
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

/* ================= APP ================= */
export default function App() {
    const location = useLocation();

    // Title + scroll restoration
    useEffect(() => {
        // simple scroll restoration on route change
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        // title
        const titles: Record<string, string> = {
            "/projects/web": "Sites web — SmartFlow",
            "/projects/apps": "SmartFlow — Apps métier",
            "/projects/automation": "SmartFlow — Programmes automatisés",
            "/mentions": "Mentions légales — SmartFlow",
        };
        document.title = titles[location.pathname] ?? "SmartFlow";
    }, [location.pathname]);

    return (
        <Routes>
            <Route path="/projects/web" element={
                <Suspense fallback={<main className="min-h-screen text-white"><TopNav /><section className="px-6 py-16 max-w-5xl mx-auto">Chargement…</section></main>}>
                    <ProjectsWeb />
                </Suspense>
            } />
            <Route path="/projects/apps" element={
                <Suspense fallback={<main className="min-h-screen text-white"><TopNav /><section className="px-6 py-16 max-w-5xl mx-auto">Chargement…</section></main>}>
                    <ProjectsApps />
                </Suspense>
            } />
            <Route path="/projects/automation" element={
                <Suspense fallback={<main className="min-h-screen text-white"><TopNav /><section className="px-6 py-16 max-w-5xl mx-auto">Chargement…</section></main>}>
                    <ProjectsAutomation />
                </Suspense>
            } />
            <Route path="/mentions" element={
                <Suspense fallback={<main className="min-h-screen text-white"><TopNav /><section className="px-6 py-16 max-w-5xl mx-auto">Chargement…</section></main>}>
                    <Mentions />
                </Suspense>
            } />
            <Route path="/" element={
                <main className="relative min-h-screen text-white antialiased [text-size-adjust:100%] selection:bg-white/20">
                    <SiteBackground />
                    <TopNav />
                    <HeroSection />
                    <DevScrollCodeSection />
                    <ServicesSection />
                    <WorksSection />
                    <ContactSection />
                    <Footer />
                </main>
            } />
        </Routes>
    );
}
