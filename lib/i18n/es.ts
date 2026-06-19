import { PartialDictionary } from './types';

// See fr.ts for an explanation of the translation strategy: chrome and form
// strings are fully translated; long-form body content falls back to en.ts.
const es: PartialDictionary = {
  locale: 'es',
  meta: {
    siteName: 'Huw Latimer Hearing Care',
    description:
      'Atención auditiva profesional y cercana, incluyendo extracción de cerumen por microaspiración, evaluaciones auditivas y adaptación de audífonos.',
  },
  nav: {
    home: 'Inicio',
    about: 'Discapacidad auditiva',
    microSuction: 'Microaspiración',
    hearingAids: 'Audífonos',
    contact: 'Contacto',
    bookAppointment: 'Reservar cita',
    language: 'Idioma',
    menu: 'Menú',
  },
  footer: {
    tagline: 'Cuidando su audición, en cada paso.',
    quickLinks: 'Enlaces rápidos',
    getInTouch: 'Contáctenos',
    followUs: 'Síganos',
    emailMe: 'Enviarme un correo',
    rights: 'Todos los derechos reservados.',
    privacy: 'Privacidad y cookies',
  },
  cookie: {
    title: 'Valoramos su privacidad',
    description:
      'Utilizamos cookies para que este sitio funcione correctamente, para entender cómo se utiliza y, con su permiso, para ayudarnos a compartir información relevante. Puede aceptar todas las cookies, rechazar las no esenciales, o elegir exactamente lo que desea compartir. Puede cambiar su elección en cualquier momento desde el enlace "Privacidad y cookies" en el pie de página.',
    accept: 'Aceptar todo',
    decline: 'Rechazar no esenciales',
    moreInfo: 'Más información',
    customizeTitle: 'Elija qué comparte con nosotros',
    save: 'Guardar preferencias',
    back: 'Atrás',
    categories: {
      essential: {
        title: 'Esenciales',
        description:
          'Necesarias para que el sitio funcione, como recordar sus preferencias de cookies y el progreso de su formulario de cita. No se pueden desactivar.',
      },
      analytics: {
        title: 'Análisis',
        description:
          'Nos ayuda a entender cómo los visitantes usan el sitio (por ejemplo, qué páginas son más populares) para poder mejorarlo. No se vende ningún dato a terceros.',
      },
      marketing: {
        title: 'Marketing y redes sociales',
        description:
          'Permite mostrar contenido de redes sociales, como nuestras publicaciones más recientes, y nos ayuda a medir el alcance de nuestras actualizaciones.',
      },
    },
  },
  common: {
    readMore: 'Leer más',
    learnMore: 'Saber más',
    bookNow: 'Reservar una cita',
    backToTop: 'Volver arriba',
    likes: 'Me gusta',
    visit: 'Visitar',
  },
  home: {
    heroEyebrow: 'Huw Latimer Hearing Care',
    heroTitle: 'Atención auditiva profesional y cercana, cerca de usted',
    heroSubtitle:
      'Desde revisiones auditivas rutinarias hasta la extracción de cerumen y la adaptación de audífonos, nos tomamos el tiempo de escucharle para que usted pueda oír lo que más importa.',
    heroCta: 'Reservar cita',
    introTitle: 'Una forma más tranquila de cuidar su audición',
    servicesTitle: 'Cómo podemos ayudarle',
    socialTitle: 'Lo último de nuestra comunidad',
    socialSubtitle:
      'Síganos en redes sociales para recibir consejos sobre salud auditiva, noticias de la clínica y testimonios de pacientes. Elija una plataforma a continuación para enlazar su cuenta.',
    ctaTitle: '¿Listo para dar el primer paso?',
    ctaBody:
      'Reservar una cita solo lleva un par de minutos. Las citas se realizan en Viney Hearing Care, donde somos profesionales residentes.',
  },
  about: {
    title: 'Sobre la discapacidad auditiva',
    intro:
      'La pérdida auditiva es una de las afecciones de salud más comunes en el mundo, aunque a menudo se entiende mal. Esta página explica los principales tipos de discapacidad auditiva, los tipos de apoyo y atención disponibles, y dónde encontrar comunidades y más información.',
    sectionsTitle: 'Tipos de discapacidad auditiva y atención disponible',
    socialGroupsTitle: 'Comunidades de personas con discapacidad auditiva en el mundo',
    linksTitle: 'Enlaces útiles para más información',
  },
  microSuction: {
    title: 'Extracción de cerumen por microaspiración',
    intro:
      'La microaspiración es una forma segura, moderna y cómoda de eliminar la acumulación de cerumen. Utilizando un pequeño microscopio para ver con claridad el canal auditivo y un dispositivo de aspiración suave, podemos eliminar el cerumen sin necesidad de gotas reblandecedoras previas ni del agua que se usa en el lavado tradicional de oídos.',
    expectTitle: 'Qué esperar durante su cita',
    aftercareTitle: 'Después de su cita',
  },
  hearingAids: {
    title: 'Tipos de audífonos',
    intro:
      'No existe un audífono "perfecto" para todos: la mejor opción depende del tipo y grado de su pérdida auditiva, su estilo de vida, su destreza y sus preferencias personales sobre tamaño y visibilidad. A continuación encontrará un resumen de los principales modelos que adaptamos, para que se familiarice con las opciones antes de su cita.',
  },
  contact: {
    title: 'Contacto',
    detailsTitle: 'Datos de contacto',
    role: 'Audioprotesista titulado',
    aboutMeTitle: 'Sobre mí',
    qualificationsTitle: 'Cualificaciones y colegiación',
    workplaceTitle: 'Dónde encontrarme',
  },
  booking: {
    title: 'Reservar una cita',
    intro:
      'Por favor, rellene el siguiente formulario para solicitar una cita. Los campos marcados con un asterisco (*) son obligatorios. Confirmaremos su cita por correo electrónico lo antes posible.',
    clinicNotice:
      'Su cita se realizará en Viney Hearing Care, donde soy profesional residente.',
    fields: {
      firstName: 'Nombre',
      lastName: 'Apellidos',
      dob: 'Fecha de nacimiento',
      email: 'Correo electrónico',
      phone: 'Número de teléfono',
      postcode: 'Código postal',
      reason: 'Motivo de la cita',
    },
    reasonOptions: [
      'Revisión auditiva general',
      'Extracción de cerumen (microaspiración)',
      'Sospecha de pérdida auditiva',
      'Adaptación de audífono',
      'Revisión o reparación de audífono',
      'Evaluación de tinnitus',
      'Otro',
    ],
    requiredHint: 'Los campos marcados con * son obligatorios.',
    errors: {
      required: 'Este campo es obligatorio.',
      invalidEmail: 'Introduzca una dirección de correo electrónico válida.',
      invalidPhone: 'Introduzca un número de teléfono válido.',
      invalidDob: 'Introduzca una fecha de nacimiento válida.',
      generic: 'Algo salió mal. Por favor, inténtelo de nuevo.',
    },
    submit: 'Confirmar cita',
    submitting: 'Enviando...',
    successTitle: 'Su solicitud de cita ha sido recibida',
    successMessage:
      'Gracias. Se ha enviado un correo de confirmación a la dirección proporcionada, incluyendo la ubicación de la clínica y qué traer.',
    addToCalendar: 'Añadir a Google Calendar',
    backHome: 'Volver al inicio',
  },
};

export default es;
