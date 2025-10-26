import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { useNavigate, useLocation, Link } from "react-router-dom";

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

/* -------- Hook pour navigation + scroll -------- */
export function useGoHomeAndScroll() {
    const navigate = useNavigate();
    const location = useLocation();

    return (targetId: string) => {
        const reduced =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const isHome = location.pathname === "/";
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

        navigate("/");
        let t = 0, max = 40;
        const tick = () => { t++; if (scrollToTarget() || t >= max) return; requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
    };
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

/* -------- Background (identique) -------- */
export function SiteBackground() {
    const reduced = usePrefersReducedMotion();

    const SPEED = 45;
    const AMP_X = 260;
    const AMP_Y = 140;
    const POWER = 1.08;
    const SAT = 1.06;
    const BRIGHT = 1.04;

    const a = (x: number) => Math.min(1, x * POWER);

    const { scrollY } = useScroll();
    const ySlow = useTransform(scrollY, [0, 800], [0, 40]);
    const yMid = useTransform(scrollY, [0, 800], [0, 80]);
    const yFast = useTransform(scrollY, [0, 800], [0, 140]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const px = useSpring(mx, { stiffness: 30, damping: 15 });
    const py = useSpring(my, { stiffness: 30, damping: 15 });

    useEffect(() => {
        if (reduced) return;
        const onMove = (e: PointerEvent) => {
            const w = window.innerWidth || 1;
            const h = window.innerHeight || 1;
            mx.set((e.clientX / w) * 2 - 1);
            my.set((e.clientY / h) * 2 - 1);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [reduced, mx, my]);

    const layerShift = (baseY: any, fx: number, fy: number) => ({
        x: reduced ? 0 : (px.get() * fx),
        y: reduced ? 0 : (typeof baseY === "number" ? baseY : (baseY as any)) + (py.get() * fy),
    });

    return (
        <>
            <div className="fixed inset-0 -z-30 bg-[#0B0B12]" />
            <div className="fixed inset-0 -z-20 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:22px_22px]" />

            <div
                className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
                style={{ filter: `saturate(${SAT}) brightness(${BRIGHT})` }}
                aria-hidden
            >
                {/* Nap 1 */}
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

                {/* Nap 2 */}
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

                {/* Nap 3 */}
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

                {/* Nap 4 */}
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

                {/* Aurora conic */}
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

            {/* Grain + Vignette */}
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
    const goHomeAndScroll = useGoHomeAndScroll();

    // état mémorisé (session) pour l’accordéon mobile
    const [mobileSubOpen, setMobileSubOpen] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return sessionStorage.getItem("sf_mobile_sub_open") === "1";
    });

    useEffect(() => {
        try {
            sessionStorage.setItem("sf_mobile_sub_open", mobileSubOpen ? "1" : "0");
        } catch { }
    }, [mobileSubOpen]);

    // ref pour scroller le sous-menu dans la vue quand on l’ouvre
    const mobileSubRef = useRef<HTMLDivElement | null>(null);

    // si le burger est ouvert ET l’accordéon aussi, on s’assure qu’il est visible
    useEffect(() => {
        if (open && mobileSubOpen && mobileSubRef.current) {
            mobileSubRef.current.scrollIntoView({
                behavior: reduced ? "auto" : "smooth",
                block: "nearest",
            });
        }
    }, [open, mobileSubOpen, reduced]);

    // 🆕 Mesure du header pour offset d’ancre précis
    const headerRef = useRef<HTMLElement | null>(null);
    useEffect(() => {
        const setOffset = () => {
            const h = headerRef.current?.offsetHeight ?? 72;
            document.documentElement.style.setProperty("--header-offset", `${h + 8}px`);
        };
        setOffset();
        window.addEventListener("resize", setOffset);
        return () => window.removeEventListener("resize", setOffset);
    }, []);

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
        goHomeAndScroll("hero");
    };

    return (
        <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50" style={{ paddingTop: "env(safe-area-inset-top)" }} aria-label="Menu principal">
            {/* Skip link a11y */}
            <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 bg-black/60 text-white px-3 py-2 rounded-md">
                Aller au contenu
            </a>

            <motion.nav
                initial={false}
                animate={{ opacity: solid ? 0.9 : 0.75, backdropFilter: "blur(10px)" }}
                whileHover={!reduced ? { opacity: 1 } : {}}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full border-b border-white/10 bg-[#0B0B12]/85 px-5 sm:px-8 py-2 sm:py-2.5 flex items-center justify-between"
            >
                <a href="/" onClick={goHero} className="text-[11px] sm:text-[12px] tracking-[0.25em] uppercase text-white/90 hover:text-white transition">
                    SmartFlow
                </a>

                {/* Desktop */}
                <div className="hidden sm:flex items-center gap-6 text-[14px] font-light">
                    <a
                        href="/"
                        onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goHomeAndScroll("dev"); }}
                        className="text-zinc-200 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md"
                    >
                        Approche
                    </a>
                    <a
                        href="/"
                        onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goHomeAndScroll("services"); }}
                        className="text-zinc-200 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md"
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
                            href="/"
                            onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goHomeAndScroll("works"); }}
                            className="text-zinc-200 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-md"
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
                            onMouseEnter={openNow}
                            onMouseLeave={() => scheduleClose(250)}
                        >
                            {/* 🆕 Grace area pour éviter la fermeture en diagonale */}
                            <div aria-hidden className="absolute -top-2 left-0 right-0 h-2" />

                            <Link to="/projects/web" className="px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition" role="menuitem">
                                Nos sites web
                            </Link>
                            <Link to="/projects/apps" className="px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition" role="menuitem">
                                Nos apps métier
                            </Link>
                            <Link to="/projects/automation" className="px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition" role="menuitem">
                                Nos programmes
                            </Link>
                        </motion.div>
                    </div>

                    <a
                        href="/"
                        onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; e.preventDefault(); goHomeAndScroll("contact"); }}
                        className="rounded-md border border-white/15 px-3 py-1.5 text-zinc-100 hover:text-white hover:border-white/25 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
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
                    <a
                        href="/"
                        onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goHomeAndScroll("dev"), 120); }}
                        className="block rounded-md px-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                        Approche
                    </a>

                    <a
                        href="/"
                        onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goHomeAndScroll("services"), 120); }}
                        className="block rounded-md px-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white"
                    >
                        Services
                    </a>

                    {/* ===== Accordéon Réalisations (mobile) ===== */}
                    <div className="rounded-md" ref={mobileSubRef}>
                        {/* Ligne entière = toggle ; le lien "Réalisations" = navigation */}
                        <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={mobileSubOpen}
                            aria-controls="mobile-sub-works"
                            onClick={() => setMobileSubOpen(v => !v)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setMobileSubOpen(v => !v);
                                }
                            }}
                            className="w-full flex items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-zinc-300 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        >
                            {/* Cliquer sur le texte = NAVIGUER (et ne pas toggler) */}
                            <a
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation(); // ← empêche le toggle
                                    setOpen(false);
                                    setTimeout(() => goHomeAndScroll("works"), 120);
                                }}
                                className="flex-1 min-w-0"
                            >
                                Réalisations
                            </a>

                            {/* Chevron (clique = toggle) */}
                            <svg
                                className={`shrink-0 transition-transform ${mobileSubOpen ? "rotate-180" : ""}`}
                                width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"
                            >
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                            </svg>
                        </div>

                        <motion.div
                            id="mobile-sub-works"
                            initial={false}
                            animate={mobileSubOpen ? "open" : "closed"}
                            variants={{ open: { height: "auto", opacity: 1 }, closed: { height: 0, opacity: 0 } }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                        >
                            <Link
                                to="/projects/web"
                                onClick={() => setOpen(false)}
                                className="block pl-8 pr-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white"
                            >
                                Nos sites web
                            </Link>
                            <Link
                                to="/projects/apps"
                                onClick={() => setOpen(false)}
                                className="block pl-8 pr-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white"
                            >
                                Nos apps métier
                            </Link>
                            <Link
                                to="/projects/automation"
                                onClick={() => setOpen(false)}
                                className="block pl-8 pr-2 py-2 text-zinc-300 hover:bg-white/5 hover:text-white"
                            >
                                Nos programmes
                            </Link>
                        </motion.div>
                    </div>

                    <a
                        href="/"
                        onClick={(e) => { e.preventDefault(); setOpen(false); setTimeout(() => goHomeAndScroll("contact"), 120); }}
                        className="block rounded-md border border-white/15 px-2 py-2 text-zinc-200 hover:text-white hover:border-white/25"
                    >
                        Contact
                    </a>
                </div>
            </motion.div>
        </header>
    );
}

/* -------- Footer -------- */
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
            <div
                aria-hidden
                className="pointer-events-none absolute -top-8 left-0 right-0 h-8 
                   bg-gradient-to-t from-[#0B0B12]/55 to-transparent
                   supports-[backdrop-filter]:from-[#0B0B12]/45"
            />

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
                            href="/"
                            onClick={(e) => { e.preventDefault(); goToHomeAndScroll("hero"); }}
                            className="hover:text-white transition"
                        >
                            Accueil
                        </a>
                        <Link to="/projects/web" className="hover:text-white transition">
                            Sites web
                        </Link>
                        <Link to="/projects/apps" className="hover:text-white transition">
                            Applications
                        </Link>
                        <Link to="/projects/automation" className="hover:text-white transition">
                            Automatisation
                        </Link>
                        <Link to="/mentions" className="hover:text-white transition">
                            Mentions légales
                        </Link>
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
