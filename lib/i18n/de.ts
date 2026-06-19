import { PartialDictionary } from './types';

// See fr.ts for an explanation of the translation strategy: chrome and form
// strings are fully translated; long-form body content falls back to en.ts.
const de: PartialDictionary = {
  locale: 'de',
  meta: {
    siteName: 'Huw Latimer Hearing Care',
    description:
      'Freundliche, professionelle Hörversorgung mit Mikrosaugung zur Ohrenschmalzentfernung, Hörtests und Hörgeräteanpassung.',
  },
  nav: {
    home: 'Startseite',
    about: 'Hörschädigungen',
    microSuction: 'Mikrosaugung',
    hearingAids: 'Hörgeräte',
    contact: 'Kontakt',
    bookAppointment: 'Termin buchen',
    language: 'Sprache',
    menu: 'Menü',
  },
  footer: {
    tagline: 'Wir kümmern uns um Ihr Gehör — bei jedem Schritt.',
    quickLinks: 'Schnellzugriff',
    getInTouch: 'Kontaktieren Sie uns',
    followUs: 'Folgen Sie uns',
    emailMe: 'E-Mail senden',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutz & Cookies',
  },
  cookie: {
    title: 'Wir schätzen Ihre Privatsphäre',
    description:
      'Wir verwenden Cookies, damit diese Website ordnungsgemäß funktioniert, um zu verstehen, wie sie genutzt wird, und, mit Ihrer Erlaubnis, um relevante Inhalte zu teilen. Sie können alle Cookies akzeptieren, nicht notwendige Cookies ablehnen oder genau festlegen, was Sie zulassen möchten. Sie können Ihre Wahl jederzeit über den Link „Datenschutz & Cookies" in der Fußzeile ändern.',
    accept: 'Alle akzeptieren',
    decline: 'Nicht notwendige ablehnen',
    moreInfo: 'Weitere Informationen',
    customizeTitle: 'Wählen Sie, was Sie mit uns teilen',
    save: 'Einstellungen speichern',
    back: 'Zurück',
    categories: {
      essential: {
        title: 'Erforderlich',
        description:
          'Für die Funktion der Website notwendig, z. B. um Ihre Cookie-Auswahl und den Fortschritt Ihres Terminformulars zu speichern. Diese können nicht deaktiviert werden.',
      },
      analytics: {
        title: 'Analyse',
        description:
          'Hilft uns zu verstehen, wie Besucher die Website nutzen (z. B. welche Seiten am beliebtesten sind), damit wir sie verbessern können. Es werden keine Daten an Dritte verkauft.',
      },
      marketing: {
        title: 'Marketing & Soziale Medien',
        description:
          'Ermöglicht die Anzeige von Inhalten aus sozialen Medien, z. B. unsere neuesten Beiträge, und hilft uns, die Reichweite unserer Updates zu messen.',
      },
    },
  },
  common: {
    readMore: 'Weiterlesen',
    learnMore: 'Mehr erfahren',
    bookNow: 'Termin buchen',
    backToTop: 'Nach oben',
    likes: 'Gefällt mir',
    visit: 'Besuchen',
  },
  home: {
    heroEyebrow: 'Huw Latimer Hearing Care',
    heroTitle: 'Sanfte, professionelle Hörversorgung in Ihrer Nähe',
    heroSubtitle:
      'Von routinemäßigen Hörtests über die Entfernung von Ohrenschmalz bis hin zur Hörgeräteanpassung — wir nehmen uns Zeit, Ihnen zuzuhören, damit Sie hören können, was wirklich zählt.',
    heroCta: 'Termin buchen',
    introTitle: 'Ein entspannterer Weg, sich um Ihr Gehör zu kümmern',
    servicesTitle: 'Wie wir helfen können',
    socialTitle: 'Neues aus unserer Community',
    socialSubtitle:
      'Folgen Sie uns in den sozialen Medien für Tipps zur Hörgesundheit, Neuigkeiten aus der Praxis und Patientengeschichten. Wählen Sie unten eine Plattform, um Ihr Konto zu verknüpfen.',
    ctaTitle: 'Bereit für den ersten Schritt?',
    ctaBody:
      'Die Terminbuchung dauert nur wenige Minuten. Die Termine finden bei Viney Hearing Care statt, wo wir als ansässige Praktiker tätig sind.',
  },
  about: {
    title: 'Über Hörschädigungen',
    intro:
      'Hörverlust ist eine der häufigsten gesundheitlichen Beeinträchtigungen weltweit, wird aber oft missverstanden. Diese Seite erklärt die wichtigsten Arten von Hörschädigungen, die verfügbaren Versorgungsmöglichkeiten sowie Gemeinschaften und weiterführende Informationen.',
    sectionsTitle: 'Arten von Hörschädigungen und verfügbare Versorgung',
    socialGroupsTitle: 'Gemeinschaften für Menschen mit Hörbeeinträchtigung weltweit',
    linksTitle: 'Nützliche Links für weitere Informationen',
  },
  microSuction: {
    title: 'Mikrosaugung zur Ohrenschmalzentfernung',
    intro:
      'Mikrosaugung ist eine sichere, moderne und angenehme Methode zur Entfernung von übermäßigem Ohrenschmalz. Mit einem kleinen Mikroskop für eine klare Sicht in den Gehörgang und einem sanften Absauggerät können wir Ohrenschmalz entfernen, ohne vorher Ohrentropfen zu benötigen oder Wasser wie bei der herkömmlichen Ohrspülung.',
    expectTitle: 'Was Sie bei Ihrem Termin erwartet',
    aftercareTitle: 'Nach Ihrem Termin',
  },
  hearingAids: {
    title: 'Hörgerätetypen',
    intro:
      'Es gibt nicht das eine „beste" Hörgerät — die richtige Wahl hängt von Art und Grad Ihres Hörverlusts, Ihrem Lebensstil, Ihrer Geschicklichkeit und Ihren persönlichen Vorlieben hinsichtlich Größe und Sichtbarkeit ab. Im Folgenden finden Sie einen Überblick über die wichtigsten Bauformen, die wir anpassen, damit Sie sich vor Ihrem Termin mit den Optionen vertraut machen können.',
  },
  contact: {
    title: 'Kontakt',
    detailsTitle: 'Kontaktdaten',
    role: 'Registrierter Hörakustiker',
    aboutMeTitle: 'Über mich',
    qualificationsTitle: 'Qualifikationen & Registrierung',
    workplaceTitle: 'Wo Sie mich finden',
  },
  booking: {
    title: 'Termin buchen',
    intro:
      'Bitte füllen Sie das untenstehende Formular aus, um einen Termin anzufragen. Mit einem Sternchen (*) markierte Felder sind erforderlich. Wir bestätigen Ihren Termin so schnell wie möglich per E-Mail.',
    clinicNotice:
      'Ihr Termin findet bei Viney Hearing Care statt, wo ich als ansässiger Praktiker tätig bin.',
    fields: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      dob: 'Geburtsdatum',
      email: 'E-Mail-Adresse',
      phone: 'Telefonnummer',
      postcode: 'Postleitzahl',
      reason: 'Grund des Termins',
    },
    reasonOptions: [
      'Allgemeine Hörprüfung',
      'Ohrenschmalzentfernung (Mikrosaugung)',
      'Vermuteter Hörverlust',
      'Hörgeräteanpassung',
      'Wartung oder Reparatur eines Hörgeräts',
      'Tinnitus-Untersuchung',
      'Sonstiges',
    ],
    requiredHint: 'Mit * markierte Felder sind erforderlich.',
    errors: {
      required: 'Dieses Feld ist erforderlich.',
      invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      invalidPhone: 'Bitte geben Sie eine gültige Telefonnummer ein.',
      invalidDob: 'Bitte geben Sie ein gültiges Geburtsdatum ein.',
      generic: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    },
    submit: 'Termin bestätigen',
    submitting: 'Wird gesendet...',
    successTitle: 'Ihre Terminanfrage ist eingegangen',
    successMessage:
      'Vielen Dank. Eine Bestätigungs-E-Mail wurde an die angegebene Adresse gesendet, einschließlich des Praxisstandorts und was Sie mitbringen sollten.',
    addToCalendar: 'Zu Google Kalender hinzufügen',
    backHome: 'Zurück zur Startseite',
  },
};

export default de;
