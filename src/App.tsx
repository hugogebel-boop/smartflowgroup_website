import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";

/* =========================================================
   Helpers
   ========================================================= */
const isClient = typeof window !== "undefined";

function useIsSmallScreen(breakpoint = 768) {
    const [small, setSmall] = useState(false);
    useEffect(() => {
        if (!isClient) return;
        const onResize = () => setSmall(window.innerWidth < breakpoint);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [breakpoint]);
    return small;
}
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

/* =========================================================
   Background — “Aurora + Grain” (style vite.dev)
   ========================================================= */
function SiteBackground() {
    return (
        <>
            {/* base gradient */}
            <div className="fixed inset-0 -z-20 bg-gradient-to-b from-[#0B0B12] via-[#0B0B12] to-black" />

            {/* dot grid */}
            <div className="fixed inset-0 -z-20 opacity-[0.08] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* aurora blobs */}
            <div aria-hidden className="fixed -z-10 inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-24 h-[46rem] w-[46rem] rounded-full blur-[120px] opacity-30 bg-[conic-gradient(from_140deg_at_50%_50%,#7c3aed_0%,#22d3ee_30%,#e879f9_60%,#7c3aed_100%)]" />
                <div className="absolute -bottom-40 -right-24 h-[40rem] w-[40rem] rounded-full blur-[120px] opacity-25 bg-[radial-gradient(45%_45%_at_50%_50%,#22d3ee_0%,transparent_70%)]" />
            </div>

            {/* grain (CSS-only) */}
            <div
                aria-hidden
                className="fixed inset-0 -z-10 opacity-[0.07] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>\")",
                    backgroundSize: "160px 160px",
                }}
            />
        </>
    );
}

/* =========================================================
   HERO
   ========================================================= */
function HeroSection() {
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

                {/* gradient title like vite */}
                <h1 className="text-[30px] sm:text-5xl md:text-6xl font-semibold leading-[1.07]">
                    <span className="bg-clip-text text-transparent bg-[linear-gradient(120deg,#e0e7ff_0%,#a78bfa_35%,#22d3ee_65%,#e879f9_100%)]">
                        Design ✕ Développement
                    </span>
                    <br />
                    d’expériences numériques
                </h1>

                <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-sm sm:text-base text-zinc-300">
                    Sites, logiciels et automatisations — clairs, rapides, soignés.
                </p>

                <div className="mt-6 sm:mt-8 inline-flex w-full flex-col sm:w-auto sm:flex-row gap-3 justify-center">
                    <a
                        href="#dev"
                        className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-white hover:bg-white/15 transition w-full sm:w-auto shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                    >
                        Notre approche
                    </a>
                    <a
                        href="#services"
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto"
                    >
                        Services
                    </a>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   Mini highlighter
   ========================================================= */
function escapeHtml(src: string) {
    return src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function highlightTS(src: string) {
    let s = escapeHtml(src);
    // strings
    s = s.replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, "<span style='color:#34d399;'>$&</span>");
    // keywords
    s = s.replace(
        /\b(export|function|return|const|let|type|interface|new|async|await)\b/g,
        "<span style='color:#c4b5fd;font-weight:500;'>$&</span>"
    );
    // start & commit en rouge
    s = s.replace(/\b(start|commit)\b/g, "<span style='color:#ef4444;font-weight:700;'>$&</span>");
    // Commentaire : tout est grisé/estompé SAUF "Notre approche" en violet
    s = s.replace(
        /\/\*\s*(Notre approche)(.*?)\*\//,
        `<span style="color:#71717a;opacity:0.85;">/* <span style='color:#a78bfa;font-weight:700;'>$1</span>$2*/</span>`
    );
    // line comments
    s = s.replace(/(\/\/.*$)/gm, (full) => `<span style='color:#71717a;'>${full}</span>`);
    return s;
}

/* =========================================================
   Code content
   ========================================================= */
const APPROACH_LINES: string[] = [
    "/* Notre approche — simple et directe. */",
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
    const html = useMemo(() => highlightTS(text), [text]);
    return (
        <motion.div
            className="whitespace-pre leading-6 sm:leading-7 font-mono text-[10.5px] xs:text-[11px] sm:text-[13px] md:text-[15px] text-white"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
        >
            {/* → plus d’estompage sur le numéro : couleur pleine */}
            <span className="mr-2 sm:mr-3 text-white">{String(index + 1).padStart(2, "0")}</span>
            <span dangerouslySetInnerHTML={{ __html: html }} />
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
                <div className="ml-2 sm:ml-3 text-[10px] sm:text-xs tracking-widest uppercase text-zinc-400">
                    dev / approche.ts
                </div>
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

    let remain = budget,
        activeIdx = 0;
    for (let i = 0; i < APPROACH_LINES.length; i++) {
        if (remain <= 0) {
            activeIdx = i;
            break;
        }
        if (remain < APPROACH_LINES[i].length) {
            activeIdx = i;
            break;
        }
        remain -= APPROACH_LINES[i].length;
        activeIdx = i;
    }

    const reduced = usePrefersReducedMotion();
    if (reduced) {
        return (
            <section id="dev" className="relative w-full text-white py-12 sm:py-16 px-4">
                <div className="mx-auto w-full max-w-3xl">
                    <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-widest text-zinc-200 uppercase">
                        Notre approche
                    </span>
                    <div className="mt-4 sm:mt-6">
                        <EditorFrame>
                            {APPROACH_LINES.map((t, i) => (
                                <CodeLine key={i} text={t} index={i} active={false} />
                            ))}
                        </EditorFrame>
                        <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-zinc-400">Du concept au code, chaque détail compte.</p>
                    </div>
                </div>
            </section>
        );
    }

    // Version longue distance
    return (
        <section id="dev" ref={sectionRef} className="relative min-h-[320vh] sm:min-h-[420vh] md:min-h-[500vh] w-full text-white">
            <div
                className="sticky top-0 z-10 flex min-h-[100svh] w-full flex-col items-center justify-center px-3 sm:px-4"
                style={{ paddingTop: "env(safe-area-inset-top)" }}
            >
                <div className="mx-auto mb-3 sm:mb-4 w-full max-w-[min(92vw,48rem)] px-1 sm:px-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-widest text-zinc-200 uppercase">
                        Notre approche
                    </span>
                </div>
                <EditorFrame>
                    {visible.map((t, i) => (
                        <CodeLine key={i} text={t} index={i} active={i === activeIdx && t.length < APPROACH_LINES[i].length} />
                    ))}
                </EditorFrame>
                <p className="mt-3 sm:mt-4 text-[11px] text-zinc-400">Du concept au code, chaque détail compte.</p>
            </div>

            {/* spacer pour étendre le scroll total */}
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
    },
    {
        k: "02",
        title: "Développement web",
        tag: "Code rapide et durable",
        kicker: "React/Next, Tailwind, TypeScript",
        desc:
            "Sites et portails performants, maintenables et élégants. Structure typée, SEO technique propre, formulaires robustes, i18n, et intégrations back-office sans friction.",
        pillars: ["SSR/SSG au besoin", "SEO & perfs (LCP/CLS)", "Auth, formulaires, i18n"],
    },
    {
        k: "03",
        title: "Applications desktop",
        tag: "Efficience au quotidien",
        kicker: ".NET, WPF, EF Core",
        desc:
            "Outils métier rapides et fiables : MVVM propre, bases solides, imports/exports Excel et vues optimisées pour le travail réel. Focus sur stabilité, ergonomie et vitesse.",
        pillars: ["MVVM testable", "SQL/EF Core, offline-first", "Import/Export Excel, reporting"],
    },
    {
        k: "04",
        title: "Automatisation",
        tag: "Gain de temps, contrôle total",
        kicker: "Excel, Power Automate, Python",
        desc:
            "On automatise ce qui vous prend du temps : connecteurs, scripts, flux approuvés. Moins d’erreurs, plus de traçabilité — des process qui roulent seuls.",
        pillars: ["Connecteurs & APIs", "Nettoyage/ETL léger", "Workflows traçables"],
    },
];

const cardVariants = {
    initial: { opacity: 0.6, scale: 0.98, filter: "brightness(0.9)" as any },
    active: { opacity: 1, scale: 1.0, filter: "brightness(1.05)" as any },
};

function ServiceCard({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { margin: "-15% 0% -15% 0%", amount: 0.5 });
    const reduced = usePrefersReducedMotion();

    return (
        <motion.article
            ref={ref}
            initial="initial"
            animate={inView ? "active" : "initial"}
            variants={cardVariants}
            transition={
                reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 220, damping: 26, mass: 0.9, delay: 0.05 * i }
            }
            whileHover={!reduced ? { y: -4, scale: 1.01, filter: "brightness(1.15)" as any } : {}}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6"
        >
            {/* glow */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(900px 220px at 50% -10%, rgba(130,80,255,0.20), transparent 55%)",
                }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.05 }}
            />

            <div className="mb-1.5 flex items-center justify-between">
                {/* → numéro sans # */}
                <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400">
                    {s.k}
                </div>
                <span className="inline-flex items-center rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-zinc-200/90">
                    {s.tag}
                </span>
            </div>

            <div className="text-xs uppercase tracking-wide text-violet-300/80">{s.kicker}</div>
            <h3 className="mt-1 text-base sm:text-lg font-medium text-white/90">{s.title}</h3>
            <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-zinc-300">{s.desc}</p>

            {s.pillars?.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                    {s.pillars.map((p, idx) => (
                        <li key={idx} className="text-[13px] sm:text-sm text-zinc-400">• {p}</li>
                    ))}
                </ul>
            )}
        </motion.article>
    );
}

function ServicesSection() {
    return (
        <section id="services" className="relative w-full text-white py-12 sm:py-16">
            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">Nos services</h2>
                    <span className="text-xs text-zinc-500">essentiel et structuré</span>
                </div>

                {/* → 2 colonnes dès sm et on garde 2 à lg */}
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
   Works / Contact / Footer
   ========================================================= */
function WorksSection() {
    const works = [
        { t: "Site vitrine premium", d: "Next.js, Tailwind, Motion", href: "#", year: "2025" },
        { t: "Portail métier", d: "React, TypeScript, Auth", href: "#", year: "2025" },
        { t: "App desktop labo", d: ".NET, WPF, EF Core", href: "#", year: "2024" },
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
                <div className="grid gap-4 sm:gap-5 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3">
                    {works.map((w, i) => (
                        <a
                            key={i}
                            href={w.href}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 hover:border-violet-400/30 transition"
                        >
                            <div className="mb-3 sm:mb-4 h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-800/60 to-zinc-900/60" />
                            <div className="flex items-center justify-between">
                                <h3 className="text-base sm:text-lg font-medium text-white/90 group-hover:text-white">{w.t}</h3>
                                <span className="text-[10px] sm:text-[11px] text-zinc-400">{w.year}</span>
                            </div>
                            <p className="mt-1 text-sm text-zinc-300">{w.d}</p>
                        </a>
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
                <p className="mt-2 text-sm sm:text-base text-zinc-300">Parlez-nous de votre projet. Réponse rapide et conseils concrets.</p>
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
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <button type="submit" className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm text-white hover:bg-white/15 w-full sm:w-auto">
                            Envoyer
                        </button>
                        <a href="mailto:hello@smartflow.dev" className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline text-center">
                            Ou écrivez-nous directement
                        </a>
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
