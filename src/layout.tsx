import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";

/* -------- Helper global -------- */
export function goToHomeAndScroll(targetId: string) {
    const reduced =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isHome = window.location.hash === "#/" || window.location.hash === "" || window.location.hash === "#";
    const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (!el) return false;
        el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
        return true;
    };

    if (isHome) {
        if (scrollToTarget()) return;
        let t = 0, max = 20;
        const tick = () => { t++; if (scrollToTarget() || t >= max) return; requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
        return;
    }

    window.location.hash = "#/";
    let t = 0, max = 40;
    const tick = () => { t++; if (scrollToTarget() || t >= max) return; requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
}

/* -------- Hooks util -------- */
export function usePrefersReducedMotion() {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (!window.matchMedia) return;

        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");

        const onChange = (ev: MediaQueryListEvent | MediaQueryList) => {
            // ev.matches pour l’event, mql.matches en fallback (Safari anciens)
            setReduced("matches" in ev ? ev.matches : mql.matches);
        };

        // Valeur initiale
        setReduced(mql.matches);

        // ✅ API moderne
        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", onChange as EventListener);
        } else {
            // 🔁 Fallback sans addListener (évite l’avertissement TS)
            (mql as any).onchange = onChange;
        }

        return () => {
            if (typeof mql.removeEventListener === "function") {
                mql.removeEventListener("change", onChange as EventListener);
            } else {
                (mql as any).onchange = null;
            }
        };
    }, []);

    return reduced;
}

/* -------- Background (minimal pour l’exemple) -------- */
export function SiteBackground() {
    const reduced = usePrefersReducedMotion();

    /* ======================== Knobs (tes paramètres) ======================== */
    const SPEED = 45;   // plus petit = plus rapide (sec A/R)
    const AMP_X = 260;  // px
    const AMP_Y = 140;  // px
    const POWER = 1.08; // 1.00–1.40 → boost d’intensité
    const SAT = 1.06; // saturation globale
    const BRIGHT = 1.04; // brightness globale

    const a = (x: number) => Math.min(1, x * POWER);

    /* ====================== Parallaxe scroll (3 vitesses) =================== */
    const { scrollY } = useScroll();
    const ySlow = useTransform(scrollY, [0, 800], [0, 40]);
    const yMid = useTransform(scrollY, [0, 800], [0, 80]);
    const yFast = useTransform(scrollY, [0, 800], [0, 140]);

    /* ============== Suivi souris subtil (print screen-friendly) ============= */
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const px = useSpring(mx, { stiffness: 30, damping: 15 }); // lissés
    const py = useSpring(my, { stiffness: 30, damping: 15 });

    useEffect(() => {
        if (reduced) return;
        const onMove = (e: PointerEvent) => {
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            mx.set((e.clientX / w) * 2 - 1); // [-1,1]
            my.set((e.clientY / h) * 2 - 1);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [reduced, mx, my]);

    // Helper: génère x/y pour une couche selon scroll + souris
    const layerShift = (baseY: any, fx: number, fy: number) => ({
        x: reduced ? 0 : (px.get() * fx),
        y: reduced ? 0 : (typeof baseY === "number" ? baseY : (baseY as any)) + (py.get() * fy),
    });

    return (
        <>
            {/* Base + Quadrillage léger */}
            <div className="fixed inset-0 -z-30 bg-[#0B0B12]" />
            <div className="fixed inset-0 -z-20 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Wrapper FX global : saturation/brightness */}
            <div
                className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
                style={{ filter: `saturate(${SAT}) brightness(${BRIGHT})` }}
                aria-hidden
            >
                {/* ==================== Nap 1 — violet/rose ==================== */}
                <motion.div style={layerShift(ySlow, 12, 8)}>
                    <motion.div
                        className="absolute left-[-15%] top-[-10%] h-[70vh] w-[70vw] rounded-[9999px]"
                        style={{
                            background: `radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,${a(0.22)}) 0%, rgba(168,85,247,${a(0.10)}) 35%, rgba(168,85,247,0) 70%)`,
                            filter: "blur(56px)",
                            mixBlendMode: "screen",
                            maskImage:
                                "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.62) 65%, rgba(0,0,0,0) 100%)",
                            WebkitMaskImage:
                                "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.62) 65%, rgba(0,0,0,0) 100%)",
                            willChange: "transform",
                        }}
                        animate={
                            reduced
                                ? {}
                                : {
                                    x: [-AMP_X, AMP_X, -AMP_X],
                                    y: [AMP_Y, -AMP_Y, AMP_Y],
                                    scale: [0.985, 1.02, 0.985],
                                }
                        }
                        transition={
                            reduced
                                ? {}
                                : {
                                    x: { duration: SPEED, ease: "easeInOut", repeat: Infinity },
                                    y: { duration: SPEED * 0.9, ease: "easeInOut", repeat: Infinity },
                                    scale: { duration: SPEED * 1.4, ease: "easeInOut", repeat: Infinity },
                                }
                        }
                    />
                </motion.div>

                {/* ==================== Nap 2 — cyan ==================== */}
                <motion.div style={layerShift(yMid, -16, 10)}>
                    <motion.div
                        className="absolute right-[-12%] top-[10%] h-[65vh] w-[60vw] rounded-[9999px]"
                        style={{
                            background: `radial-gradient(60% 60% at 50% 50%, rgba(34,211,238,${a(0.18)}) 0%, rgba(34,211,238,${a(0.085)}) 35%, rgba(34,211,238,0) 70%)`,
                            filter: "blur(54px)",
                            mixBlendMode: "screen",
                            maskImage:
                                "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0) 100%)",
                            WebkitMaskImage:
                                "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0) 100%)",
                            willChange: "transform",
                        }}
                        animate={
                            reduced
                                ? {}
                                : {
                                    x: [AMP_X * 1.2, -AMP_X * 1.2, AMP_X * 1.2],
                                    y: [-AMP_Y, AMP_Y, -AMP_Y],
                                }
                        }
                        transition={
                            reduced
                                ? {}
                                : {
                                    x: { duration: SPEED * 1.1, ease: "easeInOut", repeat: Infinity },
                                    y: { duration: SPEED * 0.95, ease: "easeInOut", repeat: Infinity },
                                }
                        }
                    />
                </motion.div>

                {/* ==================== Nap 3 — magenta (profondeur) ==================== */}
                <motion.div style={layerShift(yFast, 8, -6)}>
                    <motion.div
                        className="absolute left-[5%] bottom-[-12%] h-[60vh] w-[55vw] rounded-[9999px]"
                        style={{
                            background: `radial-gradient(60% 60% at 50% 50%, rgba(232,121,249,${a(0.14)}) 0%, rgba(232,121,249,${a(0.06)}) 35%, rgba(232,121,249,0) 70%)`,
                            filter: "blur(66px)",
                            mixBlendMode: "screen",
                            maskImage:
                                "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.58) 65%, rgba(0,0,0,0) 100%)",
                            WebkitMaskImage:
                                "radial-gradient(70% 70% at 50% 50%, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.58) 65%, rgba(0,0,0,0) 100%)",
                            willChange: "transform",
                        }}
                        animate={
                            reduced
                                ? {}
                                : {
                                    x: [-AMP_X * 0.8, AMP_X * 0.8, -AMP_X * 0.8],
                                    y: [0, AMP_Y * 0.6, 0],
                                }
                        }
                        transition={
                            reduced
                                ? {}
                                : {
                                    x: { duration: SPEED * 0.9, ease: "easeInOut", repeat: Infinity },
                                    y: { duration: SPEED * 1.2, ease: "easeInOut", repeat: Infinity },
                                }
                        }
                    />
                </motion.div>

                {/* ==================== Nap 4 — streak large (puissance) ==================== */}
                <motion.div style={layerShift(yMid, 18, 0)}>
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: `radial-gradient(80% 100% at 20% 50%, rgba(168,85,247,${a(0.05)}) 0%, rgba(56,189,248,${a(0.04)}) 30%, rgba(232,121,249,${a(0.035)}) 55%, rgba(0,0,0,0) 70%)`,
                            mixBlendMode: "screen",
                            filter: "blur(90px)",
                            willChange: "transform",
                            transform: "translateZ(0)",
                        }}
                        animate={reduced ? {} : { x: [-AMP_X * 1.4, AMP_X * 1.4, -AMP_X * 1.4] }}
                        transition={reduced ? {} : { duration: Math.max(12, SPEED * 0.6), ease: "easeInOut", repeat: Infinity }}
                    />
                </motion.div>

                {/* ==================== Aurora rotatif doux (conic) ==================== */}
                <motion.div
                    className="absolute -inset-1"
                    style={{
                        opacity: 0.32,
                        background:
                            "conic-gradient(from 200deg at 50% 50%, rgba(150,90,255,0.10), rgba(60,220,255,0.10), rgba(255,150,90,0.10), rgba(150,90,255,0.10))",
                        filter: "blur(18px)",
                        transform: "scale(1.4)",
                        animation: reduced ? undefined : "sf-rotate 28s linear infinite",
                    }}
                />
            </div>

            {/* Grain animé + Vignette */}
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
            <div className="fixed inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 220px 80px rgba(0,0,0,0.55)" }} />

            {/* Keyframes internes pour l’aurora & grain */}
            <style>{`
        @keyframes sf-rotate {
          0%   { transform: rotate(0deg) scale(1.4); }
          100% { transform: rotate(360deg) scale(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sf-rotate { animation: none !important; }
        }
      `}</style>
        </>
    );
}


/* -------- TopNav avec sous-menu Réalisations -------- */
export function TopNav() {
    const reduced = usePrefersReducedMotion();
    const { scrollY } = useScroll();
    const [solid, setSolid] = useState(false);
    const [open, setOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    // ⏳ Timer pour fermer le sous-menu avec délai
    const closeTimerRef = useRef<number | null>(null);
    const cancelClose = () => { if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; } };
    const openNow = () => { cancelClose(); setSubmenuOpen(true); };
    const scheduleClose = (ms = 250) => { cancelClose(); closeTimerRef.current = window.setTimeout(() => setSubmenuOpen(false), ms); };

    useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 20));

    useEffect(() => {
        const onResize = () => { setOpen(false); setSubmenuOpen(false); cancelClose(); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => () => cancelClose(), []); // cleanup

    const goHero = (e: React.MouseEvent) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        goToHomeAndScroll("hero");
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50" style={{ paddingTop: "env(safe-area-inset-top)" }} aria-label="Menu principal">
            <motion.nav
                initial={false}
                animate={{ opacity: solid ? 0.9 : 0.75, backdropFilter: "blur(10px)" }}
                whileHover={!reduced ? { opacity: 1 } : {}}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full border-b border-white/10 bg-[#0B0B12]/85 px-5 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between"
            >
                <a href="#/" onClick={goHero} className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-white/90 hover:text-white transition">
                    SmartFlow
                </a>

                {/* Desktop */}
                <div className="hidden sm:flex items-center gap-6 text-[14px] font-light">
                    <a
                        href="#dev"
                        onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goToHomeAndScroll("dev"); }}
                        className="text-zinc-200 hover:text-white transition"
                    >
                        Approche
                    </a>
                    <a
                        href="#services"
                        onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goToHomeAndScroll("services"); }}
                        className="text-zinc-200 hover:text-white transition"
                    >
                        Services
                    </a>

                    {/* Réalisations + sous-menu (avec délai de fermeture) */}
                    <div
                        className="relative"
                        onMouseEnter={openNow}
                        onMouseLeave={() => scheduleClose(250)}
                        onFocus={openNow}
                        onBlur={() => scheduleClose(250)}
                        onKeyDown={(e) => { if (e.key === "Escape") setSubmenuOpen(false); }}
                    >
                        <a
                            href="#works"
                            onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goToHomeAndScroll("works"); }}
                            className="text-zinc-200 hover:text-white transition"
                            aria-haspopup="true"
                            aria-expanded={submenuOpen}
                            aria-controls="submenu-realisations"
                        >
                            Réalisations
                        </a>

                        <motion.div
                            id="submenu-realisations"
                            initial={false}
                            animate={submenuOpen ? "open" : "closed"}
                            variants={{
                                open: { opacity: 1, y: 0, pointerEvents: "auto" },
                                closed: { opacity: 0, y: -8, pointerEvents: "none" },
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute left-0 mt-1.5 flex flex-col rounded-md bg-[#0B0B12]/95 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden min-w-[220px] z-50"
                            role="menu"
                            aria-label="Sous-menu Réalisations"
                            // Empêche la fermeture si on survole le panneau (hover-intent)
                            onMouseEnter={openNow}
                            onMouseLeave={() => scheduleClose(250)}
                        >
                            <a href="#/projects/web" className="px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition" role="menuitem">
                                Nos sites web
                            </a>
                            <a href="#/projects/apps" className="px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition" role="menuitem">
                                Nos apps métier
                            </a>
                            <a href="#/projects/automation" className="px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition" role="menuitem">
                                Nos programmes
                            </a>
                        </motion.div>
                    </div>

                    <a
                        href="#contact"
                        onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goToHomeAndScroll("contact"); }}
                        className="rounded-md border border-white/15 px-3 py-1.5 text-zinc-100 hover:text-white hover:border-white/25 transition"
                    >
                        Contact
                    </a>
                </div>

                {/* Burger Mobile */}
                <button
                    type="button"
                    aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={open}
                    onClick={() => { setOpen(v => !v); setSubmenuOpen(false); cancelClose(); }}
                    className="sm:hidden inline-flex items-center justify-center rounded-md border border-white/15 px-2.5 py-1.5 text-zinc-100 hover:text-white hover:border-white/25 transition"
                >
                    {!open ? (
                        <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    ) : (
                        <svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    )}
                </button>
            </motion.nav>

            {/* Drawer Mobile */}
            <motion.div
                initial={false}
                animate={open ? "open" : "closed"}
                variants={{ open: { height: "auto", opacity: 1 }, closed: { height: 0, opacity: 0 } }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="sm:hidden overflow-hidden bg-[#0B0B12]/95 backdrop-blur-md border-b border-white/10"
            >
                <div className="grid gap-1.5 p-4 text-[15px]">
                    <a href="#dev" onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goToHomeAndScroll("dev"), 120); }} className="block rounded-md px-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white">Approche</a>
                    <a href="#services" onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goToHomeAndScroll("services"), 120); }} className="block rounded-md px-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white">Services</a>
                    <a href="#works" onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goToHomeAndScroll("works"), 120); }} className="block rounded-md px-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white">Réalisations</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goToHomeAndScroll("contact"), 120); }} className="block rounded-md border border-white/15 px-2 py-2 text-zinc-200 hover:text-white hover:border-white/25">Contact</a>
                </div>
            </motion.div>
        </header>
    );
}

/* -------- Footer -------- */
/* -------- Footer (blended) -------- */
export function Footer() {
    return (
        <footer
            className="
        relative mt-24 border-t border-white/15 
        bg-[#0B0B12]/55 
        supports-[backdrop-filter]:bg-[#0B0B12]/45
        supports-[backdrop-filter]:backdrop-blur-md
        text-zinc-400
      "
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            {/* Dégradé haut → fondu dans la page */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-8 left-0 right-0 h-8 
                   bg-gradient-to-t from-[#0B0B12]/55 to-transparent
                   supports-[backdrop-filter]:from-[#0B0B12]/45"
            />

            {/* Grain très léger pour matcher ton fond */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.05]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>\")",
                    backgroundSize: "160px 160px",
                }}
            />

            <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-zinc-500/90">
                        SmartFlow
                    </p>

                    <nav className="flex flex-wrap items-center gap-4 text-sm">
                        <a
                            href="#/"
                            onClick={(e) => { e.preventDefault(); goToHomeAndScroll("hero"); }}
                            className="hover:text-white transition"
                        >
                            smartflow
                        </a>
                        <a href="#/mentions" className="hover:text-white transition">
                            mentions légales
                        </a>
                        <a href="mailto:contact@smartflowgroup.ch" className="hover:text-white transition">
                            contact@smartflowgroup.ch
                        </a>
                    </nav>
                </div>

                <div className="mt-6 text-xs text-zinc-500/80">
                    © {new Date().getFullYear()} SmartFlow. Tous droits réservés.
                </div>
            </div>
        </footer>
    );
}
