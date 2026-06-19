import { getDictionary } from '@/lib/i18n/getDictionary';
import SoundwaveDivider from '@/components/SoundwaveDivider';

export default async function AboutHearingImpairmentPage() {
  const dict = await getDictionary();
  const { about } = dict;

  return (
    <>
      <section className="bg-sage-600 text-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h1 className="font-display text-4xl font-semibold">{about.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-black">{about.intro}</p>
        </div>
      </section>

      <SoundwaveDivider className="bg-linen text-sage-400 py-2" />

      {/* Sections */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-bark">{about.sectionsTitle}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {about.sections.map((section) => (
              <div key={section.heading} className="rounded-xl border border-sand-dark bg-sand p-6">
                <h3 className="font-display text-lg font-semibold text-bark-light">{section.heading}</h3>
                <p className="mt-2 text-sm text-bark-light">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social groups */}
      <section className="bg-sand">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-bark">{about.socialGroupsTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm text-bark-light">{about.socialGroupsIntro}</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {about.socialGroups.map((group) => (
              <div key={group.name} className="rounded-xl border border-sand-dark bg-linen p-6">
                <h3 className="font-display text-lg font-semibold text-bark-light">{group.name}</h3>
                <p className="mt-2 text-sm text-bark-light">{group.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="bg-linen">
        <div className="mx-auto max-w-content px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-bark">{about.linksTitle}</h2>
          <ul className="mt-6 space-y-4">
            {about.links.map((link) => (
              <li key={link.url} className="border-b border-sand-dark pb-4">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-lg font-semibold text-sage-700 hover:text-clay-dark"
                >
                  {link.name} ↗
                </a>
                <p className="mt-1 text-sm text-bark-light">{link.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
