import { PartialDictionary } from './types';

// See fr.ts for an explanation of the translation strategy: chrome and form
// strings are fully translated; long-form body content falls back to en.ts.
const cy: PartialDictionary = {
  locale: 'cy',
  meta: {
    siteName: 'Huw Latimer Hearing Care',
    description:
      'Gofal clyw cyfeillgar a phroffesiynol, gan gynnwys gwaredu cwyr clust drwy ficro-sugno, profion clyw a ffitio cymhorthion clyw.',
  },
  nav: {
    home: 'Hafan',
    about: 'Nam ar y Clyw',
    microSuction: 'Micro-sugno',
    hearingAids: 'Cymhorthion Clyw',
    contact: 'Cysylltu',
    bookAppointment: 'Trefnu Apwyntiad',
    language: 'Iaith',
    menu: 'Dewislen',
  },
  footer: {
    tagline: "Gofalu am eich clyw, bob cam o'r ffordd.",
    quickLinks: 'Dolenni Cyflym',
    getInTouch: 'Cysylltwch a Ni',
    followUs: 'Dilynwch Ni',
    emailMe: 'E-bostiwch Fi',
    rights: 'Cedwir pob hawl.',
    privacy: 'Preifatrwydd a Cwcis',
  },
  cookie: {
    title: 'Rydym yn gwerthfawrogi eich preifatrwydd',
    description:
      "Rydym yn defnyddio cwcis er mwyn i'r wefan hon weithio'n dda, i ddeall sut y caiff ei defnyddio, ac, gyda'ch caniatad, i'n helpu i rannu gwybodaeth berthnasol. Gallwch dderbyn pob cwci, gwrthod cwcis nad ydynt yn hanfodol, neu ddewis yn fanwl gywir beth rydych yn gyfforddus ag ef. Gallwch newid eich meddwl unrhyw bryd drwy ddolen 'Preifatrwydd a Cwcis' yn y troedyn.",
    accept: 'Derbyn Pob Un',
    decline: 'Gwrthod Cwcis Nad Ydynt yn Hanfodol',
    moreInfo: 'Mwy o Wybodaeth',
    customizeTitle: 'Dewiswch beth rydych yn ei rannu a ni',
    save: 'Cadw Dewisiadau',
    back: 'Yn ol',
    categories: {
      essential: {
        title: 'Hanfodol',
        description:
          "Yn ofynnol er mwyn i'r wefan weithio, megis cofio'ch dewisiadau cwcis a chynnydd eich ffurflen apwyntiad. Ni allwch ddiffodd y rhain.",
      },
      analytics: {
        title: 'Dadansoddi',
        description:
          "Yn ein helpu i ddeall sut mae ymwelwyr yn defnyddio'r wefan (er enghraifft, pa dudalennau sydd fwyaf poblogaidd) er mwyn i ni allu ei gwella. Ni werthir unrhyw ddata i drydydd partion.",
      },
      marketing: {
        title: 'Marchnata a Chyfryngau Cymdeithasol',
        description:
          "Yn caniatau i gynnwys o gyfryngau cymdeithasol, megis ein postiadau diweddaraf, gael ei ddangos ar y wefan hon ac yn ein helpu i fesur cyrhaeddiad ein diweddariadau.",
      },
    },
  },
  common: {
    readMore: 'Darllen mwy',
    learnMore: 'Dysgu mwy',
    bookNow: 'Trefnu Apwyntiad',
    backToTop: "Yn ol i'r brig",
    likes: 'hoffter',
    visit: 'Ymweld',
  },
  home: {
    heroEyebrow: 'Huw Latimer Hearing Care',
    heroTitle: "Gofal clyw tyner a phroffesiynol, yn agos i'ch cartref",
    heroSubtitle:
      "O archwiliadau clyw rheolaidd i waredu cwyr clust a ffitio cymhorthion clyw, rydym yn cymryd amser i wrando, er mwyn i chi glywed y pethau sy'n bwysig.",
    heroCta: 'Trefnu Apwyntiad',
    introTitle: 'Ffordd dawelach o ofalu am eich clyw',
    servicesTitle: 'Sut allwn ni helpu',
    socialTitle: 'Diweddaraf gan ein cymuned',
    socialSubtitle:
      'Cysylltwch a ni ar gyfryngau cymdeithasol am gynghorion ar iechyd clyw, newyddion y clinig a straeon cleifion. Dewiswch blatfform isod i gysylltu eich cyfrif.',
    ctaTitle: 'Yn barod i gymryd y cam cyntaf?',
    ctaBody:
      'Mae trefnu apwyntiad yn cymryd dim ond munud neu ddwy. Cynhelir apwyntiadau yn Viney Hearing Care, lle rydym yn falch o fod yn ymarferwyr preswyl.',
  },
  about: {
    title: 'Am Nam ar y Clyw',
    intro:
      "Mae colled clyw yn un o'r cyflyrau iechyd mwyaf cyffredin yn y byd, ond yn aml caiff ei chamddeall. Mae'r dudalen hon yn esbonio'r prif fathau o nam ar y clyw, y mathau o gefnogaeth a gofal sydd ar gael, a ble i ddod o hyd i gymunedau a gwybodaeth bellach.",
    sectionsTitle: "Mathau o nam ar y clyw a'r gofal sydd ar gael",
    socialGroupsTitle: 'Cymunedau pobl a nam ar y clyw ar draws y byd',
    linksTitle: 'Dolenni defnyddiol am ragor o wybodaeth',
  },
  microSuction: {
    title: 'Gwaredu Cwyr Clust drwy Ficro-sugno',
    intro:
      "Mae micro-sugno yn ffordd ddiogel, fodern a chyfforddus o waredu cwyr clust sydd wedi cronni. Gan ddefnyddio meicrosgop bach i weld yn glir i mewn i'r llwybr clust ac offeryn sugno tyner, gallwn glirio cwyr heb fod angen diferion meddalu ymlaen llaw na'r dwr a ddefnyddir mewn chwistrellu clust traddodiadol.",
    expectTitle: 'Beth i ddisgwyl yn ystod eich apwyntiad',
    aftercareTitle: 'Ar ol eich apwyntiad',
  },
  hearingAids: {
    title: 'Mathau o Gymhorthion Clyw',
    intro:
      "Nid oes un cymorth clyw 'gorau' i bawb. Mae'r dewis cywir yn dibynnu ar fath a graddau eich colled clyw, eich ffordd o fyw, eich medrusrwydd, a'ch dewisiadau personol o ran maint a gwelededd. Isod mae trosolwg o'r prif fathau a ffitiwn, i'ch helpu i ddod yn gyfarwydd a'r opsiynau cyn eich apwyntiad.",
  },
  contact: {
    title: 'Cysylltu',
    detailsTitle: 'Manylion Cyswllt',
    role: 'Ymarferydd Gofal Clyw Cofrestredig',
    aboutMeTitle: 'Amdanaf Fi',
    qualificationsTitle: 'Cymwysterau a Chofrestriad',
    workplaceTitle: 'Ble i Ddod o Hyd i Mi',
  },
  booking: {
    title: 'Trefnu Apwyntiad',
    intro:
      "Llenwch y ffurflen isod i ofyn am apwyntiad. Mae meysydd wedi'u marcio a seren (*) yn ofynnol. Byddwn yn cadarnhau eich apwyntiad drwy e-bost cyn gynted a phosibl.",
    clinicNotice:
      'Cynhelir eich apwyntiad yn Viney Hearing Care, lle rwyf yn ymarferydd preswyl.',
    fields: {
      firstName: 'Enw cyntaf',
      lastName: 'Cyfenw',
      dob: 'Dyddiad geni',
      email: 'Cyfeiriad e-bost',
      phone: 'Rhif ffon',
      postcode: 'Cod post',
      reason: 'Rheswm dros yr apwyntiad',
    },
    reasonOptions: [
      'Archwiliad clyw cyffredinol',
      'Gwaredu cwyr clust (micro-sugno)',
      'Amheuaeth o golled clyw',
      'Ffitio cymorth clyw',
      'Adolygiad neu atgyweiriad cymorth clyw',
      'Asesiad tinitws',
      'Arall',
    ],
    requiredHint: "Mae meysydd wedi'u marcio a * yn ofynnol.",
    errors: {
      required: 'Mae y maes hwn yn ofynnol.',
      invalidEmail: 'Rhowch gyfeiriad e-bost dilys.',
      invalidPhone: 'Rhowch rif ffon dilys.',
      invalidDob: 'Rhowch ddyddiad geni dilys.',
      generic: "Aeth rhywbeth o'i le. Rhowch gynnig arall arni.",
    },
    submit: 'Cadarnhau Apwyntiad',
    submitting: 'Yn anfon...',
    successTitle: 'Mae eich cais am apwyntiad wedi dod i law',
    successMessage:
      "Diolch. Mae e-bost cadarnhau wedi'i anfon i'r cyfeiriad a roddwyd gennych, gan gynnwys lleoliad y clinig a beth i ddod gyda chi.",
    addToCalendar: 'Ychwanegu at Google Calendar',
    backHome: 'Dychwelyd i\'r Hafan',
  },
};

export default cy;
