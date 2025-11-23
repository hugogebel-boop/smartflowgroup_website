import React from "react";
import { SiteBackground, TopNav, Footer } from "../layout";

export default function Privacy() {
    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            <section className="mx-auto max-w-4xl px-6 sm:px-8 py-20">
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6">Politique de confidentialité</h1>

                <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6">
                    {/* PRÉAMBULE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">PRÉAMBULE</h2>
                        <p>
                            La présente Politique de Confidentialité (ci-après : « la Politique ») régit l’ensemble des
                            traitements de données personnelles effectués par SmartFlow Group, entreprise active dans la
                            création de sites web, d’applications métier, d’outils d’automatisation et de prestations numériques.
                        </p>
                        <p>
                            En tant qu’entité soumise au droit suisse (notamment la Loi fédérale sur la protection des données – LPD,
                            en vigueur depuis le 1er septembre 2023) et, dans la mesure applicable, au Règlement général sur la
                            protection des données de l’Union européenne (RGPD), SmartFlow Group reconnaît l’importance de la
                            protection des données et s’engage à en assurer le traitement conforme, loyal, proportionné et sécurisé.
                        </p>
                        <p>
                            La Politique décrit les principes directeurs, les finalités, les droits des personnes concernées ainsi
                            que les mesures d’organisation et de sécurité mises en œuvre par SmartFlow Group.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 1 – DÉFINITIONS */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 1 – DÉFINITIONS</h2>
                        <p>Aux fins de la présente Politique :</p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>
                                « Données personnelles » : toute information se rapportant à une personne physique identifiée
                                ou identifiable au sens de la LPD et du RGPD.
                            </li>
                            <li>
                                « Traitement » : toute opération relative à des données personnelles, notamment la collecte,
                                l’enregistrement, la conservation, l’organisation, la communication, la modification,
                                l’archivage ou la suppression.
                            </li>
                            <li>
                                « Personne concernée » : toute personne physique dont les données sont traitées par SmartFlow Group,
                                notamment clients, utilisateurs de sites Internet, partenaires commerciaux ou visiteurs.
                            </li>
                            <li>
                                « Responsable du traitement » : la fonction interne désignée par SmartFlow Group, en charge de
                                la conformité des traitements de données (cf. Article 2).
                            </li>
                            <li>
                                « Sous-traitant » : toute entité tierce mandatée par SmartFlow Group pour traiter des données
                                personnelles pour son compte et selon ses instructions.
                            </li>
                            <li>
                                « Destinataires » : les personnes ou entités qui ont accès aux données personnelles, qu’il s’agisse
                                de collaborateurs internes ou de prestataires externes.
                            </li>
                            <li>
                                « Services » : l’ensemble des prestations numériques fournies par SmartFlow Group, incluant sites web,
                                applications, automatisations, intégrations techniques, hébergement et maintenance.
                            </li>
                        </ol>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 2 – RESPONSABLE DU TRAITEMENT */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 2 – RESPONSABLE DU TRAITEMENT</h2>
                        <p>
                            2.1 Le responsable du traitement au sein de SmartFlow Group est la fonction interne « Responsable de la
                            protection des données », chargée de veiller au respect de la législation suisse applicable et, dans la
                            mesure requise, des dispositions du RGPD.
                        </p>
                        <p>
                            2.2 La fonction précitée peut être contactée à l’adresse suivante :{" "}
                            <a
                                href="mailto:hugo.gebel@smartflowgroup.ch"
                                className="text-zinc-100 underline hover:text-white"
                            >
                                hugo.gebel@smartflowgroup.ch
                            </a>{" "}
                            (adresse e-mail générique servant de point de contact officiel pour toutes les questions relatives aux
                            données personnelles).
                        </p>
                        <p>
                            2.3 Aucune donnée personnelle du propriétaire ou des dirigeants de SmartFlow Group n’est publiée dans la
                            présente Politique, conformément à l’option choisie par l’entreprise, sans préjudice de l’obligation de
                            transparence sur l’entité juridique elle-même.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 3 – PRINCIPES DIRECTEURS DU TRAITEMENT */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 3 – PRINCIPES DIRECTEURS DU TRAITEMENT
                        </h2>
                        <p>SmartFlow Group applique les principes suivants, conformément à la LPD et au RGPD :</p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Licéité : les traitements reposent sur une base légale ou un consentement valable.</li>
                            <li>Finalité : les données ne sont collectées que pour des objectifs déterminés, explicites et légitimes.</li>
                            <li>Proportionnalité : seules les données nécessaires sont collectées et traitées.</li>
                            <li>Exactitude : SmartFlow Group veille à la mise à jour des données.</li>
                            <li>Sécurité : des mesures techniques et organisationnelles appropriées sont mises en place.</li>
                            <li>Transparence : les personnes concernées sont informées de manière claire.</li>
                            <li>
                                Limitation de conservation : les données ne sont conservées que pour la durée nécessaire à la finalité
                                poursuivie.
                            </li>
                        </ol>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 4 – DONNÉES COLLECTÉES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 4 – DONNÉES COLLECTÉES</h2>
                        <p>SmartFlow Group peut collecter les catégories de données suivantes :</p>

                        <h3 className="font-semibold text-white">4.1 Données fournies directement</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Nom, prénom, coordonnées professionnelles</li>
                            <li>Adresse e-mail, numéro de téléphone</li>
                            <li>Informations liées au projet, cahier des charges, documents transmis</li>
                            <li>Données contractuelles (prestations, facturation, historique des échanges)</li>
                        </ul>

                        <h3 className="font-semibold text-white">4.2 Données collectées automatiquement</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Adresse IP</li>
                            <li>Identifiants techniques du navigateur</li>
                            <li>Historique de navigation sur le site SmartFlow</li>
                            <li>Cookies nécessaires au fonctionnement, analytiques ou de performance</li>
                        </ul>

                        <h3 className="font-semibold text-white">4.3 Données issues de tiers</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Fournisseurs de services d’hébergement</li>
                            <li>Outils analytiques (par exemple : Google Analytics, Matomo, etc.)</li>
                            <li>Plateformes de paiement ou de facturation</li>
                            <li>Services d’intégration API utilisés pour les projets clients</li>
                        </ul>

                        <h3 className="font-semibold text-white">4.4 Données sensibles</h3>
                        <p>
                            SmartFlow Group ne collecte pas de données sensibles au sens du droit suisse et du RGPD, sauf obligation
                            légale expresse ou demande explicite du client, auquel cas une base légale spécifique sera fournie.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 5 – BASES LÉGALES DU TRAITEMENT */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 5 – BASES LÉGALES DU TRAITEMENT
                        </h2>
                        <p>Les traitements reposent sur :</p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>
                                L’exécution d’un contrat, lorsque les données sont nécessaires pour fournir les prestations convenues.
                            </li>
                            <li>
                                Le consentement explicite, par exemple pour les cookies non nécessaires ou la réception de newsletters.
                            </li>
                            <li>
                                L’intérêt légitime, notamment pour garantir la sécurité des systèmes, prévenir les abus et optimiser
                                les services.
                            </li>
                            <li>
                                Les obligations légales, en particulier la tenue comptable, la gestion fiscale et la documentation
                                contractuelle.
                            </li>
                        </ol>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 6 – FINALITÉS DU TRAITEMENT */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 6 – FINALITÉS DU TRAITEMENT</h2>
                        <p>Les données sont traitées pour les finalités suivantes :</p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Fourniture, gestion et exécution des prestations SmartFlow</li>
                            <li>Communication avec les clients, partenaires ou prospects</li>
                            <li>Administration technique, maintenance et mise à jour des systèmes</li>
                            <li>Facturation, gestion comptable et obligations légales</li>
                            <li>Amélioration continue des services, statistiques, optimisation de l’expérience utilisateur</li>
                            <li>Sécurité du site, détection d’abus et prévention des fraudes</li>
                            <li>Gestion des demandes adressées au responsable de la protection des données</li>
                        </ol>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 7 – SOUS-TRAITANCE ET TRANSFERTS À DES TIERS */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 7 – SOUS-TRAITANCE ET TRANSFERTS À DES TIERS
                        </h2>
                        <p>
                            7.1 SmartFlow Group peut recourir à des sous-traitants pour l’exécution de certaines prestations
                            (hébergement, outils numériques, automatisations, infrastructures cloud, outils analytiques).
                        </p>
                        <p>
                            7.2 Chaque sous-traitant agit exclusivement selon les instructions de SmartFlow Group et doit respecter
                            des obligations strictes de confidentialité et de sécurité.
                        </p>
                        <p>
                            7.3 <span className="font-semibold">Transfert hors de Suisse / UE</span> : lorsque des données sont transférées vers des pays
                            n’offrant pas un niveau de protection adéquat, SmartFlow Group applique des garanties appropriées
                            (Clauses Contractuelles Types, mécanismes reconnus par le Préposé fédéral à la protection des données – PFPDT).
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 8 – COOKIES ET TECHNOLOGIES SIMILAIRES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 8 – COOKIES ET TECHNOLOGIES SIMILAIRES
                        </h2>
                        <p>
                            8.1 Le site SmartFlow utilise des cookies nécessaires au fonctionnement et, le cas échéant, des cookies
                            analytiques ou de performance, soumis au consentement de la personne concernée.
                        </p>
                        <p>
                            8.2 Les types de cookies utilisés, leur durée de conservation et leurs finalités sont expliqués dans une
                            bannière de cookies et un gestionnaire de préférences.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 9 – DROITS DES PERSONNES CONCERNÉES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 9 – DROITS DES PERSONNES CONCERNÉES
                        </h2>
                        <p>
                            Conformément à la LPD et au RGPD, les personnes concernées disposent notamment des droits suivants :
                        </p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Droit d’accès</li>
                            <li>Droit de rectification</li>
                            <li>Droit à l’effacement (droit à l’oubli)</li>
                            <li>Droit à la limitation du traitement</li>
                            <li>Droit d’opposition</li>
                            <li>Droit à la portabilité des données</li>
                            <li>Droit de retirer son consentement à tout moment</li>
                            <li>
                                Droit d’introduire une réclamation auprès de l’autorité compétente (PFPDT ou autorité européenne).
                            </li>
                        </ol>
                        <p>Les demandes sont traitées dans un délai raisonnable, conformément au droit applicable.</p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 10 – SÉCURITÉ DES DONNÉES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 10 – SÉCURITÉ DES DONNÉES</h2>
                        <p>SmartFlow Group met en place des mesures techniques et organisationnelles destinées à protéger les données personnelles, notamment :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>chiffrement des communications (HTTPS)</li>
                            <li>segmentation des environnements</li>
                            <li>contrôle d’accès strict</li>
                            <li>politiques internes de confidentialité</li>
                            <li>stockage sécurisé des données</li>
                            <li>procédures de sauvegarde régulière</li>
                            <li>audits internes de sécurité</li>
                        </ul>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 11 – DURÉES DE CONSERVATION */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 11 – DURÉES DE CONSERVATION</h2>
                        <p>Les données sont conservées :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>pendant la durée nécessaire à la réalisation des prestations,</li>
                            <li>pendant la durée légale pour les obligations comptables et fiscales,</li>
                            <li>jusqu’au retrait du consentement pour les traitements basés sur celui-ci,</li>
                            <li>ou selon les durées prévues par la politique interne d’archivage.</li>
                        </ul>
                        <p>Lorsque les données ne sont plus nécessaires, elles sont supprimées ou anonymisées.</p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 12 – RESPONSABILITÉ */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 12 – RESPONSABILITÉ</h2>
                        <p>
                            12.1 SmartFlow Group répond des traitements effectués conformément à la LPD et au RGPD.
                        </p>
                        <p>
                            12.2 L’entreprise n’est responsable que des dommages résultant d’une violation fautive de ses obligations
                            légales ou contractuelles.
                        </p>
                        <p>12.3 Aucune responsabilité n’est engagée en cas :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>d’utilisation abusive du site ou des services,</li>
                            <li>d’accès non autorisé résultant d’une faute de l’utilisateur,</li>
                            <li>de force majeure ou d’événements impossibles à prévenir raisonnablement.</li>
                        </ul>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 13 – MODIFICATIONS DE LA POLITIQUE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 13 – MODIFICATIONS DE LA POLITIQUE
                        </h2>
                        <p>
                            SmartFlow Group peut modifier la présente Politique en tout temps, notamment en cas d’évolution légale,
                            technique ou organisationnelle. Toute modification substantielle sera signalée sur le site ou via un autre
                            moyen approprié.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 14 – DROIT APPLICABLE ET FOR */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 14 – DROIT APPLICABLE ET FOR</h2>
                        <p>
                            14.1 La présente Politique est régie exclusivement par le droit suisse, à l’exclusion de ses règles de
                            conflit de lois.
                        </p>
                        <p>
                            14.2 Le for judiciaire exclusif est au siège de SmartFlow Group, sous réserve d’un for impératif prévu par
                            la loi.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 15 – CONTACT */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 15 – CONTACT</h2>
                        <p>Pour toute question relative à la protection des données ou pour exercer vos droits, vous pouvez contacter :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Responsable de la protection des données</li>
                            <li>SmartFlow Group</li>
                            <li>
                                E-mail :{" "}
                                <a
                                    href="mailto:hugo.gebel@smartflowgroup.ch"
                                    className="text-zinc-100 underline hover:text-white"
                                >
                                    hugo.gebel@smartflowgroup.ch
                                </a>
                            </li>
                        </ul>
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
            </nav>
        </main>
    );
}


