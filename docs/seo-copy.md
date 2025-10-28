# Contenu SEO prêt à intégrer

## Paragraphe SEO pour la Home (sous le hero)

**Emplacement :** Après le paragraphe "Sites, logiciels et automatisations pensés pour vous simplifier la vie."

**Code JSX :**
```jsx
{/* Paragraphe SEO pour mots-clés cibles */}
<div className="mx-auto mt-6 sm:mt-8 max-w-4xl px-4 sm:px-6">
    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed text-center">
        Spécialisés dans le <strong>développement web et logiciel sur mesure en Suisse (Lausanne, Genève)</strong>, 
        nous concevons des <strong>applications métier et automatisation de processus</strong> adaptées aux besoins 
        des PME suisses. Notre expertise en <strong>logiciel informatique pour PME</strong> couvre React, Next.js, 
        .NET/WPF et Python, avec un accompagnement personnalisé en Suisse Romande.
    </p>
</div>
```

## Enrichissement des Services (dans src/App.tsx)

**Service 1 - Design & identité digitale :**
```jsx
desc: "Nous concevons des interfaces et des identités sobres, lisibles et intemporelles. Chaque élément visuel est pensé pour renforcer votre image et guider vos utilisateurs avec clarté. Spécialisés dans l'identité visuelle pour PME suisses, nous adaptons nos créations aux codes culturels de Suisse Romande.",
```

**Service 2 - Sites web :**
```jsx
desc: "Des sites élégants et réactifs, construits pour durer. Du code propre, des transitions fluides et une attention particulière portée à l'expérience utilisateur ainsi qu'au contenu. Développement web moderne pour entreprises suisses avec expertise React/Next.js et optimisation SEO locale.",
```

**Service 3 - Applications métier :**
```jsx
desc: "Des outils internes conçus sur mesure pour améliorer vos processus quotidiens. Architecture stable, interfaces claires et fiabilité sur le long terme. Applications métier .NET/WPF spécialisées pour PME suisses avec support technique local et formation utilisateurs.",
```

**Service 4 - Outils d'automatisation :**
```jsx
desc: "Nous mettons en place des scripts et automatisations fiables pour connecter vos outils et structurer vos données. Des processus stables, qui tournent seuls et restent sous contrôle. Automatisation Python/PowerShell pour entreprises suisses avec documentation complète et maintenance à distance.",
```

## Page "Développement logiciel" complète

**Fichier :** `src/projects/DeveloppementLogiciel.tsx`

```tsx
import React, { useEffect } from "react";
import { SiteBackground, TopNav, Footer } from "../layout";

export default function DeveloppementLogiciel() {
    useEffect(() => {
        // Configuration SEO à ajouter dans seo.ts
        const seoConfig = {
            title: "Développement de logiciel sur mesure en Suisse | SmartFlow",
            description: "Développement de logiciel informatique sur mesure pour PME suisses. Applications métier .NET/WPF, automatisation Python, solutions personnalisées à Lausanne et Genève.",
            keywords: "développement logiciel sur mesure, logiciel informatique PME, application métier Suisse, développement logiciel Lausanne, Genève, .NET WPF, Python automatisation",
            canonical: "https://www.smartflowgroup.ch/developpement-logiciel"
        };
    }, []);

    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            {/* Hero section */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
                    Développement de <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-sky-300 bg-clip-text text-transparent">logiciel sur mesure</span> en Suisse
                </h1>
                
                <p className="mt-6 text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-3xl">
                    Des <strong>logiciels informatiques personnalisés</strong> pour PME suisses. 
                    Applications métier .NET/WPF, automatisation Python, solutions sur mesure 
                    à Lausanne, Genève et en Suisse Romande.
                </p>
            </section>

            {/* Pourquoi un logiciel interne ? */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Pourquoi choisir un logiciel sur mesure ?</h2>
                
                <div className="space-y-6 text-zinc-300">
                    <p className="text-base leading-relaxed">
                        Contrairement aux solutions SaaS génériques, un <strong>logiciel sur mesure</strong> 
                        s'adapte parfaitement à vos processus métier existants. En Suisse, les PME ont 
                        des besoins spécifiques que les logiciels standards ne peuvent pas satisfaire.
                    </p>
                    
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                            <div>
                                <strong>Adaptation parfaite :</strong> Le logiciel épouse vos processus, pas l'inverse
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                            <div>
                                <strong>Contrôle total :</strong> Vos données restent sur vos serveurs, conformité RGPD garantie
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                            <div>
                                <strong>Évolutivité :</strong> Ajout de fonctionnalités selon vos besoins croissants
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                            <div>
                                <strong>ROI mesurable :</strong> Gain de temps et réduction d'erreurs chiffrables
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Nos technologies */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Technologies et expertise</h2>
                
                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-emerald-300">Applications desktop (.NET/WPF)</h3>
                        <p className="text-zinc-300 leading-relaxed">
                            Développement d'applications Windows robustes avec interface moderne. 
                            Intégration base de données, rapports PDF/Excel, architecture modulaire.
                        </p>
                        <ul className="text-sm text-zinc-400 space-y-1">
                            <li>• .NET 8, WPF, Entity Framework Core</li>
                            <li>• SQL Server, PostgreSQL</li>
                            <li>• Architecture MVVM, tests unitaires</li>
                        </ul>
                    </div>
                    
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-cyan-300">Automatisation Python</h3>
                        <p className="text-zinc-300 leading-relaxed">
                            Scripts d'automatisation pour connecter vos outils existants. 
                            Traitement de données, intégrations API, workflows automatisés.
                        </p>
                        <ul className="text-sm text-zinc-400 space-y-1">
                            <li>• Python, pandas, requests</li>
                            <li>• Automatisation Excel, e-mails</li>
                            <li>• APIs REST, webhooks</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Exemples concrets */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Exemples de réalisations</h2>
                
                <div className="space-y-8">
                    <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                        <h3 className="text-lg font-semibold text-emerald-300 mb-3">LabApp - Gestion de laboratoire</h3>
                        <p className="text-zinc-300 leading-relaxed">
                            Application WPF pour planifier les essais, gérer les échantillons et générer 
                            des rapports automatisés. <strong>Gain de temps : 40%</strong> sur la gestion administrative.
                        </p>
                    </div>
                    
                    <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                        <h3 className="text-lg font-semibold text-cyan-300 mb-3">ComptaApp - Automatisation comptable</h3>
                        <p className="text-zinc-300 leading-relaxed">
                            Script Python pour scanner et distribuer automatiquement les fiches de salaire. 
                            <strong>Élimination des erreurs</strong> de distribution et gain de 2h/semaine.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Questions fréquentes</h2>
                
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Combien coûte un logiciel sur mesure ?</h3>
                        <p className="text-zinc-300 leading-relaxed">
                            Le coût dépend de la complexité et des fonctionnalités. Pour une PME suisse, 
                            comptez entre 15'000 et 50'000 CHF pour une application métier complète. 
                            Nous proposons des devis détaillés sans engagement.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Quelle est la durée de développement ?</h3>
                        <p className="text-zinc-300 leading-relaxed">
                            De 2 à 6 mois selon la complexité. Nous livrons par étapes avec des versions 
                            fonctionnelles pour valider l'évolution du projet.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Maintenance et support inclus ?</h3>
                        <p className="text-zinc-300 leading-relaxed">
                            Oui, nous proposons des contrats de maintenance avec support technique, 
                            mises à jour de sécurité et évolutions mineures incluses.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
                <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold mb-4">Prêt à développer votre logiciel sur mesure ?</h2>
                    <p className="text-zinc-300 mb-6">
                        Discutons de votre projet et trouvons la solution technique adaptée à vos besoins.
                    </p>
                    <a 
                        href="mailto:contact@smartflowgroup.ch"
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
                    >
                        Demander un devis gratuit
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
```

**Configuration SEO à ajouter dans `src/seo.ts` :**
```tsx
software: {
    title: "Développement de logiciel sur mesure en Suisse | SmartFlow",
    description: "Développement de logiciel informatique sur mesure pour PME suisses. Applications métier .NET/WPF, automatisation Python, solutions personnalisées à Lausanne et Genève.",
    keywords: "développement logiciel sur mesure, logiciel informatique PME, application métier Suisse, développement logiciel Lausanne, Genève, .NET WPF, Python automatisation",
    canonical: `${BASE_URL}/developpement-logiciel`,
    ogTitle: "Développement de logiciel sur mesure en Suisse | SmartFlow",
    ogDescription: "Logiciels informatiques personnalisés pour PME suisses. Applications métier .NET/WPF, automatisation Python, solutions sur mesure à Lausanne et Genève.",
    ogUrl: `${BASE_URL}/developpement-logiciel`,
}
```

**Route à ajouter dans `src/App.tsx` :**
```tsx
const DeveloppementLogiciel = React.lazy(() => import("./projects/DeveloppementLogiciel"));

// Dans seoConfigs :
"/developpement-logiciel": { ...DEFAULT_SEO, ...SEO_CONFIGS.software },

// Dans Routes :
<Route path="/developpement-logiciel" element={
    <Suspense fallback={<main className="min-h-screen text-white"><TopNav /><section className="px-6 py-16 max-w-5xl mx-auto">Chargement…</section></main>}>
        <DeveloppementLogiciel />
    </Suspense>
} />
```

## Patch d'optimisations mobiles (commenté)

**Fichier :** `src/animations-mobile-optimized.ts`

```tsx
// src/animations-mobile-optimized.ts
// Patch d'optimisations mobiles pour améliorer CWV - À activer si nécessaire

export const getMobileOptimizedBlur = (baseBlur: number, isMobile: boolean) => {
    return isMobile ? Math.min(baseBlur, 20) : baseBlur;
};

export const getMobileOptimizedOpacity = (baseOpacity: number, isMobile: boolean) => {
    return isMobile ? Math.min(baseOpacity, 0.3) : baseOpacity;
};

export const getMobileOptimizedDuration = (baseDuration: number, isMobile: boolean) => {
    return isMobile ? Math.min(baseDuration, 0.8) : baseDuration;
};

// Usage dans DecoShape (à décommenter si besoin) :
// const isMobile = typeof window !== "undefined" ? window.innerWidth < 640 : false;
// const BLUR_STD_DEV = getMobileOptimizedBlur(iosMode ? (isNarrow ? 8 : 12) : 26, isMobile);
// const opacity = getMobileOptimizedOpacity(active ? 0.22 : 0.14, isMobile);
// const duration = getMobileOptimizedDuration(1.2, isMobile);
```
