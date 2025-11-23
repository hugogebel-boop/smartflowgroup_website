import React from "react";
import { SiteBackground, TopNav, Footer } from "../layout";

export default function Conditions() {
    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            <section className="mx-auto max-w-4xl px-6 sm:px-8 py-20">
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6">
                    Conditions générales (CG)
                </h1>

                <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6">
                    {/* PRÉAMBULE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            PRÉAMBULE
                        </h2>
                        <p>
                            Les présentes Conditions Générales (ci-après « CG ») régissent
                            l’ensemble des relations contractuelles entre :
                        </p>
                        <p className="font-medium text-zinc-100">
                            SmartFlow Group
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Forme juridique : Entreprise individuelle</li>
                            <li>Siège : Lausanne (VD), Suisse</li>
                            <li>N° IDE : CHE-xxx.xxx.xxx</li>
                        </ul>
                        <p>
                            ainsi que ses marques, activités et entités opérationnelles,
                            notamment SmartFlow Web
                            (ci-après « SmartFlow »)
                            et toute personne physique ou morale recourant aux prestations de
                            SmartFlow, naviguant sur ses sites web ou utilisant ses services
                            numériques (ci-après le « Client » ou « l’Utilisateur »).
                        </p>
                        <p>
                            Les présentes CG constituent un contrat juridiquement contraignant
                            au sens des art. 1 ss CO (Code des obligations).
                            Toute commande, utilisation de services ou simple consultation du
                            site implique l’acceptation intégrale et sans réserve des
                            présentes CG.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 1 – DÉFINITIONS */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 1 – DÉFINITIONS
                        </h2>

                        <h3 className="font-semibold text-white">1.1 Prestations</h3>
                        <p>Ensemble des services fournis par SmartFlow, incluant notamment :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>création, développement et maintenance de sites internet ;</li>
                            <li>développement d’applications métier ;</li>
                            <li>automatisation de processus, scripts, intégrations API, Power Automate ;</li>
                            <li>design visuel, UI/UX, identités graphiques ;</li>
                            <li>hébergement, optimisation, SEO ;</li>
                            <li>conseil, analyse, accompagnement technique.</li>
                        </ul>

                        <h3 className="font-semibold text-white">1.2 Contrat / Mandat</h3>
                        <p>
                            Accord écrit ou électronique conclu entre SmartFlow et le Client,
                            incluant devis, offres, commandes, bons de commande, conventions de
                            prestations ou accords particuliers.
                        </p>

                        <h3 className="font-semibold text-white">1.3 Contenu</h3>
                        <p>
                            Toutes données, fichiers, documents, images, vidéos, logos, textes
                            ou informations transmises ou mises à disposition par le Client ou
                            générées par SmartFlow.
                        </p>

                        <h3 className="font-semibold text-white">1.4 Site</h3>
                        <p>
                            Les sites internet appartenant à SmartFlow, notamment smartflow.ch,
                            smartflow.group, smartflowweb.ch et toute déclinaison future.
                        </p>

                        <h3 className="font-semibold text-white">1.5 Parties</h3>
                        <p>SmartFlow et le Client, conjointement.</p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 2 – OBJET ET CHAMP D’APPLICATION */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 2 – OBJET ET CHAMP D’APPLICATION
                        </h2>

                        <h3 className="font-semibold text-white">2.1 Objet</h3>
                        <p>
                            Les présentes CG déterminent les droits et obligations respectifs
                            des Parties dans le cadre :
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>de la fourniture de prestations professionnelles par SmartFlow ;</li>
                            <li>de l’accès et de l’utilisation des sites web, outils et plateformes SmartFlow ;</li>
                            <li>de toute relation contractuelle, même implicite.</li>
                        </ul>

                        <h3 className="font-semibold text-white">2.2 Champ d&apos;application</h3>
                        <p>
                            Les présentes CG s’appliquent à toutes les prestations fournies par
                            SmartFlow, sauf stipulation contraire expresse, écrite et acceptée
                            par les deux Parties.
                        </p>

                        <h3 className="font-semibold text-white">2.3 Hiérarchie contractuelle</h3>
                        <p>En cas de contradiction, la hiérarchie suivante prévaut :</p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Contrat spécifique signé par les Parties ;</li>
                            <li>Offre ou devis validé ;</li>
                            <li>Conditions particulières ;</li>
                            <li>Présentes Conditions Générales.</li>
                        </ol>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 3 – FORMATION DU CONTRAT */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 3 – FORMATION DU CONTRAT
                        </h2>

                        <h3 className="font-semibold text-white">3.1 Offre et acceptation</h3>
                        <p>
                            Toute prestation fait l’objet d’une offre émise par SmartFlow.
                            Le contrat est réputé conclu dès :
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>validation écrite ou électronique du devis ;</li>
                            <li>paiement d’un acompte convenu ;</li>
                            <li>confirmation par e-mail ;</li>
                            <li>début d’exécution à la demande expresse du Client.</li>
                        </ul>

                        <h3 className="font-semibold text-white">3.2 Durée</h3>
                        <p>
                            Sauf disposition contraire, le contrat est conclu pour la durée
                            nécessaire à l’exécution de la mission.
                        </p>

                        <h3 className="font-semibold text-white">3.3 Modifications</h3>
                        <p>
                            Toute modification de la mission doit faire l’objet d’un accord écrit.
                            Toute demande additionnelle peut faire l’objet d’une facturation
                            séparée.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 4 – OBLIGATIONS DE SMARTFLOW */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 4 – OBLIGATIONS DE SMARTFLOW
                        </h2>

                        <h3 className="font-semibold text-white">4.1 Devoir de diligence</h3>
                        <p>
                            SmartFlow exécute ses prestations conformément aux règles de l’art,
                            avec soin, diligence et dans le respect du droit suisse.
                        </p>

                        <h3 className="font-semibold text-white">4.2 Qualité et conformité</h3>
                        <p>
                            SmartFlow met tout en œuvre pour fournir un travail professionnel,
                            conforme aux spécifications convenues contractuellement.
                        </p>

                        <h3 className="font-semibold text-white">4.3 Délais</h3>
                        <p>
                            Les délais sont donnés à titre indicatif, sauf engagement écrit de
                            délai ferme. Les retards non fautifs (force majeure, dépendances
                            externes, retard du Client) ne peuvent donner lieu à une
                            indemnisation.
                        </p>

                        <h3 className="font-semibold text-white">4.4 Sous-traitance</h3>
                        <p>
                            SmartFlow peut librement mandater des sous-traitants spécialisés,
                            en Suisse ou à l’étranger, tout en demeurant responsable de leurs
                            prestations.
                        </p>

                        <h3 className="font-semibold text-white">4.5 Confidentialité</h3>
                        <p>
                            SmartFlow garantit la confidentialité des informations transmises,
                            conformément aux articles 26 ss nLPD et aux principes RGPD
                            applicables.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 5 – OBLIGATIONS DU CLIENT */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 5 – OBLIGATIONS DU CLIENT
                        </h2>

                        <h3 className="font-semibold text-white">5.1 Collaboration active</h3>
                        <p>
                            Le Client s’engage à fournir à SmartFlow toutes informations utiles,
                            contenus, textes, images, données, ainsi que les accès aux
                            plateformes nécessaires.
                        </p>

                        <h3 className="font-semibold text-white">5.2 Exactitude des données</h3>
                        <p>
                            Le Client garantit que l’ensemble des contenus fournis sont
                            exacts, complets et licites et ne portent pas atteinte aux droits
                            de tiers (art. 28 CC, LDA, LPM).
                        </p>

                        <h3 className="font-semibold text-white">5.3 Responsabilité des accès</h3>
                        <p>
                            Le Client reste responsable de ses identifiants, comptes et accès
                            fournis à SmartFlow.
                        </p>

                        <h3 className="font-semibold text-white">5.4 Paiement</h3>
                        <p>
                            Le Client s’engage à régler l’intégralité des factures dans les
                            délais convenus.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 6 – CONDITIONS FINANCIÈRES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 6 – CONDITIONS FINANCIÈRES
                        </h2>

                        <h3 className="font-semibold text-white">6.1 Prix</h3>
                        <p>
                            Les prix sont indiqués dans les offres et devis. Sauf indication
                            contraire, ils s’entendent en francs suisses (CHF), hors TVA.
                        </p>

                        <h3 className="font-semibold text-white">6.2 Acomptes</h3>
                        <p>
                            SmartFlow peut exiger un acompte entre 20 % et 50 % pour débuter
                            le mandat.
                        </p>

                        <h3 className="font-semibold text-white">6.3 Facturation</h3>
                        <p>
                            La facturation peut intervenir à l’avancement, en fin de mission
                            ou mensuellement, selon ce qui est prévu au contrat.
                        </p>

                        <h3 className="font-semibold text-white">6.4 Retard de paiement</h3>
                        <p>
                            Après échéance, des intérêts moratoires peuvent être appliqués
                            (art. 104 CO). SmartFlow peut suspendre ses prestations jusqu’au
                            paiement intégral.
                        </p>

                        <h3 className="font-semibold text-white">6.5 Prestations supplémentaires</h3>
                        <p>
                            Toute demande hors périmètre initial est facturée au tarif horaire
                            ou forfaitaire convenu.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 7 – PROPRIÉTÉ INTELLECTUELLE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 7 – PROPRIÉTÉ INTELLECTUELLE
                        </h2>

                        <h3 className="font-semibold text-white">7.1 Créations SmartFlow</h3>
                        <p>
                            La propriété intellectuelle de toutes créations (designs, codes,
                            scripts, automations, maquettes, logos, documentation, contenus
                            techniques) reste la propriété exclusive de SmartFlow jusqu’au
                            paiement intégral du prix.
                        </p>

                        <h3 className="font-semibold text-white">7.2 Licence d’utilisation</h3>
                        <p>
                            Une fois la facture soldée, une licence d’utilisation non
                            exclusive, mondiale et illimitée est transférée au Client.
                        </p>

                        <h3 className="font-semibold text-white">7.3 Exclusions</h3>
                        <p>
                            Sont exclus du transfert : les frameworks, librairies tierces,
                            composants réutilisables et modules non développés exclusivement
                            pour le Client.
                        </p>

                        <h3 className="font-semibold text-white">7.4 Droit de citation</h3>
                        <p>
                            SmartFlow peut citer le projet comme référence (portfolio, site,
                            réseaux), sauf demande écrite contraire du Client.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 8 – RESPONSABILITÉ */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 8 – RESPONSABILITÉ
                        </h2>

                        <h3 className="font-semibold text-white">8.1 Principe</h3>
                        <p>
                            SmartFlow n’engage sa responsabilité qu’en cas de faute grave ou
                            intentionnelle (art. 100 CO).
                        </p>

                        <h3 className="font-semibold text-white">8.2 Limitation</h3>
                        <p>Sauf disposition impérative, SmartFlow n’est jamais responsable pour :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>dommages indirects ou consécutifs ;</li>
                            <li>pertes économiques, perte de données, perte de profit ;</li>
                            <li>indisponibilité du site ou d’un service tiers ;</li>
                            <li>cyberattaques externes indépendantes.</li>
                        </ul>

                        <h3 className="font-semibold text-white">8.3 Tiers et services externes</h3>
                        <p>
                            SmartFlow décline toute responsabilité concernant les hébergeurs,
                            registrar, serveurs, plateformes tierces (Microsoft, Google, API,
                            etc.), plugins, modules ou services hors de son contrôle.
                        </p>

                        <h3 className="font-semibold text-white">8.4 Obligation du Client</h3>
                        <p>
                            Le Client est responsable du contenu publié, de la légalité des
                            données et de la sécurité de ses propres systèmes.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 9 – DONNÉES PERSONNELLES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 9 – DONNÉES PERSONNELLES (RGPD / nLPD)
                        </h2>

                        <h3 className="font-semibold text-white">9.1 Base légale</h3>
                        <p>
                            SmartFlow traite les données conformément à la loi fédérale sur la
                            protection des données (nLPD, 2023) et aux principes du RGPD
                            lorsque applicable.
                        </p>

                        <h3 className="font-semibold text-white">9.2 Finalité</h3>
                        <p>Les données sont traitées pour :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>l’exécution du contrat ;</li>
                            <li>la gestion administrative ;</li>
                            <li>l’amélioration des services ;</li>
                            <li>la sécurité informatique ;</li>
                            <li>les obligations légales.</li>
                        </ul>

                        <h3 className="font-semibold text-white">9.3 Conservation</h3>
                        <p>
                            Les données ne sont conservées que le temps nécessaire à la
                            finalité du traitement.
                        </p>

                        <h3 className="font-semibold text-white">9.4 Hébergement</h3>
                        <p>
                            Les données peuvent être hébergées en Suisse ou à l’étranger,
                            dans des pays reconnus comme adéquats.
                        </p>

                        <h3 className="font-semibold text-white">9.5 Droits du Client</h3>
                        <p>
                            Le Client peut accéder à ses données, demander rectification ou
                            suppression et s’opposer à certains traitements.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 10 – DÉVELOPPEMENTS, LIVRABLES ET GARANTIES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 10 – DÉVELOPPEMENTS, LIVRABLES ET GARANTIES
                        </h2>

                        <h3 className="font-semibold text-white">10.1 Sites web et applications</h3>
                        <p>
                            Les livrables sont fournis « tels quels » après validation du
                            Client.
                        </p>

                        <h3 className="font-semibold text-white">10.2 Maintenance</h3>
                        <p>
                            La maintenance n’est incluse que si un contrat spécifique le
                            prévoit.
                        </p>

                        <h3 className="font-semibold text-white">10.3 Bugs et corrections</h3>
                        <p>
                            SmartFlow corrige les anomalies majeures imputables à son code
                            pendant une période de 30 jours après livraison, sauf si le Client
                            a modifié des éléments sans autorisation.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 11 – RÉSILIATION */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 11 – RÉSILIATION
                        </h2>

                        <h3 className="font-semibold text-white">11.1 Résiliation ordinaire</h3>
                        <p>
                            Un contrat à durée indéterminée peut être résilié avec un préavis
                            de 30 jours.
                        </p>

                        <h3 className="font-semibold text-white">11.2 Résiliation immédiate</h3>
                        <p>SmartFlow peut résilier immédiatement en cas de :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>non-paiement ;</li>
                            <li>utilisation abusive ;</li>
                            <li>violation de lois ;</li>
                            <li>défaut de collaboration grave.</li>
                        </ul>

                        <h3 className="font-semibold text-white">11.3 Effets</h3>
                        <p>
                            Toutes prestations rendues jusqu’à la date de résiliation sont dues
                            intégralement.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 12 – FORCE MAJEURE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 12 – FORCE MAJEURE
                        </h2>
                        <p>
                            SmartFlow n’est pas responsable en cas de force majeure (art. 103
                            CO), notamment : panne généralisée, cyberattaque massive,
                            catastrophe naturelle, guerre, pandémie ou décisions étatiques.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 13 – DROIT APPLICABLE ET FOR */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 13 – DROIT APPLICABLE ET FOR
                        </h2>

                        <h3 className="font-semibold text-white">13.1 Droit applicable</h3>
                        <p>
                            Le contrat est régi exclusivement par le droit suisse.
                        </p>

                        <h3 className="font-semibold text-white">13.2 For juridique</h3>
                        <p>
                            En cas de litige, le for exclusif est le tribunal compétent du
                            siège de SmartFlow, sous réserve de compétences impératives.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 14 – DISPOSITIONS FINALES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 14 – DISPOSITIONS FINALES
                        </h2>
                        <p>
                            Les présentes CG constituent l’intégralité de l’accord entre les
                            Parties. La nullité d’une clause n’entraîne pas la nullité des
                            autres. SmartFlow peut modifier les présentes CG en tout temps ;
                            la version applicable est celle en vigueur au moment de la
                            commande ou de l’utilisation des services. En cas de divergence
                            entre versions, la version française prévaut.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Liens internes SEO invisibles */}
            <nav aria-label="Navigation interne SEO" className="sr-only">
                <a href="/">Accueil</a>
                <a href="/projects/web/">Sites web</a>
                <a href="/projects/apps/">Applications métier</a>
                <a href="/projects/automation/">Programmes automatisés</a>
                <a href="/contact/">Contact</a>
                <a href="/mentions/">Mentions légales</a>
                <a href="/confidentialite/">Politique de confidentialité</a>
            </nav>
        </main>
    );
}


