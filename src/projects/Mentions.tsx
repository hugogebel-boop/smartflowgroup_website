import React from "react";
import { SiteBackground, TopNav, Footer } from "../layout";

export default function Mentions() {
    return (
        <main className="relative min-h-screen text-white">
            <SiteBackground />
            <TopNav />

            <section className="mx-auto max-w-4xl px-6 sm:px-8 py-20">
                <h1 className="text-3xl sm:text-4xl font-semibold mb-6">Mentions légales</h1>

                <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6">
                    {/* PRÉAMBULE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">PRÉAMBULE</h2>
                        <p>
                            Les présentes mentions légales (ci-après : les « Mentions ») régissent l’accès et
                            l’utilisation du site internet exploité par SmartFlow Group, respectivement SmartFlow
                            Web, ainsi que de l’ensemble des services associés, qu’ils soient consultables en ligne
                            ou exécutés via des applications, intégrations ou plateformes numériques appartenant à
                            SmartFlow (ci-après : le « Site »).
                        </p>
                        <p>
                            Elles sont rédigées conformément au droit suisse en vigueur, notamment au Code des
                            obligations (CO), à la Loi fédérale sur la protection des données (LPD, 2023), à la Loi
                            sur la concurrence déloyale (LCD), au Code civil (CC), à la législation applicable en
                            matière d’e-commerce, de télécommunications et de propriété intellectuelle.
                        </p>
                        <p>
                            Toute personne accédant au Site (ci-après : « l’Utilisateur ») reconnaît avoir lu,
                            compris et accepté les présentes Mentions.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 1 – IDENTITÉ DU PROPRIÉTAIRE DU SITE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 1 – IDENTITÉ DU PROPRIÉTAIRE DU SITE
                        </h2>

                        <h3 className="font-semibold text-white">1.1 Exploitant</h3>
                        <p>Le Site est édité et exploité par :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>SmartFlow Group</li>
                            <li>Forme : Entreprise individuelle</li>
                            <li>Siège : Lausanne (VD), Suisse</li>
                            <li>Numéro IDE : CHE-xxx.xxx.xxx</li>
                            <li>
                                Adresse électronique :{" "}
                                <a
                                    href="mailto:hugo.gebel@smartflowgroup.ch"
                                    className="text-zinc-100 underline hover:text-white"
                                >
                                    hugo.gebel@smartflowgroup.ch
                                </a>
                            </li>
                        </ul>
                        <p>
                            SmartFlow Group opère également sous la dénomination commerciale : SmartFlow Web,
                            dédiée aux activités web, design et SEO.
                        </p>

                        <h3 className="font-semibold text-white">1.2 Responsable de publication</h3>
                        <p>
                            Responsable légal de la publication : Hugo Gebel, exploitant de SmartFlow Group.
                        </p>

                        <h3 className="font-semibold text-white">1.3 Hébergement</h3>
                        <p>Le Site est hébergé par : Infomaniak Network SA.</p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 2 – DÉFINITIONS */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">ARTICLE 2 – DÉFINITIONS</h2>
                        <p>Aux fins des présentes, on entend par :</p>
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>
                                « Site » : tout contenu, page ou fonctionnalité sous la gestion de SmartFlow,
                                y compris services web, outils, automatisations, API, cloud ou documents
                                numériques annexes.
                            </li>
                            <li>
                                « Utilisateur » : toute personne accédant au Site ou entrant en contact avec
                                SmartFlow.
                            </li>
                            <li>
                                « Données personnelles » : toute information relative à une personne physique
                                identifiée ou identifiable, au sens de la LPD.
                            </li>
                            <li>
                                « Services » : prestations fournies par SmartFlow, incluant développement web,
                                applications métier, automatisation, design, conseil, maintenance et intégrations
                                tierces.
                            </li>
                            <li>
                                « Contenus » : ensemble des textes, images, designs, logos, codes, logiciels,
                                scripts, bases de données, animations ou tout élément publié sur le Site.
                            </li>
                        </ol>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 3 – CHAMP D’APPLICATION */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 3 – CHAMP D’APPLICATION
                        </h2>
                        <p>Les présentes Mentions légales s’appliquent :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>à l’accès et à l’utilisation du Site,</li>
                            <li>à la consultation de tout contenu public ou privé,</li>
                            <li>
                                à l’utilisation des formulaires de contact, outils interactifs ou automatisations,
                            </li>
                            <li>
                                à toute communication initiée via le Site entre l’Utilisateur et SmartFlow.
                            </li>
                        </ul>
                        <p>Toute utilisation du Site emporte acceptation sans réserve des présentes.</p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 4 – ACCÈS AU SITE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 4 – ACCÈS AU SITE
                        </h2>

                        <h3 className="font-semibold text-white">4.1 Accessibilité</h3>
                        <p>
                            SmartFlow s’efforce d’assurer un accès continu et sécurisé au Site. Toutefois, aucune
                            garantie de disponibilité ininterrompue ne peut être donnée.
                        </p>

                        <h3 className="font-semibold text-white">4.2 Maintenance</h3>
                        <p>
                            SmartFlow se réserve le droit d’interrompre temporairement ou définitivement l’accès
                            au Site pour :
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>maintenance,</li>
                            <li>mise à jour,</li>
                            <li>modification structurelle,</li>
                            <li>interruption technique indépendante de sa volonté.</li>
                        </ul>
                        <p>Aucune indemnité ne peut être réclamée à ce titre.</p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 5 – PROPRIÉTÉ INTELLECTUELLE */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 5 – PROPRIÉTÉ INTELLECTUELLE
                        </h2>

                        <h3 className="font-semibold text-white">5.1 Titularité</h3>
                        <p>
                            L’ensemble des Contenus présents sur le Site est la propriété exclusive de SmartFlow
                            ou de tiers ayant accordé une licence.
                        </p>

                        <h3 className="font-semibold text-white">5.2 Droits protégés</h3>
                        <p>Sont notamment protégés par le droit suisse :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>textes, créations graphiques, logos, chartes graphiques,</li>
                            <li>photos, vidéos, animations, identités visuelles,</li>
                            <li>logiciels, extraits de code, composants, API,</li>
                            <li>bases de données (art. 5 LCD),</li>
                            <li>documents, templates et ressources internes.</li>
                        </ul>

                        <h3 className="font-semibold text-white">5.3 Interdictions</h3>
                        <p>Sauf autorisation écrite préalable, l’Utilisateur s’interdit :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>reproduction totale ou partielle,</li>
                            <li>modification, extraction, diffusion,</li>
                            <li>ingénierie inversée de logiciels,</li>
                            <li>intégration dans un produit tiers,</li>
                            <li>usage commercial non autorisé.</li>
                        </ul>
                        <p>
                            Toute violation engage la responsabilité civile (art. 41 CO) et pénale éventuelle.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 6 – CONDITIONS D’UTILISATION */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 6 – CONDITIONS D’UTILISATION
                        </h2>
                        <p>L’Utilisateur s’engage à utiliser le Site :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>conformément au droit applicable,</li>
                            <li>sans compromettre la sécurité des systèmes,</li>
                            <li>sans tentative d’accès non autorisé aux serveurs ou aux données,</li>
                            <li>sans nuisance à SmartFlow, à d’autres Utilisateurs ou à des tiers.</li>
                        </ul>
                        <p>Toute utilisation abusive ou frauduleuse pourra entraîner :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>blocage d’accès,</li>
                            <li>plainte pénale,</li>
                            <li>action civile en dommages-intérêts.</li>
                        </ul>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 7 – TRAITEMENT DES DONNÉES PERSONNELLES (LPD 2023) */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 7 – TRAITEMENT DES DONNÉES PERSONNELLES (LPD 2023)
                        </h2>

                        <h3 className="font-semibold text-white">7.1 Responsable du traitement</h3>
                        <p>SmartFlow est responsable du traitement des données au sens de la LPD.</p>

                        <h3 className="font-semibold text-white">7.2 Types de données collectées</h3>
                        <p>Sont notamment collectées :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>données d’identification (nom, email, téléphone),</li>
                            <li>contenus transmis via formulaires,</li>
                            <li>données techniques (adresse IP, logs, cookies),</li>
                            <li>données liées aux demandes de devis ou de projets,</li>
                            <li>informations nécessaires à la relation contractuelle.</li>
                        </ul>

                        <h3 className="font-semibold text-white">7.3 Finalités du traitement</h3>
                        <p>Les données sont utilisées pour :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>répondre aux demandes,</li>
                            <li>fournir les Services,</li>
                            <li>exécuter les contrats,</li>
                            <li>améliorer le Site,</li>
                            <li>assurer la sécurité informatique.</li>
                        </ul>

                        <h3 className="font-semibold text-white">7.4 Base légale</h3>
                        <p>Le traitement est fondé sur :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>l’exécution du contrat (art. 31 LPD),</li>
                            <li>le consentement,</li>
                            <li>l’intérêt légitime de SmartFlow.</li>
                        </ul>

                        <h3 className="font-semibold text-white">7.5 Transmission à des tiers</h3>
                        <p>Les données peuvent être transmises à :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>prestataires techniques (hébergement, emailing),</li>
                            <li>partenaires contractuels,</li>
                            <li>autorités en cas d’obligation légale.</li>
                        </ul>
                        <p>Aucune vente de données n’est effectuée.</p>

                        <h3 className="font-semibold text-white">7.6 Conservation</h3>
                        <p>
                            Les données sont conservées uniquement pendant la durée nécessaire aux finalités
                            prévues.
                        </p>

                        <h3 className="font-semibold text-white">7.7 Droits de l’Utilisateur</h3>
                        <p>L’Utilisateur peut, à tout moment :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>demander l’accès, la rectification, la suppression,</li>
                            <li>s’opposer à un traitement,</li>
                            <li>demander la portabilité lorsque applicable.</li>
                        </ul>
                        <p>
                            Toute demande doit être adressée à l’adresse email officielle de SmartFlow mentionnée
                            ci-dessus.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 8 – SÉCURITÉ DES DONNÉES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 8 – SÉCURITÉ DES DONNÉES
                        </h2>
                        <p>
                            SmartFlow met en œuvre des mesures techniques et organisationnelles adaptées
                            (cryptage, pare-feu, contrôle d’accès). Toutefois, aucun système n’étant infaillible,
                            une sécurité absolue ne peut être garantie.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 9 – LIENS EXTERNES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 9 – LIENS EXTERNES
                        </h2>
                        <p>
                            Le Site peut contenir des liens vers des sites tiers. SmartFlow décline toute
                            responsabilité concernant :
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>le contenu,</li>
                            <li>la légalité,</li>
                            <li>l’exactitude,</li>
                            <li>la sécurité des sites tiers.</li>
                        </ul>
                        <p>L’accès à ces sites se fait aux risques de l’Utilisateur.</p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 10 – RESPONSABILITÉ */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 10 – RESPONSABILITÉ
                        </h2>

                        <h3 className="font-semibold text-white">10.1 Garanties</h3>
                        <p>
                            SmartFlow fournit ses Services dans les règles de l’art, mais ne garantit pas :
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>l’absence totale d’erreurs,</li>
                            <li>la continuité du Site,</li>
                            <li>la compatibilité permanente avec tous appareils.</li>
                        </ul>

                        <h3 className="font-semibold text-white">10.2 Limitation</h3>
                        <p>Dans les limites du droit suisse, SmartFlow exclut toute responsabilité :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>pour dommages indirects, consécutifs ou pertes de données,</li>
                            <li>pour erreurs de transmission, indisponibilités, cyberattaques,</li>
                            <li>pour l’usage que fait l’Utilisateur du Site.</li>
                        </ul>

                        <h3 className="font-semibold text-white">10.3 Responsabilité de l’Utilisateur</h3>
                        <p>L’Utilisateur supporte l’entière responsabilité :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>de l’exactitude des informations transmises,</li>
                            <li>de sa propre configuration technique,</li>
                            <li>de l’usage qu’il fait du Site et des données reçues.</li>
                        </ul>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 11 – COMMANDES, DEVIS ET CONTRATS */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 11 – COMMANDES, DEVIS ET CONTRATS
                        </h2>

                        <h3 className="font-semibold text-white">11.1 Absence de contrat via le Site</h3>
                        <p>
                            La consultation du Site ne constitue pas une offre ferme aux termes des art. 7 ss CO.
                        </p>

                        <h3 className="font-semibold text-white">11.2 Devis</h3>
                        <p>Les devis transmis par SmartFlow :</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>n’engagent qu’après confirmation écrite,</li>
                            <li>peuvent être adaptés si les besoins évoluent,</li>
                            <li>restent valables pendant la durée indiquée.</li>
                        </ul>

                        <h3 className="font-semibold text-white">11.3 Exécution des Services</h3>
                        <p>
                            Les prestations sont régies par un contrat distinct (conditions générales, mandat,
                            contrat de développement ou de maintenance).
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 12 – DROIT APPLICABLE ET FOR */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 12 – DROIT APPLICABLE ET FOR
                        </h2>
                        <p>
                            Les présentes Mentions légales sont régies exclusivement par le droit suisse. En cas
                            de litige non résolu à l’amiable, les tribunaux compétents sont ceux du siège de
                            SmartFlow, sous réserve de dispositions impératives contraires.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 13 – MODIFICATIONS */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 13 – MODIFICATIONS
                        </h2>
                        <p>
                            SmartFlow se réserve le droit de modifier les présentes Mentions à tout moment. La
                            version en vigueur est celle publiée sur le Site au moment de l’utilisation.
                        </p>
                    </div>

                    <hr className="border-zinc-700" />

                    {/* ARTICLE 14 – DISPOSITIONS FINALES */}
                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            ARTICLE 14 – DISPOSITIONS FINALES
                        </h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>
                                Si une disposition est jugée invalide, les autres demeurent en vigueur.
                            </li>
                            <li>
                                L’absence d’exercice d’un droit ne vaut pas renonciation définitive.
                            </li>
                            <li>Les titres et sections servent uniquement à faciliter la lecture.</li>
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
            </nav>
        </main>
    );
}


