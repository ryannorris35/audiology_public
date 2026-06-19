export interface NavDictionary {
  home: string;
  about: string;
  microSuction: string;
  hearingAids: string;
  contact: string;
  bookAppointment: string;
  language: string;
  menu: string;
}

export interface FooterDictionary {
  tagline: string;
  quickLinks: string;
  getInTouch: string;
  followUs: string;
  emailMe: string;
  rights: string;
  privacy: string;
}

export interface CookieCategoryDictionary {
  title: string;
  description: string;
}

export interface CookieDictionary {
  title: string;
  description: string;
  accept: string;
  decline: string;
  moreInfo: string;
  customizeTitle: string;
  save: string;
  back: string;
  categories: {
    essential: CookieCategoryDictionary;
    analytics: CookieCategoryDictionary;
    marketing: CookieCategoryDictionary;
  };
}

export interface CommonDictionary {
  readMore: string;
  learnMore: string;
  bookNow: string;
  backToTop: string;
  likes: string;
  visit: string;
}

export interface HomeDictionary {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  introTitle: string;
  introBody: string;
  servicesTitle: string;
  services: { title: string; body: string }[];
  socialTitle: string;
  socialSubtitle: string;
  ctaTitle: string;
  ctaBody: string;
}

export interface AboutDictionary {
  title: string;
  intro: string;
  sectionsTitle: string;
  sections: { heading: string; body: string }[];
  socialGroupsTitle: string;
  socialGroupsIntro: string;
  socialGroups: { name: string; body: string }[];
  linksTitle: string;
  links: { name: string; url: string; description: string }[];
}

export interface MicroSuctionDictionary {
  title: string;
  intro: string;
  expectTitle: string;
  steps: { title: string; body: string }[];
  aftercareTitle: string;
  aftercare: string;
  reassurance: string;
}

export interface HearingAidsDictionary {
  title: string;
  intro: string;
  types: { name: string; description: string }[];
}

export interface ContactDictionary {
  title: string;
  detailsTitle: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  address: string;
  aboutMeTitle: string;
  aboutMeBody: string[];
  qualificationsTitle: string;
  qualifications: string[];
  workplaceTitle: string;
  workplaceBody: string[];
}

export interface BookingDictionary {
  title: string;
  intro: string;
  clinicNotice: string;
  fields: {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    phone: string;
    postcode: string;
    reason: string;
  };
  reasonOptions: string[];
  requiredHint: string;
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    invalidDob: string;
    generic: string;
  };
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  addToCalendar: string;
  backHome: string;
}

export interface Dictionary {
  locale: string;
  meta: {
    siteName: string;
    description: string;
  };
  nav: NavDictionary;
  footer: FooterDictionary;
  cookie: CookieDictionary;
  common: CommonDictionary;
  home: HomeDictionary;
  about: AboutDictionary;
  microSuction: MicroSuctionDictionary;
  hearingAids: HearingAidsDictionary;
  contact: ContactDictionary;
  booking: BookingDictionary;
}

// Used for non-English locale files: every page-chrome string (navigation,
// footer, cookie banner, form labels & validation) should be translated,
// while long-form page content can fall back to the English copy until a
// professional translation of the clinical content is supplied.
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? U[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export type PartialDictionary = DeepPartial<Dictionary>;
