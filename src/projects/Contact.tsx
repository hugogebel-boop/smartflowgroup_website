import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SiteBackground, TopNav, Footer } from "../layout";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const trackContactSuccess = React.useCallback(() => {
        if (typeof window === "undefined") return;
        const w = window as typeof window & {
            gtag?: (...args: any[]) => void;
            dataLayer?: any[];
        };

        if (typeof w.gtag === "function") {
            w.gtag("event", "contact_form_submitted", {
                event_category: "contact",
                event_label: "Contact page",
            });
        } else {
            w.dataLayer = w.dataLayer || [];
            w.dataLayer.push({ event: "contact_form_submitted" });
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const isSuccessView = location.pathname.endsWith("/success");

        if (isSuccessView) {
            const fromSubmit =
                typeof window !== "undefined" && window.sessionStorage?.getItem("contactJustSubmitted") === "1";

            if (fromSubmit) {
                setIsSuccess(true);
                trackContactSuccess();
                try {
                    window.sessionStorage?.removeItem("contactJustSubmitted");
                } catch { /* ignore */ }
            } else {
                navigate("/contact", { replace: true });
                setIsSuccess(false);
            }
        } else {
            setIsSuccess(false);
        }
    }, [location.pathname, navigate, trackContactSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formspree.io/f/xldooqek", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
                try {
                    window.sessionStorage?.setItem("contactJustSubmitted", "1");
                } catch { /* ignore */ }
                navigate("/contact/success", { replace: true });
            } else {
                const data = await response.json();
                setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (err) {
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            <section id="contact" role="region" aria-labelledby="contact-title" className="relative w-full text-white py-20">
                <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
                    <h1 id="contact-title" className="text-xl sm:text-2xl font-semibold">Contact</h1>
                    <p className="mt-2 text-sm sm:text-base text-zinc-300">Parlez-nous de votre projet. Réponse rapide et conseils concrets.</p>

                    <form ref={formRef} className="mt-5 sm:mt-6 grid gap-4" onSubmit={handleSubmit}>
                        <input type="hidden" name="_subject" value="Nouveau message SmartFlow" />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="c-nom">Nom</label>
                                <input id="c-nom" name="nom" placeholder="Votre nom" autoComplete="name" autoCapitalize="words"
                                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full" required disabled={isSubmitting} />
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="c-email">Email</label>
                                <input id="c-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Votre email"
                                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full" required disabled={isSubmitting} />
                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="c-message">Message</label>
                            <textarea id="c-message" name="message" placeholder="Décrivez brièvement votre besoin…" autoCorrect="on" autoCapitalize="sentences"
                                className="min-h-[140px] rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-violet-400/40 w-full" required disabled={isSubmitting} />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                            >
                                {error}
                            </motion.div>
                        )}

                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Message envoyé avec succès !</span>
                            </motion.div>
                        )}

                        <div className="flex items-start gap-2">
                            <input
                                id="c-consent"
                                name="consent"
                                type="checkbox"
                                required
                                disabled={isSubmitting}
                                className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-violet-400 focus:ring-2 focus:ring-violet-400/40 focus:ring-offset-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <label htmlFor="c-consent" className="text-xs sm:text-sm text-zinc-300 cursor-pointer">
                                En cochant cette case, j'accepte que mes données personnelles soient traitées par SmartFlow pour répondre à ma demande. Voir les{" "}
                                <Link to="/mentions" className="text-violet-400 hover:text-violet-300 underline">
                                    mentions légales
                                </Link>
                                .
                            </label>
                        </div>

                        <div className="flex items-stretch sm:items-center">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 hover:text-white hover:border-white/20 transition w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed" 
                                aria-label="Envoyer le message"
                            >
                                {isSubmitting ? "Envoi..." : "Envoyer"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
            
            {/* Liens internes SEO invisibles */}
            <nav aria-label="Navigation interne SEO" className="sr-only">
                <a href="/">Accueil</a>
                <a href="/projects/web/">Sites web</a>
                <a href="/projects/apps/">Applications métier</a>
                <a href="/projects/automation/">Programmes automatisés</a>
                <a href="/mentions/">Mentions légales</a>
            </nav>
        </main>
    );
}

