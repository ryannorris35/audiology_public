import { PartialDictionary } from './types';

// Translates all navigation, footer, cookie-banner, shared UI and booking-form
// strings, plus the heading/intro of every page. Long-form body content
// (the detailed "About Hearing Impairment", micro-suction and hearing aid
// descriptions) falls back to the English copy in en.ts until a professional
// translation of the clinical content is supplied — see README.
const fr: PartialDictionary = {
  locale: 'fr',
  meta: {
    siteName: 'Huw Latimer Hearing Care',
    description:
      "Des soins auditifs chaleureux et professionnels : élimination du cérumen par micro-aspiration, bilans auditifs et ajustement d'appareils auditifs.",
  },
  nav: {
    home: 'Accueil',
    about: 'Déficience auditive',
    microSuction: 'Micro-aspiration',
    hearingAids: 'Appareils auditifs',
    contact: 'Contact',
    bookAppointment: 'Prendre rendez-vous',
    language: 'Langue',
    menu: 'Menu',
  },
  footer: {
    tagline: 'Prendre soin de votre audition, à chaque étape.',
    quickLinks: 'Liens rapides',
    getInTouch: 'Nous contacter',
    followUs: 'Suivez-nous',
    emailMe: "M'envoyer un e-mail",
    rights: 'Tous droits réservés.',
    privacy: 'Confidentialité et cookies',
  },
  cookie: {
    title: 'Nous respectons votre vie privée',
    description:
      "Nous utilisons des cookies pour assurer le bon fonctionnement de ce site, comprendre comment il est utilisé et, avec votre permission, partager des informations pertinentes. Vous pouvez accepter tous les cookies, refuser les cookies non essentiels, ou choisir précisément ce que vous acceptez de partager. Vous pouvez modifier votre choix à tout moment via le lien « Confidentialité et cookies » dans le pied de page.",
    accept: 'Tout accepter',
    decline: 'Refuser le non essentiel',
    moreInfo: "Plus d'informations",
    customizeTitle: 'Choisissez ce que vous partagez avec nous',
    save: 'Enregistrer les préférences',
    back: 'Retour',
    categories: {
      essential: {
        title: 'Essentiels',
        description:
          "Nécessaires au fonctionnement du site, par exemple pour mémoriser vos choix de cookies et l'avancement de votre formulaire de rendez-vous. Ils ne peuvent pas être désactivés.",
      },
      analytics: {
        title: 'Analyse',
        description:
          "Nous aide à comprendre comment les visiteurs utilisent le site (par exemple, quelles pages sont les plus consultées) afin de l'améliorer. Aucune donnée n'est vendue à des tiers.",
      },
      marketing: {
        title: 'Marketing et réseaux sociaux',
        description:
          "Permet d'afficher du contenu provenant des réseaux sociaux, comme nos dernières publications, et nous aide à mesurer la portée de nos publications.",
      },
    },
  },
  common: {
    readMore: 'Lire la suite',
    learnMore: 'En savoir plus',
    bookNow: 'Prendre un rendez-vous',
    backToTop: 'Retour en haut',
    likes: "mentions J'aime",
    visit: 'Visiter',
  },
  home: {
    heroEyebrow: 'Huw Latimer Hearing Care',
    heroTitle: 'Des soins auditifs doux et professionnels, près de chez vous',
    heroSubtitle:
      "Des contrôles auditifs de routine à l'élimination du cérumen et à l'ajustement d'appareils auditifs, nous prenons le temps de vous écouter — pour que vous puissiez entendre ce qui compte le plus.",
    heroCta: 'Prendre rendez-vous',
    introTitle: 'Une approche plus sereine pour prendre soin de votre audition',
    servicesTitle: 'Comment nous pouvons vous aider',
    socialTitle: 'Dernières actualités de notre communauté',
    socialSubtitle:
      'Suivez-nous sur les réseaux sociaux pour des conseils sur la santé auditive, les actualités du cabinet et des témoignages de patients. Choisissez une plateforme ci-dessous pour relier votre compte.',
    ctaTitle: 'Prêt à faire le premier pas ?',
    ctaBody:
      "La prise de rendez-vous ne prend que quelques minutes. Les rendez-vous se déroulent au cabinet Viney Hearing Care, où nous sommes fiers d'être praticiens résidents.",
  },
  about: {
    title: "À propos de la déficience auditive",
    intro:
      "La perte auditive est l'un des problèmes de santé les plus courants au monde, mais elle reste souvent mal comprise. Cette page explique les principaux types de déficience auditive, les formes de soutien et de prise en charge disponibles, ainsi que les communautés et ressources où trouver davantage d'informations.",
    sectionsTitle: 'Types de déficience auditive et prise en charge disponible',
    socialGroupsTitle: 'Communautés de personnes malentendantes dans le monde',
    linksTitle: "Liens utiles pour en savoir plus",
  },
  microSuction: {
    title: 'Micro-aspiration du cérumen',
    intro:
      "La micro-aspiration est une méthode sûre, moderne et confortable pour retirer un excès de cérumen. Grâce à un petit microscope permettant de voir clairement dans le conduit auditif et à un dispositif d'aspiration doux, nous pouvons retirer le cérumen sans gouttes ramollissantes préalables ni l'eau utilisée lors d'un rinçage auriculaire traditionnel.",
    expectTitle: 'Ce à quoi vous attendre pendant votre rendez-vous',
    aftercareTitle: 'Après votre rendez-vous',
  },
  hearingAids: {
    title: "Types d'appareils auditifs",
    intro:
      "Il n'existe pas un appareil auditif « idéal » universel : le bon choix dépend du type et du degré de votre perte auditive, de votre mode de vie, de votre dextérité et de vos préférences en matière de taille et de discrétion. Voici un aperçu des principaux styles que nous proposons, pour vous familiariser avec les options avant votre rendez-vous.",
  },
  contact: {
    title: 'Contact',
    detailsTitle: 'Coordonnées',
    role: 'Audioprothésiste agréé',
    aboutMeTitle: 'À propos de moi',
    qualificationsTitle: 'Qualifications et inscription',
    workplaceTitle: 'Où me trouver',
  },
  booking: {
    title: 'Prendre rendez-vous',
    intro:
      "Veuillez remplir le formulaire ci-dessous pour demander un rendez-vous. Les champs marqués d'un astérisque (*) sont obligatoires. Nous confirmerons votre rendez-vous par e-mail dans les plus brefs délais.",
    clinicNotice:
      "Votre rendez-vous se déroulera au cabinet Viney Hearing Care, où j'exerce en tant que praticien résident.",
    fields: {
      firstName: 'Prénom',
      lastName: 'Nom',
      dob: 'Date de naissance',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone',
      postcode: 'Code postal',
      reason: 'Motif du rendez-vous',
    },
    reasonOptions: [
      'Bilan auditif général',
      'Élimination du cérumen (micro-aspiration)',
      'Suspicion de perte auditive',
      "Ajustement d'un appareil auditif",
      "Révision ou réparation d'un appareil auditif",
      "Évaluation de l'acouphène",
      'Autre',
    ],
    requiredHint: 'Les champs marqués * sont obligatoires.',
    errors: {
      required: 'Ce champ est obligatoire.',
      invalidEmail: 'Veuillez saisir une adresse e-mail valide.',
      invalidPhone: 'Veuillez saisir un numéro de téléphone valide.',
      invalidDob: 'Veuillez saisir une date de naissance valide.',
      generic: "Une erreur s'est produite. Veuillez réessayer.",
    },
    submit: 'Confirmer le rendez-vous',
    submitting: 'Envoi en cours...',
    successTitle: 'Votre demande de rendez-vous a été reçue',
    successMessage:
      "Merci. Un e-mail de confirmation a été envoyé à l'adresse indiquée, incluant le lieu du cabinet et ce qu'il faut apporter.",
    addToCalendar: 'Ajouter à Google Agenda',
    backHome: "Retour à l'accueil",
  },
};

export default fr;
