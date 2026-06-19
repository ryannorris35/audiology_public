# Huw Latimer Hearing Care — Website

A Next.js (App Router, TypeScript) website for a hearing care practice, including
information pages, a booking form backed by MongoDB, email confirmations,
multi-language support, and a GDPR-style cookie consent banner.

## Tech stack

- **Next.js 14** (App Router) — single app for both the frontend and the API routes
- **TypeScript** (strict mode)
- **Tailwind CSS** — earthy, accessible design system (see `tailwind.config.ts`)
- **MongoDB** via Mongoose — stores appointment bookings and a private visitor counter
- **Nodemailer** — sends booking confirmation emails
- **Zod** — server-side validation of the booking form

## Getting started

This project was generated without internet access, so dependencies have **not**
been installed and the app has **not** been run or built. To get started:

```bash
npm install
cp .env.example .env.local
# fill in .env.local — see "Environment variables" below
npm run dev
```

Then open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

- **`MONGODB_URI`** — required for the booking form and visitor counter to work.
  Create a free MongoDB Atlas cluster, add a database user (Database Access)
  with a username/password, allow your IP under Network Access, then copy the
  connection string from the "Connect" button.
- **`SMTP_*`** — optional. If left blank, booking confirmation emails are
  printed to the server console instead of being sent, so you can still test
  the full flow locally. Most providers (Gmail, Outlook, Fastmail, or
  transactional senders like Resend/Postmark) can supply SMTP credentials.
- **`FACEBOOK_ACCESS_TOKEN` / `INSTAGRAM_ACCESS_TOKEN` / `LINKEDIN_ACCESS_TOKEN`**
  — optional, for a future enhancement (see "Social media cards" below).

## Project structure

```
app/
  layout.tsx                 Root layout: fonts, nav, footer, cookie banner, visitor tracker
  page.tsx                    Home
  about-hearing-impairment/   About Hearing Impairment
  micro-suction/              Micro-Suction
  types-of-hearing-aids/      Types of Hearing Aids
  contact/                    Contact
  book-appointment/           Booking form page
  api/
    booking/route.ts          POST - validates and saves a booking, sends confirmation email
    visitor/route.ts          POST - increments the private visitor counter
components/                   Navbar, Footer, CookieConsent, BookingForm, etc.
lib/
  i18n/                        Dictionaries (en, cy, pl, es, de, fr) + getDictionary()
  models/                      Mongoose models (Booking, VisitorLog)
  mongodb.ts                   DB connection helper
  email.ts                     Booking confirmation email + Google Calendar link
```

## Things to review before going live

### 1. Translations

The navigation, footer, cookie banner, common UI strings, and the entire
booking form (labels, dropdown options, validation messages, success
screen) are fully translated into Welsh (cy), Polish (pl), Spanish
(es), German (de) and French (fr) - see `lib/i18n/*.ts`. Page titles
and introductions are translated too.

The long-form clinical content - the detailed sections on
"About Hearing Impairment", the micro-suction explanation, the hearing aid
descriptions, and the practitioner's biography - is written in English only.
Non-English visitors will see this content in English (the dictionaries fall
back to `en.ts` automatically via `deepMerge` in `getDictionary.ts`).

Before launch, have a qualified medical translator review and add this
content to `cy.ts`, `pl.ts`, `es.ts`, `de.ts` and `fr.ts`, following the same
structure as `en.ts` (the `sections`, `steps`, `types`, `aboutMeBody`, etc.
arrays). Accuracy matters here - these pages describe medical conditions and
procedures.

Choosing a language in the navigation bar sets a cookie (`wb_lang`) and
reloads the page so every page renders in the selected language.

### 2. Images

All images currently use picsum.photos placeholders (seeded so they stay
consistent between builds). Replace these before launch, especially:

- The portrait on the Contact page - this should be a real photo of the
  practitioner, used with their consent.
- The two images on the Micro-Suction page - ideally real, licensed photos of
  the clinic/procedure rather than stock imagery, so visitors know what to
  expect.
- The hearing aid images on the Types of Hearing Aids page - replace with
  manufacturer or licensed product photography for each style.

To swap an image, replace the `src` in the relevant `app/**/page.tsx` file
with either a local file in `public/images/` (e.g. `/images/my-photo.jpg`) or
a URL from an allowed domain (see `next.config.mjs`).

### 3. Social media "like" cards

The home page shows social media cards with placeholder like/follower counts
(`components/SocialCards.tsx`). To show live figures:

1. Obtain API access tokens for each platform (Meta Graph API for
   Facebook/Instagram, LinkedIn Marketing API for LinkedIn) and add them to
   `.env.local`.
2. Fetch the figures server-side (e.g. in `app/page.tsx`) with appropriate
   caching/revalidation (once an hour is plenty), and pass the results into
   `SocialCards`.
3. Update the social links in `components/Footer.tsx` and
   `components/SocialCards.tsx` to point to the real profile URLs.

### 4. Visitor counter

Every page view increments a single counter (`VisitorLog` collection,
document `{ key: "site_total" }`) via `/api/visitor`. This is not displayed
anywhere on the site and no email alerts are sent - per the brief, this
can be added later (e.g. a scheduled job that emails a weekly digest) without
changing the data model.

### 5. Cookie consent

The cookie banner (`components/CookieConsent.tsx`) offers "Accept All",
"Decline Non-Essential" and a "More Information" view with separate toggles
for Analytics and Marketing cookies (Essential cookies cannot be disabled).
Choices are stored in `localStorage` (`wb_cookie_consent`). The footer's
"Privacy & Cookies" link reopens this panel at any time.

Note: the banner itself only records the user's preference. If you add
analytics or marketing scripts (e.g. Google Analytics, a Meta Pixel), make
sure those scripts are only loaded when `analytics`/`marketing` is `true` in
the stored consent - see the comments in `CookieConsent.tsx` for where to
hook this in.

### 6. Appointment location

Appointments are described throughout the site as taking place at
Viney Hearing Care (https://www.vineyhearingcare.co.uk/), where the
practitioner is a "resident practitioner". The address used in the footer,
contact page and calendar invites ("Viney Hearing Care, High Street, Newtown,
United Kingdom") is a placeholder - update `lib/i18n/en.ts` (`contact.address`)
and `lib/email.ts` (`buildGoogleCalendarUrl`) with the real address.

### 7. Booking to appointment time

The "Add to Google Calendar" link generated after booking defaults to 9am,
one week from the booking date, as a placeholder slot (see
`buildGoogleCalendarUrl` in `lib/email.ts`). Once you have a real scheduling
process (e.g. the practitioner confirms a slot by phone/email), update this
function - or send a second email once the slot is confirmed - with the
actual appointment time.

## Accessibility

- Base font size is 18px (17px on small screens) for readability.
- All interactive elements have a visible focus ring.
- `prefers-reduced-motion` is respected (animations are disabled).
- The mobile navigation toggle has a gentle 1.5s pulse animation to draw
  attention to the menu, and its open/closed state persists across page
  navigation.
