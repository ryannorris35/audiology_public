'use client';

import { useState } from 'react';

const CLINIC_LOCATIONS = [
  {
    name: 'Sketty, Swansea',
    address: '104 Gower Road, Sketty',
    city: 'Swansea SA2 9BZ',
    phone: '01792 204886',
    mapQuery: '104+Gower+Road,+Sketty,+Swansea,+SA2+9BZ',
  },
  {
    name: 'Llansamlet, Swansea',
    address: '16A Axis Court, Mallard Way',
    city: 'Llansamlet, Swansea SA7 0AJ',
    phone: '01792 218721',
    mapQuery: '16A+Axis+Court,+Mallard+Way,+Llansamlet,+Swansea,+SA7+0AJ',
  },
  {
    name: 'Whitchurch, Cardiff',
    address: '66 Merthyr Road',
    city: 'Whitchurch, Cardiff CF14 1DJ',
    phone: '02920 250121',
    mapQuery: '66+Merthyr+Road,+Whitchurch,+Cardiff,+CF14+1DJ',
  },
];

export default function ClinicLocations() {
  const [active, setActive] = useState(0);
  const mapSrc = `https://maps.google.com/maps?q=${CLINIC_LOCATIONS[active].mapQuery}&hl=en&z=15&output=embed`;

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CLINIC_LOCATIONS.map((loc, i) => (
          <button
            key={loc.name}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-xl border p-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-600 ${
              active === i
                ? 'border-sage-600 bg-sage-50 shadow-sm'
                : 'border-sand-dark bg-sand hover:border-sage-400 hover:bg-sage-50/50'
            }`}
          >
            <p className="font-semibold text-bark text-sm">{loc.name}</p>
            <p className="mt-1 text-xs text-bark-light leading-relaxed">
              {loc.address}
              <br />
              {loc.city}
            </p>
            <a
              href={`tel:${loc.phone.replace(/\s/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="mt-2 block text-xs font-medium text-black hover:text-clay-dark"
            >
              {loc.phone}
            </a>
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-sand-dark">
        <iframe
          key={active}
          src={mapSrc}
          width="100%"
          height="240"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map — ${CLINIC_LOCATIONS[active].name}`}
        />
      </div>
    </div>
  );
}
