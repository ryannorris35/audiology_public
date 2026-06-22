export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    name: 'Huw Latimer Hearing Care',
    description:
      'Professional hearing care in Swansea. Specialist in micro-suction ear wax removal, hearing assessments and hearing aid fittings.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://huwlatimerhearingcare.co.uk',
    telephone: '+44 1234 567 890',
    email: 'huw.latimer.audiologist@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Viney Hearing Care, High Street',
      addressLocality: 'Swansea',
      addressRegion: 'Wales',
      addressCountry: 'GB',
    },
    areaServed: [
      { '@type': 'City', name: 'Swansea' },
      { '@type': 'AdministrativeArea', name: 'Wales' },
    ],
    medicalSpecialty: 'Audiology',
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Micro-Suction Ear Wax Removal' },
      { '@type': 'MedicalProcedure', name: 'Hearing Assessment' },
      { '@type': 'MedicalProcedure', name: 'Hearing Aid Fitting' },
      { '@type': 'Service', name: 'Hearing Aid Aftercare' },
    ],
    employee: {
      '@type': 'Person',
      name: 'Huw Latimer',
      jobTitle: 'Registered Hearing Care Practitioner',
    },
    sameAs: [
      'https://www.linkedin.com/in/huw-latimer-125821418/',
      'https://www.facebook.com/profile.php?id=61590933583878',
      'https://www.instagram.com/huwlatimeraudiologist/',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
