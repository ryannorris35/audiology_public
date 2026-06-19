import { PartialDictionary } from './types';

// See fr.ts for an explanation of the translation strategy: chrome and form
// strings are fully translated; long-form body content falls back to en.ts.
const pl: PartialDictionary = {
  locale: 'pl',
  meta: {
    siteName: 'Huw Latimer Hearing Care',
    description:
      'Przyjazna, profesjonalna opieka audiologiczna, w tym mikrosukcja woskowiny usznej, badania słuchu i dopasowanie aparatów słuchowych.',
  },
  nav: {
    home: 'Strona główna',
    about: 'Wady słuchu',
    microSuction: 'Mikrosukcja',
    hearingAids: 'Aparaty słuchowe',
    contact: 'Kontakt',
    bookAppointment: 'Zarezerwuj wizytę',
    language: 'Język',
    menu: 'Menu',
  },
  footer: {
    tagline: 'Dbamy o Twój słuch na każdym etapie.',
    quickLinks: 'Szybkie linki',
    getInTouch: 'Skontaktuj się',
    followUs: 'Obserwuj nas',
    emailMe: 'Napisz e-mail',
    rights: 'Wszelkie prawa zastrzeżone.',
    privacy: 'Prywatność i pliki cookie',
  },
  cookie: {
    title: 'Cenimy Twoją prywatność',
    description:
      'Używamy plików cookie, aby ta strona działała poprawnie, aby zrozumieć, jak jest używana, oraz, za Twoją zgodą, aby pomóc nam udostępniać odpowiednie treści. Możesz zaakceptować wszystkie pliki cookie, odrzucić te niezbędne tylko częściowo, lub wybrać dokładnie, na co się zgadzasz. Swoją decyzję możesz zmienić w każdej chwili za pomocą linku „Prywatność i pliki cookie” w stopce.',
    accept: 'Akceptuj wszystkie',
    decline: 'Odrzuć niewymagane',
    moreInfo: 'Więcej informacji',
    customizeTitle: 'Wybierz, czym się z nami dzielisz',
    save: 'Zapisz preferencje',
    back: 'Wstecz',
    categories: {
      essential: {
        title: 'Niezbędne',
        description:
          'Wymagane do działania strony, np. do zapamiętania Twoich wyborów dotyczących cookies oraz postępu wypełniania formularza wizyty. Nie można ich wyłączyć.',
      },
      analytics: {
        title: 'Analityczne',
        description:
          'Pomagają nam zrozumieć, jak odwiedzający korzystają ze strony (np. które strony są najpopularniejsze), abyśmy mogli ją ulepszać. Żadne dane nie są sprzedawane stronom trzecim.',
      },
      marketing: {
        title: 'Marketing i media społecznościowe',
        description:
          'Umożliwiają wyświetlanie treści z mediów społecznościowych, takich jak nasze najnowsze posty, oraz pomagają nam mierzyć ich zasięg.',
      },
    },
  },
  common: {
    readMore: 'Czytaj więcej',
    learnMore: 'Dowiedz się więcej',
    bookNow: 'Zarezerwuj wizytę',
    backToTop: 'Powrót do góry',
    likes: 'polubienia',
    visit: 'Odwiedź',
  },
  home: {
    heroEyebrow: 'Huw Latimer Hearing Care',
    heroTitle: 'Delikatna, profesjonalna opieka audiologiczna w pobliżu domu',
    heroSubtitle:
      'Od rutynowych badań słuchu, przez usuwanie woskowiny usznej, do dopasowania aparatów słuchowych — poświęcamy czas, aby Cię wysłuchać, abyś mógł usłyszeć to, co najważniejsze.',
    heroCta: 'Zarezerwuj wizytę',
    introTitle: 'Spokojniejszy sposób opieki nad słuchem',
    servicesTitle: 'Jak możemy pomóc',
    socialTitle: 'Najnowsze wiadomości od naszej społeczności',
    socialSubtitle:
      'Śledź nas w mediach społecznościowych, aby otrzymywać porady dotyczące zdrowia słuchu, nowości z gabinetu i historie pacjentów. Wybierz platformę poniżej, aby połączyć swoje konto.',
    ctaTitle: 'Gotowy na pierwszy krok?',
    ctaBody:
      'Rezerwacja wizyty zajmuje tylko kilka minut. Wizyty odbywają się w Viney Hearing Care, gdzie jesteśmy rezydującymi specjalistami.',
  },
  about: {
    title: 'O wadach słuchu',
    intro:
      'Utrata słuchu jest jednym z najczęstszych problemów zdrowotnych na świecie, choć często jest niezrozumiana. Ta strona opisuje główne rodzaje wad słuchu, dostępne formy wsparcia i opieki oraz miejsca, gdzie znaleźć społeczności i dodatkowe informacje.',
    sectionsTitle: 'Rodzaje wad słuchu i dostępna opieka',
    socialGroupsTitle: 'Społeczności osób z wadami słuchu na świecie',
    linksTitle: 'Przydatne linki z dodatkowymi informacjami',
  },
  microSuction: {
    title: 'Usuwanie woskowiny usznej metodą mikrosukcji',
    intro:
      'Mikrosukcja jest bezpieczną, nowoczesną i wygodną metodą usuwania nadmiaru woskowiny usznej. Korzystając z małego mikroskopu, który umożliwia dokładną obserwację przewodu słuchowego, oraz delikatnego urządzenia do odsysania, możemy usunąć woskowinę bez potrzeby wcześniejszego stosowania kropli zmiękczających czy wody używanej przy tradycyjnym płukaniu uszu.',
    expectTitle: 'Czego można się spodziewać podczas wizyty',
    aftercareTitle: 'Po wizycie',
  },
  hearingAids: {
    title: 'Rodzaje aparatów słuchowych',
    intro:
      'Nie istnieje jeden „najlepszy” aparat słuchowy — właściwy wybór zależy od rodzaju i stopnia utraty słuchu, stylu życia, sprawności manualnej oraz osobistych preferencji dotyczących rozmiaru i widoczności. Poniżej przedstawiamy przegląd głównych typów aparatów, które dopasowujemy, aby pomóc Ci zapoznać się z opcjami przed wizytą.',
  },
  contact: {
    title: 'Kontakt',
    detailsTitle: 'Dane kontaktowe',
    role: 'Zarejestrowany specjalista audiologii',
    aboutMeTitle: 'O mnie',
    qualificationsTitle: 'Kwalifikacje i rejestracja',
    workplaceTitle: 'Gdzie mnie znaleźć',
  },
  booking: {
    title: 'Zarezerwuj wizytę',
    intro:
      'Wypełnij poniższy formularz, aby zarezerwować wizytę. Pola oznaczone gwiazdką (*) są wymagane. Potwierdzimy Twoją wizytę e-mailem tak szybko, jak to możliwe.',
    clinicNotice:
      'Twoja wizyta odbędzie się w Viney Hearing Care, gdzie jestem rezydującym specjalistą.',
    fields: {
      firstName: 'Imię',
      lastName: 'Nazwisko',
      dob: 'Data urodzenia',
      email: 'Adres e-mail',
      phone: 'Numer telefonu',
      postcode: 'Kod pocztowy',
      reason: 'Powód wizyty',
    },
    reasonOptions: [
      'Ogólne badanie słuchu',
      'Usunięcie woskowiny usznej (mikrosukcja)',
      'Podejrzenie utraty słuchu',
      'Dopasowanie aparatu słuchowego',
      'Przegląd lub naprawa aparatu słuchowego',
      'Ocena szumów usznych (tinnitus)',
      'Inne',
    ],
    requiredHint: 'Pola oznaczone * są wymagane.',
    errors: {
      required: 'To pole jest wymagane.',
      invalidEmail: 'Podaj prawidłowy adres e-mail.',
      invalidPhone: 'Podaj prawidłowy numer telefonu.',
      invalidDob: 'Podaj prawidłową datę urodzenia.',
      generic: 'Coś poszło nie tak. Spróbuj ponownie.',
    },
    submit: 'Potwierdź wizytę',
    submitting: 'Wysyłanie...',
    successTitle: 'Twoja prośba o wizytę została odebrana',
    successMessage:
      'Dziękujemy. Na podany adres e-mail wysłaliśmy potwierdzenie zawierające lokalizację gabinetu oraz informacje, co warto zabrać ze sobą.',
    addToCalendar: 'Dodaj do Google Kalendarz',
    backHome: 'Powrót do strony głównej',
  },
};

export default pl;
