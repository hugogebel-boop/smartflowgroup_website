import React, { useEffect, useState, useCallback } from "react";

type CookieCategories = {
    necessary: boolean;
    functional: boolean;
    analytics: boolean;
    marketing: boolean;
};

export type CookieConsent = {
    version: string;
    categories: CookieCategories;
    timestampIso: string;
};

const STORAGE_KEY = "sf_cookie_consent_v1";
const COOKIE_POLICY_VERSION = "1.0"; // Aligné avec "Politique de Cookies – SmartFlow Group – Version 1.0"

function loadStoredConsent(): CookieConsent | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as CookieConsent;
        if (!parsed || typeof parsed !== "object") return null;
        if (parsed.version !== COOKIE_POLICY_VERSION) return null;
        if (!parsed.categories) return null;
        return parsed;
    } catch {
        return null;
    }
}

export function saveCookieConsent(consent: CookieConsent) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
        // Hook simple pour brancher Google Analytics / Meta Pixel plus tard si besoin
        const ev = new CustomEvent<CookieConsent>("sf-cookie-consent", { detail: consent });
        window.dispatchEvent(ev);
    } catch {
        // silencieux : on ne bloque pas l'UX si le stockage échoue
    }
}

export function getCurrentCookieConsent(): CookieConsent | null {
    return loadStoredConsent();
}

declare global {
    interface Window {
        sfOpenCookiePreferences?: () => void;
    }
}

const defaultCategories: CookieCategories = {
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
};

function createConsent(categories: CookieCategories): CookieConsent {
    return {
        version: COOKIE_POLICY_VERSION,
        categories: {
            necessary: true, // toujours vrai, conformément à la politique
            functional: !!categories.functional,
            analytics: !!categories.analytics,
            marketing: !!categories.marketing,
        },
        timestampIso: new Date().toISOString(),
    };
}

export const CookieBanner: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [categories, setCategories] = useState<CookieCategories>(defaultCategories);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = loadStoredConsent();
        if (!stored) {
            setVisible(true);
            setCategories(defaultCategories);
        }
        setMounted(true);
    }, []);

    const close = useCallback(() => {
        setVisible(false);
        setShowDetails(false);
    }, []);

    const persistAndClose = useCallback((next: CookieCategories) => {
        const consent = createConsent(next);
        saveCookieConsent(consent);
        close();
    }, [close]);

    const handleAcceptAll = () => {
        const allOn: CookieCategories = {
            necessary: true,
            functional: true,
            analytics: true,
            marketing: true,
        };
        setCategories(allOn);
        persistAndClose(allOn);
    };

    const handleRejectNonEssential = () => {
        const onlyNecessary: CookieCategories = {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false,
        };
        setCategories(onlyNecessary);
        persistAndClose(onlyNecessary);
    };

    const handleSaveChoices = () => {
        persistAndClose(categories);
    };

    // Expose un petit hook global pour rouvrir les préférences (lien depuis le footer, etc.)
    useEffect(() => {
        if (typeof window === "undefined") return;
        const openFn = () => {
            setVisible(true);
            setShowDetails(true);
        };
        window.sfOpenCookiePreferences = openFn;
        return () => {
            if (window.sfOpenCookiePreferences === openFn) {
                window.sfOpenCookiePreferences = undefined;
            }
        };
    }, []);

    if (!mounted || !visible) return null;

    return (
        <div
            className="fixed inset-x-0 bottom-0 z-[60] px-3 sm:px-4 pb-4 sm:pb-6 pointer-events-none"
            aria-live="polite"
        >
            {/* Halo très discret pour rappeler le style du site sans surcharger */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-8 bottom-4 mx-auto max-w-3xl -z-10 h-24 rounded-[28px]
                           bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.20),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(56,189,248,0.18),transparent_55%)]
                           opacity-60 blur-3xl"
            />

            <div
                className="
                    mx-auto max-w-3xl pointer-events-auto relative
                    rounded-2xl border border-white/10
                    bg-[#05050B]/95
                    supports-[backdrop-filter]:bg-[#05050B]/82
                    supports-[backdrop-filter]:backdrop-blur-xl
                    shadow-[0_16px_50px_rgba(0,0,0,0.8)]
                    text-zinc-100
                    overflow-hidden
                "
                role="dialog"
                aria-modal="false"
                aria-labelledby="cookie-banner-title"
            >
                <div className="relative px-4 sm:px-6 pt-3.5 sm:pt-4 pb-3 border-b border-white/8">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="mt-0.5 hidden sm:flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                            <img
                                src="/assets/icon/SmartFlow.png"
                                alt="SmartFlow"
                                className="h-5 w-5 object-contain"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 mb-0.5">
                                SmartFlow
                            </p>
                            <h2
                                id="cookie-banner-title"
                                className="text-sm sm:text-[15px] font-medium text-white"
                            >
                                Vos préférences de cookies
                            </h2>
                            <p className="mt-1 text-[11px] sm:text-[13px] text-zinc-300 leading-relaxed max-w-2xl">
                                Nous utilisons des cookies et technologies similaires pour assurer le bon
                                fonctionnement du site, mesurer son audience et, si vous l&apos;acceptez,
                                améliorer certains contenus. Vous pouvez refuser les cookies non essentiels
                                ou personnaliser vos choix.
                            </p>
                            <p className="mt-1.5 text-[11px] text-zinc-400">
                                Pour plus de détails, consultez notre{" "}
                                <a
                                    href="/confidentialite"
                                    className="underline underline-offset-2 hover:text-white"
                                >
                                    Politique de confidentialité &amp; cookies
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Vue détaillée : catégories par finalité */}
                {showDetails && (
                    <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-white/8">
                        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                            <CategoryRow
                                title="Cookies strictement nécessaires"
                                description="Indispensables pour la sécurité, la gestion des sessions et le fonctionnement basique du site. Activés en permanence et non soumis au consentement."
                                checked
                                locked
                            />
                            <CategoryRow
                                title="Cookies fonctionnels"
                                description="Mémorisent vos préférences (par exemple langue, affichages, formulaires) et améliorent le confort de navigation."
                                checked={categories.functional}
                                onToggle={() =>
                                    setCategories((c) => ({ ...c, functional: !c.functional }))
                                }
                            />
                            <CategoryRow
                                title="Cookies analytiques et statistiques"
                                description="Mesurent l’audience, les performances et les interactions afin d’optimiser le contenu du site."
                                checked={categories.analytics}
                                onToggle={() =>
                                    setCategories((c) => ({ ...c, analytics: !c.analytics }))
                                }
                            />
                            <CategoryRow
                                title="Cookies marketing & reciblage"
                                description="Permettent la personnalisation publicitaire, la mesure des campagnes et le reciblage (par ex. Google Ads, Meta, LinkedIn)."
                                checked={categories.marketing}
                                onToggle={() =>
                                    setCategories((c) => ({ ...c, marketing: !c.marketing }))
                                }
                            />
                        </div>
                        <p className="mt-3 text-[11px] text-zinc-500">
                            Certaines technologies similaires (pixels, scripts de performance, LocalStorage, etc.)
                            peuvent être activées ou non en fonction des catégories sélectionnées.
                        </p>
                    </div>
                )}

                <div className="relative px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-wrap gap-2 order-2 sm:order-1">
                        <button
                            type="button"
                            onClick={handleRejectNonEssential}
                            className="
                                inline-flex items-center justify-center rounded-full
                                border border-white/14 bg-white/[0.03]
                                px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px]
                                text-zinc-100 hover:bg-white/[0.06] hover:border-white/25
                                transition-colors
                            "
                        >
                            Refuser les cookies non essentiels
                        </button>
                        <button
                            type="button"
                            onClick={handleAcceptAll}
                            className="
                                inline-flex items-center justify-center rounded-full
                                border border-white/16 bg-white text-[11px] sm:text-[12px]
                                px-3 sm:px-4 py-1.5 font-medium text-black
                                shadow-[0_8px_24px_rgba(0,0,0,0.55)]
                                hover:bg-zinc-100 hover:border-white/30 transition-colors
                            "
                        >
                            Accepter tout
                        </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 order-1 sm:order-2">
                        <button
                            type="button"
                            onClick={() => setShowDetails((v) => !v)}
                            className="text-[11px] sm:text-xs text-zinc-300 hover:text-white"
                        >
                            {showDetails ? "Masquer les détails" : "Personnaliser mes choix"}
                        </button>

                        {showDetails && (
                            <button
                                type="button"
                                onClick={handleSaveChoices}
                                className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/16 px-3 py-1.5 text-[11px] text-zinc-100 hover:bg-white/5 transition-colors"
                            >
                                Enregistrer mes choix
                            </button>
                        )}
                    </div>
                </div>

                {/* Bouton mobile dédié pour enregistrer les choix en vue détaillée */}
                {showDetails && (
                    <div className="px-4 sm:hidden pb-3">
                        <button
                            type="button"
                            onClick={handleSaveChoices}
                            className="w-full inline-flex items-center justify-center rounded-full border border-white/16 px-3.5 py-1.5 text-xs text-zinc-100 hover:bg-white/5 transition-colors"
                        >
                            Enregistrer mes choix
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

interface CategoryRowProps {
    title: string;
    description: string;
    checked: boolean;
    locked?: boolean;
    onToggle?: () => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ title, description, checked, locked, onToggle }) => {
    const id = React.useId();
    const isOn = !!checked;

    return (
        <div className="flex gap-3 rounded-xl bg-white/[0.03] border border-white/8 px-3 py-2">
            <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white">{title}</p>
                <p className="mt-1 text-[11px] text-zinc-300 leading-relaxed">{description}</p>
            </div>
            <div className="flex items-start pt-0.5">
                <button
                    type="button"
                    id={id}
                    role="switch"
                    aria-checked={isOn}
                    aria-label={title}
                    disabled={locked}
                    onClick={locked ? undefined : onToggle}
                    className={`
                        sf-toggle relative inline-flex h-[16px] w-[40px] min-h-0 p-0 flex-shrink-0 cursor-pointer items-center rounded-full
                        border border-white/30 bg-zinc-900 transition-colors
                        ${locked ? "opacity-55 cursor-not-allowed" : "hover:border-white/40"}
                        ${isOn ? "bg-emerald-500 border-emerald-300/90 shadow-[0_0_0_1px_rgba(16,185,129,0.9)]" : "bg-zinc-900"}
                    `}
                >
                    <span
                        className={`
                            pointer-events-none inline-block h-[12px] w-[12px] rounded-full bg-white shadow-sm
                            transform transition-transform
                            ${isOn ? "translate-x-[24px]" : "translate-x-[2px]"}
                        `}
                    />
                </button>
            </div>
        </div>
    );
};


