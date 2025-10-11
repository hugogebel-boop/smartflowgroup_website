import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

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
        const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
        const on = () => setReduced(!!media?.matches);
        on();
        media?.addEventListener?.("change", on);
        media?.addListener?.(on);
        return () => {
            media?.removeEventListener?.("change", on);
            media?.removeListener?.(on);
        };
    }, []);
    return reduced;
}

/* -------- Background (minimal pour l’exemple) -------- */
export function SiteBackground() {
    return <div className="fixed inset-0 -z-30 bg-[#0B0B12]" />;
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

/* -------- Footer minimal si besoin -------- */
export function Footer() {
    return null;
}
