import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

/* ========== BACKGROUND GLOBAL (continu) ========== */
function SiteBackground() {
    return (
        <>
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-zinc-950 via-[#0B0B12] to-black" />
            <div className="fixed inset-0 -z-10 opacity-100 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
        </>
    );
}

/* ========== HERO (plein écran) ========== */
function HeroSection() {
    return (
        <section
            id="hero"
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden text-white"
        >
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <p className="mb-3 text-[11px] uppercase tracking-[0.25em] text-zinc-400">SmartFlow</p>
                <h1 className="text-4xl font-semibold md:text-6xl">
                    Design ✕ Développement
                    <br />
                    d’expériences numériques
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-zinc-300">
                    Sites, logiciels et automatisations — clairs, rapides, soignés.
                </p>
                <div className="mt-8 inline-flex gap-3">
                    <a
                        href="#dev"
                        className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                        Approche
                    </a>
                    <a
                        href="#services"
                        className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:text-white"
                    >
                        Services
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ========== HIGHLIGHT (sécurisé) ========== */
function escapeHtml(src: string) {
    return src.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function highlightTS(src: string) {
    let s = escapeHtml(src);
    s = s.replace(/(\"[^\"]*\"|'[^']*'|`[^`]*`)/g, "<span style='color:#34d399;'>$&</span>");
    s = s.replace(/\b(export|function|return|const|let|type|interface|new|async|await)\b/g, "<span style='color:#c4b5fd;font-weight:500;'>$&</span>");
    s = s.replace(/\b(approche|engagement)\b/g, "<span style='color:#38bdf8;font-weight:500;'>$&</span>");
    s = s.replace(/(\/\/.*$)/gm, (full) => {
        const inner = full.replace(/Notre approche/g, "<span style='color:#fb923c;font-weight:500;'>Notre approche</span>");
        return `<span style='color:#71717a;'>${inner}</span>`;
    });
    return s;
}

/* ========== CODE : NOTRE APPROCHE ========== */
const APPROACH_LINES: string[] = [
    "// Notre approche — claire, itérative, sans friction.",
    "const approche = {",
    "  écoute: 'on clarifie le besoin et le contexte',",
    "  design: 'UI/UX d’abord, protos rapides',",
    "  dev: 'implémentation propre et performante',",
    "  stack: ['Next.js','React','TS','Tailwind','.NET'],",
    "  ship: 'itérations courtes, CI/CD, doc utile',",
    "};",
    "",
    "export function engagement() {",
    "  console.log('Exigence et transparence');",
    "  return approche;",
    "}",
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

function CodeLine({ text, index, active }: { text: string; index: number; active: boolean }) {
    const html = useMemo(() => highlightTS(text), [text]);
    return (
        <motion.div
            className="whitespace-pre leading-7 font-mono text-[13px] md:text-[15px] text-white"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
        >
            <span className="select-none mr-3 text-zinc-500">{String(index + 1).padStart(2, "0")}</span>
            <span dangerouslySetInnerHTML={{ __html: html }} />
            {active && <span className="inline-block w-2 h-4 align-baseline ml-0.5 bg-zinc-200 animate-pulse" />}
        </motion.div>
    );
}

function EditorFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-3xl rounded-2xl shadow-2xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 backdrop-blur p-5 md:p-7">
            <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-400/90" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/90" />
                <span className="w-3 h-3 rounded-full bg-green-400/90" />
                <div className="ml-3 text-xs tracking-widest uppercase text-zinc-400">dev / approche.ts</div>
            </div>
            <div className="rounded-xl border border-white/5 bg-black/30 px-4 py-5 overflow-hidden">
                {children}
            </div>
            <div aria-hidden className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-500/10 via-orange-500/10 to-emerald-500/10 blur-xl" />
        </div>
    );
}

function DevScrollCodeSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const [p, setP] = useState(0);
    useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));

    const totalChars = useMemo(() => APPROACH_LINES.reduce((a, l) => a + l.length, 0), []);
    const budget = Math.round(totalChars * Math.max(0, Math.min(1, p)));
    const visible = useMemo(() => sliceByBudget(APPROACH_LINES, budget), [budget]);

    let remain = budget, activeIdx = 0;
    for (let i = 0; i < APPROACH_LINES.length; i++) {
        if (remain <= 0) { activeIdx = i; break; }
        if (remain < APPROACH_LINES[i].length) { activeIdx = i; break; }
        remain -= APPROACH_LINES[i].length; activeIdx = i;
    }

    return (
        <section id="dev" ref={sectionRef} className="relative min-h-[300vh] w-full text-white">
            <div className="sticky top-0 z-10 flex min-h-screen w-full flex-col items-center justify-center px-4">
                <div className="mx-auto mb-4 w-full max-w-3xl px-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-widest text-zinc-200 uppercase">Notre approche</span>
                </div>
                <EditorFrame>
                    {visible.map((t, i) => (
                        <CodeLine key={i} text={t} index={i} active={i === activeIdx && t.length < APPROACH_LINES[i].length} />
                    ))}
                </EditorFrame>
                <p className="mt-4 text-[11px] text-zinc-400">Du concept au code, chaque détail compte.</p>
            </div>
            <div className="h-[220vh]" />
        </section>
    );
}

/* ========== SERVICES ========== */
function ServicesSection() {
    const cards = [
        { k: "01", title: "Design & conception", bullets: ["UI/UX, identité, protos", "Design system épuré"], tag: "Interfaces claires" },
        { k: "02", title: "Développement web", bullets: ["React/Next, Tailwind, TS", "Sites vitrines & portails"], tag: "Code rapide et durable" },
        { k: "03", title: "Applications desktop", bullets: [".NET, WPF, EF Core", "Outils métier fluides"], tag: "Efficience au quotidien" },
        { k: "04", title: "Automatisation", bullets: ["Excel, Power Automate, Python", "Intégrations sur mesure"], tag: "Gain de temps, contrôle total" },
    ];

    return (
        <section id="services" className="relative w-full text-white py-16">
            <div className="relative z-10 mx-auto max-w-5xl px-6">
                <div className="mb-8 flex items-end justify-between">
                    <h2 className="text-2xl font-semibold text-white">Nos services</h2>
                    <span className="text-xs text-zinc-500">essentiel et structuré</span>
                </div>

                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {cards.map((c) => (
                        <div key={c.k} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-violet-400/30 transition">
                            <div className="mb-2 text-[11px] uppercase tracking-widest text-zinc-400">{c.k}</div>
                            <h3 className="text-lg font-medium text-white/90">{c.title}</h3>
                            <ul className="mt-3 space-y-1.5 text-sm text-zinc-300">
                                {c.bullets.map((b, i) => <li key={i} className="list-disc pl-4">{b}</li>)}
                            </ul>
                            <p className="mt-3 text-xs text-violet-300">{c.tag}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ========== NOS RÉALISATIONS (3 projets) ========== */
function WorksSection() {
    const works = [
        { t: "Site vitrine premium", d: "Next.js, Tailwind, Motion", href: "#", year: "2025" },
        { t: "Portail métier", d: "React, TypeScript, Auth", href: "#", year: "2025" },
        { t: "App desktop labo", d: ".NET, WPF, EF Core", href: "#", year: "2024" },
    ];

    return (
        <section id="works" className="relative w-full text-white py-16">
            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="mb-8 flex items-end justify-between">
                    <h2 className="text-2xl font-semibold">Nos réalisations</h2>
                    <a href="#contact" className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline">Discuter d’un projet</a>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {works.map((w, i) => (
                        <a key={i} href={w.href} className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-violet-400/30 transition">
                            <div className="mb-4 h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-zinc-800/60 to-zinc-900/60" />
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-white/90 group-hover:text-white">{w.t}</h3>
                                <span className="text-[11px] text-zinc-400">{w.year}</span>
                            </div>
                            <p className="mt-1 text-sm text-zinc-300">{w.d}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ========== CONTACT ========== */
function ContactSection() {
    return (
        <section id="contact" className="relative w-full text-white py-16">
            <div className="relative z-10 mx-auto max-w-3xl px-6">
                <h2 className="text-2xl font-semibold">Contact</h2>
                <p className="mt-2 text-zinc-300">
                    Parlez-nous de votre projet. Réponse rapide et conseils concrets.
                </p>

                <form
                    className="mt-6 grid gap-4"
                    action="mailto:hello@smartflow.dev"
                    method="post"
                    encType="text/plain"
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <input name="nom" placeholder="Votre nom" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40" required />
                        <input name="email" type="email" placeholder="Votre email" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40" required />
                    </div>
                    <textarea name="message" placeholder="Décrivez brièvement votre besoin…" className="min-h-[140px] rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40" required />
                    <div className="flex items-center gap-3">
                        <button type="submit" className="rounded-xl border border-white/15 bg-white/10 px-5 py-2.5 text-sm text-white hover:bg-white/15">
                            Envoyer
                        </button>
                        <a href="mailto:hello@smartflow.dev" className="text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline">
                            Ou écrivez-nous directement
                        </a>
                    </div>
                </form>
            </div>
        </section>
    );
}

/* ========== FOOTER ========== */
function Footer() {
    return (
        <footer className="relative w-full text-white py-10">
            <div className="relative z-10 mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
                    <div>
                        <div className="text-sm uppercase tracking-[0.25em] text-zinc-400">SmartFlow</div>
                        <p className="mt-2 text-zinc-400 text-sm">Design & Développement d’expériences numériques.</p>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <a href="#services" className="text-zinc-300 hover:text-white">Services</a>
                        <a href="#works" className="text-zinc-300 hover:text-white">Réalisations</a>
                        <a href="#contact" className="text-zinc-300 hover:text-white">Contact</a>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6 text-xs text-zinc-500">
                    © {new Date().getFullYear()} SmartFlow — Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}

/* ========== APP ========== */
export default function App() {
    return (
        <main className="relative min-h-screen text-white">
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
